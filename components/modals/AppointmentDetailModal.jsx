"use client";
import { useState } from "react";

export default function AppointmentDetailModal({ isOpen, onClose, appointment }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !appointment) return null;

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: "Sắp tới", icon: "⏳", color: "#F59E0B", bg: "#FEF3C7" },
      confirmed: { label: "Đã xác nhận", icon: "✅", color: "#10B981", bg: "#D1FAE5" },
      in_progress: { label: "Đang thực hiện", icon: "🔄", color: "#3B82F6", bg: "#DBEAFE" },
      completed: { label: "Hoàn thành", icon: "✓", color: "#10B981", bg: "#D1FAE5" },
      cancelled: { label: "Đã hủy", icon: "✕", color: "#EF4444", bg: "#FEE2E2" }
    };
    return badges[status] || badges.pending;
  };

  const handleClose = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 300);
  };

  const statusBadge = getStatusBadge(appointment.status);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-in'
      }}
      onClick={handleClose}
    >
      <div 
        style={{
          background: 'white',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '600px',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          animation: 'slideUp 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '2px solid #F3F4F6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #FFF5F7 0%, #FFE4E9 100%)'
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '24px', 
            fontWeight: 700, 
            color: '#1F2937',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '28px' }}>📋</span>
            <span>Chi tiết lịch đặt</span>
          </h2>
          <button 
            type="button"
            onClick={handleClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              background: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#EF4444';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'rotate(90deg)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = 'inherit';
              e.currentTarget.style.transform = 'rotate(0deg)';
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Appointment Code */}
          <div style={{
            marginBottom: '24px',
            padding: '16px',
            background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
            borderRadius: '12px',
            border: '2px solid #E5E7EB'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ 
                  margin: '0 0 8px 0', 
                  fontSize: '13px', 
                  color: '#6B7280',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Mã lịch
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '20px', 
                  fontWeight: 700,
                  color: '#1F2937',
                  fontFamily: 'monospace'
                }}>
                  {appointment.code}
                </p>
              </div>
              <div style={{
                padding: '8px 16px',
                background: statusBadge.bg,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ fontSize: '18px' }}>{statusBadge.icon}</span>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: 600,
                  color: statusBadge.color
                }}>
                  {statusBadge.label}
                </span>
              </div>
            </div>
          </div>

          {/* Pet Info */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              margin: '0 0 12px 0', 
              fontSize: '16px', 
              fontWeight: 600,
              color: '#6B7280',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>🐾</span>
              <span>Thông tin thú cưng</span>
            </h3>
            <div style={{
              padding: '16px',
              background: '#F9FAFB',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '40px' }}>{appointment.petIcon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ 
                  margin: '0 0 4px 0', 
                  fontSize: '18px', 
                  fontWeight: 700,
                  color: '#1F2937'
                }}>
                  {appointment.petName}
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  color: '#6B7280'
                }}>
                  {appointment.petType || 'Chó'}
                </p>
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              margin: '0 0 12px 0', 
              fontSize: '16px', 
              fontWeight: 600,
              color: '#6B7280',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>🏥</span>
              <span>Dịch vụ</span>
            </h3>
            <div style={{
              padding: '16px',
              background: '#F9FAFB',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '32px' }}>{appointment.serviceIcon}</span>
              <p style={{ 
                margin: 0, 
                fontSize: '16px', 
                fontWeight: 600,
                color: '#1F2937'
              }}>
                {appointment.serviceName}
              </p>
            </div>
          </div>

          {/* Date & Time */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div>
              <h3 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '16px', 
                fontWeight: 600,
                color: '#6B7280',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>📅</span>
                <span>Ngày</span>
              </h3>
              <div style={{
                padding: '16px',
                background: '#F9FAFB',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                textAlign: 'center'
              }}>
                <p style={{ 
                  margin: 0, 
                  fontSize: '18px', 
                  fontWeight: 700,
                  color: '#1F2937'
                }}>
                  {appointment.date}
                </p>
              </div>
            </div>

            <div>
              <h3 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '16px', 
                fontWeight: 600,
                color: '#6B7280',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>🕐</span>
                <span>Giờ</span>
              </h3>
              <div style={{
                padding: '16px',
                background: '#F9FAFB',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                textAlign: 'center'
              }}>
                <p style={{ 
                  margin: 0, 
                  fontSize: '18px', 
                  fontWeight: 700,
                  color: '#1F2937'
                }}>
                  {appointment.time}
                </p>
              </div>
            </div>
          </div>

          {/* Status Info */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              margin: '0 0 12px 0', 
              fontSize: '16px', 
              fontWeight: 600,
              color: '#6B7280',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>⏳</span>
              <span>Trạng thái</span>
            </h3>
            <div style={{
              padding: '16px',
              background: statusBadge.bg,
              borderRadius: '12px',
              border: `2px solid ${statusBadge.color}`,
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '32px' }}>{statusBadge.icon}</span>
              <p style={{ 
                margin: 0, 
                fontSize: '16px', 
                fontWeight: 600,
                color: statusBadge.color
              }}>
                {statusBadge.label}
              </p>
            </div>
          </div>

          {/* Notes */}
          {appointment.notes && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '16px', 
                fontWeight: 600,
                color: '#6B7280',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>📝</span>
                <span>Ghi chú</span>
              </h3>
              <div style={{
                padding: '16px',
                background: '#FFFBEB',
                borderRadius: '12px',
                border: '1px solid #FCD34D'
              }}>
                <p style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  color: '#78716C',
                  lineHeight: 1.6
                }}>
                  {appointment.notes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px 24px',
          borderTop: '2px solid #F3F4F6',
          background: '#F9FAFB',
          borderRadius: '0 0 16px 16px'
        }}>
          <button
            onClick={handleClose}
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              border: 'none',
              borderRadius: '12px',
              background: loading 
                ? '#D1D5DB' 
                : 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <span>✓</span>
            <span>Đóng</span>
          </button>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(20px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}