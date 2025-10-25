// components/dashboard/RecentActivity.jsx
"use client";

export default function RecentActivity({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="recent-activity">
        <h3 className="section-title">📋 Hoạt động gần đây</h3>
        <p className="text-gray-500">Chưa có hoạt động nào</p>
      </div>
    );
  }

  return (
    <div className="recent-activity">
      <h3 className="section-title">📋 Hoạt động gần đây</h3>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-icon">{activity.icon}</div>
            <div className="activity-content">
              <p className="activity-text">{activity.text}</p>
              <span className="activity-time">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}