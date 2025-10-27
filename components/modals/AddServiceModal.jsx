// components/modals/AddServiceModal.jsx
"use client";
import { useState } from "react";

export default function AddServiceModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    duration: "",
    description: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: "🏥 Khám bệnh & điều trị", label: "🏥 Khám bệnh & điều trị" },
    { value: "💉 Tiêm phòng & xét nghiệm", label: "💉 Tiêm phòng & xét nghiệm" },
    { value: "🛁 Tắm & vệ sinh", label: "🛁 Tắm & vệ sinh" },
    { value: "✂️ Cắt tỉa & tạo kiểu", label: "✂️ Cắt tỉa & tạo kiểu" },
    { value: "💆 Spa & massage", label: "💆 Spa & massage" },
    { value: "🏠 Lưu trú & chăm sóc", label: "🏠 Lưu trú & chăm sóc" }
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

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên dịch vụ";
    }

    if (!formData.category) {
      newErrors.category = "Vui lòng chọn loại dịch vụ";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Vui lòng nhập giá dịch vụ hợp lệ";
    }

    if (!formData.duration || parseInt(formData.duration) <= 0) {
      newErrors.duration = "Vui lòng nhập thời lượng hợp lệ";
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
      onSuccess(formData);
      onClose();
      
      // Reset form
      setFormData({
        name: "",
        category: "",
        price: "",
        duration: "",
        description: ""
      });
      setErrors({});
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
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
    <div className="modal-overlay-beautiful" onClick={handleClose}>
      <div className="modal-container-beautiful" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-beautiful">
          <div className="modal-header-content">
            <span className="modal-icon-beautiful">✨</span>
            <h2 className="modal-title-beautiful">Thêm dịch vụ mới</h2>
          </div>
          <button onClick={handleClose} className="modal-close-beautiful">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body-beautiful">
          {/* Tên dịch vụ */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">📝</span>
              Tên dịch vụ
              <span className="required-star">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ví dụ: Tắm spa cao cấp"
              className={`form-input-beautiful ${errors.name ? 'input-error-beautiful' : ''}`}
            />
            {errors.name && <span className="error-text-beautiful">{errors.name}</span>}
          </div>

          {/* Loại dịch vụ */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">📂</span>
              Loại dịch vụ
              <span className="required-star">*</span>
            </label>
            <div className="category-chips-container">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, category: cat.value }));
                    if (errors.category) {
                      setErrors(prev => ({ ...prev, category: "" }));
                    }
                  }}
                  className={`category-chip ${formData.category === cat.value ? 'category-chip-active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            {errors.category && <span className="error-text-beautiful">{errors.category}</span>}
          </div>

          {/* Giá & Thời lượng */}
          <div className="form-row-beautiful">
            <div className="form-group-beautiful">
              <label className="form-label-beautiful">
                <span className="label-icon-beautiful">💰</span>
                Giá dịch vụ (VNĐ)
                <span className="required-star">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="100000"
                min="0"
                step="1000"
                className={`form-input-beautiful ${errors.price ? 'input-error-beautiful' : ''}`}
              />
              {errors.price && <span className="error-text-beautiful">{errors.price}</span>}
            </div>

            <div className="form-group-beautiful">
              <label className="form-label-beautiful">
                <span className="label-icon-beautiful">⏱️</span>
                Thời lượng (phút)
                <span className="required-star">*</span>
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="60"
                min="1"
                className={`form-input-beautiful ${errors.duration ? 'input-error-beautiful' : ''}`}
              />
              {errors.duration && <span className="error-text-beautiful">{errors.duration}</span>}
            </div>
          </div>

          {/* Mô tả dịch vụ */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">📄</span>
              Mô tả dịch vụ
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết về dịch vụ, quy trình thực hiện..."
              rows="4"
              className="form-textarea-beautiful"
            />
          </div>

          {/* Buttons */}
          <div className="modal-footer-beautiful">
            <button
              type="button"
              onClick={handleClose}
              className="btn-beautiful btn-cancel-beautiful"
            >
              <span className="btn-icon-beautiful">✕</span>
              <span>Hủy</span>
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-beautiful btn-primary-beautiful"
            >
              {loading ? (
                <>
                  <span className="spinner-beautiful"></span>
                  <span>Đang thêm...</span>
                </>
              ) : (
                <>
                  <span className="btn-icon-beautiful">✓</span>
                  <span>Thêm dịch vụ</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}