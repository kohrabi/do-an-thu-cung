"use client";

import { Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function QuickActions({ actions }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Thao tác nhanh
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={index}
                onClick={action.onClick}
                variant="outline"
                className={cn(
                  "flex flex-col items-center justify-center gap-2 h-auto py-4 px-3",
                  "hover:bg-accent hover:text-accent-foreground transition-colors"
                )}
              >
                {typeof IconComponent === 'string' ? (
                  <span className="text-2xl">{IconComponent}</span>
                ) : (
                  <IconComponent className="h-6 w-6" />
                )}
                <span className="text-xs font-medium text-center leading-tight">
                  {action.label}
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
