// app/(dashboard)/manager/appointments/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import UpdateAppointmentModal from "@/components/modals/UpdateAppointmentModal";

export default function ManagerAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
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
        petId: "PET001",
        petName: "Lucky",
        petIcon: "🐕",
        serviceId: "SRV001",
        serviceName: "Khám sức khỏe",
        serviceIcon: "🏥",
        serviceCategory: "medical",
        date: "2025-11-15",
        time: "10:00",
        status: "pending",
        assignedStaffId: "",
        assignedStaffName: "",
        notes: "",
        updateHistory: []
      },
      {
        id: "APT002",
        code: "APT002",
        customerName: "Trần Thị B",
        customerPhone: "0909876543",
        petId: "PET002",
        petName: "Miu",
        petIcon: "🐈",
        serviceId: "SRV002",
        serviceName: "Tắm spa",
        serviceIcon: "🛁",
        serviceCategory: "care",
        date: "2025-11-16",
        time: "14:00",
        status: "confirmed",
        assignedStaffId: "EMP002",
        assignedStaffName: "Trần Thị B",
        notes: "",
        updateHistory: [
          { time: "2025-11-14 10:00", action: "Đã xác nhận lịch hẹn" }
        ]
      },
      {
        id: "APT003",
        code: "APT003",
        customerName: "Lê Văn C",
        customerPhone: "0912345678",
        petId: "PET003",
        petName: "Coco",
        petIcon: "🐩",
        serviceId: "SRV003",
        serviceName: "Cắt tỉa lông",
        serviceIcon: "✂️",
        serviceCategory: "care",
        date: "2025-11-17",
        time: "09:00",
        status: "in_progress",
        assignedStaffId: "EMP003",
        assignedStaffName: "Lê Văn C",
        notes: "",
        updateHistory: [
          { time: "2025-11-16 08:00", action: "Đã xác nhận lịch hẹn" },
          { time: "2025-11-17 09:00", action: "Bắt đầu thực hiện dịch vụ" }
        ]
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
          notes: data.notes,
          updateHistory: [
            ...apt.updateHistory,
            {
              time: new Date().toLocaleString('vi-VN'),
              action: `Cập nhật trạng thái: ${getStatusLabel(data.status)}`
            }
          ]
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

  const filteredAppointments = appointments.filter(apt => {
    const matchFilter = filter === "all" || apt.status === filter;
    const matchSearch = apt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       apt.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       apt.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const getStatusLabel = (status) => {
    const labels = {
      pending: "Đang chờ",
      confirmed: "Đã xác nhận",
      in_progress: "Đang thực hiện",
      completed: "Hoàn thành",
      cancelled: "Đã hủy"
    };
    return labels[status] || status;
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: "status-pending", icon: "⏳" },
      confirmed: { class: "status-confirmed", icon: "✅" },
      in_progress: { class: "status-in-progress", icon: "🔄" },
      completed: { class: "status-completed", icon: "✓" },
      cancelled: { class: "status-cancelled", icon: "✕" }
    };
    return badges[status] || badges.pending;
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Quản lý lịch đặt"
        subtitle="Theo dõi, phân công và điều phối lịch hẹn"
      />

      {/* Stats */}
      <div className="stats-grid">
        <div className="stats-card stats-card-warning">
          <div className="stats-icon">⏳</div>
          <div className="stats-content">
            <p className="stats-title">Đang chờ</p>
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
          <div className="stats-icon">🔄</div>
          <div className="stats-content">
            <p className="stats-title">Đang thực hiện</p>
            <h3 className="stats-value">{appointments.filter(a => a.status === 'in_progress').length}</h3>
          </div>
        </div>

        <div className="stats-card stats-card-primary">
          <div className="stats-icon">✓</div>
          <div className="stats-content">
            <p className="stats-title">Hoàn thành</p>
            <h3 className="stats-value">{appointments.filter(a => a.status === 'completed').length}</h3>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="table-container">
        <div className="table-header">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm theo khách hàng, thú cưng, mã lịch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">⏳ Đang chờ</option>
            <option value="confirmed">✅ Đã xác nhận</option>
            <option value="in_progress">🔄 Đang thực hiện</option>
            <option value="completed">✓ Hoàn thành</option>
            <option value="cancelled">✕ Đã hủy</option>
          </select>
        </div>

        {/* Appointments Table */}
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã lịch</th>
                <th>Khách hàng</th>
                <th>Thú cưng</th>
                <th>Dịch vụ</th>
                <th>Ngày & Giờ</th>
                <th>Nhân viên</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((apt) => {
                const statusBadge = getStatusBadge(apt.status);
                return (
                  <tr key={apt.id}>
                    <td className="font-mono font-semibold">{apt.code}</td>
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
                      {apt.assignedStaffName ? (
                        <div className="staff-cell">
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
                      <span className={`status-badge ${statusBadge.class}`}>
                        {statusBadge.icon} {getStatusLabel(apt.status)}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleOpenUpdate(apt)}
                          className="btn-action btn-edit"
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
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <p className="empty-text">Không tìm thấy lịch đặt nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Update Modal */}
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

      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}