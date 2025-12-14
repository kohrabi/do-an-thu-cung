"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reusable Button Component
 * Refactored to use Tailwind CSS + Lucide React icons
 * Compatible with shadcn/ui Button pattern
 * 
 * @param {string} variant - Button variant: 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link'
 * @param {boolean} loading - Show loading spinner
 * @param {React.ComponentType} icon - Lucide icon component
 * @param {React.ReactNode} children - Button content
 */
export default function Button({ 
  children, 
  variant = 'default',
  size = 'default',
  loading = false,
  icon: Icon,
  className,
  disabled,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline"
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  };

  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={cn(
        baseStyles,
        variants[variant] || variants.default,
        sizes[size] || sizes.default,
        className
      )}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Đang xử lý...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4" />}
          {children}
        </>
      )}
    </button>
  );
}
