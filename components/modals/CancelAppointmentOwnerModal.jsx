"use client";
import { useState } from "react";

export default function CancelAppointmentOwnerModal({ isOpen, onClose, onSuccess, appointment }) {
  const [cancelReason, setCancelReason] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const predefinedReasons = [
    { value: "schedule_conflict", label: "Trùng lịch, không thể sắp xếp", icon: "📅" },
    { value: "pet_sick", label: "Thú cưng bị ốm, không thể đi", icon: "🤒" },
    { value: "emergency", label: "Có việc đột xuất khẩn cấp", icon: "🚨" },
    { value: "change_service", label: "Muốn thay đổi dịch vụ khác", icon: "🔄" },
    { value: "change_mind", label: "Không muốn sử dụng dịch vụ nữa", icon: "💭" },
    { value: "other", label: "Lý do khác", icon: "✍️" }
  ];

  const handleReasonSelect = (value) => {
    setSelectedReason(value);
    setError("");
    
    if (value !== "other") {
      setCancelReason("");
    }
  };

  const validateForm = () => {
    if (!selectedReason) {
      setError("Vui lòng chọn lý do hủy lịch");
      return false;
    }

    if (selectedReason === "other" && !cancelReason.trim()) {
      setError("Vui lòng nhập lý do hủy lịch");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const finalReason = selectedReason === "other" 
      ? cancelReason 
      : predefinedReasons.find(r => r.value === selectedReason)?.label;

    setTimeout(() => {
      setLoading(false);
      onSuccess({
        appointmentId: appointment.id,
        reason: finalReason,
        cancelledAt: new Date().toISOString()
      });
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    if (!loading) {
      setCancelReason("");
      setSelectedReason("");
      setError("");
      onClose();
    }
  };

  if (!isOpen || !appointment) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
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
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
          animation: 'slideUp 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '2px solid #FEE2E2',
          background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
              }}>
                ⚠️
              </div>
              <div>
                <h2 style={{ 
                  margin: '0 0 4px 0', 
                  fontSize: '24px', 
                  fontWeight: 700, 
                  color: '#991B1B'
                }}>
                  Hủy lịch đặt
                </h2>
                <p style={{
                  margin: 0,
                  fontSize: '13px',
                  color: '#DC2626',
                  fontWeight: 500
                }}>
                  Bạn có chắc chắn muốn hủy lịch này?
                </p>
              </div>
            </div>
            <button 
              type="button"
              onClick={handleClose}
              disabled={loading}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: 'none',
                background: 'white',
                fontSize: '18px',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: loading ? 0.5 : 1,
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#EF4444';
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = 'inherit';
                }
              }}
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Appointment Info */}
          <div style={{ padding: '24px', borderBottom: '1px solid #F3F4F6' }}>
            <h3 style={{
              margin: '0 0 16px 0',
              fontSize: '16px',
              fontWeight: 600,
              color: '#6B7280'
            }}>
              📋 Thông tin lịch đặt
            </h3>
            <div style={{
              padding: '16px',
              background: '#FFF7ED',
              borderRadius: '12px',
              border: '2px solid #FDBA74'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px' }}>{appointment.petIcon}</span>
                <div>
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
                    color: '#78716C',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span>{appointment.serviceIcon}</span>
                    <span>{appointment.serviceName}</span>
                  </p>
                </div>
              </div>
              <div style={{
                display: 'flex',
                gap: '16px',
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid #FED7AA'
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{ 
                    margin: '0 0 4px 0', 
                    fontSize: '12px', 
                    color: '#78716C',
                    fontWeight: 600
                  }}>
                    📅 Ngày
                  </p>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '15px', 
                    fontWeight: 600,
                    color: '#1F2937'
                  }}>
                    {appointment.date}
                  </p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ 
                    margin: '0 0 4px 0', 
                    fontSize: '12px', 
                    color: '#78716C',
                    fontWeight: 600
                  }}>
                    🕐 Giờ
                  </p>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '15px', 
                    fontWeight: 600,
                    color: '#1F2937'
                  }}>
                    {appointment.time}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reason Selection */}
          <div style={{ padding: '24px' }}>
            <h3 style={{
              margin: '0 0 16px 0',
              fontSize: '16px',
              fontWeight: 600,
              color: '#6B7280',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>📝</span>
              <span>Lý do hủy lịch</span>
              <span style={{ color: '#EF4444' }}>*</span>
            </h3>

            {/* Predefined Reasons */}
            <div style={{ 
              display: 'grid',
              gap: '12px',
              marginBottom: '16px'
            }}>
              {predefinedReasons.map(reason => (
                <label
                  key={reason.value}
                  style={{
                    padding: '14px',
                    border: `2px solid ${selectedReason === reason.value ? '#EF4444' : '#E5E7EB'}`,
                    borderRadius: '12px',
                    background: selectedReason === reason.value ? '#FEE2E2' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                  onMouseOver={(e) => {
                    if (selectedReason !== reason.value) {
                      e.currentTarget.style.borderColor = '#FCA5A5';
                      e.currentTarget.style.background = '#FEF2F2';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedReason !== reason.value) {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.background = 'white';
                    }
                  }}
                >
                  <input
                    type="radio"
                    name="cancelReason"
                    value={reason.value}
                    checked={selectedReason === reason.value}
                    onChange={() => handleReasonSelect(reason.value)}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: '#EF4444'
                    }}
                  />
                  <span style={{ fontSize: '20px' }}>{reason.icon}</span>
                  <span style={{ 
                    fontSize: '15px', 
                    fontWeight: selectedReason === reason.value ? 600 : 500,
                    color: selectedReason === reason.value ? '#991B1B' : '#374151',
                    flex: 1
                  }}>
                    {reason.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Custom Reason Input */}
            {selectedReason === "other" && (
              <div style={{ marginTop: '16px' }}>
                <textarea
                  value={cancelReason}
                  onChange={(e) => {
                    setCancelReason(e.target.value);
                    setError("");
                  }}
                  placeholder="Nhập lý do hủy lịch của bạn..."
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `2px solid ${error ? '#EF4444' : '#E5E7EB'}`,
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => {
                    if (!error) {
                      e.target.style.borderColor = '#EF4444';
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = error ? '#EF4444' : '#E5E7EB';
                  }}
                />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div style={{
                marginTop: '12px',
                padding: '12px',
                background: '#FEE2E2',
                borderRadius: '8px',
                border: '1px solid #FCA5A5',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ fontSize: '18px' }}>⚠️</span>
                <p style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  color: '#DC2626',
                  fontWeight: 500
                }}>
                  {error}
                </p>
              </div>
            )}

            {/* Warning Box */}
            <div style={{
              marginTop: '20px',
              padding: '16px',
              background: '#FFFBEB',
              borderRadius: '12px',
              border: '2px solid #FCD34D'
            }}>
              <p style={{
                margin: '0 0 8px 0',
                fontSize: '14px',
                fontWeight: 600,
                color: '#92400E',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ fontSize: '18px' }}>💡</span>
                <span>Lưu ý khi hủy lịch</span>
              </p>
              <ul style={{
                margin: 0,
                paddingLeft: '28px',
                fontSize: '13px',
                color: '#78716C',
                lineHeight: 1.8
              }}>
                <li>Lịch hẹn sẽ bị hủy ngay lập tức</li>
                <li>Bạn có thể đặt lịch mới bất cứ lúc nào</li>
                <li>Nếu đã thanh toán, vui lòng liên hệ quản lý để hoàn tiền</li>
                <li>Thú cưng của bạn sẽ không được phục vụ vào thời gian này</li>
              </ul>
            </div>
          </div>

          {/* Footer Buttons */}
          <div style={{
            padding: '20px 24px',
            borderTop: '2px solid #F3F4F6',
            background: '#F9FAFB',
            display: 'flex',
            gap: '12px',
            borderRadius: '0 0 16px 16px'
          }}>
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              style={{
                flex: 1,
                padding: '14px',
                border: '2px solid #E5E7EB',
                borderRadius: '12px',
                background: 'white',
                color: '#374151',
                fontSize: '16px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.borderColor = '#D1D5DB';
                  e.currentTarget.style.background = '#F9FAFB';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.background = 'white';
                }
              }}
            >
              Quay lại
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '14px',
                border: 'none',
                borderRadius: '12px',
                background: loading 
                  ? '#D1D5DB' 
                  : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
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
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid white',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.6s linear infinite'
                  }}></span>
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <span>✓</span>
                  <span>Xác nhận hủy lịch</span>
                </>
              )}
            </button>
          </div>
        </form>

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
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}