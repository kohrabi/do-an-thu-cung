"use client";
import { useState, useEffect } from "react";

export default function EditServiceModal({ isOpen, onClose, onSuccess, service }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    duration: "",
    description: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service && isOpen) {
      setFormData({
        id: service.id || "",
        name: service.name || "",
        category: service.category || "",
        price: service.price?.toString() || "",
        duration: service.duration?.toString() || "",
        description: service.description || ""
      });
      setErrors({});
    }
  }, [service, isOpen]);

  const categories = [
    { value: "health", label: "Tắm & vệ sinh", icon: "🛁" },
    { value: "grooming", label: "Cắt tỉa & làm đẹp", icon: "✂️" },
    { value: "medical", label: "Y tế & khám bệnh", icon: "💊" },
    { value: "boarding", label: "Lưu trú & chăm sóc", icon: "🏠" }
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
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập tên dịch vụ";
    if (!formData.category) newErrors.category = "Vui lòng chọn danh mục";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Vui lòng nhập giá hợp lệ";
    if (!formData.duration || parseInt(formData.duration) <= 0) newErrors.duration = "Vui lòng nhập thời gian hợp lệ";
    
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

  if (!isOpen || !service) return null;

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
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
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
            <span>✏️</span>
            <span>Chỉnh sửa dịch vụ</span>
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
              transition: 'all 0.2s'
            }}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          {/* Service ID */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#374151' }}>
              🆔 Mã dịch vụ
            </label>
            <input
              type="text"
              value={formData.id}
              disabled
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                background: '#F9FAFB',
                color: '#6B7280'
              }}
            />
          </div>

          {/* Name */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#374151' }}>
              🏷️ Tên dịch vụ <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="VD: Tắm spa cao cấp"
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${errors.name ? '#EF4444' : '#E5E7EB'}`,
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
            {errors.name && <p style={{ color: '#EF4444', fontSize: '13px', margin: '5px 0 0 0' }}>{errors.name}</p>}
          </div>

          {/* Category */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#374151' }}>
              📁 Danh mục <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${errors.category ? '#EF4444' : '#E5E7EB'}`,
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
            {errors.category && <p style={{ color: '#EF4444', fontSize: '13px', margin: '5px 0 0 0' }}>{errors.category}</p>}
          </div>

          {/* Price */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#374151' }}>
              💰 Giá (VNĐ) <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="150000"
              min="0"
              step="1000"
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${errors.price ? '#EF4444' : '#E5E7EB'}`,
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
            {errors.price && <p style={{ color: '#EF4444', fontSize: '13px', margin: '5px 0 0 0' }}>{errors.price}</p>}
          </div>

          {/* Duration */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#374151' }}>
              ⏱️ Thời gian (phút) <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="60"
              min="1"
              step="5"
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${errors.duration ? '#EF4444' : '#E5E7EB'}`,
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
            {errors.duration && <p style={{ color: '#EF4444', fontSize: '13px', margin: '5px 0 0 0' }}>{errors.duration}</p>}
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#374151' }}>
              📝 Mô tả
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả dịch vụ..."
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
                resize: 'vertical'
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
                border: '2px solid #E5E7EB',
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
                background: loading ? '#D1D5DB' : 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '⏳ Đang lưu...' : '💾 Lưu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}