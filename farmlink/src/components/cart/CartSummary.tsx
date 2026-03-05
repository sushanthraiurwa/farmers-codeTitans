"use client";

import { CartItem } from "@/types/cart";
import { Card, CardHeader, CardContent } from "@/components/ui";
import { Button } from "@/components/ui";

interface CartSummaryProps {
  items: CartItem[];
  total: number;
  onCheckout: () => void;
  onClearCart: () => void;
}

export function CartSummary({ items, total, onCheckout, onClearCart }: CartSummaryProps) {
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <h3 className="font-bold text-gray-900 text-lg">
          🛒 Order Summary ({itemCount} {itemCount === 1 ? "item" : "items"})
        </h3>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex justify-between text-sm text-gray-700">
            <span>{item.image} {item.name} ×{item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
        
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Delivery</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3 text-xs text-green-700">
          🔒 Escrow protected — payment released only after delivery confirmation
        </div>
        
        <div className="space-y-2">
          <Button onClick={onCheckout} className="w-full">
            Proceed to Checkout →
          </Button>
          <Button 
            variant="outline" 
            onClick={onClearCart}
            className="w-full"
          >
            Clear Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
