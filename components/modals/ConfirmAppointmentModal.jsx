"use client";

export default function ConfirmAppointmentModal({ isOpen, onClose, appointment, onConfirm }) {
  if (!isOpen || !appointment) return null;

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
          background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
          border-radius: 16px;
          border: 2px solid #6EE7B7;
          margin-bottom: 24px;
        }

        .info-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }

        .info-row:last-child {
          margin-bottom: 0;
        }

        .info-label {
          font-size: 14px;
          color: #065F46;
          font-weight: 600;
          min-width: 100px;
        }

        .info-value {
          font-size: 14px;
          color: #047857;
          font-weight: 700;
          flex: 1;
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

        .btn-cancel {
          background: #F3F4F6;
          color: #6B7280;
        }

        .btn-cancel:hover {
          background: #E5E7EB;
          color: #374151;
        }

        .btn-confirm {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: white;
        }

        .btn-confirm:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }
      `}</style>

      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">
              <span>✅</span>
              <span>Xác nhận lịch hẹn</span>
            </h2>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>

          <div className="modal-body">
            <div className="appointment-info-card">
              <div className="info-row">
                <span className="info-label">👤 Khách hàng:</span>
                <span className="info-value">{appointment.customerName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">📞 Số điện thoại:</span>
                <span className="info-value">{appointment.phone}</span>
              </div>
              <div className="info-row">
                <span className="info-label">{appointment.petIcon} Thú cưng:</span>
                <span className="info-value">{appointment.petName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">{appointment.serviceIcon} Dịch vụ:</span>
                <span className="info-value">{appointment.service}</span>
              </div>
              <div className="info-row">
                <span className="info-label">📅 Ngày & Giờ:</span>
                <span className="info-value">{appointment.date} - {appointment.time}</span>
              </div>
              <div className="info-row">
                <span className="info-label">🔖 Mã lịch:</span>
                <span className="info-value">{appointment.id}</span>
              </div>
            </div>

            <div className="alert-box">
              <span className="alert-icon">⚠️</span>
              <p className="alert-text">
                Sau khi xác nhận, hệ thống sẽ gửi thông báo cho khách hàng qua email và SMS.
              </p>
            </div>

            <div className="modal-actions">
              <button className="btn btn-cancel" onClick={onClose}>
                <span>🔙</span>
                <span>Quay lại</span>
              </button>
              <button className="btn btn-confirm" onClick={onConfirm}>
                <span>✅</span>
                <span>Xác nhận lịch</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}