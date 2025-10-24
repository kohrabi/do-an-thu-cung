// components/ui/Input.jsx
"use client";

/**
 * Reusable Input Component
 */
export default function Input({ 
  label, 
  error, 
  icon: Icon,
  ...props 
}) {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        
        <input
          {...props}
          className={`input-field ${Icon ? 'pl-10' : ''} ${error ? 'input-error' : ''}`}
        />
      </div>
      
      {error && (
        <p className="error-message">{error}</p>
      )}
    </div>
  );
}