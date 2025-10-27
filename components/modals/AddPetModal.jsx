// components/modals/AddPetModal.jsx
"use client";
import { useState } from "react";

export default function AddPetModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    breed: "",
    gender: "",
    weight: "",
    color: "",
    dateOfBirth: "",
    medicalHistory: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
      newErrors.name = "Vui lòng nhập tên thú cưng";
    }

    if (!formData.type) {
      newErrors.type = "Vui lòng chọn loại thú cưng";
    }

    if (!formData.breed.trim()) {
      newErrors.breed = "Vui lòng nhập giống";
    }

    if (!formData.gender) {
      newErrors.gender = "Vui lòng chọn giới tính";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Vui lòng chọn ngày sinh";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age > 0 ? `${age} tuổi` : "Dưới 1 tuổi";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const petData = {
        ...formData,
        age: calculateAge(formData.dateOfBirth)
      };
      
      setLoading(false);
      onSuccess(petData);
      onClose();
      
      // Reset form
      setFormData({
        name: "",
        type: "",
        breed: "",
        gender: "",
        weight: "",
        color: "",
        dateOfBirth: "",
        medicalHistory: "",
        notes: ""
      });
      setErrors({});
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      name: "",
      type: "",
      breed: "",
      gender: "",
      weight: "",
      color: "",
      dateOfBirth: "",
      medicalHistory: "",
      notes: ""
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-beautiful" onClick={handleClose}>
      <div className="modal-container-beautiful modal-large-beautiful" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-beautiful">
          <div className="modal-header-content">
            <span className="modal-icon-beautiful">🐾</span>
            <h2 className="modal-title-beautiful">Thêm thú cưng mới</h2>
          </div>
          <button onClick={handleClose} className="modal-close-beautiful">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body-beautiful">
          {/* Tên thú cưng */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">📝</span>
              Tên thú cưng
              <span className="required-star">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="VD: Lucky, Miu, Coco..."
              className={`form-input-beautiful ${errors.name ? 'input-error-beautiful' : ''}`}
            />
            {errors.name && <span className="error-text-beautiful">{errors.name}</span>}
          </div>

          {/* Loại & Giống (2 cột) */}
          <div className="form-row-beautiful">
            <div className="form-group-beautiful">
              <label className="form-label-beautiful">
                <span className="label-icon-beautiful">🐾</span>
                Loại thú cưng
                <span className="required-star">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`form-select-beautiful ${errors.type ? 'input-error-beautiful' : ''}`}
              >
                <option value="">-- Chọn loại --</option>
                <option value="Chó">🐕 Chó</option>
                <option value="Mèo">🐈 Mèo</option>
              </select>
              {errors.type && <span className="error-text-beautiful">{errors.type}</span>}
            </div>

            <div className="form-group-beautiful">
              <label className="form-label-beautiful">
                <span className="label-icon-beautiful">🏷️</span>
                Giống
                <span className="required-star">*</span>
              </label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder="VD: Golden Retriever, Mèo Ba Tư..."
                className={`form-input-beautiful ${errors.breed ? 'input-error-beautiful' : ''}`}
              />
              {errors.breed && <span className="error-text-beautiful">{errors.breed}</span>}
            </div>
          </div>

          {/* Giới tính & Ngày sinh (2 cột) */}
          <div className="form-row-beautiful">
            <div className="form-group-beautiful">
              <label className="form-label-beautiful">
                <span className="label-icon-beautiful">⚥</span>
                Giới tính
                <span className="required-star">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`form-select-beautiful ${errors.gender ? 'input-error-beautiful' : ''}`}
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="Đực">♂️ Đực</option>
                <option value="Cái">♀️ Cái</option>
              </select>
              {errors.gender && <span className="error-text-beautiful">{errors.gender}</span>}
            </div>

            <div className="form-group-beautiful">
              <label className="form-label-beautiful">
                <span className="label-icon-beautiful">🎂</span>
                Ngày sinh
                <span className="required-star">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className={`form-input-beautiful ${errors.dateOfBirth ? 'input-error-beautiful' : ''}`}
              />
              {errors.dateOfBirth && <span className="error-text-beautiful">{errors.dateOfBirth}</span>}
            </div>
          </div>

          {/* Cân nặng & Màu lông (2 cột) */}
          <div className="form-row-beautiful">
            <div className="form-group-beautiful">
              <label className="form-label-beautiful">
                <span className="label-icon-beautiful">⚖️</span>
                Cân nặng
              </label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="VD: 5 kg"
                className="form-input-beautiful"
              />
            </div>

            <div className="form-group-beautiful">
              <label className="form-label-beautiful">
                <span className="label-icon-beautiful">🎨</span>
                Màu lông
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="VD: Vàng, Trắng, Nâu..."
                className="form-input-beautiful"
              />
            </div>
          </div>

          {/* Lịch sử y tế */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">🏥</span>
              Lịch sử y tế
            </label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              placeholder="Ghi chú về tiêm phòng, bệnh lý, phẫu thuật..."
              rows="3"
              className="form-textarea-beautiful"
            />
          </div>

          {/* Ghi chú */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">📝</span>
              Ghi chú thêm
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Thói quen, sở thích, điều cần lưu ý..."
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
                  <span>Thêm thú cưng</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}