"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CartItemComponent } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { FilterSidebar } from "@/components/layout/FilterSidebar";
import { Chatbot } from "@/components/chatbot/Chatbot";
import { useCart } from "@/hooks/useCart";
import { useFilters } from "@/hooks/useFilters";
import { PRODUCTS } from "@/data/products";
import { useRouter } from "next/navigation";
import { ShoppingCart, Package, FileText, Calendar, Heart, Search, Filter } from "lucide-react";

export default function BuyerDashboard() {
  const [tab, setTab] = useState("browse");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [msg, setMsg] = useState("");
  
  const { items, total, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { filters, updateFilter, resetFilters, filteredProducts, filteredCount } = useFilters(PRODUCTS);
  
  const router = useRouter();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setMsg(`${product.image} ${product.name} added to cart!`);
    setTimeout(() => setMsg(""), 2000);
  };

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
  };

  const handleToggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const tabs = [
    { id: "browse", icon: <Search className="w-4 h-4" />, label: "Browse" },
    { id: "cart", icon: <ShoppingCart className="w-4 h-4" />, label: `Cart${items.length > 0 ? ` (${items.length})` : ""}` },
    { id: "orders", icon: <Package className="w-4 h-4" />, label: "My Orders" },
    { id: "subscriptions", icon: <Calendar className="w-4 h-4" />, label: "Subscriptions" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 px-7 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2.5">
          <span className="text-3xl">🌾</span>
          <div>
            <div className="text-white font-black text-xl tracking-tight">FarmLink</div>
            <div className="text-green-200 text-xs tracking-wide">Farm to Table</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          {msg && (
            <div className="bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-semibold border border-white/30 backdrop-blur-sm">
              {msg}
            </div>
          )}

          {/* Cart mini badge */}
          <button 
            onClick={() => setTab("cart")}
            className="relative bg-white/20 border border-white/30 rounded-full w-10 h-10 flex items-center justify-center text-lg hover:bg-white/30"
          >
            <ShoppingCart className="w-5 h-5" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white rounded-full w-4 h-4 text-xs font-bold flex items-center justify-center">
                {items.reduce((a, i) => a + i.qty, 0)}
              </span>
            )}
          </button>

          {/* Profile Avatar */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-200 to-green-300 border-2 border-white/60 flex items-center justify-center text-xl font-bold text-green-900 hover:shadow-lg transition-shadow cursor-pointer">
            A
          </div>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="bg-white border-b border-gray-200 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap flex items-center gap-2 ${
                tab === t.id
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* BROWSE */}
        {tab === "browse" && !selectedProduct && (
          <div>
            {/* AI Forecast Banner */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-5 mb-6 border border-green-200 flex gap-4 items-center flex-wrap">
              <span className="text-2xl">🤖</span>
              <div>
                <b className="text-green-900">AI Forecast:</b>
                <span className="text-gray-700 text-sm ml-2">
                  🍅 Tomato demand up 18% next week • 🥭 Mango season arriving • 🥬 Best time to buy greens
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters */}
              <div className="lg:col-span-1">
                <FilterSidebar
                  searchTerm=""
                  onSearchChange={() => {}}
                  filters={filters}
                  onFilterChange={(key, value) => updateFilter(key as keyof typeof filters, value)}
                  onResetFilters={resetFilters}
                  filteredCount={filteredCount}
                />
              </div>

              {/* Product Grid */}
              <div className="lg:col-span-3">
                <div className="text-gray-600 text-sm mb-4">{filteredCount} products found</div>
                <ProductGrid 
                  products={filteredProducts}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                />
              </div>
            </div>
          </div>
        )}

        {/* CART */}
        {tab === "cart" && (
          <div>
            {items.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-7xl mb-4">🛒</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Browse fresh produce from local farmers</p>
                <Button onClick={() => setTab("browse")}>
                  Browse Products
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h3 className="font-bold text-gray-900 text-xl mb-5">
                    <ShoppingCart className="w-5 h-5 inline mr-2" />
                    Your Cart ({items.reduce((a, i) => a + i.qty, 0)} items)
                  </h3>
                  {items.map(item => (
                    <CartItemComponent
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>

                <div>
                  <CartSummary
                    items={items}
                    total={total}
                    onCheckout={() => setTab("orders")}
                    onClearCart={clearCart}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* MY ORDERS */}
        {tab === "orders" && (
          <div>
            <h3 className="font-bold text-gray-900 text-2xl mb-6">
              <Package className="w-6 h-6 inline mr-2" />
              My Orders
            </h3>
            <div className="text-center py-16 text-gray-500">
              <div className="text-6xl mb-4">📦</div>
              <h4 className="text-lg font-semibold text-gray-600 mb-2">No orders yet</h4>
              <p className="text-sm">Your past orders will appear here</p>
            </div>
          </div>
        )}

        {/* SUBSCRIPTIONS */}
        {tab === "subscriptions" && (
          <div>
            <h3 className="font-bold text-gray-900 text-2xl mb-2">
              <Calendar className="w-6 h-6 inline mr-2" />
              Subscription Plans
            </h3>
            <p className="text-gray-600 mb-7 text-sm">Get fresh produce delivered to your doorstep regularly</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { id: "veggie", icon: "🥬", name: "Weekly Veggie Box", desc: "Seasonal mix of 5-6 vegetables, 2-3 kg each", price: 599, freq: "/ week", badge: null },
                { id: "fruit", icon: "🍎", name: "Monthly Fruit Box", desc: "Premium seasonal fruits — 4-5 varieties, 1-2 kg each", price: 1299, freq: "/ month", badge: "Most Popular" },
                { id: "custom", icon: "⚙️", name: "Custom Box", desc: "Build your own box — choose exactly what you need", price: 499, freq: "/ delivery", badge: "New" },
              ].map(plan => (
                <div key={plan.id} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow border-2 border-green-200 relative">
                  {plan.badge && (
                    <div className="absolute -top-3 left-6 bg-purple-600 text-white px-3 py-1 rounded-xl text-xs font-bold">
                      {plan.badge}
                    </div>
                  )}
                  <div className="text-5xl mb-4">{plan.icon}</div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{plan.name}</h4>
                  <p className="text-gray-600 text-sm mb-5 leading-6">{plan.desc}</p>
                  <div className="text-2xl font-bold text-green-700 mb-4">
                    ₹{plan.price}<span className="text-sm font-normal text-gray-500">{plan.freq}</span>
                  </div>
                  <Button className="w-full">
                    Subscribe Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Chatbot userType="buyer" />
    </div>
  );
}
