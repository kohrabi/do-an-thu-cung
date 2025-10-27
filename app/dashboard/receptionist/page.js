// app/(dashboard)/receptionist/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import { useRouter } from "next/navigation";

export default function ReceptionistDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    pendingAppointments: 0,
    todayAppointments: 0,
    confirmedToday: 0,
    remindersToSend: 0
  });

  useEffect(() => {
    // Mock data
    setStats({
      pendingAppointments: 8,
      todayAppointments: 15,
      confirmedToday: 12,
      remindersToSend: 5
    });
  }, []);

  const quickActions = [
    {
      icon: "📅",
      label: "Quản lý lịch đặt",
      onClick: () => router.push("/dashboard/receptionist/appointments")
    },
    {
      icon: "📄",
      label: "Quản lý phiếu hẹn",
      onClick: () => router.push("/dashboard/receptionist/slips")
    },
    {
      icon: "🔔",
      label: "Gửi nhắc lịch",
      onClick: () => router.push("/dashboard/receptionist/reminders")
    },
    {
      icon: "👥",
      label: "Khách hàng",
      onClick: () => router.push("/dashboard/receptionist/customers")
    }
  ];

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Dashboard Lễ tân"
        subtitle="Quản lý lịch hẹn và phục vụ khách hàng"
      />

      {/* Stats */}
      <div className="stats-grid">
        <StatsCard
          icon="⏳"
          title="Chờ xác nhận"
          value={stats.pendingAppointments}
          color="warning"
        />
        <StatsCard
          icon="📅"
          title="Lịch hôm nay"
          value={stats.todayAppointments}
          color="info"
        />
        <StatsCard
          icon="✅"
          title="Đã xác nhận"
          value={stats.confirmedToday}
          color="success"
        />
        <StatsCard
          icon="🔔"
          title="Cần nhắc lịch"
          value={stats.remindersToSend}
          color="primary"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions actions={quickActions} />

      {/* Today's Overview */}
      <div className="section-card">
        <h3 className="section-title">📋 Tổng quan hôm nay</h3>
        <div className="overview-grid">
          <div className="overview-item">
            <span className="overview-icon">👥</span>
            <div>
              <p className="overview-label">Khách hàng mới</p>
              <p className="overview-value">3 người</p>
            </div>
          </div>
          <div className="overview-item">
            <span className="overview-icon">📞</span>
            <div>
              <p className="overview-label">Cuộc gọi tiếp nhận</p>
              <p className="overview-value">12 cuộc</p>
            </div>
          </div>
          <div className="overview-item">
            <span className="overview-icon">📩</span>
            <div>
              <p className="overview-label">Email đã gửi</p>
              <p className="overview-value">8 email</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}