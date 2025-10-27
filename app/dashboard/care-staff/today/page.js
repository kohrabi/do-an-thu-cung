"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import CareNoteModal from "@/components/modals/CareNoteModal";

export default function CareStaffTodayPage() {
  const [todayTasks, setTodayTasks] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  useEffect(() => {
    loadTodayTasks();
  }, []);

  const loadTodayTasks = () => {
    setTodayTasks([
      {
        id: "TASK001",
        time: "09:00 AM",
        type: "service",
        title: "Tắm & Spa cho Lucky",
        petName: "Lucky",
        petIcon: "🐕",
        petType: "Chó Golden Retriever",
        ownerName: "Nguyễn Văn A",
        ownerPhone: "0901234567",
        service: "Tắm & Spa",
        serviceIcon: "🛁",
        status: "completed",
        priority: "normal",
        notes: "Đã hoàn thành tốt"
      },
      {
        id: "TASK002",
        time: "10:30 AM",
        type: "service",
        title: "Cắt tỉa lông cho Miu",
        petName: "Miu",
        petIcon: "🐈",
        petType: "Mèo Ba Tư",
        ownerName: "Trần Thị B",
        ownerPhone: "0909876543",
        service: "Cắt tỉa lông",
        serviceIcon: "✂️",
        status: "in_progress",
        priority: "high",
        notes: ""
      },
      {
        id: "TASK003",
        time: "02:00 PM",
        type: "service",
        title: "Vệ sinh tai cho Coco",
        petName: "Coco",
        petIcon: "🐩",
        petType: "Chó Poodle",
        ownerName: "Lê Văn C",
        ownerPhone: "0912345678",
        service: "Vệ sinh tai",
        serviceIcon: "🧼",
        status: "pending",
        priority: "normal",
        notes: ""
      },
      {
        id: "TASK004",
        time: "03:30 PM",
        type: "service",
        title: "Chải lông cho Max",
        petName: "Max",
        petIcon: "🐕",
        petType: "Chó Husky",
        ownerName: "Phạm Thị D",
        ownerPhone: "0923456789",
        service: "Chải lông",
        serviceIcon: "🪮",
        status: "pending",
        priority: "high",
        notes: ""
      },
      {
        id: "TASK005",
        time: "04:30 PM",
        type: "reminder",
        title: "Kiểm tra dụng cụ",
        description: "Kiểm tra và vệ sinh dụng cụ chăm sóc",
        status: "pending",
        priority: "normal"
      },
      {
        id: "TASK006",
        time: "05:00 PM",
        type: "reminder",
        title: "Cập nhật báo cáo",
        description: "Hoàn thiện báo cáo công việc trong ngày",
        status: "pending",
        priority: "high"
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleStartTask = (taskId) => {
    setTodayTasks(todayTasks.map(task =>
      task.id === taskId ? { ...task, status: "in_progress" } : task
    ));
    showToast("▶️ Đã bắt đầu công việc!");
  };

  const handleCompleteTask = (taskId) => {
    setTodayTasks(todayTasks.map(task =>
      task.id === taskId ? { ...task, status: "completed" } : task
    ));
    showToast("✅ Đã hoàn thành công việc!");
  };

  const handleOpenNoteModal = (task) => {
    console.log('🎯 Opening modal with task:', task);
    setSelectedTask(task);
    setIsNoteModalOpen(true);
  };

  const handleNoteSuccess = (data) => {
    console.log("Note saved:", data);
    showToast("✅ Đã lưu ghi chú chăm sóc!");
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: "Chưa làm", class: "status-pending", icon: "⏳" },
      in_progress: { label: "Đang làm", class: "status-in-progress", icon: "🔄" },
      completed: { label: "Hoàn thành", class: "status-completed", icon: "✓" }
    };
    return badges[status] || badges.pending;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: { label: "Quan trọng", class: "priority-high", icon: "🔴" },
      normal: { label: "Bình thường", class: "priority-normal", icon: "🟡" }
    };
    return badges[priority] || badges.normal;
  };

  const stats = {
    total: todayTasks.length,
    pending: todayTasks.filter(t => t.status === 'pending').length,
    inProgress: todayTasks.filter(t => t.status === 'in_progress').length,
    completed: todayTasks.filter(t => t.status === 'completed').length
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Công việc hôm nay"
        subtitle="Danh sách công việc chi tiết - Thứ Hai, 27/10/2025"
      />

      {/* Stats */}
      <div className="section-separated">
        <div className="stats-grid-custom">
          <div className="stat-card-modern stat-primary">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">📋</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Tổng công việc</p>
              <h3 className="stat-number">{stats.total}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-warning">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">⏳</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Chưa làm</p>
              <h3 className="stat-number">{stats.pending}</h3>
            </div>
          </div>

          <div className="stat-card-modern">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">🔄</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Đang làm</p>
              <h3 className="stat-number">{stats.inProgress}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-success">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">✓</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Hoàn thành</p>
              <h3 className="stat-number">{stats.completed}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Chi tiết công việc hôm nay
          </h2>
          <span className="section-count">{todayTasks.length} công việc</span>
        </div>

        <div className="today-tasks-list">
          {todayTasks.map((task) => {
            const statusBadge = getStatusBadge(task.status);
            const priorityBadge = getPriorityBadge(task.priority);
            
            return (
              <div key={task.id} className="today-task-card">
                <div className="task-time-section">
                  <span className="task-time-badge">{task.time}</span>
                </div>

                <div className="task-content-section">
                  <div className="task-header">
                    <h3 className="task-title">{task.title}</h3>
                    <div className="task-badges">
                      <span className={`task-priority-badge ${priorityBadge.class}`}>
                        {priorityBadge.icon} {priorityBadge.label}
                      </span>
                      <span className={`task-status-badge ${statusBadge.class}`}>
                        {statusBadge.icon} {statusBadge.label}
                      </span>
                    </div>
                  </div>

                  {task.type === 'service' && (
                    <div className="task-pet-info">
                      <span className="task-pet-icon">{task.petIcon}</span>
                      <span className="task-pet-name">{task.petName} - {task.petType}</span>
                      <span className="task-owner">👤 {task.ownerName}</span>
                    </div>
                  )}

                  {task.type === 'reminder' && task.description && (
                    <p className="task-description">{task.description}</p>
                  )}

                  {task.notes && (
                    <div className="task-notes">
                      <span className="task-notes-icon">📝</span>
                      <span className="task-notes-text">{task.notes}</span>
                    </div>
                  )}
                </div>

                <div className="task-actions">
                  {task.status === 'pending' && (
                    <button
                      onClick={() => handleStartTask(task.id)}
                      className="btn-task-action btn-start"
                    >
                      ▶️ Bắt đầu
                    </button>
                  )}
                  
                  {task.status === 'in_progress' && task.type === 'service' && (
                    <>
                      <button
                        onClick={() => handleOpenNoteModal(task)}
                        className="btn-task-action btn-note"
                      >
                        📝 Ghi chú
                      </button>
                      <button
                        onClick={() => handleCompleteTask(task.id)}
                        className="btn-task-action btn-complete"
                      >
                        ✓ Hoàn thành
                      </button>
                    </>
                  )}
                  
                  {task.status === 'in_progress' && task.type === 'reminder' && (
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      className="btn-task-action btn-complete"
                    >
                      ✓ Hoàn thành
                    </button>
                  )}
                  
                  {task.status === 'completed' && (
                    <span className="task-completed-text">✅ Đã xong</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {isNoteModalOpen && selectedTask && (
        <CareNoteModal
          isOpen={isNoteModalOpen}
          onClose={() => {
            setIsNoteModalOpen(false);
            setSelectedTask(null);
          }}
          onSuccess={handleNoteSuccess}
          task={selectedTask}
        />
      )}

      {/* Toast */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}