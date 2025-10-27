// app/(dashboard)/owner/appointments/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import BookAppointmentModal from "@/components/modals/BookAppointmentModal";
import AppointmentDetailModal from "@/components/modals/AppointmentDetailModal";
import CancelAppointmentOwnerModal from "@/components/modals/CancelAppointmentOwnerModal";

export default function OwnerAppointmentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadAppointments();

    // Check if redirected from services page
    if (searchParams.get('action') === 'book') {
      setIsBookModalOpen(true);
    }
  }, [searchParams]);

  const loadAppointments = () => {
    setAppointments([
      {
        id: "APT001",
        code: "APT001",
        petId: "PET001",
        petName: "Lucky",
        petIcon: "🐕",
        serviceId: "SRV001",
        serviceName: "Khám sức khỏe tổng quát",
        serviceIcon: "🏥",
        date: "2025-11-05",
        time: "09:00",
        status: "upcoming",
        notes: "Khám tổng quát định kỳ",
        createdAt: "2025-10-20"
      },
      {
        id: "APT002",
        code: "APT002",
        petId: "PET002",
        petName: "Miu",
        petIcon: "🐈",
        serviceId: "SRV003",
        serviceName: "Tắm spa cao cấp",
        serviceIcon: "🛁",
        date: "2025-11-10",
        time: "14:00",
        status: "upcoming",
        notes: "",
        createdAt: "2025-10-22"
      },
      {
        id: "APT003",
        code: "APT003",
        petId: "PET001",
        petName: "Lucky",
        petIcon: "🐕",
        serviceId: "SRV002",
        serviceName: "Tiêm phòng dại",
        serviceIcon: "💉",
        date: "2025-10-20",
        time: "10:30",
        status: "completed",
        notes: "Đã hoàn thành tốt",
        createdAt: "2025-10-15",
        completedAt: "2025-10-20"
      },
      {
        id: "APT004",
        code: "APT004",
        petId: "PET003",
        petName: "Coco",
        petIcon: "🐩",
        serviceId: "SRV004",
        serviceName: "Cắt tỉa lông",
        serviceIcon: "✂️",
        date: "2025-10-25",
        time: "15:00",
        status: "cancelled",
        notes: "Khách hủy do bận đột xuất",
        cancelReason: "Bận đột xuất, sẽ đặt lại sau",
        createdAt: "2025-10-18",
        cancelledAt: "2025-10-23"
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleBookAppointment = (data) => {
    const newAppointment = {
      id: `APT${String(appointments.length + 1).padStart(3, '0')}`,
      code: `APT${String(appointments.length + 1).padStart(3, '0')}`,
      ...data,
      status: "upcoming",
      createdAt: new Date().toISOString()
    };
    setAppointments([...appointments, newAppointment]);
    showToast("🎉 Đặt lịch thành công!");
  };

  const handleViewDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(true);
  };

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsCancelModalOpen(true);
  };

  const handleCancelSuccess = (data) => {
    setAppointments(appointments.map(apt =>
      apt.id === data.appointmentId
        ? { ...apt, status: "cancelled", cancelReason: data.reason, cancelledAt: new Date().toISOString() }
        : apt
    ));
    showToast("✅ Đã hủy lịch hẹn");
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchFilter = filter === "all" || apt.status === filter;
    const matchSearch = apt.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       apt.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       apt.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: { label: "Sắp tới", class: "status-upcoming", icon: "⏳" },
      completed: { label: "Đã hoàn thành", class: "status-completed", icon: "✅" },
      cancelled: { label: "Đã hủy", class: "status-cancelled", icon: "✕" }
    };
    return badges[status] || badges.upcoming;
  };

  const stats = {
    total: appointments.length,
    upcoming: appointments.filter(a => a.status === 'upcoming').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Lịch đặt"
        subtitle="Quản lý lịch hẹn dịch vụ cho thú cưng"
      />

      {/* Stats */}
      <div className="section-separated">
        <div className="stats-grid-custom">
          <div className="stat-card-modern stat-primary">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">📅</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Tổng lịch đặt</p>
              <h3 className="stat-number">{stats.total}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-info">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">⏳</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Sắp tới</p>
              <h3 className="stat-number">{stats.upcoming}</h3>
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

          <div className="stat-card-modern">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">✕</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Đã hủy</p>
              <h3 className="stat-number">{stats.cancelled}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons - TÁCH BIỆT, ĐẸP */}
      <div className="section-separated">
        <div className="filter-buttons-group">
          <button
            onClick={() => setFilter("all")}
            className={`filter-btn-modern ${filter === "all" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">📋</span>
            <span>Tất cả</span>
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            className={`filter-btn-modern ${filter === "upcoming" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">⏳</span>
            <span>Sắp tới</span>
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`filter-btn-modern ${filter === "completed" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">✅</span>
            <span>Đã hoàn thành</span>
          </button>
          <button
            onClick={() => setFilter("cancelled")}
            className={`filter-btn-modern ${filter === "cancelled" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">✕</span>
            <span>Đã hủy</span>
          </button>
        </div>
      </div>

      {/* Search Bar - BÊN PHẢI */}
      <div className="section-separated">
        <div className="search-section-right">
          <div className="search-box-modern">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm lịch đặt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-modern"
            />
          </div>
        </div>
      </div>

      {/* Book Button */}
      <div className="section-separated">
        <div className="action-button-section">
          <button
            onClick={() => setIsBookModalOpen(true)}
            className="btn-add-large"
          >
            <span className="btn-icon">➕</span>
            <span>Đặt lịch mới</span>
          </button>
        </div>
      </div>

      {/* Appointments List - TÁCH BIỆT */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Lịch đặt của tôi
          </h2>
          <span className="section-count">{filteredAppointments.length} lịch hẹn</span>
        </div>

        <div className="appointments-list-separated">
          {filteredAppointments.map((apt) => {
            const statusBadge = getStatusBadge(apt.status);
            return (
              <div key={apt.id} className="appointment-card-separated">
                <div className="appointment-card-header">
                  <div className="appointment-code-section">
                    <span className="appointment-code-badge">{apt.code}</span>
                    <span className={`appointment-status-badge ${statusBadge.class}`}>
                      {statusBadge.icon} {statusBadge.label}
                    </span>
                  </div>
                  <div className="appointment-datetime">
                    <p className="appointment-date padding">📅 {apt.date}</p>
                    <p className="appointment-time">🕐 {apt.time}</p>
                  </div>
                </div>

                <div className="appointment-card-body">
                  <div className="appointment-pet-section">
                    <span className="pet-icon-large">{apt.petIcon}</span>
                    <div>
                      <p className="pet-name-bold">{apt.petName}</p>
                      <p className="service-name-text">
                        {apt.serviceIcon} {apt.serviceName}
                      </p>
                    </div>
                  </div>

                  {apt.notes && (
                    <div className="appointment-notes">
                      <p className="notes-label">📝 Ghi chú:</p>
                      <p className="notes-text">{apt.notes}</p>
                    </div>
                  )}

                  {apt.cancelReason && (
                    <div className="appointment-cancel-reason">
                      <p className="cancel-label">❌ Lý do hủy:</p>
                      <p className="cancel-text">{apt.cancelReason}</p>
                    </div>
                  )}
                </div>

                <div className="appointment-card-footer">
                  <button
                    onClick={() => handleViewDetail(apt)}
                    className="btn-appointment-action btn-view-appointment"
                  >
                    <span>📋</span>
                    <span>Chi tiết</span>
                  </button>
                  {apt.status === 'upcoming' && (
                    <button
                      onClick={() => handleCancelClick(apt)}
                      className="btn-appointment-action btn-cancel-appointment"
                    >
                      <span>✕</span>
                      <span>Hủy lịch</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="empty-state-modern">
            <div className="empty-icon">📅</div>
            <p className="empty-text">Không tìm thấy lịch đặt nào</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <BookAppointmentModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onSuccess={handleBookAppointment}
      />

      <AppointmentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedAppointment(null);
        }}
        appointment={selectedAppointment}
      />

      <CancelAppointmentOwnerModal
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setSelectedAppointment(null);
        }}
        onSuccess={handleCancelSuccess}
        appointment={selectedAppointment}
      />

      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}