// components/ui/Button.jsx
"use client";

/**
 * Reusable Button Component
 */
export default function Button({ 
  children, 
  variant = 'primary',
  loading = false,
  icon: Icon,
  ...props 
}) {
  const baseClass = 'btn';
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline'
  }[variant];

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`${baseClass} ${variantClass} ${props.className || ''}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Đang xử lý...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {Icon && <Icon size={18} />}
          {children}
        </span>
      )}
    </button>
  );
}