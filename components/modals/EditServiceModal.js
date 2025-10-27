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

  useEffect(() => {
    if (service) {
      setFormData({
        id: service.id,
        name: service.name,
        category: service.category,
        price: service.price.toString(),
        duration: service.duration.toString(),
        description: service.description
      });
    }
  }, [service]);

  const categories = [
    "🏥 Khám bệnh & điều trị",
    "💉 Tiêm phòng & xét nghiệm",
    "🛁 Tắm & vệ sinh",
    "✂️ Cắt tỉa & tạo kiểu",
    "💆 Spa & massage",
    "🏠 Lưu trú & chăm sóc"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên dịch vụ";
    }

    if (!formData.category) {
      newErrors.category = "Vui lòng chọn danh mục";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Vui lòng nhập giá hợp lệ";
    }

    if (!formData.duration || parseInt(formData.duration) <= 0) {
      newErrors.duration = "Vui lòng nhập thời gian hợp lệ";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Vui lòng nhập mô tả";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSuccess(formData);
    onClose();
    
    // Reset form
    setFormData({
      id: "",
      name: "",
      category: "",
      price: "",
      duration: "",
      description: ""
    });
    setErrors({});
  };

  const handleClose = () => {
    setFormData({
      id: "",
      name: "",
      category: "",
      price: "",
      duration: "",
      description: ""
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-modern" onClick={handleClose}>
      <div className="modal-container-modern" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-modern">
          <h2 className="modal-title-modern">
            <span className="modal-title-icon">✏️</span>
            Chỉnh sửa dịch vụ
          </h2>
          <button onClick={handleClose} className="modal-close-btn-modern">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body-modern">
          {/* Tên dịch vụ */}
          <div className="form-group-modern">
            <label className="form-label-modern">
              <span className="label-icon">📝</span>
              Tên dịch vụ
              <span className="required-mark">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="VD: Khám sức khỏe tổng quát"
              className={`form-input-modern ${errors.name ? 'input-error' : ''}`}
            />
            {errors.name && <span className="error-message-modern">{errors.name}</span>}
          </div>

          {/* Danh mục */}
          <div className="form-group-modern">
            <label className="form-label-modern">
              <span className="label-icon">📂</span>
              Danh mục
              <span className="required-mark">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-select-modern ${errors.category ? 'input-error' : ''}`}
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-message-modern">{errors.category}</span>}
          </div>

          {/* Giá & Thời gian (2 cột) */}
          <div className="form-row-modern">
            <div className="form-group-modern">
              <label className="form-label-modern">
                <span className="label-icon">💰</span>
                Giá dịch vụ (VNĐ)
                <span className="required-mark">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="VD: 200000"
                min="0"
                step="1000"
                className={`form-input-modern ${errors.price ? 'input-error' : ''}`}
              />
              {errors.price && <span className="error-message-modern">{errors.price}</span>}
            </div>

            <div className="form-group-modern">
              <label className="form-label-modern">
                <span className="label-icon">⏱️</span>
                Thời gian (phút)
                <span className="required-mark">*</span>
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="VD: 30"
                min="1"
                className={`form-input-modern ${errors.duration ? 'input-error' : ''}`}
              />
              {errors.duration && <span className="error-message-modern">{errors.duration}</span>}
            </div>
          </div>

          {/* Mô tả */}
          <div className="form-group-modern">
            <label className="form-label-modern">
              <span className="label-icon">📄</span>
              Mô tả dịch vụ
              <span className="required-mark">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết về dịch vụ..."
              rows="4"
              className={`form-textarea-modern ${errors.description ? 'input-error' : ''}`}
            />
            {errors.description && <span className="error-message-modern">{errors.description}</span>}
          </div>

          {/* Buttons */}
          <div className="modal-footer-modern">
            <button
              type="button"
              onClick={handleClose}
              className="btn-modal-modern btn-cancel-modern"
            >
              <span className="btn-icon">✕</span>
              <span>Hủy</span>
            </button>
            <button
              type="submit"
              className="btn-modal-modern btn-primary-modern"
            >
              <span className="btn-icon">💾</span>
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}