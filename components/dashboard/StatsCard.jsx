// components/dashboard/StatsCard.jsx
"use client";

export default function StatsCard({ icon, title, value, change, trend = "up", color = "primary" }) {
  const colorClasses = {
    primary: "stats-card-primary",
    success: "stats-card-success",
    warning: "stats-card-warning",
    info: "stats-card-info"
  };

  return (
    <div className={`stats-card ${colorClasses[color]}`}>
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <p className="stats-title">{title}</p>
        <h3 className="stats-value">{value}</h3>
        {change && (
          <div className={`stats-change ${trend === 'up' ? 'stats-up' : 'stats-down'}`}>
            <span>{trend === 'up' ? '↑' : '↓'}</span>
            <span>{change}</span>
            <span className="text-xs opacity-70">so với tháng trước</span>
          </div>
        )}
      </div>
    </div>
  );
}