"use client";

import { Card, CardContent } from "@/components/ui";
import { DollarSign, Package, TrendingUp, Users, Star, Target, Activity } from "lucide-react";

interface StatsCardProps {
  icon: string;
  label: string;
  value: string | number;
  color?: "green" | "blue" | "yellow" | "purple";
  bg?: string;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
}

export function StatsCard({ icon, label, value, color = "green", bg, trend }: StatsCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "💰": return <DollarSign className="w-6 h-6" />;
      case "📦": return <Package className="w-6 h-6" />;
      case "📈": return <TrendingUp className="w-6 h-6" />;
      case "👨‍🌾": return <Users className="w-6 h-6" />;
      case "⭐": return <Star className="w-6 h-6" />;
      case "🎯": return <Target className="w-6 h-6" />;
      case "📊": return <Activity className="w-6 h-6" />;
      default: return <div className="text-2xl">{icon}</div>;
    }
  };

  const colorClasses = {
    green: "text-green-600",
    blue: "text-blue-600", 
    yellow: "text-yellow-600",
    purple: "text-purple-600",
  };

  const bgClasses = {
    green: "bg-green-50 border-green-200",
    blue: "bg-blue-50 border-blue-200",
    yellow: "bg-yellow-50 border-yellow-200", 
    purple: "bg-purple-50 border-purple-200",
  };

  return (
    <Card className={`${bg ? bg : bgClasses[color]} border hover:shadow-md transition-shadow`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className={`${colorClasses[color]}`}>
            {getIcon()}
          </div>
          {trend && (
            <div className={`flex items-center text-xs font-medium ${
              trend.direction === "up" ? "text-green-600" : "text-red-600"
            }`}>
              <TrendingUp className={`w-3 h-3 mr-1 ${
                trend.direction === "down" ? "rotate-180" : ""
              }`} />
              {trend.value}
            </div>
          )}
        </div>
        <div className="text-xs text-gray-600 uppercase tracking-wide mb-2">
          {label}
        </div>
        <div className={`text-2xl font-bold ${colorClasses[color]}`}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
