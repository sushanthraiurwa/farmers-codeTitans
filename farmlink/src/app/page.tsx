"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [lang, setLang] = useState("en");
  const router = useRouter();

  const labels = {
    en: { 
      hero: "Connecting Farmers Directly to Your Table", 
      sub: "Fresh produce. Fair prices. Zero middlemen.", 
      farmer: "Login as Farmer", 
      buyer: "Login as Buyer", 
      signup: "New here? Create an account" 
    },
    hi: { 
      hero: "किसानों को सीधे आपकी थाली से जोड़ना", 
      sub: "ताजा उपज। उचित मूल्य। कोई बिचौलिया नहीं।", 
      farmer: "किसान के रूप में लॉगिन", 
      buyer: "खरीदार के रूप में लॉगिन", 
      signup: "नए हैं? खाता बनाएं" 
    },
    kn: { 
      hero: "ರೈತರನ್ನು ನೇರವಾಗಿ ನಿಮ್ಮ ಊಟದ ಮೇಜಿಗೆ ಸಂಪರ್ಕಿಸುವುದು", 
      sub: "ತಾಜಾ ಉತ್ಪನ್ನ. ನ್ಯಾಯ ಬೆಲೆ. ಮಧ್ಯವರ್ತಿ ಇಲ್ಲ.", 
      farmer: "ರೈತರಾಗಿ ಲಾಗಿನ್", 
      buyer: "ಖರೀದಿದಾರರಾಗಿ ಲಾಗಿನ್", 
      signup: "ಹೊಸಬರಾ? ಖಾತೆ ತೆರೆಯಿರಿ" 
    },
  };
  const t = labels[lang as keyof typeof labels];

  const stats = [
    { icon: "👨‍🌾", value: "2,400+", label: "Farmers" },
    { icon: "🛒", value: "18,000+", label: "Happy Buyers" },
    { icon: "🌾", value: "450+", label: "Products" },
    { icon: "📦", value: "1.2L+", label: "Orders Delivered" },
  ];

  const features = [
    { icon: "💰", title: "Fair Pricing", desc: "AI-powered price suggestions ensure fair deals for both farmers and buyers." },
    { icon: "🌿", title: "Organic Certified", desc: "Verified organic produce with complete farm traceability." },
    { icon: "🚀", title: "Fast Delivery", desc: "Same-day and next-day delivery options in major cities." },
    { icon: "🔒", title: "Secure Payments", desc: "Escrow-based system protects both parties in every transaction." },
    { icon: "📊", title: "AI Demand Forecast", desc: "Farmers get real-time demand insights to reduce waste." },
    { icon: "🌍", title: "Multilingual", desc: "Full support for English, Hindi, and Kannada." },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm px-10 py-4 flex items-center justify-between border-b border-green-200/15 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🌾</span>
          <span className="text-xl font-bold text-green-800 tracking-tight">FarmLink</span>
        </div>
        <div className="flex gap-2">
          {["en","hi","kn"].map(l => (
            <button 
              key={l} 
              onClick={() => setLang(l)} 
              className={`px-3.5 py-1.5 border rounded-full cursor-pointer text-xs font-semibold transition-colors ${
                lang === l 
                  ? "bg-green-600 text-white border-green-600" 
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              {l === "en" ? "EN" : l === "hi" ? "हि" : "ಕ"}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 bg-gradient-to-br from-green-50 via-green-100 to-gray-50 relative overflow-hidden">
        {/* Background circles */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-green-600/10"
            style={{
              width: `${[300,200,150,400,250,180][i]}px`, 
              height: `${[300,200,150,400,250,180][i]}px`,
              top: `${[10,60,30,70,20,80][i]}%`, 
              left: `${[5,80,15,70,40,55][i]}%`,
              transform: "translate(-50%,-50%)"
            }} 
          />
        ))}
        <div className="relative z-10 max-w-4xl">
          <div className="inline-block bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-5 py-2 rounded-full text-sm font-bold tracking-wider mb-6 border border-green-300">
            🌱 FARM FRESH • FAIR TRADE • DIRECT
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-green-900 leading-tight mb-5 tracking-tight">
            {t.hero}
          </h1>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            {t.sub}
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-8">
            <Button 
              onClick={() => router.push("/auth/signin?role=farmer")}
              className="px-10 py-4 text-lg shadow-lg hover:shadow-xl"
              size="lg"
            >
              👨‍🌾 {t.farmer}
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push("/auth/signin?role=buyer")}
              className="px-10 py-4 text-lg"
              size="lg"
            >
              🛒 {t.buyer}
            </Button>
          </div>
          <button 
            onClick={() => router.push("/auth/signup")}
            className="bg-none border-none text-green-600 text-sm cursor-pointer underline font-semibold"
          >
            {t.signup}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-green-800 py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center text-white">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold tracking-tight mb-1">{stat.value}</div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-900 mb-3">Why FarmLink?</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Everything you need for a transparent farm-to-table experience
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-green-100">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <div className="font-bold text-green-800 text-lg mb-2">{feature.title}</div>
              <div className="text-gray-600 text-sm leading-6">{feature.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Forecast Banner */}
      <div className="bg-gradient-to-r from-green-900 to-green-800 py-16 px-6 text-center text-white">
        <div className="text-sm opacity-80 mb-2 tracking-wider">🔥 AI DEMAND FORECAST</div>
        <div className="text-2xl md:text-3xl font-bold max-w-3xl mx-auto mb-4">
          "Tomato demand expected to increase by 18% next week — Stock your farm now!"
        </div>
        <div className="flex gap-6 justify-center flex-wrap mt-5">
          {[
            ["🍅 Tomatoes","↑18%","#86efac"],
            ["🥭 Mangoes","↑35%","#fde68a"], 
            ["🥬 Greens","→ Stable","#93c5fd"]
          ].map(([product, change, color], i) => (
            <div key={i} className="bg-white/10 px-5 py-3 rounded-xl text-sm">
              {product} <span style={{ color }} className="font-bold">{change}</span>
            </div>
          ))}
        </div>
      </div>

      <footer className="py-8 text-center text-gray-500 text-sm">
        © 2026 FarmLink. Made with 💚 for farmers everywhere.
      </footer>
    </div>
  );
}
