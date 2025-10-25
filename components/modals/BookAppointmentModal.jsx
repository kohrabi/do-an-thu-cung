// components/modals/BookAppointmentModal.jsx
"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function BookAppointmentModal({ isOpen, onClose, onSuccess, pets, services }) {
  const [form, setForm] = useState({
    petId: "",
    serviceId: "",
    date: "",
    time: "",
    notes: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.petId) newErrors.petId = "Vui lòng chọn thú cưng";
    if (!form.serviceId) newErrors.serviceId = "Vui lòng chọn dịch vụ";
    if (!form.date) newErrors.date = "Vui lòng chọn ngày";
    if (!form.time) newErrors.time = "Vui lòng chọn giờ";
    
    // Check if date is not in the past
    const selectedDate = new Date(form.date + " " + form.time);
    if (selectedDate < new Date()) {
      newErrors.date = "Ngày đặt phải từ hiện tại trở đi";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(form);
      setForm({ petId: "", serviceId: "", date: "", time: "", notes: "" });
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  const selectedPet = pets.find(p => p.id === form.petId);
  const selectedService = services.find(s => s.id === form.serviceId);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-large booking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">📅 Đặt lịch dịch vụ</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* Select Pet */}
          <div className="input-group">
            <label className="input-label">
              Chọn thú cưng <span className="text-red-500">*</span>
            </label>
            <div className="pet-selection-grid">
              {pets.map(pet => (
                <label
                  key={pet.id}
                  className={`pet-selection-card ${form.petId === pet.id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="petId"
                    value={pet.id}
                    checked={form.petId === pet.id}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="pet-selection-icon">{pet.icon}</span>
                  <div>
                    <p className="pet-selection-name">{pet.name}</p>
                    <p className="pet-selection-breed">{pet.breed}</p>
                  </div>
                  {form.petId === pet.id && <span className="selection-check">✓</span>}
                </label>
              ))}
            </div>
            {errors.petId && <p className="error-message">{errors.petId}</p>}
          </div>

          {/* Select Service */}
          <div className="input-group">
            <label className="input-label">
              Chọn dịch vụ <span className="text-red-500">*</span>
            </label>
            <div className="service-selection-grid">
              {services.map(service => (
                <label
                  key={service.id}
                  className={`service-selection-card ${form.serviceId === service.id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="serviceId"
                    value={service.id}
                    checked={form.serviceId === service.id}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="service-selection-icon">{service.icon}</span>
                  <div>
                    <p className="service-selection-name">{service.name}</p>
                    <p className="service-selection-price">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                    </p>
                    <p className="service-selection-duration">⏱️ {service.duration} phút</p>
                  </div>
                  {form.serviceId === service.id && <span className="selection-check">✓</span>}
                </label>
              ))}
            </div>
            {errors.serviceId && <p className="error-message">{errors.serviceId}</p>}
          </div>

          {/* Date & Time */}
          <div className="input-row">
            <Input
              label="Ngày"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              error={errors.date}
              min={new Date().toISOString().split('T')[0]}
              required
            />

            <div className="input-group">
              <label className="input-label">
                Giờ <span className="text-red-500">*</span>
              </label>
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                className={`input-field ${errors.time ? 'input-error' : ''}`}
                required
              >
                <option value="">Chọn giờ</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>🕐 {time}</option>
                ))}
              </select>
              {errors.time && <p className="error-message">{errors.time}</p>}
            </div>
          </div>

          {/* Notes */}
          <div className="input-group">
            <label className="input-label">Ghi chú (tùy chọn)</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="input-field"
              rows="3"
              placeholder="Thông tin bổ sung về yêu cầu dịch vụ..."
            />
          </div>

          {/* Booking Summary */}
          {selectedPet && selectedService && form.date && form.time && (
            <div className="booking-summary">
              <h4 className="summary-title">📋 Tóm tắt đặt lịch</h4>
              <div className="summary-content">
                <div className="summary-item">
                  <span className="summary-icon">🐾</span>
                  <span>{selectedPet.name} - {selectedPet.breed}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-icon">✨</span>
                  <span>{selectedService.name}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-icon">📅</span>
                  <span>
                    {new Date(form.date).toLocaleDateString('vi-VN', { 
                      weekday: 'long', 
                      day: '2-digit', 
                      month: '2-digit', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-icon">🕐</span>
                  <span>{form.time}</span>
                </div>
                <div className="summary-item summary-total">
                  <span className="summary-icon">💰</span>
                  <span className="summary-amount">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedService.price)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="modal-footer">
            <Button type="button" variant="secondary" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" loading={loading}>
              ✅ Xác nhận đặt lịch
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}