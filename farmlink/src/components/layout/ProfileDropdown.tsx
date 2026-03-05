import { Button } from "@/components/ui";
import { User, LogOut, Bell, Settings, Edit, ChevronDown } from "lucide-react";

interface ProfileDropdownProps {
  user: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    role: string;
    joined?: string;
  };
  onLogout: () => void;
  onEditProfile?: () => void;
}

export function ProfileDropdown({ user, onLogout, onEditProfile }: ProfileDropdownProps) {
  return (
    <div className="relative group">
      <Button
        variant="outline"
        className="flex items-center gap-2 px-4 py-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center text-sm font-bold text-green-900">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <ChevronDown className="w-4 h-4" />
      </Button>

      <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center text-lg font-bold text-green-900">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-white">
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm opacity-90">{user.email}</div>
              <div className="text-xs bg-white/20 px-2 py-1 rounded-full inline-block mt-1">
                {user.role.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-4">
          <div className="space-y-3">
            {user.phone && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Phone</span>
                <span className="font-medium">{user.phone}</span>
              </div>
            )}
            {user.address && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Address</span>
                <span className="font-medium text-right max-w-[60%]">{user.address}</span>
              </div>
            )}
            {user.joined && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium">{user.joined}</span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
            {onEditProfile && (
              <Button
                variant="ghost"
                onClick={onEditProfile}
                className="w-full justify-start text-gray-700 hover:text-gray-900"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:text-gray-900"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
