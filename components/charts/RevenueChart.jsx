// components/charts/RevenueChart.jsx
"use client";
import { useState, useEffect } from "react";

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
    <div className="revenue-chart">
      <div className="chart-grid">
        {/* Y-axis labels */}
        <div className="y-axis">
          {[4, 3, 2, 1, 0].map(i => (
            <div key={i} className="y-label">
              {formatCurrency((maxValue * i) / 4)}
            </div>
          ))}
        </div>

        {/* Chart bars */}
        <div className="chart-bars">
          {data.map((item, index) => {
            const heightPercent = (item.revenue / maxValue) * 100;
            const isHovered = hoveredBar === index;

            return (
              <div
                key={index}
                className="bar-container"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {isHovered && (
                  <div className="bar-tooltip">
                    <p className="tooltip-title">{months[item.month - 1]}/{item.year}</p>
                    <p className="tooltip-value">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(item.revenue)}
                    </p>
                  </div>
                )}
                <div className="bar-wrapper">
                  <div
                    className={`bar ${isHovered ? 'bar-hovered' : ''}`}
                    style={{ height: `${heightPercent}%` }}
                  >
                    <div className="bar-fill"></div>
                  </div>
                </div>
                <div className="x-label">{months[item.month - 1]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart Legend */}
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-dot"></span>
          <span className="legend-text">Doanh thu</span>
        </div>
      </div>
    </div>
  );
}