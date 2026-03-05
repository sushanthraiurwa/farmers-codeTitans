import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['vegetables', 'fruits', 'grains', 'dairy', 'herbs', 'other']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  unit: {
    type: String,
    required: [true, 'Please add a unit'],
    enum: ['kg', 'g', 'piece', 'bunch', 'dozen', 'liter', 'ml']
  },
  quantity: {
    type: Number,
    required: [true, 'Please add available quantity'],
    min: [0, 'Quantity cannot be negative']
  },
  images: [{
    url: String,
    publicId: String
  }],
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere'
    },
    address: String
  },
  organic: {
    type: Boolean,
    default: false
  },
  seasonal: {
    type: Boolean,
    default: false
  },
  available: {
    type: Boolean,
    default: true
  },
  demand: {
    type: String,
    enum: ['low', 'medium', 'high', 'very-high'],
    default: 'medium'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  harvestDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  tags: [String],
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better search performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, available: 1 });
productSchema.index({ farmer: 1 });
productSchema.index({ price: 1 });

export default mongoose.model('Product', productSchema);
