"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function SignUpPage() {
  const [role, setRole] = useState<"farmer" | "buyer">("farmer");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    farmLocation: "",
    farmType: "Organic" as "Organic" | "Regular",
    lang: "en" as "en" | "hi" | "kn",
  });
  const [error, setError] = useState("");
  
  const router = useRouter();

  const updateForm = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
  if (!form.email || !form.password || !form.name) {
    setError("Please fill all required fields");
    return;
  }

  try {
    const res = await api.signup({
      ...form,
      role,
    });

    if (res.success) {
      router.push("/auth/signin");
    } else {
      setError(res.message);
    }
  } catch (err) {
    setError("Registration failed");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-green-100">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌾</div>
          <h1 className="text-2xl font-bold text-green-900 mb-2">FarmLink</h1>
          <p className="text-gray-600 text-sm">Create your account to get started</p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-green-50 rounded-xl p-1 mb-6">
          {[
            ["farmer", "👨‍🌾 Farmer"],
            ["buyer", "🛒 Buyer"]
          ].map(([r, label]) => (
            <button
              key={r}
              onClick={() => setRole(r as "farmer" | "buyer")}
              className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                role === r
                  ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-sm"
                  : "bg-transparent text-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => updateForm("name", e.target.value)}
            label="Full Name *"
          />
          
          <Input
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => updateForm("email", e.target.value)}
            label="Email *"
          />
          
          <Input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => updateForm("password", e.target.value)}
            label="Password *"
          />
          
          <Input
            placeholder="+91 9876543210"
            value={form.phone}
            onChange={(e) => updateForm("phone", e.target.value)}
            label="Phone Number"
          />

          {role === "farmer" ? (
            <>
              <Input
                placeholder="Village, District, State"
                value={form.farmLocation}
                onChange={(e) => updateForm("farmLocation", e.target.value)}
                label="Farm Location"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Farming
                </label>
                <select
                  value={form.farmType}
                  onChange={(e) => updateForm("farmType", e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Organic">🌿 Organic</option>
                  <option value="Regular">🌾 Regular</option>
                </select>
              </div>
            </>
          ) : (
            <Input
              placeholder="Full delivery address"
              value={form.address}
              onChange={(e) => updateForm("address", e.target.value)}
              label="Delivery Address"
            />
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language Preference
            </label>
            <select
              value={form.lang}
              onChange={(e) => updateForm("lang", e.target.value)}
              className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm mt-4">
            {error}
          </div>
        )}

        <Button 
          onClick={handleSubmit}
          className="w-full mt-6 py-3"
          size="lg"
        >
          Create Account →
        </Button>

        <div className="text-center mt-6 text-gray-500 text-sm">
          Already have an account?{" "}
          <button 
            onClick={() => router.push("/auth/signin")}
            className="bg-none border-none text-green-600 font-bold cursor-pointer text-sm"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
