"use client";

import { CartItem } from "@/types/cart";
import { Card, CardContent } from "@/components/ui";
import { Button } from "@/components/ui";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex gap-4 items-center">
          <div className="text-4xl">{item.image}</div>
          
          <div className="flex-1">
            <h4 className="font-bold text-gray-900">{item.name}</h4>
            <p className="text-gray-600 text-sm">
              by {item.farmer} • ₹{item.price}/{item.unit}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.qty - 1)}
            >
              −
            </Button>
            <span className="font-bold w-6 text-center">{item.qty}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.qty + 1)}
            >
              +
            </Button>
          </div>
          
          <div className="font-bold text-green-700 text-lg min-w-[70px] text-right">
            ₹{item.price * item.qty}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
            className="text-red-600 hover:text-red-700"
          >
            ✕
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
