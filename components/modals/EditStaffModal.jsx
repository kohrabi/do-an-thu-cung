"use client";
import { useState, useEffect } from "react";

export default function EditStaffModal({ isOpen, onClose, onSuccess, staff }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    specialty: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (staff && isOpen) {
      setFormData({
        id: staff.id || "",
        name: staff.name || "",
        email: staff.email || "",
        phone: staff.phone || "",
        role: staff.role || "",
        specialty: staff.specialty || ""
      });
    }
  }, [staff, isOpen]);

  const roles = [
    { value: "vet", label: "Bác sĩ thú y 🩺", icon: "🩺" },
    { value: "care_staff", label: "Nhân viên chăm sóc 🐾", icon: "🐾" },
    { value: "receptionist", label: "Lễ tân 📋", icon: "📋" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.role) newErrors.role = "Vui lòng chọn vai trò";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(formData);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
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
          maxWidth: '600px',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#1F2937' }}>
            ✏️ Chỉnh sửa nhân viên
          </h2>
          <button 
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              background: '#f3f4f6',
              fontSize: '20px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          {/* Staff ID */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151'
            }}>
              Mã nhân viên
            </label>
            <input
              type="text"
              value={formData.id}
              disabled
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                background: '#f9fafb',
                color: '#6b7280'
              }}
            />
          </div>

          {/* Name */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151'
            }}>
              Họ và tên <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${errors.name ? '#EF4444' : '#e5e7eb'}`,
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
            {errors.name && (
              <p style={{ color: '#EF4444', fontSize: '13px', margin: '5px 0 0 0' }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151'
            }}>
              Email <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${errors.email ? '#EF4444' : '#e5e7eb'}`,
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
            {errors.email && (
              <p style={{ color: '#EF4444', fontSize: '13px', margin: '5px 0 0 0' }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151'
            }}>
              Số điện thoại <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0901234567"
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${errors.phone ? '#EF4444' : '#e5e7eb'}`,
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
            {errors.phone && (
              <p style={{ color: '#EF4444', fontSize: '13px', margin: '5px 0 0 0' }}>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Role */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151'
            }}>
              Vai trò <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${errors.role ? '#EF4444' : '#e5e7eb'}`,
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            >
              <option value="">-- Chọn vai trò --</option>
              {roles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            {errors.role && (
              <p style={{ color: '#EF4444', fontSize: '13px', margin: '5px 0 0 0' }}>
                {errors.role}
              </p>
            )}
          </div>

          {/* Specialty */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151'
            }}>
              Chuyên môn
            </label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="VD: Bác sĩ thú y tổng quát"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                background: 'white',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer'
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
                background: loading ? '#9333ea80' : 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '⏳ Đang lưu...' : '💾 Lưu thay đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}