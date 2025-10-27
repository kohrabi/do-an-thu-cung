// components/modals/VetRecordModal.jsx
"use client";
import { useState, useEffect } from "react";

export default function VetRecordModal({ isOpen, onClose, onSuccess, appointment }) {
  const [formData, setFormData] = useState({
    symptoms: "",
    diagnosis: "",
    prescription: "",
    treatment: "",
    notes: "",
    followUpDate: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (appointment && isOpen) {
      // Pre-fill symptoms if available
      setFormData(prev => ({
        ...prev,
        symptoms: appointment.symptoms || ""
      }));
    }
  }, [appointment, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

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
      onSuccess({
        appointmentId: appointment.id,
        recordData: formData
      });
      
      // Reset form
      setFormData({
        symptoms: "",
        diagnosis: "",
        prescription: "",
        treatment: "",
        notes: "",
        followUpDate: ""
      });
      setErrors({});
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      symptoms: "",
      diagnosis: "",
      prescription: "",
      treatment: "",
      notes: "",
      followUpDate: ""
    });
    setErrors({});
    onClose();
  };

  if (!isOpen || !appointment) return null;

  return (
    <div className="modal-overlay-beautiful" onClick={handleClose}>
      <div className="modal-container-beautiful modal-large-beautiful" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-beautiful">
          <div className="modal-header-content">
            <span className="modal-icon-beautiful">📋</span>
            <h2 className="modal-title-beautiful">Hồ sơ khám bệnh</h2>
          </div>
          <button onClick={handleClose} className="modal-close-beautiful">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body-beautiful">
          {/* Patient Info Card */}
          <div className="vet-record-patient-card">
            <div className="patient-info-header">
              <div className="patient-info-left">
                <span className="patient-icon-large">{appointment.petIcon}</span>
                <div>
                  <h3 className="patient-name-text">{appointment.petName}</h3>
                  <p className="patient-breed-text">{appointment.petType}</p>
                  <p className="patient-owner-text">Chủ: {appointment.ownerName} - {appointment.ownerPhone}</p>
                </div>
              </div>
              <div className="patient-info-right">
                <span className="appointment-type-badge">
                  {appointment.serviceIcon} {appointment.serviceName}
                </span>
                <span className="appointment-time-badge">🕐 {appointment.time}</span>
              </div>
            </div>
          </div>

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
              min="2025-10-28"
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
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <span className="btn-icon-beautiful">💾</span>
                  <span>Lưu hồ sơ</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}