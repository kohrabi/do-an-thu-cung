// app/(dashboard)/care-staff/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";

export default function CareStaffDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Mock data
    setTasks([
      {
        id: 1,
        time: "09:00 AM",
        pet: "Lucky",
        owner: "Nguyễn Văn A",
        service: "Tắm & Spa",
        status: "pending",
        priority: "normal"
      },
      {
        id: 2,
        time: "10:30 AM",
        pet: "Miu",
        owner: "Trần Thị B",
        service: "Cắt tỉa lông",
        status: "in_progress",
        priority: "normal"
      },
      {
        id: 3,
        time: "02:00 PM",
        pet: "Coco",
        owner: "Lê Văn C",
        service: "Lưu trú",
        status: "pending",
        priority: "high"
      }
    ]);
  }, []);

  const handleStartTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: 'in_progress' } : task
    ));
  };

  const handleCompleteTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: 'completed' } : task
    ));
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader 
        title="Công việc hôm nay" 
        subtitle="Quản lý và thực hiện các dịch vụ chăm sóc"
      />

      {/* Stats */}
      <div className="stats-grid">
        <StatsCard
          icon="📋"
          title="Tổng công việc"
          value={tasks.length}
          color="primary"
        />
        <StatsCard
          icon="⏳"
          title="Đang thực hiện"
          value={tasks.filter(t => t.status === 'in_progress').length}
          color="warning"
        />
        <StatsCard
          icon="✅"
          title="Đã hoàn thành"
          value={tasks.filter(t => t.status === 'completed').length}
          color="success"
        />
      </div>

      {/* Task List */}
      <div className="section-card">
        <h3 className="section-title">📋 Danh sách công việc</h3>
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className={`task-item task-${task.status}`}>
              <div className="task-time">
                <div className="time-icon">🕐</div>
                <div className="time-value">{task.time}</div>
              </div>

              <div className="task-details">
                <div className="task-header">
                  <h4 className="task-pet">🐾 {task.pet}</h4>
                  {task.priority === 'high' && (
                    <span className="priority-badge">⚠️ Ưu tiên</span>
                  )}
                </div>
                <p className="task-owner">Chủ nuôi: {task.owner}</p>
                <p className="task-service">
                  <span className="service-icon">✨</span>
                  {task.service}
                </p>
              </div>

              <div className="task-actions">
                {task.status === 'pending' && (
                  <button 
                    onClick={() => handleStartTask(task.id)}
                    className="btn-task-start"
                  >
                    ▶️ Bắt đầu
                  </button>
                )}
                {task.status === 'in_progress' && (
                  <button 
                    onClick={() => handleCompleteTask(task.id)}
                    className="btn-task-complete"
                  >
                    ✅ Hoàn thành
                  </button>
                )}
                {task.status === 'completed' && (
                  <span className="task-status-completed">
                    ✓ Đã xong
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes Section */}
      <div className="section-card">
        <h3 className="section-title">📝 Ghi chú chăm sóc</h3>
        <textarea 
          className="notes-textarea"
          placeholder="Nhập ghi chú về quá trình chăm sóc thú cưng..."
          rows="4"
        />
        <button className="btn-primary mt-3">
          💾 Lưu ghi chú
        </button>
      </div>
    </div>
  );
}