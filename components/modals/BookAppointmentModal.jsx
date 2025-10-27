// components/modals/BookAppointmentModal.jsx
"use client";
import { useState, useEffect } from "react";

export default function BookAppointmentModal({ isOpen, onClose, onSuccess }) {
  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    petId: "",
    serviceId: "",
    date: "",
    time: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Load pets
      setPets([
        { id: "PET001", name: "Lucky", icon: "🐕" },
        { id: "PET002", name: "Miu", icon: "🐈" },
        { id: "PET003", name: "Coco", icon: "🐩" }
      ]);

      // Load services
      setServices([
        { id: "SRV001", name: "Khám sức khỏe tổng quát", icon: "🏥" },
        { id: "SRV002", name: "Tiêm phòng dại", icon: "💉" },
        { id: "SRV003", name: "Tắm spa cao cấp", icon: "🛁" },
        { id: "SRV004", name: "Cắt tỉa lông tạo kiểu", icon: "✂️" }
      ]);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.petId) {
      newErrors.petId = "Vui lòng chọn thú cưng";
    }

    if (!formData.serviceId) {
      newErrors.serviceId = "Vui lòng chọn dịch vụ";
    }

    if (!formData.date) {
      newErrors.date = "Vui lòng chọn ngày";
    }

    if (!formData.time) {
      newErrors.time = "Vui lòng chọn giờ";
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
      const pet = pets.find(p => p.id === formData.petId);
      const service = services.find(s => s.id === formData.serviceId);
      
      const appointmentData = {
        petId: formData.petId,
        petName: pet.name,
        petIcon: pet.icon,
        serviceId: formData.serviceId,
        serviceName: service.name,
        serviceIcon: service.icon,
        date: formData.date,
        time: formData.time,
        notes: formData.notes
      };
      
      setLoading(false);
      onSuccess(appointmentData);
      onClose();
      
      // Reset form
      setFormData({
        petId: "",
        serviceId: "",
        date: "",
        time: "",
        notes: ""
      });
      setErrors({});
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      petId: "",
      serviceId: "",
      date: "",
      time: "",
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
            <span className="modal-icon-beautiful">📅</span>
            <h2 className="modal-title-beautiful">Đặt lịch mới</h2>
          </div>
          <button onClick={handleClose} className="modal-close-beautiful">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body-beautiful">
          {/* Chọn thú cưng */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">🐾</span>
              Chọn thú cưng
              <span className="required-star">*</span>
            </label>
            <select
              name="petId"
              value={formData.petId}
              onChange={handleChange}
              className={`form-select-beautiful ${errors.petId ? 'input-error-beautiful' : ''}`}
            >
              <option value="">-- Chọn thú cưng --</option>
              {pets.map(pet => (
                <option key={pet.id} value={pet.id}>
                  {pet.icon} {pet.name}
                </option>
              ))}
            </select>
            {errors.petId && <span className="error-text-beautiful">{errors.petId}</span>}
          </div>

          {/* Chọn dịch vụ */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">🛍️</span>
              Chọn dịch vụ
              <span className="required-star">*</span>
            </label>
            <select
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
              className={`form-select-beautiful ${errors.serviceId ? 'input-error-beautiful' : ''}`}
            >
              <option value="">-- Chọn dịch vụ --</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.icon} {service.name}
                </option>
              ))}
            </select>
            {errors.serviceId && <span className="error-text-beautiful">{errors.serviceId}</span>}
          </div>

          {/* Ngày & Giờ */}
          <div className="form-row-beautiful">
            <div className="form-group-beautiful">
              <label className="form-label-beautiful">
                <span className="label-icon-beautiful">📅</span>
                Ngày
                <span className="required-star">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className={`form-input-beautiful ${errors.date ? 'input-error-beautiful' : ''}`}
              />
              {errors.date && <span className="error-text-beautiful">{errors.date}</span>}
            </div>

            <div className="form-group-beautiful">
              <label className="form-label-beautiful">
                <span className="label-icon-beautiful">🕐</span>
                Giờ
                <span className="required-star">*</span>
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`form-select-beautiful ${errors.time ? 'input-error-beautiful' : ''}`}
              >
                <option value="">-- Chọn giờ --</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
              </select>
              {errors.time && <span className="error-text-beautiful">{errors.time}</span>}
            </div>
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
              placeholder="Thông tin thêm về yêu cầu của bạn..."
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
                  <span>Đang đặt...</span>
                </>
              ) : (
                <>
                  <span className="btn-icon-beautiful">✓</span>
                  <span>Đặt lịch</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}