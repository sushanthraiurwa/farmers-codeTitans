"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [role, setRole] = useState<"farmer" | "buyer">("farmer");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Set role from URL params if present
  useState(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "farmer" || roleParam === "buyer") {
      setRole(roleParam);
    }
  });

  const updateForm = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.email || !form.password) {
      setError("Please fill all required fields");
      return;
    }
    
    // Simulate authentication
    console.log("Signing in:", { ...form, role });
    router.push(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-green-100">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌾</div>
          <h1 className="text-2xl font-bold text-green-900 mb-2">FarmLink</h1>
          <p className="text-gray-600 text-sm">Welcome back! Sign in to continue</p>
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
          Sign In →
        </Button>

        <button className="block mx-auto mt-4 bg-none border-none text-green-600 text-sm cursor-pointer underline font-semibold">
          Forgot password?
        </button>

        <div className="text-center mt-6 text-gray-500 text-sm">
          Don't have an account?{" "}
          <button 
            onClick={() => router.push("/auth/signup")}
            className="bg-none border-none text-green-600 font-bold cursor-pointer text-sm"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
