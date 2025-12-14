// components/dashboard/StatsCard.jsx
"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils.js";

export default function StatsCard({ icon: Icon, title, value, change, trend = "up", color = "primary" }) {
  const colorVariants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-green-500/10 text-green-600 border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    info: "bg-blue-500/10 text-blue-600 border-blue-500/20"
  };

  return (
    <div className={cn(
      "rounded-lg border p-6 bg-card transition-all hover:shadow-md",
      colorVariants[color] || colorVariants.primary
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
          <h3 className="text-2xl font-bold text-foreground mb-2">{value}</h3>
          {change && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend === 'up' ? "text-green-600" : "text-red-600"
            )}>
              {trend === 'up' ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{change}</span>
              <span className="text-xs opacity-70 ml-1">so với tháng trước</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn(
            "flex items-center justify-center w-12 h-12 rounded-lg",
            color === 'primary' && "bg-primary/20",
            color === 'success' && "bg-green-500/20",
            color === 'warning' && "bg-yellow-500/20",
            color === 'info' && "bg-blue-500/20"
          )}>
            <Icon className={cn(
              "h-6 w-6",
              color === 'primary' && "text-primary",
              color === 'success' && "text-green-600",
              color === 'warning' && "text-yellow-600",
              color === 'info' && "text-blue-600"
            )} />
          </div>
        )}
      </div>
    </div>
  );
}
