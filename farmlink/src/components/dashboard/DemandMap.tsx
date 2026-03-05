"use client";

import { Card, CardHeader, CardContent } from "@/components/ui";

export function DemandMap() {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-bold text-gray-900 text-xl">🗺️ Demand Heatmap</h3>
        <p className="text-gray-600 text-sm">
          High-demand areas near you — updated daily by AI
        </p>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl h-96 flex items-center justify-center border-2 border-dashed border-green-300 relative overflow-hidden">
          {/* Background circles for visual effect */}
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-green-200 opacity-20"
              style={{
                width: `${[300, 200, 150, 400, 250, 180][i]}px`,
                height: `${[300, 200, 150, 400, 250, 180][i]}px`,
                top: `${[10, 60, 30, 70, 20, 80][i]}%`,
                left: `${[5, 80, 15, 70, 40, 55][i]}%`,
                transform: "translate(-50%, -50%)"
              }}
            />
          ))}
          
          <div className="text-center z-10">
            <div className="text-6xl mb-4">🗺️</div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">AI Demand Map</h4>
            <p className="text-gray-600 max-w-md">
              Real-time demand visualization showing hotspots for different products across your region
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                🔥 High Demand
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                ⚡ Medium Demand  
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ✅ Low Demand
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
