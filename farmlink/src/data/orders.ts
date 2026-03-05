export interface Order {
  id: string;
  buyer: string;
  product: string;
  quantity: number;
  total: number;
  status: "pending" | "accepted" | "delivered" | "rejected";
  date: string;
  address: string;
  phone: string;
}

export const ORDERS: Order[] = [
  { id: "FL001", buyer: "Ananya Singh", product: "Organic Tomatoes", quantity: 5, total: 225, status: "pending", date: "2026-03-04", address: "42 MG Road, Bangalore", phone: "+91 9988776655" },
  { id: "FL002", buyer: "Rohit Sharma", product: "Fresh Spinach", quantity: 3, total: 90, status: "accepted", date: "2026-03-03", address: "15 Indiranagar, Bangalore", phone: "+91 9988776644" },
  { id: "FL003", buyer: "Meera Nair", product: "Basmati Rice", quantity: 10, total: 950, status: "delivered", date: "2026-03-02", address: "8 Koramangala, Bangalore", phone: "+91 9988776633" },
  { id: "FL004", buyer: "Vikram Joshi", product: "Organic Tomatoes", quantity: 2, total: 90, status: "pending", date: "2026-03-04", address: "77 Whitefield, Bangalore", phone: "+91 9988776622" },
];
