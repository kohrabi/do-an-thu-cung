// app/(dashboard)/veterinarian/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";

export default function VeterinarianDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    todayAppointments: 0,
    inProgress: 0,
    completed: 0,
    newRecords: 0
  });

  const [todaySchedule, setTodaySchedule] = useState([]);
  const [upcomingAlert, setUpcomingAlert] = useState(null);

  useEffect(() => {
    loadDashboardData();
    checkUpcomingAppointments();
  }, []);

  const loadDashboardData = () => {
    // Mock stats - UPDATED
    setStats({
      todayAppointments: 5,
      inProgress: 1,
      completed: 2,
      newRecords: 3
    });

    // Mock today schedule - NGÀY HÔM NAY: 2025-10-27
    setTodaySchedule([
      {
        id: "APT001",
        time: "09:00",
        petName: "Lucky",
        petIcon: "🐕",
        ownerName: "Nguyễn Văn A",
        service: "Khám sức khỏe tổng quát",
        serviceIcon: "🏥",
        status: "completed"
      },
      {
        id: "APT002",
        time: "10:30",
        petName: "Miu",
        petIcon: "🐈",
        ownerName: "Trần Thị B",
        service: "Tiêm phòng dại",
        serviceIcon: "💉",
        status: "completed"
      },
      {
        id: "APT003",
        time: "14:00",
        petName: "Coco",
        petIcon: "🐩",
        ownerName: "Lê Văn C",
        service: "Tái khám",
        serviceIcon: "🔄",
        status: "in_progress"
      },
      {
        id: "APT004",
        time: "15:30",
        petName: "Max",
        petIcon: "🐕",
        ownerName: "Phạm Thị D",
        service: "Khám da liễu",
        serviceIcon: "🩺",
        status: "waiting"
      },
      {
        id: "APT005",
        time: "16:30",
        petName: "Bella",
        petIcon: "🐈",
        ownerName: "Hoàng Thị E",
        service: "Xét nghiệm máu",
        serviceIcon: "💉",
        status: "waiting"
      }
    ]);
  };

  const checkUpcomingAppointments = () => {
    // Current time: 08:31 (UTC)
    // Show alert for 09:00 appointment (within 30 minutes)
    setUpcomingAlert({
      petName: "Lucky",
      time: "09:00"
    });
  };

  const quickActions = [
    {
      icon: "📅",
      label: "Xem lịch khám",
      onClick: () => router.push("/dashboard/vet/schedule")
    },
    {
      icon: "👥",
      label: "Hồ sơ bệnh án",
      onClick: () => router.push("/dashboard/vet/records")
    },
    {
      icon: "📋",
      label: "Công việc hôm nay",
      onClick: () => router.push("/dashboard/vet/today")
    },
    {
      icon: "🐾",
      label: "Bệnh nhân của tôi",
      onClick: () => router.push("/dashboard/vet/patients")
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      waiting: { label: "Chờ khám", class: "status-waiting", icon: "⏳" },
      in_progress: { label: "Đang khám", class: "status-in-progress", icon: "🔄" },
      completed: { label: "Hoàn thành", class: "status-completed", icon: "✓" }
    };
    return badges[status] || badges.waiting;
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Dashboard Bác sĩ thú y"
        subtitle={`Chào buổi chiều, BS. Đức Hải - ${new Date().toLocaleDateString('vi-VN')}`}
      />

      {/* Upcoming Alert */}
      {upcomingAlert && (
        <div className="section-separated">
          <div className="alert-upcoming">
            <span className="alert-icon">🔔</span>
            <p className="alert-text">
              Sắp đến giờ khám cho <strong>{upcomingAlert.petName}</strong> ({upcomingAlert.time})
            </p>
            <button 
              onClick={() => router.push("/dashboard/veterinarian/schedule")}
              className="alert-action-btn"
            >
              Xem lịch
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="section-separated">
        <div className="stats-grid-custom">
          <div className="stat-card-modern stat-primary">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">📅</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Lịch khám hôm nay</p>
              <h3 className="stat-number">{stats.todayAppointments}</h3>
            </div>
          </div>

          <div className="stat-card-modern">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">🔄</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Đang thực hiện</p>
              <h3 className="stat-number">{stats.inProgress}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-success">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">✅</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Đã hoàn thành</p>
              <h3 className="stat-number">{stats.completed}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-warning">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">📝</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Bệnh án mới</p>
              <h3 className="stat-number">{stats.newRecords}</h3>
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
        <QuickActions actions={quickActions} />
      </div>

      {/* Today's Schedule */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Lịch khám hôm nay
          </h2>
          <span className="section-count">{todaySchedule.length} ca khám</span>
        </div>

        <div className="vet-schedule-list">
          {todaySchedule.map((appointment) => {
            const statusBadge = getStatusBadge(appointment.status);
            return (
              <div key={appointment.id} className="vet-schedule-item">
                <div className="schedule-time-section">
                  <span className="schedule-time-badge">{appointment.time}</span>
                </div>

                <div className="schedule-pet-section">
                  <span className="schedule-pet-icon">{appointment.petIcon}</span>
                  <div>
                    <p className="schedule-pet-name">{appointment.petName}</p>
                    <p className="schedule-owner-name">👤 {appointment.ownerName}</p>
                  </div>
                </div>

                <div className="schedule-service-section">
                  <span className="schedule-service-icon">{appointment.serviceIcon}</span>
                  <p className="schedule-service-name">{appointment.service}</p>
                </div>

                <span className={`schedule-status-badge ${statusBadge.class}`}>
                  {statusBadge.icon} {statusBadge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}