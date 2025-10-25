// components/modals/CageDetailModal.jsx
"use client";

export default function CageDetailModal({ isOpen, onClose, cage }) {
  if (!isOpen || !cage) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">👁️ Chi tiết chuồng {cage.code}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Cage Info */}
          <div className="cage-detail-info">
            <div className="cage-detail-header">
              <span className="cage-detail-icon">
                {cage.type === 'small' && '🏠'}
                {cage.type === 'medium' && '🏡'}
                {cage.type === 'large' && '🏘️'}
              </span>
              <div>
                <h3 className="cage-detail-code">{cage.code}</h3>
                <p className="cage-detail-type">
                  {cage.type === 'small' && 'Chuồng nhỏ'}
                  {cage.type === 'medium' && 'Chuồng trung'}
                  {cage.type === 'large' && 'Chuồng lớn'}
                </p>
              </div>
              <span className={`cage-status-badge ${
                cage.status === 'available' ? 'status-available' :
                cage.status === 'occupied' ? 'status-occupied' :
                'status-maintenance'
              }`}>
                {cage.status === 'available' && '🟢 Trống'}
                {cage.status === 'occupied' && '🟡 Đang sử dụng'}
                {cage.status === 'maintenance' && '🔴 Bảo trì'}
              </span>
            </div>

            <div className="cage-detail-grid">
              <div className="detail-item">
                <span className="detail-icon">📊</span>
                <div>
                  <p className="detail-label">Sức chứa</p>
                  <p className="detail-value">{cage.capacity} thú cưng</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">🐾</span>
                <div>
                  <p className="detail-label">Đang ở</p>
                  <p className="detail-value">
                    {cage.pets?.length || 0} / {cage.capacity}
                  </p>
                </div>
              </div>
            </div>

            {cage.notes && (
              <div className="cage-notes">
                <p className="notes-label">📝 Ghi chú:</p>
                <p className="notes-text">{cage.notes}</p>
              </div>
            )}
          </div>

          {/* Pets in Cage */}
          {cage.status === 'occupied' && cage.pets && cage.pets.length > 0 && (
            <div className="cage-pets-section">
              <h4 className="section-title">🐾 Thú cưng đang ở chuồng</h4>
              <div className="cage-pets-list">
                {cage.pets.map((pet, idx) => (
                  <div key={idx} className="cage-pet-card">
                    <span className="pet-icon-cage">{pet.icon}</span>
                    <div className="pet-info-cage">
                      <p className="pet-name-cage">{pet.name}</p>
                      <p className="pet-breed-cage">{pet.breed}</p>
                      <p className="pet-owner-cage">👤 {pet.ownerName}</p>
                    </div>
                    <div className="pet-duration">
                      <span className="duration-icon">📅</span>
                      <span className="duration-text">
                        {pet.checkInDate} - {pet.checkOutDate || 'Chưa xác định'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <Button onClick={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
}