// components/modals/AddRoomModal.jsx
"use client";
import { useState } from "react";

export default function AddRoomModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    code: "",
    type: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const roomTypes = [
    { value: "small", label: "🏠 Nhỏ", subtitle: "Sức chứa: 1 thú cưng", desc: "Dành cho mèo hoặc chó nhỏ" },
    { value: "medium", label: "🏡 Trung", subtitle: "Sức chứa: 2 thú cưng", desc: "Dành cho chó cỡ trung" },
    { value: "large", label: "🏘️ Lớn", subtitle: "Sức chứa: 3 thú cưng", desc: "Dành cho chó lớn hoặc nhiều thú cưng" }
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

    if (!formData.code.trim()) {
      newErrors.code = "Vui lòng nhập mã chuồng";
    }

    if (!formData.type) {
      newErrors.type = "Vui lòng chọn loại chuồng";
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
        code: "",
        type: "",
        notes: ""
      });
      setErrors({});
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      code: "",
      type: "",
      notes: ""
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
            <span className="modal-icon-beautiful">➕</span>
            <h2 className="modal-title-beautiful">Thêm chuồng mới</h2>
          </div>
          <button onClick={handleClose} className="modal-close-beautiful">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body-beautiful">
          {/* Mã chuồng */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">🔢</span>
              Mã chuồng
              <span className="required-star">*</span>
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Ví dụ: A01, B12, C03..."
              className={`form-input-beautiful ${errors.code ? 'input-error-beautiful' : ''}`}
            />
            {errors.code && <span className="error-text-beautiful">{errors.code}</span>}
          </div>

          {/* Loại chuồng */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">🏠</span>
              Loại chuồng
              <span className="required-star">*</span>
            </label>
            <div className="room-type-cards">
              {roomTypes.map((room) => (
                <button
                  key={room.value}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, type: room.value }));
                    if (errors.type) {
                      setErrors(prev => ({ ...prev, type: "" }));
                    }
                  }}
                  className={`room-type-card ${formData.type === room.value ? 'room-type-card-active' : ''}`}
                >
                  <div className="room-type-header">
                    <span className="room-type-label">{room.label}</span>
                    {formData.type === room.value && (
                      <span className="room-type-check">✓</span>
                    )}
                  </div>
                  <p className="room-type-subtitle">{room.subtitle}</p>
                  <p className="room-type-desc">{room.desc}</p>
                </button>
              ))}
            </div>
            {errors.type && <span className="error-text-beautiful">{errors.type}</span>}
          </div>

          {/* Ghi chú */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">📝</span>
              Ghi chú
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Ghi chú về vị trí, đặc điểm..."
              rows="3"
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
                  <span>Thêm chuồng</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}