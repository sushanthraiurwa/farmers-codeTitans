export interface Product {
  id: number;
  name: string;
  farmer: string;
  farmerId: number;
  price: number;
  unit: string;
  image: string;
  organic: boolean;
  distance: number;
  rating: number;
  reviews: number;
  stock: number;
  category: string;
  description: string;
  harvestDate: string;
  demand: "Low" | "Medium" | "High" | "Very High";
}

export const PRODUCTS: Product[] = [
  { id: 1, name: "Organic Tomatoes", farmer: "Ravi Kumar", farmerId: 1, price: 45, unit: "kg", image: "🍅", organic: true, distance: 12, rating: 4.8, reviews: 124, stock: 200, category: "Vegetables", description: "Fresh sun-ripened tomatoes from our organic farm in Mysuru.", harvestDate: "2026-03-01", demand: "High" },
  { id: 2, name: "Fresh Spinach", farmer: "Priya Devi", farmerId: 2, price: 30, unit: "bundle", image: "🥬", organic: true, distance: 8, rating: 4.6, reviews: 89, stock: 150, category: "Greens", description: "Tender spinach leaves, pesticide-free.", harvestDate: "2026-03-03", demand: "Medium" },
  { id: 3, name: "Alphonso Mangoes", farmer: "Suresh Patil", farmerId: 3, price: 180, unit: "dozen", image: "🥭", organic: false, distance: 25, rating: 4.9, reviews: 210, stock: 80, category: "Fruits", description: "Premium Alphonso mangoes, naturally ripened.", harvestDate: "2026-03-02", demand: "Very High" },
  { id: 4, name: "Basmati Rice", farmer: "Ravi Kumar", farmerId: 1, price: 95, unit: "kg", image: "🌾", organic: false, distance: 12, rating: 4.5, reviews: 67, stock: 500, category: "Grains", description: "Aged basmati rice, long grain aromatic variety.", harvestDate: "2026-01-15", demand: "Medium" },
  { id: 5, name: "Onions", farmer: "Kavya Hegde", farmerId: 4, price: 25, unit: "kg", image: "🧅", organic: false, distance: 5, rating: 4.3, reviews: 156, stock: 300, category: "Vegetables", description: "Fresh red onions, strong flavor.", harvestDate: "2026-02-28", demand: "High" },
  { id: 6, name: "Green Chilies", farmer: "Priya Devi", farmerId: 2, price: 60, unit: "kg", image: "🌶️", organic: true, distance: 8, rating: 4.7, reviews: 43, stock: 60, category: "Spices", description: "Spicy green chilies, freshly harvested.", harvestDate: "2026-03-04", demand: "Medium" },
  { id: 7, name: "Coconuts", farmer: "Suresh Patil", farmerId: 3, price: 35, unit: "piece", image: "🥥", organic: true, distance: 25, rating: 4.6, reviews: 88, stock: 120, category: "Fruits", description: "Fresh tender coconuts from coastal farms.", harvestDate: "2026-03-01", demand: "High" },
  { id: 8, name: "Potatoes", farmer: "Kavya Hegde", farmerId: 4, price: 20, unit: "kg", image: "🥔", organic: false, distance: 5, rating: 4.2, reviews: 201, stock: 400, category: "Vegetables", description: "Creamy white potatoes, ideal for cooking.", harvestDate: "2026-02-20", demand: "High" },
];
