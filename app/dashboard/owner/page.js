// app/(dashboard)/owner/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import { useRouter } from "next/navigation";

export default function OwnerDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalPets: 0,
    upcomingAppointments: 0,
    unpaidInvoices: 0
  });

  const [myPets, setMyPets] = useState([]);

  useEffect(() => {
    // Mock data
    setStats({
      totalPets: 3,
      upcomingAppointments: 2,
      unpaidInvoices: 1
    });

    setMyPets([
      {
        id: 1,
        name: "Lucky",
        species: "Chó",
        breed: "Golden Retriever",
        age: 3,
        image: "🐕",
        nextVaccine: "15/11/2025"
      },
      {
        id: 2,
        name: "Miu",
        species: "Mèo",
        breed: "Mèo Anh lông ngắn",
        age: 2,
        image: "🐈",
        nextVaccine: "20/11/2025"
      },
      {
        id: 3,
        name: "Coco",
        species: "Chó",
        breed: "Poodle",
        age: 1,
        image: "🐩",
        nextVaccine: "01/12/2025"
      }
    ]);
  }, []);

  const quickActions = [
    {
      icon: "🐾",
      label: "Thêm thú cưng",
      onClick: () => router.push("/dashboard/owner/pets?action=add")
    },
    {
      icon: "📅",
      label: "Đặt lịch",
      onClick: () => router.push("/dashboard/owner/appointments/book")
    },
    {
      icon: "✨",
      label: "Xem dịch vụ",
      onClick: () => router.push("/dashboard/owner/services")
    },
    {
      icon: "💰",
      label: "Thanh toán",
      onClick: () => router.push("/dashboard/owner/invoices")
    }
  ];

  return (
    <div className="dashboard-container">
      <DashboardHeader 
        title="Dashboard của bạn" 
        subtitle="Quản lý thú cưng và dịch vụ"
      />

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatsCard
          icon="🐾"
          title="Thú cưng của tôi"
          value={stats.totalPets}
          color="primary"
        />
        <StatsCard
          icon="📅"
          title="Lịch hẹn sắp tới"
          value={stats.upcomingAppointments}
          color="info"
        />
        <StatsCard
          icon="💰"
          title="Hóa đơn chưa thanh toán"
          value={stats.unpaidInvoices}
          color="warning"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions actions={quickActions} />

      {/* My Pets Section */}
      <div className="section-card">
        <div className="section-header">
          <h3 className="section-title">🐾 Thú cưng của tôi</h3>
          <button 
            onClick={() => router.push("/dashboard/owner/pets")}
            className="btn-text"
          >
            Xem tất cả →
          </button>
        </div>

        <div className="pets-grid">
          {myPets.map(pet => (
            <div key={pet.id} className="pet-card">
              <div className="pet-avatar">{pet.image}</div>
              <div className="pet-info">
                <h4 className="pet-name">{pet.name}</h4>
                <p className="pet-breed">{pet.breed}</p>
                <div className="pet-details">
                  <span className="pet-detail-item">
                    <span className="detail-icon">🎂</span>
                    {pet.age} tuổi
                  </span>
                  <span className="pet-detail-item">
                    <span className="detail-icon">💉</span>
                    Tiêm: {pet.nextVaccine}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => router.push("/dashboard/owner/pets")}
                className="pet-action-btn"
              >
                  Chi tiết →
              </button>

            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="section-card">
        <h3 className="section-title">📅 Lịch hẹn sắp tới</h3>
        <div className="appointment-list">
          <div className="appointment-item">
            <div className="appointment-date">
              <div className="date-day">15</div>
              <div className="date-month">Th11</div>
            </div>
            <div className="appointment-info">
              <h4 className="appointment-title">Khám định kỳ - Lucky</h4>
              <p className="appointment-detail">
                <span className="detail-icon">🕐</span> 10:00 AM
                <span className="mx-2">•</span>
                <span className="detail-icon">👨‍⚕️</span> Bác sĩ Nguyễn Văn A
              </p>
            </div>
            <span className="appointment-status status-pending">Đã xác nhận</span>
          </div>

          <div className="appointment-item">
            <div className="appointment-date">
              <div className="date-day">18</div>
              <div className="date-month">Th11</div>
            </div>
            <div className="appointment-info">
              <h4 className="appointment-title">Spa & Grooming - Miu</h4>
              <p className="appointment-detail">
                <span className="detail-icon">🕐</span> 02:30 PM
                <span className="mx-2">•</span>
                <span className="detail-icon">✨</span> Nhân viên Trần Thị B
              </p>
            </div>
            <span className="appointment-status status-confirmed">Chờ xác nhận</span>
          </div>
        </div>
      </div>
    </div>
  );
}