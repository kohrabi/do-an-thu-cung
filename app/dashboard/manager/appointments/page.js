// FILE: app/(dashboard)/manager/appointments/page.js
// THAY THẾ TOÀN BỘ NỘI DUNG CŨ

"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import UpdateAppointmentModal from "@/components/modals/UpdateAppointmentModal";

export default function ManagerAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Mock staff
    setStaffList([
      { id: "EMP001", name: "Nguyễn Văn A", role: "veterinarian" },
      { id: "EMP002", name: "Trần Thị B", role: "care_staff" },
      { id: "EMP003", name: "Lê Văn C", role: "care_staff" }
    ]);

    // Mock appointments
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
        serviceCategory: "medical",
        date: "2025-11-15",
        time: "10:00",
        status: "pending",
        assignedStaffName: "",
        notes: ""
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
        serviceCategory: "care",
        date: "2025-11-16",
        time: "14:00",
        status: "confirmed",
        assignedStaffName: "Trần Thị B",
        notes: ""
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
        serviceCategory: "care",
        date: "2025-11-17",
        time: "09:00",
        status: "in_progress",
        assignedStaffName: "Lê Văn C",
        notes: ""
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleUpdateAppointment = (data) => {
    setAppointments(appointments.map(apt => {
      if (apt.id === data.appointmentId) {
        const staff = staffList.find(s => s.id === data.assignedStaffId);
        return {
          ...apt,
          status: data.status,
          assignedStaffId: data.assignedStaffId,
          assignedStaffName: staff ? staff.name : "",
          notes: data.notes
        };
      }
      return apt;
    }));
    showToast("✅ Cập nhật lịch hẹn thành công!");
  };

  const handleOpenUpdate = (appointment) => {
    setSelectedAppointment(appointment);
    setIsUpdateModalOpen(true);
  };

  const filteredAppointments = appointments.filter(apt =>
    apt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: "Chờ xác nhận", class: "status-pending", icon: "⏳" },
      confirmed: { label: "Đã xác nhận", class: "status-confirmed", icon: "✅" },
      in_progress: { label: "Đang thực hiện", class: "status-in-progress", icon: "🔄" },
      completed: { label: "Hoàn thành", class: "status-completed", icon: "✓" },
      cancelled: { label: "Đã hủy", class: "status-cancelled", icon: "✕" }
    };
    return badges[status] || badges.pending;
  };

  const stats = {
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    inProgress: appointments.filter(a => a.status === 'in_progress').length,
    completed: appointments.filter(a => a.status === 'completed').length
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Quản lý lịch đặt"
        subtitle="Theo dõi, phân công và điều phối lịch hẹn"
      />

      {/* 1. STATS SECTION - TÁCH RIÊNG */}
      <div className="section-separated">
        <div className="stats-grid-custom">
          <div className="stat-card-modern stat-primary">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">⏳</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Chờ xác nhận</p>
              <h3 className="stat-number">{stats.pending}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-success">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">✅</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Đã xác nhận</p>
              <h3 className="stat-number">{stats.confirmed}</h3>
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

          <div className="stat-card-modern">
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

      {/* 2. SEARCH SECTION - BÊN PHẢI */}
      <div className="section-separated">
        <div className="search-section-right">
          <div className="search-box-modern">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm theo khách hàng, thú cưng, mã lịch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-modern"
            />
          </div>
        </div>
      </div>

      {/* 3. TABLE SECTION - VỚI DÒNG "DANH SÁCH LỊCH ĐẶT" */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Danh sách lịch đặt
          </h2>
          <span className="section-count">{filteredAppointments.length} lịch hẹn</span>
        </div>

        <div className="table-modern-wrapper">
          <table className="table-modern">
            <thead>
              <tr>
                <th style={{ width: '10%' }}>Mã lịch</th>
                <th style={{ width: '18%' }}>Khách hàng</th>
                <th style={{ width: '15%' }}>Thú cưng</th>
                <th style={{ width: '15%' }}>Dịch vụ</th>
                <th style={{ width: '12%' }}>Ngày & Giờ</th>
                <th style={{ width: '15%' }}>Nhân viên</th>
                <th style={{ width: '10%' }}>Trạng thái</th>
                <th style={{ width: '5%' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((apt) => {
                const statusBadge = getStatusBadge(apt.status);
                return (
                  <tr key={apt.id}>
                    <td>
                      <span className="staff-id-badge">{apt.code}</span>
                    </td>
                    <td>
                      <div className="staff-name-cell">
                        <span className="staff-name">{apt.customerName}</span>
                        <span className="staff-specialization">{apt.customerPhone}</span>
                      </div>
                    </td>
                    <td>
                      <div className="pet-info-cell">
                        <span className="pet-icon-cell">{apt.petIcon}</span>
                        <span>{apt.petName}</span>
                      </div>
                    </td>
                    <td>
                      <div className="service-info-cell">
                        <span className="service-icon-cell">{apt.serviceIcon}</span>
                        <span>{apt.serviceName}</span>
                      </div>
                    </td>
                    <td>
                      <div className="staff-name-cell">
                        <span className="staff-name">{apt.date}</span>
                        <span className="staff-specialization">🕐 {apt.time}</span>
                      </div>
                    </td>
                    <td>
                      {apt.assignedStaffName ? (
                        <div className="staff-assigned-cell">
                          <span className="staff-icon-small">
                            {apt.serviceCategory === 'medical' ? '👨‍⚕️' : '🧑‍🔧'}
                          </span>
                          <span>{apt.assignedStaffName}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Chưa phân công</span>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge-modern ${statusBadge.class}`}>
                        <span className="badge-icon">{statusBadge.icon}</span>
                        <span>{statusBadge.label}</span>
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons-modern">
                        <button
                          onClick={() => handleOpenUpdate(apt)}
                          className="btn-icon-action btn-edit-icon"
                          title="Cập nhật"
                        >
                          ✏️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredAppointments.length === 0 && (
            <div className="empty-state-modern">
              <div className="empty-icon">🔍</div>
              <p className="empty-text">Không tìm thấy lịch đặt nào</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <UpdateAppointmentModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedAppointment(null);
        }}
        onSuccess={handleUpdateAppointment}
        appointment={selectedAppointment}
        staffList={staffList}
      />

      {/* TOAST */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}