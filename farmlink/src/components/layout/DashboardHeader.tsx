import { Button } from "@/components/ui";
import { Home, Store, Package, BarChart, Settings, LogOut, Menu, Bell, Users } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  onLogout: () => void;
  onNavigate?: (page: string) => void;
}

export function DashboardHeader({ 
  title, 
  subtitle, 
  user, 
  onLogout, 
  onNavigate 
}: DashboardHeaderProps) {
  const getNavigationItems = () => {
    switch (user.role) {
      case "farmer":
        return [
          { id: "overview", label: "Overview", icon: BarChart },
          { id: "add", label: "Add Produce", icon: Package },
          { id: "orders", label: "Orders", icon: Package },
          { id: "analytics", label: "Analytics", icon: BarChart },
        ];
      case "buyer":
        return [
          { id: "browse", label: "Browse", icon: Store },
          { id: "cart", label: "Cart", icon: Package },
          { id: "orders", label: "My Orders", icon: Package },
          { id: "subscriptions", label: "Subscriptions", icon: BarChart },
        ];
      case "admin":
        return [
          { id: "overview", label: "Overview", icon: BarChart },
          { id: "farmers", label: "Farmers", icon: Users },
          { id: "orders", label: "Orders", icon: Package },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 shadow-lg">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌾</span>
              <div>
                <div className="text-white font-bold text-xl">FarmLink</div>
                <div className="text-green-200 text-xs">{subtitle}</div>
              </div>
            </div>
            
            {/* Navigation */}
            {onNavigate && (
              <nav className="hidden md:flex items-center gap-6 ml-8">
                {getNavigationItems().map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className="flex items-center gap-2 text-green-100 hover:text-white transition-colors text-sm font-medium"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 p-2"
            >
              <Bell className="w-5 h-5" />
            </Button>

            {/* User Info */}
            <div className="text-right text-white">
              <div className="font-semibold">{user.name}</div>
              <div className="text-green-200 text-xs capitalize">{user.role}</div>
            </div>

            {/* Logout */}
            <Button
              variant="outline"
              onClick={onLogout}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-green-600">
        <div className="px-6 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {getNavigationItems().map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate && onNavigate(item.id)}
                className="flex items-center gap-2 text-green-100 hover:text-white transition-colors text-sm font-medium whitespace-nowrap px-3 py-2 rounded-lg hover:bg-white/10"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
