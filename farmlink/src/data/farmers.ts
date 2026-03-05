export interface Farmer {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  products: number;
  earnings: number;
  type: "Organic" | "Regular";
  joinDate: string;
  phone: string;
  email: string;
}

export const FARMERS: Farmer[] = [
  { id: 1, name: "Ravi Kumar", location: "Mysuru, Karnataka", avatar: "👨‍🌾", rating: 4.7, products: 12, earnings: 48500, type: "Organic", joinDate: "2024-01-15", phone: "+91 9876543210", email: "ravi@farmlink.in" },
  { id: 2, name: "Priya Devi", location: "Mandya, Karnataka", avatar: "👩‍🌾", rating: 4.6, products: 8, earnings: 32000, type: "Organic", joinDate: "2024-03-20", phone: "+91 9876543211", email: "priya@farmlink.in" },
  { id: 3, name: "Suresh Patil", location: "Belgaum, Karnataka", avatar: "🧑‍🌾", rating: 4.8, products: 15, earnings: 67000, type: "Regular", joinDate: "2023-11-10", phone: "+91 9876543212", email: "suresh@farmlink.in" },
  { id: 4, name: "Kavya Hegde", location: "Hassan, Karnataka", avatar: "👩‍🌾", rating: 4.4, products: 6, earnings: 21500, type: "Regular", joinDate: "2024-06-05", phone: "+91 9876543213", email: "kavya@farmlink.in" },
];
