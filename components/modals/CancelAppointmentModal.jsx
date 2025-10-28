"use client";
import { useState } from "react";

export default function CancelAppointmentModal({ isOpen, onClose, appointment, onCancel }) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  if (!isOpen || !appointment) return null;

  const handleSubmit = () => {
    if (!reason.trim()) {
      setError("Vui lòng nhập lý do hủy lịch hẹn");
      return;
    }
    onCancel(reason);
    setReason("");
    setError("");
  };

  const handleClose = () => {
    setReason("");
    setError("");
    onClose();
  };

  return (
    <>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.2s;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 24px;
          width: 90%;
          max-width: 560px;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          padding: 24px 24px 20px 24px;
          border-bottom: 2px solid #F3F4F6;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 24px;
          font-weight: 800;
          color: #1F2937;
          margin: 0;
        }

        .close-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: none;
          background: #F3F4F6;
          color: #6B7280;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #E5E7EB;
          color: #374151;
        }

        .modal-body {
          padding: 24px;
        }

        .appointment-info-card {
          padding: 20px;
          background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
          border-radius: 16px;
          border: 2px solid #FCA5A5;
          margin-bottom: 24px;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
          font-size: 14px;
          color: #991B1B;
        }

        .info-row:last-child {
          margin-bottom: 0;
        }

        .info-icon {
          font-size: 20px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 700;
          color: #374151;
          margin-bottom: 8px;
        }

        .required {
          color: #EF4444;
        }

        .form-textarea {
          width: 100%;
          padding: 14px;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
          font-size: 14px;
          font-family: inherit;
          resize: vertical;
          min-height: 120px;
          transition: all 0.2s;
        }

        .form-textarea:focus {
          outline: none;
          border-color: #667EEA;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .form-textarea.error {
          border-color: #EF4444;
          background: #FEF2F2;
        }

        .error-message {
          color: #EF4444;
          font-size: 13px;
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
        }

        .alert-box {
          padding: 16px;
          background: #FEF3C7;
          border: 2px solid #FCD34D;
          border-radius: 12px;
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .alert-icon {
          font-size: 24px;
        }

        .alert-text {
          font-size: 14px;
          color: #92400E;
          line-height: 1.6;
          margin: 0;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
        }

        .btn {
          flex: 1;
          padding: 14px;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-back {
          background: #F3F4F6;
          color: #6B7280;
        }

        .btn-back:hover {
          background: #E5E7EB;
          color: #374151;
        }

        .btn-cancel {
          background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
          color: white;
        }

        .btn-cancel:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
        }
      `}</style>

      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">
              <span>❌</span>
              <span>Hủy lịch hẹn</span>
            </h2>
            <button className="close-btn" onClick={handleClose}>✕</button>
          </div>

          <div className="modal-body">
            <div className="appointment-info-card">
              <div className="info-row">
                <span className="info-icon">🐕</span>
                <strong>{appointment.customerName}</strong>
              </div>
              <div className="info-row">
                <span className="info-icon">{appointment.serviceIcon}</span>
                <span>{appointment.service} - {appointment.date} {appointment.time}</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Lý do hủy<span className="required">*</span>
              </label>
              <textarea
                className={`form-textarea ${error ? 'error' : ''}`}
                placeholder="Nhập lý do hủy lịch hẹn..."
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  setError("");
                }}
              />
              {error && (
                <p className="error-message">
                  <span>⚠️</span>
                  <span>{error}</span>
                </p>
              )}
            </div>

            <div className="alert-box">
              <span className="alert-icon">⚠️</span>
              <p className="alert-text">
                Lịch hẹn sẽ bị hủy và không thể khôi phục. Khách hàng sẽ nhận được thông báo hủy.
              </p>
            </div>

            <div className="modal-actions">
              <button className="btn btn-back" onClick={handleClose}>
                <span>🔙</span>
                <span>Quay lại</span>
              </button>
              <button className="btn btn-cancel" onClick={handleSubmit}>
                <span>❌</span>
                <span>Xác nhận hủy</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}