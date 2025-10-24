// components/dashboard/QuickActions.jsx
"use client";

export default function QuickActions({ actions }) {
  return (
    <div className="quick-actions">
      <h3 className="section-title">⚡ Thao tác nhanh</h3>
      <div className="quick-actions-grid">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="quick-action-btn"
          >
            <span className="quick-action-icon">{action.icon}</span>
            <span className="quick-action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}