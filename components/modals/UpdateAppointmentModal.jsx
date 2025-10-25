// components/modals/UpdateAppointmentModal.jsx
"use client";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

const STATUS_OPTIONS = [
  { value: "pending", label: "Đang chờ", icon: "⏳", color: "bg-yellow-100 text-yellow-800" },
  { value: "confirmed", label: "Đã xác nhận", icon: "✅", color: "bg-green-100 text-green-800" },
  { value: "in_progress", label: "Đang thực hiện", icon: "🔄", color: "bg-blue-100 text-blue-800" },
  { value: "completed", label: "Hoàn thành", icon: "✓", color: "bg-emerald-100 text-emerald-800" },
  { value: "cancelled", label: "Đã hủy", icon: "✕", color: "bg-red-100 text-red-800" }
];

export default function UpdateAppointmentModal({ isOpen, onClose, onSuccess, appointment, staffList }) {
  const [form, setForm] = useState({
    status: "",
    assignedStaffId: "",
    notes: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (appointment) {
      setForm({
        status: appointment.status || "pending",
        assignedStaffId: appointment.assignedStaffId || "",
        notes: appointment.notes || ""
      });
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.status) newErrors.status = "Vui lòng chọn trạng thái";
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
      onSuccess({ ...form, appointmentId: appointment.id });
      onClose();
    }, 800);
  };

  if (!isOpen || !appointment) return null;

  const canChangeStatus = (currentStatus, newStatus) => {
    const statusFlow = {
      "pending": ["confirmed", "cancelled"],
      "confirmed": ["in_progress", "cancelled"],
      "in_progress": ["completed"],
      "completed": [],
      "cancelled": []
    };
    return statusFlow[currentStatus]?.includes(newStatus) || currentStatus === newStatus;
  };

  const filteredStaff = staffList.filter(staff => {
    if (appointment.serviceCategory === "medical") {
      return staff.role === "veterinarian";
    }
    return staff.role === "care_staff" || staff.role === "veterinarian";
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">📝 Cập nhật lịch đặt</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* Appointment Info */}
          <div className="appointment-update-info">
            <div className="update-info-header">
              <span className="update-icon">{appointment.petIcon}</span>
              <div>
                <h4 className="update-pet-name">{appointment.petName}</h4>
                <p className="update-service">{appointment.serviceIcon} {appointment.serviceName}</p>
                <p className="update-datetime">
                  📅 {appointment.date} • 🕐 {appointment.time}
                </p>
              </div>
            </div>
            <div className="update-customer">
              <span className="customer-icon">👤</span>
              <span>{appointment.customerName}</span>
            </div>
          </div>

          {/* Status Selection */}
          <div className="input-group">
            <label className="input-label">
              Trạng thái <span className="text-red-500">*</span>
            </label>
            <div className="status-selection-grid">
              {STATUS_OPTIONS.map(status => {
                const isDisabled = !canChangeStatus(appointment.status, status.value);
                return (
                  <label
                    key={status.value}
                    className={`status-option ${form.status === status.value ? 'status-selected' : ''} ${isDisabled ? 'status-disabled' : ''}`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={status.value}
                      checked={form.status === status.value}
                      onChange={handleChange}
                      disabled={isDisabled}
                      className="hidden"
                    />
                    <span className={`status-badge-large ${status.color}`}>
                      <span className="status-icon-large">{status.icon}</span>
                      <span className="status-label-large">{status.label}</span>
                    </span>
                    {isDisabled && <span className="disabled-overlay">🔒</span>}
                  </label>
                );
              })}
            </div>
            {errors.status && <p className="error-message">{errors.status}</p>}
            <p className="input-hint">
              💡 Luồng trạng thái: Đang chờ → Đã xác nhận → Đang thực hiện → Hoàn thành
            </p>
          </div>

          {/* Staff Assignment */}
          <div className="input-group">
            <label className="input-label">
              Phân công nhân viên
            </label>
            <select
              name="assignedStaffId"
              value={form.assignedStaffId}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">-- Chưa phân công --</option>
              {filteredStaff.map(staff => (
                <option key={staff.id} value={staff.id}>
                  {staff.role === 'veterinarian' ? '👨‍⚕️' : '🧑‍🔧'} {staff.name} - {staff.role === 'veterinarian' ? 'Bác sĩ' : 'Nhân viên'}
                </option>
              ))}
            </select>
            <p className="input-hint">
              {appointment.serviceCategory === "medical" 
                ? "💉 Dịch vụ y tế chỉ được phân cho bác sĩ thú y"
                : "✨ Có thể phân công cho bác sĩ hoặc nhân viên chăm sóc"
              }
            </p>
          </div>

          {/* Notes */}
          <div className="input-group">
            <label className="input-label">Ghi chú quản lý</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="input-field"
              rows="3"
              placeholder="Ghi chú nội bộ về lịch hẹn..."
            />
          </div>

          {/* History */}
          {appointment.updateHistory && appointment.updateHistory.length > 0 && (
            <div className="update-history">
              <h4 className="history-title">📜 Lịch sử cập nhật</h4>
              <div className="history-list">
                {appointment.updateHistory.map((history, idx) => (
                  <div key={idx} className="history-item">
                    <span className="history-time">{history.time}</span>
                    <span className="history-text">{history.action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="modal-footer">
            <Button type="button" variant="secondary" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" loading={loading}>
              ✅ Cập nhật
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}