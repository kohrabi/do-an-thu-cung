// components/modals/CageDetailModal.jsx
"use client";

export default function CageDetailModal({ isOpen, onClose, cage }) {
  if (!isOpen || !cage) return null;

  const getCageTypeLabel = (type) => {
    const labels = {
      small: "🏠 Chuồng nhỏ",
      medium: "🏡 Chuồng trung",
      large: "🏘️ Chuồng lớn"
    };
    return labels[type] || type;
  };

  const getStatusBadge = (status) => {
    const badges = {
      available: { label: "Trống", class: "status-available", icon: "🟢" },
      occupied: { label: "Đang sử dụng", class: "status-occupied", icon: "🟡" },
      maintenance: { label: "Bảo trì", class: "status-maintenance", icon: "🔴" }
    };
    return badges[status] || badges.available;
  };

  const statusBadge = getStatusBadge(cage.status);

  return (
    <div className="modal-overlay-beautiful" onClick={onClose}>
      <div className="modal-container-beautiful modal-large-beautiful" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-beautiful">
          <div className="modal-header-content">
            <span className="modal-icon-beautiful">👁️</span>
            <h2 className="modal-title-beautiful">Chi tiết chuồng {cage.code}</h2>
          </div>
          <button onClick={onClose} className="modal-close-beautiful">
            ✕
          </button>
        </div>

        <div className="modal-body-beautiful">
          {/* Cage Info Card */}
          <div className="cage-detail-card">
            <div className="cage-detail-header">
              <div className="cage-detail-code-section">
                <span className="cage-detail-code">{cage.code}</span>
                <span className="cage-detail-type">{getCageTypeLabel(cage.type)}</span>
              </div>
              <span className={`status-badge-detail ${statusBadge.class}`}>
                {statusBadge.icon} {statusBadge.label}
              </span>
            </div>

            <div className="cage-detail-info-grid">
              <div className="cage-info-item-detail">
                <span className="info-icon-detail">📊</span>
                <div>
                  <p className="info-label-detail">Sức chứa</p>
                  <p className="info-value-detail">{cage.capacity} thú cưng</p>
                </div>
              </div>

              <div className="cage-info-item-detail">
                <span className="info-icon-detail">🐾</span>
                <div>
                  <p className="info-label-detail">Đang ở</p>
                  <p className="info-value-detail">
                    {cage.pets?.length || 0} / {cage.capacity}
                  </p>
                </div>
              </div>
            </div>

            {cage.notes && (
              <div className="cage-notes-detail">
                <p className="notes-label-detail">📝 Ghi chú:</p>
                <p className="notes-text-detail">{cage.notes}</p>
              </div>
            )}
          </div>

          {/* Pets in Cage */}
          {cage.status === 'occupied' && cage.pets && cage.pets.length > 0 && (
            <div className="pets-in-cage-section">
              <h3 className="section-title-detail">
                <span className="title-icon-detail">🐾</span>
                Thú cưng đang ở chuồng
              </h3>

              <div className="pets-list-detail">
                {cage.pets.map((pet, idx) => (
                  <div key={idx} className="pet-card-detail">
                    <div className="pet-card-header-detail">
                      <div className="pet-basic-info-detail">
                        <span className="pet-icon-detail">{pet.icon}</span>
                        <div>
                          <p className="pet-name-detail">{pet.name}</p>
                          <p className="pet-breed-detail">{pet.breed}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pet-card-body-detail">
                      <div className="pet-info-row-detail">
                        <span className="pet-info-label-detail">👤 Chủ:</span>
                        <span className="pet-info-value-detail">{pet.ownerName}</span>
                      </div>
                      <div className="pet-info-row-detail">
                        <span className="pet-info-label-detail">📅 Check-in:</span>
                        <span className="pet-info-value-detail">{pet.checkInDate}</span>
                      </div>
                      <div className="pet-info-row-detail">
                        <span className="pet-info-label-detail">📅 Check-out:</span>
                        <span className="pet-info-value-detail">{pet.checkOutDate || 'Chưa xác định'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
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