// components/modals/ConfirmAppointmentModal.jsx
"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function ConfirmAppointmentModal({ isOpen, onClose, onSuccess, appointment }) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({ appointmentId: appointment.id });
      onClose();
    }, 800);
  };

  if (!isOpen || !appointment) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">✅ Xác nhận lịch hẹn</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="confirm-appointment-info">
            <div className="confirm-info-header">
              <span className="confirm-icon">{appointment.petIcon}</span>
              <div>
                <h4 className="confirm-title">{appointment.customerName}</h4>
                <p className="confirm-subtitle">{appointment.customerPhone}</p>
              </div>
            </div>

            <div className="confirm-details">
              <div className="detail-row">
                <span className="detail-label">Mã lịch:</span>
                <span className="detail-value">{appointment.code}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Thú cưng:</span>
                <span className="detail-value">{appointment.petIcon} {appointment.petName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Dịch vụ:</span>
                <span className="detail-value">{appointment.serviceIcon} {appointment.serviceName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Ngày & Giờ:</span>
                <span className="detail-value">{appointment.date} - {appointment.time}</span>
              </div>
            </div>

            <div className="confirm-warning">
              <span className="warning-icon">⚠️</span>
              <p className="warning-text">
                Sau khi xác nhận, hệ thống sẽ gửi thông báo cho khách hàng qua email và SMS.
              </p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <Button type="button" variant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button type="button" loading={loading} onClick={handleConfirm}>
            ✅ Xác nhận lịch
          </Button>
        </div>
      </div>
    </div>
  );
}