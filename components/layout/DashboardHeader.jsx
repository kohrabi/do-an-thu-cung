"use client";

import { useState, useEffect } from "react";

export default function DashboardHeader({ title, subtitle }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  return (
    <div className="dashboard-header">
      <div>
        <div className="greeting-text">{getGreeting()} 👋</div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      <div className="header-actions">
        <div className="time-display">
          <div className="time-icon">🕐</div>
          <div>
            <div className="time-value">
              {currentTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="date-value">
              {currentTime.toLocaleDateString('vi-VN')}
            </div>
          </div>
        </div>
        <button className="notification-btn">
          <span className="relative">
            🔔
            <span className="notification-badge">3</span>
          </span>
        </button>
      </div>
    </div>
  );
}