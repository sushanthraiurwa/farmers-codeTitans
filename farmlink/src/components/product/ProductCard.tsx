"use client";

import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { Heart, Star, MapPin, Zap, Sparkles, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist?: (productId: number) => void;
  isInWishlist?: boolean;
}

export function ProductCard({ 
  product, 
  onAddToCart, 
  onViewDetails, 
  onToggleWishlist,
  isInWishlist = false 
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group">
      <div className="relative">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-12 text-center text-6xl">
          {product.image}
        </div>
        
        {/* Wishlist Button */}
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200 group-hover:scale-110"
          >
            <Heart 
              className={`w-4 h-4 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </button>
        )}

        {/* Demand Badge */}
        {product.demand === "Very High" && (
          <div className="absolute top-3 left-3">
            <Badge variant="danger" className="text-xs font-bold">
              <Zap className="w-3 h-3 mr-1" />
              HOT
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex gap-1.5 mb-3 flex-wrap">
          {product.organic && (
            <Badge variant="success">
              <Sparkles className="w-3 h-3 mr-1" />
              Organic
            </Badge>
          )}
        </div>
        
        <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-center text-gray-600 text-xs mb-3">
          <MapPin className="w-3 h-3 mr-1" />
          <span>{product.distance} km away</span>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <div className="font-bold text-green-700 text-lg">
              ₹{product.price}
              <span className="text-xs font-normal text-gray-500">/{product.unit}</span>
            </div>
            <div className="flex items-center text-xs">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
              <span>{product.rating}</span>
              <span className="text-gray-500 ml-1">({product.reviews})</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="flex-1"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
