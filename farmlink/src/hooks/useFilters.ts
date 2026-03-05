"use client";

import { useState, useCallback } from "react";
import { Product } from "@/types";

export interface FilterState {
  organic: boolean;
  maxPrice: number;
  maxDistance: number;
  minRating: number;
  searchTerm: string;
}

export function useFilters(products: Product[]) {
  const [filters, setFilters] = useState<FilterState>({
    organic: false,
    maxPrice: 200,
    maxDistance: 50,
    minRating: 0,
    searchTerm: "",
  });

  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      organic: false,
      maxPrice: 200,
      maxDistance: 50,
      minRating: 0,
      searchTerm: "",
    });
  }, []);

  const filteredProducts = products.filter(product =>
    (!filters.organic || product.organic) &&
    product.price <= filters.maxPrice &&
    product.distance <= filters.maxDistance &&
    product.rating >= filters.minRating &&
    (filters.searchTerm === "" || 
     product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
     product.farmer.toLowerCase().includes(filters.searchTerm.toLowerCase()))
  );

  return {
    filters,
    updateFilter,
    resetFilters,
    filteredProducts,
    filteredCount: filteredProducts.length,
  };
}
