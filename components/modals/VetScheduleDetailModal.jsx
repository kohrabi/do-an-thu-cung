// components/modals/VetScheduleDetailModal.jsx
"use client";

export default function VetScheduleDetailModal({ isOpen, onClose, appointment }) {
  if (!isOpen || !appointment) return null;

  return (
    <div className="modal-overlay-beautiful" onClick={onClose}>
      <div className="modal-container-beautiful modal-large-beautiful" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-beautiful">
          <div className="modal-header-content">
            <span className="modal-icon-beautiful">👁️</span>
            <h2 className="modal-title-beautiful">Chi tiết ca khám</h2>
          </div>
          <button onClick={onClose} className="modal-close-beautiful">
            ✕
          </button>
        </div>

        <div className="modal-body-beautiful">
          {/* Patient Info */}
          <div className="vet-detail-card">
            <div className="vet-detail-header">
              <div className="vet-detail-pet-section">
                <span className="vet-detail-pet-icon">{appointment.petIcon}</span>
                <div>
                  <h3 className="vet-detail-pet-name">{appointment.petName}</h3>
                  <p className="vet-detail-pet-type">{appointment.petType}</p>
                </div>
              </div>
              <div className="vet-detail-time-section">
                <span className="vet-detail-time">🕐 {appointment.time}</span>
                <span className="vet-detail-code">{appointment.code}</span>
              </div>
            </div>

            <div className="vet-detail-info-grid">
              <div className="vet-info-item">
                <span className="info-icon">🎂</span>
                <div>
                  <p className="info-label">Tuổi</p>
                  <p className="info-value">{appointment.petAge}</p>
                </div>
              </div>

              <div className="vet-info-item">
                <span className="info-icon">⚖️</span>
                <div>
                  <p className="info-label">Cân nặng</p>
                  <p className="info-value">{appointment.petWeight}</p>
                </div>
              </div>

              <div className="vet-info-item">
                <span className="info-icon">👤</span>
                <div>
                  <p className="info-label">Chủ nuôi</p>
                  <p className="info-value">{appointment.ownerName}</p>
                </div>
              </div>

              <div className="vet-info-item">
                <span className="info-icon">📱</span>
                <div>
                  <p className="info-label">Điện thoại</p>
                  <p className="info-value">{appointment.ownerPhone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div className="vet-section">
            <h3 className="vet-section-title">
              <span className="section-icon">{appointment.serviceIcon}</span>
              Dịch vụ
            </h3>
            <p className="vet-section-content">{appointment.serviceName}</p>
          </div>

          {/* Symptoms */}
          <div className="vet-section">
            <h3 className="vet-section-title">
              <span className="section-icon">🩺</span>
              Triệu chứng
            </h3>
            <p className="vet-section-content">{appointment.symptoms}</p>
          </div>

          {/* Previous Records */}
          {appointment.previousRecords && appointment.previousRecords.length > 0 && (
            <div className="vet-section">
              <h3 className="vet-section-title">
                <span className="section-icon">📋</span>
                Lịch sử khám trước
              </h3>
              <div className="previous-records-list">
                {appointment.previousRecords.map((record, index) => (
                  <div key={index} className="previous-record-item">
                    <p className="record-date">📅 {record.date}</p>
                    <p className="record-diagnosis"><strong>Chẩn đoán:</strong> {record.diagnosis}</p>
                    <p className="record-treatment"><strong>Điều trị:</strong> {record.treatment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {appointment.notes && (
            <div className="vet-section">
              <h3 className="vet-section-title">
                <span className="section-icon">📝</span>
                Ghi chú bác sĩ
              </h3>
              <p className="vet-section-content">{appointment.notes}</p>
            </div>
          )}
        </div>

        <div className="modal-footer-beautiful">
          <button
            onClick={onClose}
            className="btn-beautiful btn-cancel-beautiful"
            style={{ flex: 1 }}
          >
            <span className="btn-icon-beautiful">✕</span>
            <span>Đóng</span>
          </button>
        </div>
      </div>
    </div>
  );
}