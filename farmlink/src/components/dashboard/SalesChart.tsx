"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";
import { Card, CardHeader, CardContent } from "@/components/ui";

interface SalesChartProps {
  data: Array<{
    month: string;
    sales: number;
    orders?: number;
  }>;
  type?: "area" | "bar";
  title?: string;
}

export function SalesChart({ data, type = "area", title = "📈 Monthly Sales" }: SalesChartProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-bold text-gray-900">{title}</h3>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          {type === "area" ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: "12px", 
                  border: "1px solid #d1fae5",
                  backgroundColor: "white"
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#16a34a" 
                strokeWidth={3} 
                fill="url(#salesGrad)" 
              />
            </AreaChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: "12px",
                  backgroundColor: "white"
                }} 
              />
              <Bar dataKey="sales" fill="#16a34a" radius={[8, 8, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
