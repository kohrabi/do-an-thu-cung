// components/tables/ServiceTable.jsx
"use client";
import { useState } from "react";

export default function ServiceTable({ services, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="services-grid">
        {filteredServices.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-card-header">
              <span className="service-icon">{service.icon || '✨'}</span>
              <span className={`status-badge ${service.isActive ? 'status-active' : 'status-inactive'}`}>
                {service.isActive ? '✓ Hoạt động' : '⊗ Tạm ngưng'}
              </span>
            </div>

            <h3 className="service-name">{service.name}</h3>
            <p className="service-category">{service.category}</p>

            <div className="service-details">
              <div className="service-detail-item">
                <span className="detail-label">💰 Giá:</span>
                <span className="detail-value">{formatPrice(service.price)}</span>
              </div>
              <div className="service-detail-item">
                <span className="detail-label">⏱️ Thời gian:</span>
                <span className="detail-value">{service.duration} phút</span>
              </div>
            </div>

            {service.description && (
              <p className="service-description">{service.description}</p>
            )}

            <div className="service-actions">
              <button
                onClick={() => onEdit(service)}
                className="btn-service-action btn-edit-service"
              >
                ✏️ Chỉnh sửa
              </button>
              <button
                onClick={() => onDelete(service.id)}
                className="btn-service-action btn-delete-service"
              >
                {service.isActive ? '⏸️ Tạm ngưng' : '▶️ Kích hoạt'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p className="empty-text">Không tìm thấy dịch vụ nào</p>
        </div>
      )}
    </div>
  );
}