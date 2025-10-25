// app/(dashboard)/owner/appointments/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Button from "@/components/ui/Button";
import BookAppointmentModal from "@/components/modals/BookAppointmentModal";

export default function OwnerAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Mock pets
    setPets([
      { id: "PET001", name: "Lucky", icon: "🐕", breed: "Golden Retriever", age: 3 },
      { id: "PET002", name: "Miu", icon: "🐈", breed: "Mèo Anh lông ngắn", age: 2 },
      { id: "PET003", name: "Coco", icon: "🐩", breed: "Poodle", age: 1 }
    ]);

    // Mock services
    setServices([
      { id: "SRV001", name: "Khám sức khỏe", icon: "🏥", price: 200000, duration: 30 },
      { id: "SRV002", name: "Tắm spa cao cấp", icon: "🛁", price: 150000, duration: 60 },
      { id: "SRV003", name: "Cắt tỉa lông", icon: "✂️", price: 180000, duration: 45 },
      { id: "SRV004", name: "Tiêm phòng dại", icon: "💉", price: 120000, duration: 15 },
      { id: "SRV005", name: "Lưu trú theo ngày", icon: "🏠", price: 100000, duration: 1440 },
      { id: "SRV006", name: "Spa massage", icon: "💆", price: 250000, duration: 90 }
    ]);

    // Mock appointments
    setAppointments([
      {
        id: "APT001",
        petId: "PET001",
        petName: "Lucky",
        petIcon: "🐕",
        serviceId: "SRV001",
        serviceName: "Khám sức khỏe",
        serviceIcon: "🏥",
        date: "2025-11-15",
        time: "10:00",
        status: "confirmed",
        vet: "Bác sĩ Nguyễn Văn A",
        notes: ""
      },
      {
        id: "APT002",
        petId: "PET002",
        petName: "Miu",
        petIcon: "🐈",
        serviceId: "SRV002",
        serviceName: "Tắm spa cao cấp",
        serviceIcon: "🛁",
        date: "2025-11-18",
        time: "14:30",
        status: "pending",
        staff: "Nhân viên Trần Thị B",
        notes: ""
      },
      {
        id: "APT003",
        petId: "PET001",
        petName: "Lucky",
        petIcon: "🐕",
        serviceId: "SRV002",
        serviceName: "Tắm spa cao cấp",
        serviceIcon: "🛁",
        date: "2025-11-10",
        time: "09:00",
        status: "completed",
        staff: "Nhân viên Lê Văn C",
        notes: ""
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleBookAppointment = (formData) => {
    const pet = pets.find(p => p.id === formData.petId);
    const service = services.find(s => s.id === formData.serviceId);

    const newAppointment = {
      id: `APT${String(appointments.length + 1).padStart(3, '0')}`,
      petId: formData.petId,
      petName: pet.name,
      petIcon: pet.icon,
      serviceId: formData.serviceId,
      serviceName: service.name,
      serviceIcon: service.icon,
      date: formData.date,
      time: formData.time,
      status: "pending",
      notes: formData.notes
    };

    setAppointments([...appointments, newAppointment]);
    showToast("✅ Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận sớm nhất.");
  };

  const handleCancelAppointment = (appointmentId) => {
    if (confirm("Bạn có chắc muốn hủy lịch hẹn này?")) {
      setAppointments(appointments.map(apt =>
        apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt
      ));
      showToast("🗑️ Đã hủy lịch hẹn");
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter === "all") return true;
    if (filter === "upcoming") return apt.status === "pending" || apt.status === "confirmed";
    if (filter === "completed") return apt.status === "completed";
    if (filter === "cancelled") return apt.status === "cancelled";
    return true;
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: "Chờ xác nhận", class: "status-pending", icon: "⏳" },
      confirmed: { label: "Đã xác nhận", class: "status-confirmed", icon: "✅" },
      completed: { label: "Đã hoàn thành", class: "status-completed", icon: "✓" },
      cancelled: { label: "Đã hủy", class: "status-cancelled", icon: "✕" }
    };
    return badges[status] || badges.pending;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Lịch hẹn của tôi"
        subtitle="Quản lý và theo dõi lịch hẹn dịch vụ"
      />

      {/* Stats */}
      <div className="stats-grid">
        <div className="stats-card stats-card-warning">
          <div className="stats-icon">⏳</div>
          <div className="stats-content">
            <p className="stats-title">Chờ xác nhận</p>
            <h3 className="stats-value">{appointments.filter(a => a.status === 'pending').length}</h3>
          </div>
        </div>

        <div className="stats-card stats-card-success">
          <div className="stats-icon">✅</div>
          <div className="stats-content">
            <p className="stats-title">Đã xác nhận</p>
            <h3 className="stats-value">{appointments.filter(a => a.status === 'confirmed').length}</h3>
          </div>
        </div>

        <div className="stats-card stats-card-info">
          <div className="stats-icon">✓</div>
          <div className="stats-content">
            <p className="stats-title">Đã hoàn thành</p>
            <h3 className="stats-value">{appointments.filter(a => a.status === 'completed').length}</h3>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="action-bar">
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tất cả
          </button>
          <button
            className={`filter-tab ${filter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            Sắp tới
          </button>
          <button
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Đã hoàn thành
          </button>
          <button
            className={`filter-tab ${filter === 'cancelled' ? 'active' : ''}`}
            onClick={() => setFilter('cancelled')}
          >
            Đã hủy
          </button>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
          ➕ Đặt lịch mới
        </Button>
      </div>

      {/* Appointments List */}
      <div className="appointments-list-section">
        {filteredAppointments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <p className="empty-text">Chưa có lịch hẹn nào</p>
            <Button onClick={() => setIsModalOpen(true)}>
              Đặt lịch ngay
            </Button>
          </div>
        ) : (
          <div className="appointments-grid">
            {filteredAppointments.map((apt) => {
              const statusBadge = getStatusBadge(apt.status);
              return (
                <div key={apt.id} className="appointment-card">
                  <div className="appointment-card-header">
                    <span className={`status-badge ${statusBadge.class}`}>
                      {statusBadge.icon} {statusBadge.label}
                    </span>
                    <span className="appointment-id">{apt.id}</span>
                  </div>

                  <div className="appointment-card-body">
                    <div className="appointment-pet-info">
                      <span className="pet-avatar-appointment">{apt.petIcon}</span>
                      <div>
                        <h4 className="appointment-pet-name">{apt.petName}</h4>
                        <p className="appointment-service">
                          {apt.serviceIcon} {apt.serviceName}
                        </p>
                      </div>
                    </div>

                    <div className="appointment-datetime">
                      <div className="datetime-item">
                        <span className="datetime-icon">📅</span>
                        <span className="datetime-text">{formatDate(apt.date)}</span>
                      </div>
                      <div className="datetime-item">
                        <span className="datetime-icon">🕐</span>
                        <span className="datetime-text">{apt.time}</span>
                      </div>
                    </div>

                    {(apt.vet || apt.staff) && (
                      <div className="appointment-staff">
                        <span className="staff-icon">👨‍⚕️</span>
                        <span className="staff-name">{apt.vet || apt.staff}</span>
                      </div>
                    )}

                    {apt.notes && (
                      <div className="appointment-notes">
                        <p className="notes-label">📝 Ghi chú:</p>
                        <p className="notes-text">{apt.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="appointment-card-footer">
                    {apt.status === 'pending' || apt.status === 'confirmed' ? (
                      <button
                        onClick={() => handleCancelAppointment(apt.id)}
                        className="btn-cancel-appointment"
                      >
                        🗑️ Hủy lịch
                      </button>
                    ) : null}
                    <button className="btn-view-details">
                      👁️ Chi tiết
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Book Appointment Modal */}
      <BookAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleBookAppointment}
        pets={pets}
        services={services}
      />

      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}