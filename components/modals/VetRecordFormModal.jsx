// components/modals/VetRecordFormModal.jsx
"use client";
import { useState, useEffect } from "react";

export default function VetRecordFormModal({ isOpen, onClose, onSuccess, record }) {
  const [formData, setFormData] = useState({
    petId: "",
    petName: "",
    petIcon: "",
    petType: "",
    ownerId: "",
    ownerName: "",
    ownerPhone: "",
    symptoms: "",
    diagnosis: "",
    prescription: "",
    treatment: "",
    notes: "",
    followUpDate: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Mock pets list for selection
  const [pets, setPets] = useState([
    {
      id: "PET001",
      name: "Lucky",
      icon: "🐕",
      type: "Chó Golden Retriever",
      ownerId: "CUS001",
      ownerName: "Nguyễn Văn A",
      ownerPhone: "0901234567"
    },
    {
      id: "PET002",
      name: "Miu",
      icon: "🐈",
      type: "Mèo Ba Tư",
      ownerId: "CUS002",
      ownerName: "Trần Thị B",
      ownerPhone: "0909876543"
    },
    {
      id: "PET003",
      name: "Coco",
      icon: "🐩",
      type: "Chó Poodle",
      ownerId: "CUS003",
      ownerName: "Lê Văn C",
      ownerPhone: "0912345678"
    }
  ]);

  useEffect(() => {
    if (record && isOpen) {
      // Edit mode
      setFormData({
        petId: record.petId,
        petName: record.petName,
        petIcon: record.petIcon,
        petType: record.petType,
        ownerId: record.ownerId,
        ownerName: record.ownerName,
        ownerPhone: record.ownerPhone,
        symptoms: record.symptoms,
        diagnosis: record.diagnosis,
        prescription: record.prescription,
        treatment: record.treatment,
        notes: record.notes,
        followUpDate: record.followUpDate
      });
    } else if (isOpen) {
      // Create mode
      setFormData({
        petId: "",
        petName: "",
        petIcon: "",
        petType: "",
        ownerId: "",
        ownerName: "",
        ownerPhone: "",
        symptoms: "",
        diagnosis: "",
        prescription: "",
        treatment: "",
        notes: "",
        followUpDate: ""
      });
    }
  }, [record, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handlePetSelect = (e) => {
    const petId = e.target.value;
    const selectedPet = pets.find(p => p.id === petId);
    
    if (selectedPet) {
      setFormData(prev => ({
        ...prev,
        petId: selectedPet.id,
        petName: selectedPet.name,
        petIcon: selectedPet.icon,
        petType: selectedPet.type,
        ownerId: selectedPet.ownerId,
        ownerName: selectedPet.ownerName,
        ownerPhone: selectedPet.ownerPhone
      }));
      
      if (errors.petId) {
        setErrors(prev => ({ ...prev, petId: "" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.petId) {
      newErrors.petId = "Vui lòng chọn thú cưng";
    }

    if (!formData.symptoms.trim()) {
      newErrors.symptoms = "Vui lòng nhập triệu chứng";
    }

    if (!formData.diagnosis.trim()) {
      newErrors.diagnosis = "Vui lòng nhập chẩn đoán";
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
    }, 1000);
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  const isEditMode = !!record;

  return (
    <div className="modal-overlay-beautiful" onClick={handleClose}>
      <div className="modal-container-beautiful modal-large-beautiful" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-beautiful">
          <div className="modal-header-content">
            <span className="modal-icon-beautiful">{isEditMode ? '✏️' : '➕'}</span>
            <h2 className="modal-title-beautiful">
              {isEditMode ? 'Chỉnh sửa hồ sơ bệnh án' : 'Tạo hồ sơ bệnh án mới'}
            </h2>
          </div>
          <button onClick={handleClose} className="modal-close-beautiful">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body-beautiful">
          {/* Select Pet (only in create mode) */}
          {!isEditMode && (
            <div className="form-group-beautiful">
              <label className="form-label-beautiful">
                <span className="label-icon-beautiful">🐾</span>
                Chọn thú cưng
                <span className="required-star">*</span>
              </label>
              <select
                name="petId"
                value={formData.petId}
                onChange={handlePetSelect}
                className={`form-select-beautiful ${errors.petId ? 'input-error-beautiful' : ''}`}
              >
                <option value="">-- Chọn thú cưng --</option>
                {pets.map(pet => (
                  <option key={pet.id} value={pet.id}>
                    {pet.icon} {pet.name} - {pet.ownerName}
                  </option>
                ))}
              </select>
              {errors.petId && <span className="error-text-beautiful">{errors.petId}</span>}
            </div>
          )}

          {/* Show pet info if selected */}
          {formData.petId && (
            <div className="selected-pet-info">
              <div className="selected-pet-header">
                <span className="selected-pet-icon">{formData.petIcon}</span>
                <div>
                  <p className="selected-pet-name">{formData.petName}</p>
                  <p className="selected-pet-type">{formData.petType}</p>
                </div>
              </div>
              <div className="selected-owner-info">
                <p>👤 {formData.ownerName}</p>
                <p>📱 {formData.ownerPhone}</p>
              </div>
            </div>
          )}

          {/* Symptoms */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">🩺</span>
              Triệu chứng
              <span className="required-star">*</span>
            </label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="Mô tả các triệu chứng quan sát được..."
              rows="3"
              className={`form-textarea-beautiful ${errors.symptoms ? 'input-error-beautiful' : ''}`}
            />
            {errors.symptoms && <span className="error-text-beautiful">{errors.symptoms}</span>}
          </div>

          {/* Diagnosis */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">🔬</span>
              Chẩn đoán
              <span className="required-star">*</span>
            </label>
            <textarea
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              placeholder="Nhập kết quả chẩn đoán..."
              rows="3"
              className={`form-textarea-beautiful ${errors.diagnosis ? 'input-error-beautiful' : ''}`}
            />
            {errors.diagnosis && <span className="error-text-beautiful">{errors.diagnosis}</span>}
          </div>

          {/* Prescription */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">💊</span>
              Đơn thuốc
            </label>
            <textarea
              name="prescription"
              value={formData.prescription}
              onChange={handleChange}
              placeholder="Kê đơn thuốc (tên thuốc, liều lượng, cách dùng)..."
              rows="4"
              className="form-textarea-beautiful"
            />
          </div>

          {/* Treatment */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">💉</span>
              Điều trị
            </label>
            <textarea
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              placeholder="Mô tả các phương pháp điều trị đã thực hiện..."
              rows="3"
              className="form-textarea-beautiful"
            />
          </div>

          {/* Notes */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">📝</span>
              Ghi chú thêm
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Lưu ý về chế độ chăm sóc, dinh dưỡng..."
              rows="3"
              className="form-textarea-beautiful"
            />
          </div>

          {/* Follow-up Date */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">🔄</span>
              Ngày tái khám (nếu có)
            </label>
            <input
              type="date"
              name="followUpDate"
              value={formData.followUpDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="form-input-beautiful"
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
                  <span>{isEditMode ? 'Đang lưu...' : 'Đang tạo...'}</span>
                </>
              ) : (
                <>
                  <span className="btn-icon-beautiful">{isEditMode ? '💾' : '✓'}</span>
                  <span>{isEditMode ? 'Lưu thay đổi' : 'Tạo hồ sơ'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}