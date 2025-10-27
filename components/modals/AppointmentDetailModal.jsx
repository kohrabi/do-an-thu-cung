// components/modals/AppointmentDetailModal.jsx
"use client";

export default function AppointmentDetailModal({ isOpen, onClose, appointment }) {
  if (!isOpen || !appointment) return null;

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: { label: "Sắp tới", class: "status-upcoming", icon: "⏳" },
      completed: { label: "Đã hoàn thành", class: "status-completed", icon: "✅" },
      cancelled: { label: "Đã hủy", class: "status-cancelled", icon: "✕" }
    };
    return badges[status] || badges.upcoming;
  };

  const statusBadge = getStatusBadge(appointment.status);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">📋 Chi tiết lịch đặt</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="appointment-detail-section">
            <div className="detail-row">
              <span className="detail-label">Mã lịch:</span>
              <span className="detail-value-bold">{appointment.code}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Thú cưng:</span>
              <span className="detail-value">
                {appointment.petIcon} {appointment.petName}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Dịch vụ:</span>
              <span className="detail-value">
                {appointment.serviceIcon} {appointment.serviceName}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Ngày:</span>
              <span className="detail-value">{appointment.date}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Giờ:</span>
              <span className="detail-value">🕐 {appointment.time}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Trạng thái:</span>
              <span className={`status-badge ${statusBadge.class}`}>
                {statusBadge.icon} {statusBadge.label}
              </span>
            </div>
            {appointment.notes && (
              <div className="detail-row">
                <span className="detail-label">Ghi chú:</span>
                <span className="detail-value">{appointment.notes}</span>
              </div>
            )}
            {appointment.cancelReason && (
              <div className="detail-row">
                <span className="detail-label">Lý do hủy:</span>
                <span className="detail-value-error">{appointment.cancelReason}</span>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-modal-secondary">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}