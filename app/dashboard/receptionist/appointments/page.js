// app/(dashboard)/receptionist/appointments/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Button from "@/components/ui/Button";
import ConfirmAppointmentModal from "@/components/modals/ConfirmAppointmentModal";
import CancelAppointmentModal from "@/components/modals/CancelAppointmentModal";

export default function ReceptionistAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    // Mock data
    setAppointments([
      {
        id: "APT001",
        code: "APT001",
        customerName: "Nguyễn Văn A",
        customerPhone: "0901234567",
        petName: "Lucky",
        petIcon: "🐕",
        serviceName: "Khám sức khỏe",
        serviceIcon: "🏥",
        date: "2025-11-20",
        time: "10:00",
        status: "pending",
        createdAt: "2025-11-18 14:30"
      },
      {
        id: "APT002",
        code: "APT002",
        customerName: "Trần Thị B",
        customerPhone: "0909876543",
        petName: "Miu",
        petIcon: "🐈",
        serviceName: "Tắm spa",
        serviceIcon: "🛁",
        date: "2025-11-20",
        time: "14:00",
        status: "confirmed",
        createdAt: "2025-11-19 09:15"
      },
      {
        id: "APT003",
        code: "APT003",
        customerName: "Lê Văn C",
        customerPhone: "0912345678",
        petName: "Coco",
        petIcon: "🐩",
        serviceName: "Cắt tỉa lông",
        serviceIcon: "✂️",
        date: "2025-11-21",
        time: "09:00",
        status: "cancelled",
        cancelReason: "Khách đột xuất bận",
        createdAt: "2025-11-18 16:45"
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleConfirm = (appointmentId) => {
    const apt = appointments.find(a => a.id === appointmentId);
    setSelectedAppointment(apt);
    setIsConfirmModalOpen(true);
  };

  const handleCancel = (appointmentId) => {
    const apt = appointments.find(a => a.id === appointmentId);
    setSelectedAppointment(apt);
    setIsCancelModalOpen(true);
  };

  const handleConfirmSuccess = (data) => {
    setAppointments(appointments.map(apt =>
      apt.id === data.appointmentId
        ? { ...apt, status: "confirmed", confirmedAt: new Date().toISOString(), confirmedBy: "Receptionist" }
        : apt
    ));
    showToast("✅ Đã xác nhận lịch hẹn thành công!");
  };

  const handleCancelSuccess = (data) => {
    setAppointments(appointments.map(apt =>
      apt.id === data.appointmentId
        ? { ...apt, status: "cancelled", cancelReason: data.reason, cancelledAt: new Date().toISOString() }
        : apt
    ));
    showToast("❌ Đã hủy lịch hẹn");
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchFilter = filter === "all" || apt.status === filter;
    const matchSearch = apt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       apt.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: "Chờ xác nhận", class: "status-pending", icon: "⏳" },
      confirmed: { label: "Đã xác nhận", class: "status-confirmed", icon: "✅" },
      cancelled: { label: "Đã hủy", class: "status-cancelled", icon: "✕" }
    };
    return badges[status] || badges.pending;
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Quản lý đặt lịch"
        subtitle="Xem, xác nhận và hủy lịch hẹn của khách hàng"
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

        <div className="stats-card stats-card-error">
          <div className="stats-icon">✕</div>
          <div className="stats-content">
            <p className="stats-title">Đã hủy</p>
            <h3 className="stats-value">{appointments.filter(a => a.status === 'cancelled').length}</h3>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="table-container">
        <div className="table-header">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">⏳ Chờ xác nhận</option>
            <option value="confirmed">✅ Đã xác nhận</option>
            <option value="cancelled">✕ Đã hủy</option>
          </select>

          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên khách hàng hoặc mã lịch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Table Title */}
        <div className="section-header-modern">
          <h3 className="section-title-large">
            <span className="title-icon">📋</span>
            Danh sách lịch đặt
          </h3>
          <span className="section-count">{filteredAppointments.length} lịch hẹn</span>
        </div>

        {/* Appointments Table */}
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{width: '10%'}}>Mã lịch</th>
                <th style={{width: '18%'}}>Khách hàng</th>
                <th style={{width: '12%'}}>Thú cưng</th>
                <th style={{width: '15%'}}>Dịch vụ</th>
                <th style={{width: '12%'}}>Ngày & Giờ</th>
                <th style={{width: '13%'}}>Trạng thái</th>
                <th style={{width: '20%'}}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((apt) => {
                const statusBadge = getStatusBadge(apt.status);
                return (
                  <tr key={apt.id}>
                    <td className="font-mono font-bold">{apt.code}</td>
                    <td>
                      <div className="customer-cell">
                        <p className="font-semibold">{apt.customerName}</p>
                        <p className="text-sm text-gray-500">{apt.customerPhone}</p>
                      </div>
                    </td>
                    <td>
                      <div className="pet-cell">
                        <span className="pet-icon-cell">{apt.petIcon}</span>
                        <span>{apt.petName}</span>
                      </div>
                    </td>
                    <td>
                      <span className="service-icon-small">{apt.serviceIcon}</span>
                      {apt.serviceName}
                    </td>
                    <td>
                      <div className="datetime-cell">
                        <p className="font-semibold">{apt.date}</p>
                        <p className="text-sm text-gray-500">🕐 {apt.time}</p>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${statusBadge.class}`}>
                        {statusBadge.icon} {statusBadge.label}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons-horizontal">
                        {apt.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleConfirm(apt.id)}
                              className="btn-action-sm btn-confirm"
                              title="Xác nhận"
                            >
                              ✅ Xác nhận
                            </button>
                            <button
                              onClick={() => handleCancel(apt.id)}
                              className="btn-action-sm btn-cancel"
                              title="Hủy"
                            >
                              ✕ Hủy
                            </button>
                          </>
                        )}
                        {apt.status === 'confirmed' && (
                          <span className="text-sm text-green-600 font-semibold">
                            ✓ Đã xử lý
                          </span>
                        )}
                        {apt.status === 'cancelled' && (
                          <span className="text-sm text-red-600 italic">
                            Đã hủy: {apt.cancelReason}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredAppointments.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <p className="empty-text">Không tìm thấy lịch đặt nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ConfirmAppointmentModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setSelectedAppointment(null);
        }}
        onSuccess={handleConfirmSuccess}
        appointment={selectedAppointment}
      />

      <CancelAppointmentModal
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