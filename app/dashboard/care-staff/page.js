"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import CareNoteModal from "@/components/modals/CareNoteModal";

export default function CareStaffDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalTasks: 0,
    inProgress: 0,
    completed: 0
  });

  const [todayTasks, setTodayTasks] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    setStats({
      totalTasks: 4,
      inProgress: 1,
      completed: 1
    });

    setTodayTasks([
      {
        id: "TASK001",
        time: "09:00 AM",
        petName: "Lucky",
        petIcon: "🐕",
        petType: "Chó Golden Retriever",
        ownerName: "Nguyễn Văn A",
        ownerPhone: "0901234567",
        service: "Tắm & Spa",
        serviceIcon: "🛁",
        status: "completed",
        notes: "Đã hoàn thành tốt"
      },
      {
        id: "TASK002",
        time: "10:30 AM",
        petName: "Miu",
        petIcon: "🐈",
        petType: "Mèo Ba Tư",
        ownerName: "Trần Thị B",
        ownerPhone: "0909876543",
        service: "Cắt tỉa lông",
        serviceIcon: "✂️",
        status: "in_progress",
        notes: "1 ghi chú"
      },
      {
        id: "TASK003",
        time: "02:00 PM",
        petName: "Coco",
        petIcon: "🐩",
        petType: "Chó Poodle",
        ownerName: "Lê Văn C",
        ownerPhone: "0912345678",
        service: "Lưu trú 3 ngày",
        serviceIcon: "🏠",
        status: "pending",
        priority: "high"
      },
      {
        id: "TASK004",
        time: "03:30 PM",
        petName: "Max",
        petIcon: "🐕",
        petType: "Chó Husky",
        ownerName: "Phạm Thị D",
        ownerPhone: "0923456789",
        service: "Chải lông",
        serviceIcon: "🪮",
        status: "pending",
        priority: "normal"
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleSaveNote = () => {
    if (!noteText.trim()) {
      showToast("⚠️ Vui lòng nhập nội dung ghi chú", "error");
      return;
    }
    showToast("💾 Đã lưu ghi chú thành công!");
    setNoteText("");
  };

  const handleStartTask = (taskId) => {
    setTodayTasks(todayTasks.map(task =>
      task.id === taskId ? { ...task, status: "in_progress" } : task
    ));
    showToast("▶️ Đã bắt đầu công việc!");
  };

  const handleOpenNoteModal = (task) => {
    console.log('=================================');
    console.log('🎯 OPENING MODAL WITH TASK:');
    console.log('Task ID:', task.id);
    console.log('Pet Name:', task.petName);
    console.log('Pet Type:', task.petType);
    console.log('Owner Name:', task.ownerName);
    console.log('Service:', task.service);
    console.log('Full Task Object:', task);
    console.log('=================================');
    
    setSelectedTask(task);
    setIsNoteModalOpen(true);
  };

  const handleNoteSuccess = (data) => {
    console.log("Note saved:", data);
    showToast("✅ Đã lưu ghi chú chăm sóc!");
  };

  const handleCompleteTask = (taskId) => {
    setTodayTasks(todayTasks.map(task =>
      task.id === taskId ? { ...task, status: "completed" } : task
    ));
    showToast("✅ Đã hoàn thành công việc!");
  };

  const quickActions = [
    {
      icon: "📅",
      label: "Xem lịch làm việc",
      onClick: () => router.push("/dashboard/care-staff/schedule")
    },
    {
      icon: "📋",
      label: "Công việc hôm nay",
      onClick: () => router.push("/dashboard/care-staff/today")
    },
    {
      icon: "📝",
      label: "Ghi chú nhanh",
      onClick: () => {
        document.getElementById('note-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Công việc hôm nay"
        subtitle="Quản lý và thực hiện các dịch vụ chăm sóc"
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
              <h3 className="stat-number">{stats.totalTasks}</h3>
            </div>
          </div>

          <div className="stat-card-modern">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">⏳</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Đang thực hiện</p>
              <h3 className="stat-number">{stats.inProgress}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-success">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">✓</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Đã hoàn thành</p>
              <h3 className="stat-number">{stats.completed}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section-separated">
        <h2 className="section-title-large">
          <span className="title-icon">⚡</span>
          Thao tác nhanh
        </h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="quick-action-card"
            >
              <span className="quick-action-icon">{action.icon}</span>
              <span className="quick-action-label">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Danh sách công việc
          </h2>
          <span className="section-count">{todayTasks.length} công việc</span>
        </div>

        <div className="staff-task-list">
          {todayTasks.map((task) => (
            <div key={task.id} className="staff-task-card">
              <div className="task-time-badge-staff">{task.time}</div>
              
              <div className="task-pet-info-staff">
                <span className="task-pet-icon-staff">{task.petIcon}</span>
                <div>
                  <p className="task-pet-name-staff">{task.petName}</p>
                  <p className="task-owner-name-staff">Chủ nuôi: {task.ownerName}</p>
                </div>
              </div>

              <div className="task-service-info-staff">
                <span className="task-service-icon-staff">{task.serviceIcon}</span>
                <span className="task-service-name-staff">{task.service}</span>
              </div>

              <div className="task-actions-group-staff">
                {task.status === 'pending' && (
                  <button
                    onClick={() => handleStartTask(task.id)}
                    className="btn-start-task-staff"
                  >
                    ▶️ Bắt đầu
                  </button>
                )}

                {task.status === 'in_progress' && (
                  <>
                    <button
                      onClick={() => handleOpenNoteModal(task)}
                      className="btn-note-task-staff"
                    >
                      📝 Ghi chú
                    </button>
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      className="btn-complete-task-staff"
                    >
                      ✓ Hoàn thành
                    </button>
                  </>
                )}

                {task.status === 'completed' && (
                  <span className="task-completed-badge-staff">✅ Đã xong</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note Section */}
      <div className="section-separated" id="note-section">
        <h2 className="section-title-large">
          <span className="title-icon">📝</span>
          Ghi chú công việc
        </h2>
        
        <div className="note-input-section">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Nhập ghi chú về công việc hôm nay..."
            rows="4"
            className="note-textarea-staff"
          />
          <button
            onClick={handleSaveNote}
            className="btn-save-note-staff"
          >
            <span className="btn-icon">💾</span>
            <span>Lưu ghi chú</span>
          </button>
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