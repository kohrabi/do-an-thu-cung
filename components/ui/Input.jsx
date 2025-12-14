"use client";

import { cn } from "@/lib/utils.js";

/**
 * Reusable Input Component
 * Refactored to use Tailwind CSS + shadcn/ui pattern
 * 
 * @param {string} label - Input label
 * @param {string} error - Error message
 * @param {React.ComponentType} icon - Lucide icon component
 * @param {boolean} required - Required field indicator
 */
export default function Input({ 
  label, 
  error, 
  icon: Icon,
  className,
  ...props 
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {props.required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Icon className="h-4 w-4" />
          </div>
        )}
        
        <input
          {...props}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            Icon && "pl-10",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
        />
      </div>
      
      {error && (
        <p className="text-sm font-medium text-destructive flex items-center gap-1.5">
          <span className="text-xs">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
