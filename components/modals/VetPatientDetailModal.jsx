// components/modals/VetPatientDetailModal.jsx
"use client";

export default function VetPatientDetailModal({ isOpen, onClose, patient }) {
  if (!isOpen || !patient) return null;

  return (
    <div className="modal-overlay-beautiful" onClick={onClose}>
      <div className="modal-container-beautiful modal-large-beautiful" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-beautiful">
          <div className="modal-header-content">
            <span className="modal-icon-beautiful">🐾</span>
            <h2 className="modal-title-beautiful">Hồ sơ bệnh nhân</h2>
          </div>
          <button onClick={onClose} className="modal-close-beautiful">
            ✕
          </button>
        </div>

        <div className="modal-body-beautiful">
          {/* Patient Profile Card */}
          <div className="patient-profile-card">
            <div className="patient-profile-header">
              <div className="patient-avatar-section">
                <span className="patient-avatar-huge">{patient.icon}</span>
              </div>
              <div className="patient-profile-info">
                <h1 className="patient-profile-name">{patient.name}</h1>
                <p className="patient-profile-breed">{patient.breed}</p>
                <div className="patient-profile-tags">
                  <span className="profile-tag tag-type">{patient.type === 'dog' ? '🐕 Chó' : '🐈 Mèo'}</span>
                  <span className="profile-tag tag-gender">{patient.gender}</span>
                  <span className="profile-tag tag-age">{patient.age}</span>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="patient-detail-section">
              <h3 className="detail-section-title">
                <span className="title-icon">📊</span>
                Thông tin cơ bản
              </h3>
              <div className="detail-info-grid">
                <div className="detail-info-card">
                  <span className="detail-icon">⚖️</span>
                  <div>
                    <p className="detail-label">Cân nặng</p>
                    <p className="detail-value">{patient.weight}</p>
                  </div>
                </div>
                <div className="detail-info-card">
                  <span className="detail-icon">🎨</span>
                  <div>
                    <p className="detail-label">Màu lông</p>
                    <p className="detail-value">{patient.color}</p>
                  </div>
                </div>
                <div className="detail-info-card">
                  <span className="detail-icon">🎂</span>
                  <div>
                    <p className="detail-label">Ngày sinh</p>
                    <p className="detail-value">{patient.dateOfBirth}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div className="patient-detail-section">
              <h3 className="detail-section-title">
                <span className="title-icon">👤</span>
                Thông tin chủ nuôi
              </h3>
              <div className="owner-info-box">
                <p className="owner-info-row">
                  <span className="owner-info-label">Họ tên:</span>
                  <span className="owner-info-value">{patient.ownerName}</span>
                </p>
                <p className="owner-info-row">
                  <span className="owner-info-label">Điện thoại:</span>
                  <span className="owner-info-value">{patient.ownerPhone}</span>
                </p>
              </div>
            </div>

            {/* Visit Stats */}
            <div className="patient-detail-section">
              <h3 className="detail-section-title">
                <span className="title-icon">📈</span>
                Thống kê khám
              </h3>
              <div className="visit-stats-grid">
                <div className="visit-stat-card">
                  <span className="visit-stat-icon">📅</span>
                  <div>
                    <p className="visit-stat-label">Lần khám gần nhất</p>
                    <p className="visit-stat-value">{patient.lastVisit}</p>
                  </div>
                </div>
                <div className="visit-stat-card">
                  <span className="visit-stat-icon">🔢</span>
                  <div>
                    <p className="visit-stat-label">Tổng số lần khám</p>
                    <p className="visit-stat-value">{patient.totalVisits} lần</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="patient-detail-section">
              <h3 className="detail-section-title">
                <span className="title-icon">📋</span>
                Lịch sử khám bệnh
              </h3>
              <div className="medical-history-list">
                {patient.medicalHistory.map((record, index) => (
                  <div key={index} className="medical-history-item">
                    <div className="medical-history-header">
                      <span className="medical-date">📅 {record.date}</span>
                    </div>
                    <div className="medical-history-body">
                      <p className="medical-diagnosis">
                        <strong>Chẩn đoán:</strong> {record.diagnosis}
                      </p>
                      <p className="medical-treatment">
                        <strong>Điều trị:</strong> {record.treatment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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