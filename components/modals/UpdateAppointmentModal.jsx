"use client";
import { useState, useEffect } from "react";

export default function UpdateAppointmentModal({ isOpen, onClose, onSuccess, appointment, staffList }) {
  const [formData, setFormData] = useState({
    status: "",
    assignedStaffId: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (appointment && isOpen) {
      setFormData({
        status: appointment.status || "pending",
        assignedStaffId: appointment.assignedStaffId || "",
        notes: appointment.notes || ""
      });
      setErrors({});
    }
  }, [appointment, isOpen]);

  const statuses = [
    { value: "pending", label: "Đang chờ", icon: "⏳", color: "#F59E0B" },
    { value: "confirmed", label: "Đã xác nhận", icon: "✅", color: "#10B981" },
    { value: "in_progress", label: "Đang thực hiện", icon: "🔄", color: "#3B82F6" },
    { value: "completed", label: "Hoàn thành", icon: "✓", color: "#10B981" },
    { value: "cancelled", label: "Đã hủy", icon: "✕", color: "#EF4444" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleStatusChange = (statusValue) => {
    setFormData(prev => ({ ...prev, status: statusValue }));
    if (errors.status) {
      setErrors(prev => ({ ...prev, status: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.status) {
      newErrors.status = "Vui lòng chọn trạng thái";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      onSuccess({
        appointmentId: appointment.id,
        status: formData.status,
        assignedStaffId: formData.assignedStaffId,
        notes: formData.notes
      });
      onClose();
    }, 1000);
  };

  if (!isOpen || !appointment) return null;

  const getStaffLabel = (staff) => {
    const roleLabels = {
      veterinarian: "Bác sĩ thú y",
      care_staff: "Nhân viên chăm sóc",
      receptionist: "Lễ tân"
    };
    return `${staff.name} - ${roleLabels[staff.role] || staff.role}`;
  };

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
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'white',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '700px',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)'
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
            <span>📅</span>
            <span>Cập nhật lịch đặt</span>
          </h2>
          <button 
            type="button"
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              background: '#F3F4F6',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#EF4444';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#F3F4F6';
              e.currentTarget.style.color = 'inherit';
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          {/* Pet Info Card */}
          <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, #FFF5F7 0%, #FFE4E9 100%)',
            borderRadius: '12px',
            marginBottom: '20px',
            border: '2px solid #FFD4DC'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px',
              marginBottom: '15px'
            }}>
              <span style={{ 
                fontSize: '50px',
                width: '70px',
                height: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                {appointment.petIcon}
              </span>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  margin: '0 0 5px 0', 
                  fontSize: '22px', 
                  fontWeight: 700,
                  color: '#1F2937'
                }}>
                  {appointment.petName}
                </h3>
                <p style={{ 
                  margin: 0, 
                  color: '#6B7280', 
                  fontSize: '14px' 
                }}>
                  👤 {appointment.customerName}
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px',
              background: 'white',
              padding: '15px',
              borderRadius: '10px'
            }}>
              <div>
                <p style={{ 
                  margin: '0 0 5px 0', 
                  fontSize: '11px', 
                  color: '#9CA3AF',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}>
                  {appointment.serviceIcon} DỊCH VỤ
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  fontWeight: 600,
                  color: '#1F2937'
                }}>
                  {appointment.serviceName}
                </p>
              </div>

              <div>
                <p style={{ 
                  margin: '0 0 5px 0', 
                  fontSize: '11px', 
                  color: '#9CA3AF',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}>
                  📅 NGÀY GIỜ
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  fontWeight: 600,
                  color: '#1F2937'
                }}>
                  {appointment.date} • {appointment.time}
                </p>
              </div>
            </div>
          </div>

          {/* Status Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151'
            }}>
              📊 Trạng thái <span style={{ color: '#EF4444' }}>*</span>
            </label>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '10px'
            }}>
              {statuses.map(status => (
                <label
                  key={status.value}
                  style={{
                    padding: '12px',
                    border: `2px solid ${formData.status === status.value ? status.color : '#E5E7EB'}`,
                    borderRadius: '8px',
                    background: formData.status === status.value ? `${status.color}15` : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseOver={(e) => {
                    if (formData.status !== status.value) {
                      e.currentTarget.style.borderColor = status.color;
                      e.currentTarget.style.background = `${status.color}08`;
                    }
                  }}
                  onMouseOut={(e) => {
                    if (formData.status !== status.value) {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.background = 'white';
                    }
                  }}
                >
                  <input
                    type="radio"
                    name="status"
                    value={status.value}
                    checked={formData.status === status.value}
                    onChange={() => handleStatusChange(status.value)}
                    style={{ 
                      margin: 0,
                      cursor: 'pointer',
                      width: '16px',
                      height: '16px'
                    }}
                  />
                  <span style={{ fontSize: '18px' }}>{status.icon}</span>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: 600,
                    color: formData.status === status.value ? status.color : '#6B7280'
                  }}>
                    {status.label}
                  </span>
                </label>
              ))}
            </div>

            {errors.status && (
              <p style={{ 
                color: '#EF4444', 
                fontSize: '13px', 
                margin: '8px 0 0 0',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <span>⚠️</span>
                <span>{errors.status}</span>
              </p>
            )}

            {/* Status Flow Info */}
            <div style={{
              marginTop: '12px',
              padding: '12px',
              background: '#F9FAFB',
              borderRadius: '8px',
              border: '1px solid #E5E7EB'
            }}>
              <p style={{ 
                margin: '0 0 5px 0', 
                fontSize: '13px', 
                fontWeight: 600,
                color: '#6B7280'
              }}>
                💡 Luồng trạng thái:
              </p>
              <p style={{ 
                margin: 0, 
                fontSize: '13px', 
                color: '#6B7280',
                lineHeight: 1.6
              }}>
                Đang chờ → Đã xác nhận → Đang thực hiện → Hoàn thành
              </p>
            </div>
          </div>

          {/* Assigned Staff */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151'
            }}>
              👨‍⚕️ Phân công nhân viên
            </label>
            <select
              name="assignedStaffId"
              value={formData.assignedStaffId}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none',
                cursor: 'pointer',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#10B981';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E5E7EB';
              }}
            >
              <option value="">-- Chưa phân công --</option>
              {staffList && staffList.map(staff => (
                <option key={staff.id} value={staff.id}>
                  {getStaffLabel(staff)}
                </option>
              ))}
            </select>
            <p style={{
              fontSize: '13px',
              color: '#6B7280',
              margin: '5px 0 0 0',
              fontStyle: 'italic'
            }}>
              🩺 Dịch vụ y tế chỉ được phân cho bác sĩ thú y
            </p>
          </div>

          {/* Notes */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151'
            }}>
              📝 Ghi chú quản lý
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Ghi chú nội bộ về lịch hẹn..."
              rows="4"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '15px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                outline: 'none',
                resize: 'vertical',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#10B981';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E5E7EB';
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            justifyContent: 'flex-end',
            paddingTop: '15px',
            borderTop: '1px solid #E5E7EB'
          }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                padding: '12px 24px',
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                background: 'white',
                fontSize: '15px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                color: '#6B7280',
                transition: 'all 0.2s',
                opacity: loading ? 0.5 : 1
              }}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                background: loading 
                  ? '#D1D5DB' 
                  : 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
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
                  <span>Đang cập nhật...</span>
                </>
              ) : (
                <>
                  <span>✅</span>
                  <span>Cập nhật</span>
                </>
              )}
            </button>
          </div>
        </form>

        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}