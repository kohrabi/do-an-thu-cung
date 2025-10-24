// app/(dashboard)/manager/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { useRouter } from "next/navigation";

export default function ManagerDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalPets: 0,
    totalCustomers: 0,
    totalServices: 0,
    monthlyRevenue: 0,
    todayAppointments: 0,
    activeStaff: 0
  });

  useEffect(() => {
    // Mock data - Replace with actual API call
    setStats({
      totalPets: 156,
      totalCustomers: 89,
      totalServices: 12,
      monthlyRevenue: 45600000,
      todayAppointments: 8,
      activeStaff: 15
    });
  }, []);

  const quickActions = [
    {
      icon: "👥",
      label: "Thêm nhân viên",
      onClick: () => router.push("/dashboard/manager/staff?action=add")
    },
    {
      icon: "✨",
      label: "Thêm dịch vụ",
      onClick: () => router.push("/dashboard/manager/services?action=add")
    },
    {
      icon: "📅",
      label: "Xem lịch đặt",
      onClick: () => router.push("/dashboard/manager/appointments")
    },
    {
      icon: "📊",
      label: "Xem báo cáo",
      onClick: () => router.push("/dashboard/manager/reports")
    }
  ];

  const recentActivities = [
    {
      icon: "✅",
      text: "Nguyễn Văn A đã hoàn thành dịch vụ spa cho Lucky",
      time: "5 phút trước"
    },
    {
      icon: "📅",
      text: "Khách hàng Trần Thị B đặt lịch khám cho Miu",
      time: "15 phút trước"
    },
    {
      icon: "💰",
      text: "Hóa đơn #INV-2024-001 đã được thanh toán",
      time: "30 phút trước"
    },
    {
      icon: "👤",
      text: "Nhân viên mới Lê Văn C đã được thêm vào hệ thống",
      time: "1 giờ trước"
    },
    {
      icon: "🏠",
      text: "Chuồng A03 đã được làm sạch và sẵn sàng",
      time: "2 giờ trước"
    }
  ];

  return (
    <div className="dashboard-container">
      <DashboardHeader 
        title="Dashboard Quản lý" 
        subtitle="Tổng quan hoạt động trung tâm PAW LOVERS"
      />

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatsCard
          icon="🐾"
          title="Tổng số thú cưng"
          value={stats.totalPets}
          change="+12%"
          trend="up"
          color="primary"
        />
        <StatsCard
          icon="👥"
          title="Khách hàng"
          value={stats.totalCustomers}
          change="+8%"
          trend="up"
          color="success"
        />
        <StatsCard
          icon="💰"
          title="Doanh thu tháng"
          value={`${(stats.monthlyRevenue / 1000000).toFixed(1)}M`}
          change="+15%"
          trend="up"
          color="warning"
        />
        <StatsCard
          icon="📅"
          title="Lịch hẹn hôm nay"
          value={stats.todayAppointments}
          color="info"
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="dashboard-content-grid">
        <div className="dashboard-col-2">
          <QuickActions actions={quickActions} />
        </div>
        <div className="dashboard-col-1">
          <RecentActivity activities={recentActivities} />
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h3 className="section-title">📈 Doanh thu 6 tháng gần đây</h3>
          <div className="chart-placeholder">
            <p className="text-gray-500">Biểu đồ sẽ được hiển thị ở đây</p>
            <p className="text-sm text-gray-400 mt-2">(Sử dụng Recharts hoặc Chart.js)</p>
          </div>
        </div>
      </div>
    </div>
  );
}