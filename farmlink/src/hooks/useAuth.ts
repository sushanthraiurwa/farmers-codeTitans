"use client";

import { useState, useCallback } from "react";
import { User, AuthState } from "@/types/user";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback((userData: User) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUser(userData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  }, [user]);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateProfile,
  };
}
