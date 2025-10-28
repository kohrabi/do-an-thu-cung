"use client";
import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import ConfirmAppointmentModal from "@/components/modals/ConfirmAppointmentModal";
import CancelAppointmentModal from "@/components/modals/CancelAppointmentModal";

export default function AppointmentsPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [appointments, setAppointments] = useState([
    {
      id: "APT001",
      customerName: "Nguyễn Văn A",
      phone: "0901234567",
      petName: "Lucky",
      petIcon: "🐕",
      service: "Khám sức khỏe",
      serviceIcon: "🏥",
      date: "2025-11-20",
      time: "10:00",
      status: "pending"
    },
    {
      id: "APT002",
      customerName: "Trần Thị B",
      phone: "0909876543",
      petName: "Miu",
      petIcon: "🐈",
      service: "Tắm spa",
      serviceIcon: "🛁",
      date: "2025-11-20",
      time: "14:00",
      status: "confirmed"
    },
    {
      id: "APT003",
      customerName: "Lê Văn C",
      phone: "0912345678",
      petName: "Coco",
      petIcon: "🐩",
      service: "Cắt tỉa lông",
      serviceIcon: "✂️",
      date: "2025-11-21",
      time: "09:00",
      status: "cancelled"
    }
  ]);

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: "Chờ xác nhận", color: "#F59E0B", bg: "#FEF3C7", icon: "⏳" },
      confirmed: { label: "Đã xác nhận", color: "#10B981", bg: "#D1FAE5", icon: "✅" },
      cancelled: { label: "Đã hủy", color: "#EF4444", bg: "#FEE2E2", icon: "❌" }
    };
    return badges[status] || badges.pending;
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchFilter = filter === "all" || apt.status === filter;
    const matchSearch = apt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       apt.phone.includes(searchTerm) ||
                       apt.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleConfirm = (appointment) => {
    setSelectedAppointment(appointment);
    setShowConfirmModal(true);
  };

  const handleCancel = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const confirmAppointment = () => {
    setAppointments(appointments.map(apt =>
      apt.id === selectedAppointment.id ? { ...apt, status: "confirmed" } : apt
    ));
    setShowConfirmModal(false);
  };

  const cancelAppointment = (reason) => {
    setAppointments(appointments.map(apt =>
      apt.id === selectedAppointment.id ? { ...apt, status: "cancelled", cancelReason: reason } : apt
    ));
    setShowCancelModal(false);
  };

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Quản lý lịch đặt"
        subtitle="Xác nhận và quản lý lịch hẹn khách hàng"
      />

      {/* Stats */}
      <div className="section-separated">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            border: '2px solid #F3F4F6'
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6B7280', fontWeight: 600 }}>
              Tổng lịch hẹn
            </p>
            <h3 style={{ margin: 0, fontSize: '32px', fontWeight: 800, color: '#1F2937' }}>
              {stats.total}
            </h3>
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            border: '2px solid #FCD34D'
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#92400E', fontWeight: 600 }}>
              ⏳ Chờ xác nhận
            </p>
            <h3 style={{ margin: 0, fontSize: '32px', fontWeight: 800, color: '#D97706' }}>
              {stats.pending}
            </h3>
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            border: '2px solid #6EE7B7'
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#065F46', fontWeight: 600 }}>
              ✅ Đã xác nhận
            </p>
            <h3 style={{ margin: 0, fontSize: '32px', fontWeight: 800, color: '#059669' }}>
              {stats.confirmed}
            </h3>
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            border: '2px solid #FCA5A5'
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#991B1B', fontWeight: 600 }}>
              ❌ Đã hủy
            </p>
            <h3 style={{ margin: 0, fontSize: '32px', fontWeight: 800, color: '#DC2626' }}>
              {stats.cancelled}
            </h3>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="section-separated">
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {/* Filters - Left */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setFilter("all")}
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                border: '2px solid',
                borderColor: filter === "all" ? '#667EEA' : '#E5E7EB',
                background: filter === "all" ? '#667EEA' : 'white',
                color: filter === "all" ? 'white' : '#6B7280',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              📋 Tất cả
            </button>
            <button
              onClick={() => setFilter("pending")}
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                border: '2px solid',
                borderColor: filter === "pending" ? '#F59E0B' : '#E5E7EB',
                background: filter === "pending" ? '#F59E0B' : 'white',
                color: filter === "pending" ? 'white' : '#6B7280',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              ⏳ Chờ xác nhận
            </button>
            <button
              onClick={() => setFilter("confirmed")}
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                border: '2px solid',
                borderColor: filter === "confirmed" ? '#10B981' : '#E5E7EB',
                background: filter === "confirmed" ? '#10B981' : 'white',
                color: filter === "confirmed" ? 'white' : '#6B7280',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              ✅ Đã xác nhận
            </button>
            <button
              onClick={() => setFilter("cancelled")}
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                border: '2px solid',
                borderColor: filter === "cancelled" ? '#EF4444' : '#E5E7EB',
                background: filter === "cancelled" ? '#EF4444' : 'white',
                color: filter === "cancelled" ? 'white' : '#6B7280',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              ❌ Đã hủy
            </button>
          </div>

          {/* Search - Right */}
          <div style={{ position: 'relative', minWidth: '300px' }}>
            <input
              type="text"
              placeholder="🔍 Tìm theo tên, SĐT, mã lịch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '2px solid #E5E7EB',
                fontSize: '14px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667EEA'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Danh sách lịch đặt
          </h2>
          <span className="section-count">{filteredAppointments.length} lịch hẹn</span>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '2px solid #F3F4F6'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ background: '#F9FAFB' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Mã lịch</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Khách hàng</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Thú cưng</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Dịch vụ</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Ngày & Giờ</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Trạng thái</th>
                <th style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((apt) => {
                const statusBadge = getStatusBadge(apt.status);
                return (
                  <tr key={apt.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '6px 12px',
                        background: '#F3F4F6',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 700,
                        fontFamily: 'monospace'
                      }}>
                        {apt.id}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>
                          {apt.customerName}
                        </p>
                        <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
                          📞 {apt.phone}
                        </p>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '24px' }}>{apt.petIcon}</span>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>
                          {apt.petName}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '20px' }}>{apt.serviceIcon}</span>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>
                          {apt.service}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>
                          {apt.date}
                        </p>
                        <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
                          🕐 {apt.time}
                        </p>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: 600,
                        background: statusBadge.bg,
                        color: statusBadge.color,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <span>{statusBadge.icon}</span>
                        <span>{statusBadge.label}</span>
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {apt.status === 'pending' && (
                          <button
                            onClick={() => handleConfirm(apt)}
                            style={{
                              padding: '8px 16px',
                              borderRadius: '8px',
                              border: 'none',
                              background: '#10B981',
                              color: 'white',
                              fontSize: '13px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#059669'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#10B981'}
                          >
                            ✅ Xác nhận
                          </button>
                        )}
                        {apt.status !== 'cancelled' && (
                          <button
                            onClick={() => handleCancel(apt)}
                            style={{
                              padding: '8px 16px',
                              borderRadius: '8px',
                              border: 'none',
                              background: '#EF4444',
                              color: 'white',
                              fontSize: '13px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#DC2626'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#EF4444'}
                          >
                            ❌ Hủy
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ConfirmAppointmentModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        appointment={selectedAppointment}
        onConfirm={confirmAppointment}
      />

      <CancelAppointmentModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        appointment={selectedAppointment}
        onCancel={cancelAppointment}
      />
    </div>
  );
}