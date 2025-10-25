// app/(dashboard)/care-staff/tasks/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import ServiceNoteModal from "@/components/modals/ServiceNoteModal";

export default function CareStaffTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    setTasks([
      {
        id: 1,
        time: "09:00 AM",
        pet: "Lucky",
        petIcon: "🐕",
        owner: "Nguyễn Văn A",
        service: "Tắm & Spa",
        serviceIcon: "🛁",
        status: "pending",
        priority: "normal",
        notes: []
      },
      {
        id: 2,
        time: "10:30 AM",
        pet: "Miu",
        petIcon: "🐈",
        owner: "Trần Thị B",
        service: "Cắt tỉa lông",
        serviceIcon: "✂️",
        status: "in_progress",
        priority: "normal",
        notes: [
          {
            type: "pre",
            content: "Thú cưng hoạt bát, khỏe mạnh"
          }
        ]
      },
      {
        id: 3,
        time: "02:00 PM",
        pet: "Coco",
        petIcon: "🐩",
        owner: "Lê Văn C",
        service: "Lưu trú 3 ngày",
        serviceIcon: "🏠",
        status: "pending",
        priority: "high",
        notes: []
      },
      {
        id: 4,
        time: "03:30 PM",
        pet: "Max",
        petIcon: "🐕",
        owner: "Phạm Thị D",
        service: "Spa massage",
        serviceIcon: "💆",
        status: "pending",
        priority: "normal",
        notes: []
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleStartTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: 'in_progress' } : task
    ));
    showToast("▶️ Đã bắt đầu dịch vụ");
  };

  const handleCompleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task.notes || task.notes.length === 0) {
      showToast("⚠️ Vui lòng ghi chú trước khi hoàn thành", "warning");
      return;
    }
    
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: 'completed' } : task
    ));
    showToast("✅ Đã hoàn thành dịch vụ");
  };

  const handleOpenNoteModal = (task) => {
    setSelectedTask(task);
    setIsNoteModalOpen(true);
  };

  const handleSaveNote = (noteData) => {
    setTasks(tasks.map(task =>
      task.id === noteData.taskId
        ? {
            ...task,
            notes: [
              ...task.notes,
              {
                type: "complete",
                timestamp: new Date().toISOString(),
                ...noteData
              }
            ]
          }
        : task
    ));
    showToast("💾 Đã lưu ghi chú chăm sóc");
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Công việc hôm nay"
        subtitle="Quản lý và thực hiện các dịch vụ chăm sóc"
      />

      {/* Stats */}
      <div className="stats-grid">
        <div className="stats-card stats-card-primary">
          <div className="stats-icon">📋</div>
          <div className="stats-content">
            <p className="stats-title">Tổng công việc</p>
            <h3 className="stats-value">{tasks.length}</h3>
          </div>
        </div>

        <div className="stats-card stats-card-warning">
          <div className="stats-icon">⏳</div>
          <div className="stats-content">
            <p className="stats-title">Đang thực hiện</p>
            <h3 className="stats-value">{tasks.filter(t => t.status === 'in_progress').length}</h3>
          </div>
        </div>

        <div className="stats-card stats-card-success">
          <div className="stats-icon">✅</div>
          <div className="stats-content">
            <p className="stats-title">Đã hoàn thành</p>
            <h3 className="stats-value">{tasks.filter(t => t.status === 'completed').length}</h3>
          </div>
        </div>
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
                  <div className="task-pet-info">
                    <span className="task-pet-icon">{task.petIcon}</span>
                    <h4 className="task-pet">{task.pet}</h4>
                  </div>
                  {task.priority === 'high' && (
                    <span className="priority-badge">⚠️ Ưu tiên</span>
                  )}
                </div>
                <p className="task-owner">👤 Chủ nuôi: {task.owner}</p>
                <p className="task-service">
                  <span className="service-icon">{task.serviceIcon}</span>
                  {task.service}
                </p>

                {task.notes.length > 0 && (
                  <div className="task-notes-preview">
                    <span className="notes-icon">📝</span>
                    <span className="notes-count">{task.notes.length} ghi chú</span>
                  </div>
                )}
              </div>

              <div className="task-actions">
                {task.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStartTask(task.id)}
                      className="btn-task-start"
                    >
                      ▶️ Bắt đầu
                    </button>
                    <button
                      onClick={() => handleOpenNoteModal(task)}
                      className="btn-task-note"
                    >
                      📝
                    </button>
                  </>
                )}
                {task.status === 'in_progress' && (
                  <>
                    <button
                      onClick={() => handleOpenNoteModal(task)}
                      className="btn-task-note"
                    >
                      📝 Ghi chú
                    </button>
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      className="btn-task-complete"
                    >
                      ✅ Hoàn thành
                    </button>
                  </>
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

      {/* Service Note Modal */}
      <ServiceNoteModal
        isOpen={isNoteModalOpen}
        onClose={() => {
          setIsNoteModalOpen(false);
          setSelectedTask(null);
        }}
        onSuccess={handleSaveNote}
        task={selectedTask}
      />

      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}