// components/modals/CancelAppointmentOwnerModal.jsx
"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function CancelAppointmentOwnerModal({ isOpen, onClose, onSuccess, appointment }) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    if (!reason.trim()) {
      setError("Vui lòng nhập lý do hủy lịch");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onSuccess({ appointmentId: appointment.id, reason });
      setReason("");
      setError("");
      onClose();
    }, 800);
  };

  const handleClose = () => {
    setReason("");
    setError("");
    onClose();
  };

  if (!isOpen || !appointment) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">❌ Hủy lịch hẹn</h2>
          <button className="modal-close" onClick={handleClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="cancel-appointment-info">
            <div className="cancel-info-card">
              <span className="cancel-icon">{appointment.petIcon}</span>
              <div>
                <p className="cancel-pet">{appointment.petName}</p>
                <p className="cancel-detail">
                  {appointment.serviceIcon} {appointment.serviceName}
                </p>
                <p className="cancel-datetime">
                  📅 {appointment.date} - 🕐 {appointment.time}
                </p>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                Lý do hủy <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  if (error) setError("");
                }}
                className={`input-field ${error ? 'input-error' : ''}`}
                rows="4"
                placeholder="Nhập lý do hủy lịch hẹn..."
              />
              {error && <p className="error-message">{error}</p>}
            </div>

            <div className="cancel-warning">
              <span className="warning-icon">⚠️</span>
              <p className="warning-text">
                Lịch hẹn sẽ bị hủy và không thể khôi phục. Bạn có thể đặt lịch mới sau.
              </p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Quay lại
          </Button>
          <Button 
            type="button" 
            loading={loading} 
            onClick={handleCancel}
            className="btn-danger"
          >
            ✕ Xác nhận hủy
          </Button>
        </div>
      </div>
    </div>
  );
}