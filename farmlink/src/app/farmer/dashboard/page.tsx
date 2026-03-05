"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { DemandMap } from "@/components/dashboard/DemandMap";
import { MONTHLY_SALES } from "@/data/sales";
import { PRODUCTS } from "@/data/products";
import { ORDERS } from "@/data/orders";
import { useRouter } from "next/navigation";

export default function FarmerDashboard() {
  const [tab, setTab] = useState("overview");
  const router = useRouter();

  const totalEarnings = MONTHLY_SALES.reduce((a, b) => a + b.sales, 0);
  const pendingOrders = ORDERS.filter(o => o.status === "pending").length;
  const myProducts = PRODUCTS.filter(p => p.farmerId === 1);

  const tabs = [
    { id: "overview", icon: "📊", label: "Overview" },
    { id: "add", icon: "➕", label: "Add Produce" },
    { id: "orders", icon: "📦", label: "Orders" },
    { id: "analytics", icon: "📈", label: "Analytics" },
    { id: "heatmap", icon: "🗺️", label: "Demand Map" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 px-6 py-5 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌾</span>
          <div>
            <div className="text-white font-bold text-xl">FarmLink</div>
            <div className="text-green-200 text-xs">Farmer Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-white text-right">
            <div className="font-bold">👨‍🌾 Ravi Kumar</div>
            <div className="text-green-200 text-xs">Mysuru, Karnataka</div>
          </div>
          <Button 
            variant="outline"
            onClick={() => router.push("/")}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="bg-white border-b border-gray-200 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                tab === t.id
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* OVERVIEW */}
        {tab === "overview" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
              <StatsCard 
                icon="💰" 
                label="Total Earnings" 
                value={`₹${totalEarnings.toLocaleString()}`} 
                color="green"
              />
              <StatsCard 
                icon="📦" 
                label="Active Listings" 
                value={myProducts.length} 
                color="blue"
              />
              <StatsCard 
                icon="⏳" 
                label="Pending Orders" 
                value={pendingOrders} 
                color="yellow"
              />
              <StatsCard 
                icon="⭐" 
                label="Avg. Rating" 
                value="4.7" 
                color="purple"
              />
            </div>

            <div className="mb-6">
              <SalesChart data={MONTHLY_SALES} type="area" />
            </div>

            {/* AI Forecast */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="font-bold text-green-900 mb-3 text-lg">🤖 AI Market Insights</div>
              {[
                "🍅 Tomato demand expected to increase by 18% next week — consider stocking up",
                "🥬 Green vegetables have stable demand — good time to add new listings",
                "⚠️ 3 products may expire soon — auto-discount activated for nearby restaurants",
              ].map((tip, i) => (
                <div key={i} className="bg-white rounded-xl p-4 mb-2 text-sm text-gray-700 flex gap-3 items-center">
                  {tip}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD PRODUCE */}
        {tab === "add" && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h3 className="font-bold text-green-900 text-xl mb-6">➕ Add New Produce</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Fresh Tomatoes"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg/pieces)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 100"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per kg/unit (₹)
                    <button className="ml-2 text-xs px-2 py-1 bg-green-100 border border-green-200 rounded-lg text-green-700">
                      🤖 AI Suggest
                    </button>
                  </label>
                  <input 
                    type="number" 
                    placeholder="e.g. 45"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    {["kg","bundle","piece","dozen","liter"].map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Emoji</label>
                  <div className="flex gap-2 flex-wrap">
                    {["🍅","🥬","🥭","🌾","🧅","🌶️","🥥","🥔","🍆","🥦","🍋","🥕"].map(e => (
                      <button key={e} className="text-2xl p-2 border-2 border-gray-200 rounded-lg hover:border-green-500">
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-green-600 rounded focus:ring-green-500" />
                  <span className="text-sm font-medium text-gray-700">🌿 Organic Produce</span>
                </label>
              </div>
            </div>
            
            <Button className="w-full mt-6 py-3" size="lg">
              Add Product Listing
            </Button>
          </div>
        )}

        {/* ORDERS */}
        {tab === "orders" && (
          <div>
            <h3 className="font-bold text-green-900 text-2xl mb-6">📦 Manage Orders</h3>
            <div className="space-y-4">
              {ORDERS.map(order => (
                <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 border-l-4 border-l-yellow-500">
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                      <div className="flex gap-3 items-center mb-2">
                        <span className="font-bold text-green-900 text-lg">#{order.id}</span>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200">
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-gray-700 text-base mb-1">
                        <b>{order.buyer}</b> • {order.product}
                      </div>
                      <div className="text-gray-600 text-sm mb-2">
                        Qty: {order.quantity} • ₹{order.total} • {order.date}
                      </div>
                      <div className="text-gray-500 text-xs">📍 {order.address}</div>
                    </div>
                    {order.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          ✅ Accept
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                          ❌ Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYTICS */}
        {tab === "analytics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SalesChart data={MONTHLY_SALES} type="bar" title="📊 Monthly Income" />
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-green-900 mb-4">🏆 Performance</h3>
              {[
                { label: "Best Selling Product", value: "Organic Tomatoes 🍅", icon: "🥇" },
                { label: "Profit Growth", value: "+12.5% this month", icon: "📈" },
                { label: "Avg Order Value", value: "₹591", icon: "💰" },
                { label: "Repeat Customers", value: "68%", icon: "❤️" },
                { label: "On-Time Delivery", value: "94%", icon: "🚀" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <div className="flex gap-2.5 items-center text-gray-700 text-sm">
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </div>
                  <div className="font-bold text-green-700 text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DEMAND HEATMAP */}
        {tab === "heatmap" && (
          <DemandMap />
        )}
      </div>
    </div>
  );
}
