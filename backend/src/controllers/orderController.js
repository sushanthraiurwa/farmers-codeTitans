import Order from '../models/Product.js';
import Product from '../models/Product.js';

// @desc    Create order
// @route   POST /api/orders
// @access  Private (Buyer only)
export const createOrder = async (req, res, next) => {
  try {
    const { items, deliveryAddress, deliverySlot, paymentMethod, notes } = req.body;

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please add items to your order'
      });
    }

    // Calculate total amount and validate products
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`
        });
      }

      if (!product.available) {
        return res.status(400).json({
          success: false,
          message: `Product not available: ${product.name}`
        });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.quantity}`
        });
      }

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0]?.url || '',
        quantity: item.quantity,
        unit: product.unit,
        price: product.price,
        subtotal
      });

      // Update product quantity
      product.quantity -= item.quantity;
      await product.save();
    }

    // Create order
    const order = await Order.create({
      buyer: req.user.id,
      farmer: orderItems[0].product.farmer, // Assuming single farmer per order
      items: orderItems,
      totalAmount,
      deliveryAddress,
      deliverySlot,
      paymentMethod,
      notes
    });

    const populatedOrder = await Order.findById(order._id)
      .populate('buyer', 'name email phone')
      .populate('farmer', 'name email phone')
      .populate('items.product', 'name images');

    res.status(201).json({
      success: true,
      data: populatedOrder
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
export const getOrders = async (req, res, next) => {
  try {
    let query = {};

    // Filter based on user role
    if (req.user.role === 'buyer') {
      query.buyer = req.user.id;
    } else if (req.user.role === 'farmer') {
      query.farmer = req.user.id;
    } else if (req.user.role === 'admin') {
      // Admin can see all orders
    }

    const orders = await Order.find(query)
      .populate('buyer', 'name email phone')
      .populate('farmer', 'name email phone')
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyer', 'name email phone address')
      .populate('farmer', 'name email phone address')
      .populate('items.product', 'name images description');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check authorization
    if (
      order.buyer._id.toString() !== req.user.id &&
      order.farmer._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Farmer/Admin only)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, rejectionReason, cancellationReason, trackingNumber } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check authorization
    if (req.user.role === 'farmer' && order.farmer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this order'
      });
    }

    // Update status
    order.status = status;
    
    if (rejectionReason) order.rejectionReason = rejectionReason;
    if (cancellationReason) order.cancellationReason = cancellationReason;
    if (trackingNumber) order.trackingNumber = trackingNumber;

    // Set estimated delivery for accepted orders
    if (status === 'accepted' && !order.estimatedDelivery) {
      order.estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now
    }

    // Mark as delivered
    if (status === 'delivered') {
      order.actualDelivery = new Date();
      order.paymentStatus = 'paid';
      order.escrowReleased = true;
    }

    await order.save();

    const updatedOrder = await Order.findById(order._id)
      .populate('buyer', 'name email phone')
      .populate('farmer', 'name email phone')
      .populate('items.product', 'name images');

    res.status(200).json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private (Buyer only)
export const cancelOrder = async (req, res, next) => {
  try {
    const { cancellationReason } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check authorization
    if (order.buyer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }

    // Can only cancel pending orders
    if (order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel order at this stage'
      });
    }

    // Restore product quantities
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { quantity: item.quantity }
      });
    }

    order.status = 'cancelled';
    order.cancellationReason = cancellationReason;
    await order.save();

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};
