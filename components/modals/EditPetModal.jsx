// components/modals/EditPetModal.jsx
"use client";
import { useState, useEffect } from "react";

export default function EditPetModal({ isOpen, onClose, onSuccess, pet }) {
  const [formData, setFormData] = useState({
    id: "",
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

  useEffect(() => {
    if (pet && isOpen) {
      setFormData({
        id: pet.id,
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        gender: pet.gender,
        weight: pet.weight,
        color: pet.color,
        dateOfBirth: pet.dateOfBirth,
        medicalHistory: pet.medicalHistory,
        notes: pet.notes
      });
    }
  }, [pet, isOpen]);

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

    if (!formData.breed.trim()) {
      newErrors.breed = "Vui lòng nhập giống";
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
      const updatedPet = {
        ...formData,
        age: calculateAge(formData.dateOfBirth),
        icon: formData.type === 'Chó' ? '🐕' : '🐈'
      };
      
      setLoading(false);
      onSuccess(updatedPet);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen || !pet) return null;

  return (
    <div className="modal-overlay-beautiful" onClick={handleClose}>
      <div className="modal-container-beautiful modal-large-beautiful" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-beautiful">
          <div className="modal-header-content">
            <span className="modal-icon-beautiful">✏️</span>
            <h2 className="modal-title-beautiful">Chỉnh sửa thông tin thú cưng</h2>
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
              className={`form-input-beautiful ${errors.name ? 'input-error-beautiful' : ''}`}
            />
            {errors.name && <span className="error-text-beautiful">{errors.name}</span>}
          </div>

          {/* Loại & Giống */}
          <div className="form-row-beautiful">
            <div className="form-group-beautiful">
              <label className="form-label-beautiful">
                <span className="label-icon-beautiful">🐾</span>
                Loại thú cưng
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-select-beautiful"
              >
                <option value="Chó">🐕 Chó</option>
                <option value="Mèo">🐈 Mèo</option>
              </select>
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
                className={`form-input-beautiful ${errors.breed ? 'input-error-beautiful' : ''}`}
              />
              {errors.breed && <span className="error-text-beautiful">{errors.breed}</span>}
            </div>
          </div>

          {/* Giới tính & Ngày sinh */}
          <div className="form-row-beautiful">
            <div className="form-group-beautiful">
              <label className="form-label-beautiful">
                <span className="label-icon-beautiful">⚥</span>
                Giới tính
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-select-beautiful"
              >
                <option value="Đực">♂️ Đực</option>
                <option value="Cái">♀️ Cái</option>
              </select>
            </div>

            <div className="form-group-beautiful">
              <label className="form-label-beautiful">
                <span className="label-icon-beautiful">🎂</span>
                Ngày sinh
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className="form-input-beautiful"
              />
            </div>
          </div>

          {/* Cân nặng & Màu lông */}
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
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <span className="btn-icon-beautiful">💾</span>
                  <span>Lưu thay đổi</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}