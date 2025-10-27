// app/(dashboard)/owner/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";

export default function OwnerDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalPets: 0,
    upcomingAppointments: 0,
    pendingPayments: 0
  });

  useEffect(() => {
    setStats({
      totalPets: 3,
      upcomingAppointments: 2,
      pendingPayments: 1
    });
  }, []);

  const quickActions = [
    {
      icon: "🐾",
      label: "Thú cưng của tôi",
      onClick: () => router.push("/dashboard/owner/pets")
    },
    {
      icon: "📅",
      label: "Lịch đặt",
      onClick: () => router.push("/dashboard/owner/appointments")
    },
    {
      icon: "💳",
      label: "Thanh toán",
      onClick: () => router.push("/dashboard/owner/payments")
    },
    {
      icon: "🛍️",
      label: "Xem dịch vụ",
      onClick: () => router.push("/dashboard/owner/services")
    }
  ];

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Tổng quan"
        subtitle={`Xin chào, ${router.query?.userName || 'Chủ thú cưng'} - Chúc bạn một ngày tốt lành!`}
      />

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatsCard
          icon="🐾"
          title="Thú cưng của tôi"
          value={stats.totalPets}
          color="primary"
        />
        <StatsCard
          icon="📅"
          title="Lịch sắp tới"
          value={stats.upcomingAppointments}
          color="info"
        />
        <StatsCard
          icon="💳"
          title="Chờ thanh toán"
          value={stats.pendingPayments}
          color="warning"
        />
      </div>

      {/* Quick Actions */}
      <div className="section-separated">
        <h2 className="section-title-large">
          <span className="title-icon">⚡</span>
          Thao tác nhanh
        </h2>
        <QuickActions actions={quickActions} />
      </div>
    </div>
  );
}