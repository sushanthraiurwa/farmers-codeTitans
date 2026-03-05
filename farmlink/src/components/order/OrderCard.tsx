import { Card, CardContent } from "@/components/ui";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { Package, User, MapPin, Calendar, Phone, Mail, CheckCircle, Clock, Truck, X, Shield } from "lucide-react";

interface Order {
  id: string;
  buyer: string;
  product: string;
  quantity: number;
  total: number;
  status: "pending" | "accepted" | "delivered" | "rejected";
  date: string;
  address: string;
  phone: string;
  slot?: string;
  items?: Array<{
    id: number;
    name: string;
    image: string;
    qty: number;
  }>;
}

interface OrderCardProps {
  order: Order;
  onUpdateStatus?: (id: string, status: string) => void;
  showActions?: boolean;
  isFarmer?: boolean;
}

export function OrderCard({ order, onUpdateStatus, showActions = false, isFarmer = false }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-3 h-3" />;
      case "accepted":
        return <CheckCircle className="w-3 h-3" />;
      case "delivered":
        return <Truck className="w-3 h-3" />;
      case "rejected":
        return <X className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-bold text-gray-900">#{order.id}</h3>
              <Badge className={getStatusColor(order.status)}>
                {getStatusIcon(order.status)}
                <span className="ml-1">{order.status.toUpperCase()}</span>
              </Badge>
            </div>
            <div className="text-gray-700 font-medium mb-1">
              {isFarmer ? order.buyer : order.product}
            </div>
            <div className="text-gray-600 text-sm">
              Qty: {order.quantity} • ₹{order.total} • {order.date}
            </div>
            {order.slot && (
              <div className="text-gray-600 text-sm mt-1">
                <Clock className="w-3 h-3 inline mr-1" />
                {order.slot}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="font-bold text-green-700 text-lg">₹{order.total}</div>
          </div>
        </div>

        {/* Items Display */}
        {order.items && (
          <div className="flex flex-wrap gap-2 mb-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-sm"
              >
                <span className="text-lg">{item.image}</span>
                <span>{item.name} ×{item.qty}</span>
              </div>
            ))}
          </div>
        )}

        {/* Address */}
        <div className="flex items-start gap-3 text-gray-600 text-sm mb-4">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{order.address}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 text-gray-600 text-sm mb-4">
          <Phone className="w-4 h-4" />
          <span>{order.phone}</span>
        </div>

        {/* Actions */}
        {showActions && onUpdateStatus && (
          <div className="flex gap-2 pt-4 border-t border-gray-200">
            {order.status === "pending" && (
              <>
                <Button
                  onClick={() => onUpdateStatus(order.id, "accepted")}
                  className="flex-1"
                  size="sm"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Accept
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onUpdateStatus(order.id, "rejected")}
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  size="sm"
                >
                  <X className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </>
            )}
            {order.status === "accepted" && (
              <Button
                onClick={() => onUpdateStatus(order.id, "delivered")}
                className="flex-1"
                size="sm"
              >
                <Truck className="w-4 h-4 mr-1" />
                Mark Delivered
              </Button>
            )}
          </div>
        )}

        {/* Escrow Info */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Shield className="w-3 h-3" />
            <span>Escrow protected until delivery confirmation</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
