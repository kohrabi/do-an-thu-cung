// components/modals/VetRecordDetailModal.jsx
"use client";

export default function VetRecordDetailModal({ isOpen, onClose, record }) {
  if (!isOpen || !record) return null;

  return (
    <div className="modal-overlay-beautiful" onClick={onClose}>
      <div className="modal-container-beautiful modal-large-beautiful" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-beautiful">
          <div className="modal-header-content">
            <span className="modal-icon-beautiful">📋</span>
            <h2 className="modal-title-beautiful">Chi tiết hồ sơ bệnh án</h2>
          </div>
          <button onClick={onClose} className="modal-close-beautiful">
            ✕
          </button>
        </div>

        <div className="modal-body-beautiful">
          {/* Record Header */}
          <div className="record-detail-header">
            <div className="record-header-left">
              <span className="record-code-large">{record.code}</span>
              <span className="record-date-large">📅 {record.date}</span>
            </div>
            <div className="record-header-right">
              <span className="record-vet-badge">
                👨‍⚕️ {record.veterinarianName}
              </span>
            </div>
          </div>

          {/* Patient Info Card */}
          <div className="record-patient-card">
            <div className="patient-card-header">
              <span className="patient-icon-huge">{record.petIcon}</span>
              <div className="patient-basic-info">
                <h3 className="patient-name-large">{record.petName}</h3>
                <p className="patient-type-text">{record.petType}</p>
              </div>
            </div>
            <div className="patient-owner-info">
              <p className="owner-name">👤 {record.ownerName}</p>
              <p className="owner-phone">📱 {record.ownerPhone}</p>
            </div>
          </div>

          {/* Medical Details */}
          <div className="record-section">
            <h3 className="record-section-title">
              <span className="section-icon">🩺</span>
              Triệu chứng
            </h3>
            <div className="record-section-content">
              <p>{record.symptoms}</p>
            </div>
          </div>

          <div className="record-section">
            <h3 className="record-section-title">
              <span className="section-icon">🔬</span>
              Chẩn đoán
            </h3>
            <div className="record-section-content">
              <p className="diagnosis-highlight">{record.diagnosis}</p>
            </div>
          </div>

          <div className="record-section">
            <h3 className="record-section-title">
              <span className="section-icon">💊</span>
              Đơn thuốc
            </h3>
            <div className="record-section-content">
              <p>{record.prescription}</p>
            </div>
          </div>

          <div className="record-section">
            <h3 className="record-section-title">
              <span className="section-icon">💉</span>
              Điều trị
            </h3>
            <div className="record-section-content">
              <p>{record.treatment}</p>
            </div>
          </div>

          {record.notes && (
            <div className="record-section">
              <h3 className="record-section-title">
                <span className="section-icon">📝</span>
                Ghi chú
              </h3>
              <div className="record-section-content">
                <p>{record.notes}</p>
              </div>
            </div>
          )}

          <div className="record-section">
            <h3 className="record-section-title">
              <span className="section-icon">🔄</span>
              Lịch tái khám
            </h3>
            <div className="record-section-content">
              <p className="follow-up-highlight">📅 {record.followUpDate}</p>
            </div>
          </div>

          {/* Invoice Status */}
          <div className="record-invoice-section">
            {record.invoiceCreated ? (
              <div className="invoice-status-card invoice-created-card">
                <span className="invoice-icon">✅</span>
                <div>
                  <p className="invoice-status-label">Hóa đơn</p>
                  <p className="invoice-status-value">Đã tạo - {record.invoiceId}</p>
                </div>
              </div>
            ) : (
              <div className="invoice-status-card invoice-pending-card">
                <span className="invoice-icon">⏳</span>
                <div>
                  <p className="invoice-status-label">Hóa đơn</p>
                  <p className="invoice-status-value">Chưa tạo</p>
                </div>
              </div>
            )}
          </div>
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