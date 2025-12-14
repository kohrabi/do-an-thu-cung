"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

export default function RevenueChart({ data, period = "month" }) {
  const [hoveredBar, setHoveredBar] = useState(null);

  const maxValue = Math.max(...data.map(d => d.revenue));
  const months = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];

  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K`;
    }
    return amount.toString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Biểu đồ doanh thu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart Grid */}
          <div className="relative flex items-end gap-2 h-64 p-4 border-b border-l border-border">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-4 flex flex-col justify-between text-xs text-muted-foreground pr-2">
              {[4, 3, 2, 1, 0].map(i => (
                <div key={i} className="text-right">
                  {formatCurrency((maxValue * i) / 4)}
                </div>
              ))}
            </div>

            {/* Chart bars */}
            <div className="flex-1 flex items-end justify-around gap-1 ml-8">
              {data.map((item, index) => {
                const heightPercent = (item.revenue / maxValue) * 100;
                const isHovered = hoveredBar === index;

                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center gap-1 relative group"
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Tooltip */}
                    {isHovered && (
                      <div className="absolute bottom-full mb-2 px-3 py-2 bg-popover border border-border rounded-md shadow-lg z-10 min-w-[120px]">
                        <p className="text-xs font-semibold text-foreground mb-1">
                          {months[item.month - 1]}/{item.year}
                        </p>
                        <p className="text-sm font-bold text-primary">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(item.revenue)}
                        </p>
                      </div>
                    )}

                    {/* Bar */}
                    <div className="w-full flex items-end justify-center h-full">
                      <div
                        className={cn(
                          "w-full rounded-t transition-all duration-300 cursor-pointer",
                          "bg-gradient-to-t from-primary to-primary/60",
                          isHovered && "opacity-90 shadow-lg"
                        )}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>

                    {/* X-axis label */}
                    <div className="text-xs text-muted-foreground font-medium">
                      {months[item.month - 1]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Doanh thu</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
