export interface MonthlySales {
  month: string;
  sales: number;
  orders: number;
}

export const MONTHLY_SALES: MonthlySales[] = [
  { month: "Oct", sales: 28000, orders: 45 }, 
  { month: "Nov", sales: 32000, orders: 52 },
  { month: "Dec", sales: 41000, orders: 68 }, 
  { month: "Jan", sales: 38000, orders: 61 },
  { month: "Feb", sales: 45000, orders: 74 }, 
  { month: "Mar", sales: 48500, orders: 82 },
];
