"use client";

import { Button } from "@/components/ui";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { FARMERS } from "@/data/farmers";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-5 flex justify-between items-center shadow-lg">
        <div className="text-white font-bold text-xl">🌾 FarmLink Admin</div>
        <Button 
          variant="outline"
          onClick={() => router.push("/")}
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          Logout
        </Button>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatsCard 
            icon="👨‍🌾" 
            label="Total Farmers" 
            value="2,438" 
            color="green"
          />
          <StatsCard 
            icon="🛒" 
            label="Total Buyers" 
            value="18,214" 
            color="blue"
          />
          <StatsCard 
            icon="📦" 
            label="Orders Today" 
            value="1,247" 
            color="yellow"
          />
          <StatsCard 
            icon="💰" 
            label="GMV Today" 
            value="₹4.2L" 
            color="purple"
          />
        </div>

        {/* Farmers Table */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-900 text-xl mb-6">👨‍🌾 Registered Farmers</h3>
          <div className="space-y-4">
            {FARMERS.map(farmer => (
              <div key={farmer.id} className="flex gap-4 items-center py-4 border-b border-gray-100 last:border-0">
                <div className="text-3xl">{farmer.avatar}</div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{farmer.name}</div>
                  <div className="text-gray-600 text-sm">
                    {farmer.location} • {farmer.type} • Joined {farmer.joinDate}
                  </div>
                </div>
                <div className="text-green-700 font-bold text-sm">₹{farmer.earnings.toLocaleString()}</div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-xl text-xs font-bold border border-green-200">
                  Active
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
