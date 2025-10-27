// app/(dashboard)/vet/today/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import VetScheduleDetailModal from "@/components/modals/VetScheduleDetailModal";

export default function VetTodayPage() {
  const router = useRouter();
  const [todayTasks, setTodayTasks] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    loadTodayTasks();
  }, []);

  const loadTodayTasks = () => {
    // Mock data - Công việc hôm nay 2025-10-27
    setTodayTasks([
      {
        id: "TASK001",
        time: "09:00",
        type: "appointment",
        title: "Khám sức khỏe cho Lucky",
        petName: "Lucky",
        petIcon: "🐕",
        petType: "Chó Golden Retriever",
        petAge: "2 tuổi",
        petWeight: "28 kg",
        ownerName: "Nguyễn Văn A",
        ownerPhone: "0901234567",
        serviceName: "Khám sức khỏe tổng quát",
        serviceIcon: "🏥",
        status: "completed",
        priority: "high",
        symptoms: "Ăn uống kém, uể oải",
        previousRecords: [
          {
            date: "2025-09-15",
            diagnosis: "Cảm lạnh nhẹ",
            treatment: "Đã kê đơn thuốc kháng sinh"
          }
        ]
      },
      {
        id: "TASK002",
        time: "10:30",
        type: "appointment",
        title: "Tiêm phòng dại cho Miu",
        petName: "Miu",
        petIcon: "🐈",
        petType: "Mèo Ba Tư",
        petAge: "1 tuổi",
        petWeight: "4 kg",
        ownerName: "Trần Thị B",
        ownerPhone: "0909876543",
        serviceName: "Tiêm phòng dại",
        serviceIcon: "💉",
        status: "completed",
        priority: "normal",
        symptoms: "Tiêm phòng định kỳ",
        previousRecords: []
      },
      {
        id: "TASK003",
        time: "14:00",
        type: "appointment",
        title: "Tái khám cho Coco",
        petName: "Coco",
        petIcon: "🐩",
        petType: "Chó Poodle",
        petAge: "3 tuổi",
        petWeight: "6 kg",
        ownerName: "Lê Văn C",
        ownerPhone: "0912345678",
        serviceName: "Tái khám",
        serviceIcon: "🔄",
        status: "in_progress",
        priority: "normal",
        symptoms: "Kiểm tra sau điều trị",
        previousRecords: [
          {
            date: "2025-10-20",
            diagnosis: "Viêm da",
            treatment: "Đã điều trị thành công"
          }
        ]
      },
      {
        id: "TASK004",
        time: "15:30",
        type: "appointment",
        title: "Khám da liễu cho Max",
        petName: "Max",
        petIcon: "🐕",
        petType: "Chó Husky",
        petAge: "4 tuổi",
        petWeight: "32 kg",
        ownerName: "Phạm Thị D",
        ownerPhone: "0923456789",
        serviceName: "Khám da liễu",
        serviceIcon: "🩺",
        status: "pending",
        priority: "high",
        symptoms: "Ngứa ngáy, rụng lông",
        previousRecords: []
      },
      {
        id: "TASK005",
        time: "16:30",
        type: "appointment",
        title: "Xét nghiệm máu cho Bella",
        petName: "Bella",
        petIcon: "🐈",
        petType: "Mèo Anh lông ngắn",
        petAge: "2 tuổi",
        petWeight: "5 kg",
        ownerName: "Hoàng Thị E",
        ownerPhone: "0934567890",
        serviceName: "Xét nghiệm máu",
        serviceIcon: "💉",
        status: "pending",
        priority: "normal",
        symptoms: "Kiểm tra sức khỏe định kỳ",
        previousRecords: []
      },
      {
        id: "TASK006",
        time: "17:00",
        type: "reminder",
        title: "Cập nhật hồ sơ bệnh án",
        description: "Hoàn thiện 3 hồ sơ bệnh án chưa lưu",
        status: "pending",
        priority: "high"
      }
    ]);
  };

  const handleViewDetail = (task) => {
    if (task.type === 'appointment') {
      // Chuyển đổi task thành appointment format
      const appointment = {
        id: task.id,
        code: task.id,
        time: task.time,
        petName: task.petName,
        petIcon: task.petIcon,
        petType: task.petType,
        petAge: task.petAge,
        petWeight: task.petWeight,
        ownerName: task.ownerName,
        ownerPhone: task.ownerPhone,
        serviceName: task.serviceName,
        serviceIcon: task.serviceIcon,
        symptoms: task.symptoms,
        previousRecords: task.previousRecords || []
      };
      setSelectedAppointment(appointment);
      setIsDetailModalOpen(true);
    }
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
        subtitle="Danh sách công việc và lịch khám trong ngày"
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

      {/* Today's Tasks */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Công việc hôm nay - Thứ Hai, 27/10/2025
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

                  {task.type === 'appointment' && (
                    <div className="task-pet-info">
                      <span className="task-pet-icon">{task.petIcon}</span>
                      <span className="task-pet-name">{task.petName}</span>
                      <span className="task-owner">👤 {task.ownerName}</span>
                    </div>
                  )}

                  {task.type === 'reminder' && task.description && (
                    <p className="task-description">{task.description}</p>
                  )}
                </div>

                <div className="task-actions">
                  {task.type === 'appointment' && (
                    <button
                      onClick={() => handleViewDetail(task)}
                      className="btn-task-action"
                    >
                      Chi tiết
                    </button>
                  )}
                  {task.type === 'reminder' && (
                    <button
                      onClick={() => router.push("/dashboard/vet/records")}
                      className="btn-task-action"
                    >
                      Xem ngay
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && (
        <VetScheduleDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedAppointment(null);
          }}
          appointment={selectedAppointment}
        />
      )}
    </div>
  );
}