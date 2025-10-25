// components/modals/InvoiceDetailModal.jsx
"use client";

export default function InvoiceDetailModal({ isOpen, onClose, invoice }) {
  if (!isOpen || !invoice) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-large invoice-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">🧾 Chi tiết hóa đơn</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Invoice Header */}
          <div className="invoice-header">
            <div className="invoice-logo">
              <div className="logo-icon-large">🐾</div>
              <div>
                <h3 className="company-name">PAW LOVERS</h3>
                <p className="company-subtitle">Pet Care Management System</p>
              </div>
            </div>
            <div className="invoice-meta">
              <div className="invoice-id">
                <span className="meta-label">Mã hóa đơn:</span>
                <span className="meta-value">{invoice.id}</span>
              </div>
              <div className="invoice-date">
                <span className="meta-label">Ngày tạo:</span>
                <span className="meta-value">{formatDate(invoice.date)}</span>
              </div>
              <div className={`invoice-status-badge ${invoice.isPaid ? 'status-paid' : 'status-unpaid'}`}>
                {invoice.isPaid ? '✓ Đã thanh toán' : '⏳ Chưa thanh toán'}
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="invoice-section">
            <h4 className="section-title">👤 Thông tin khách hàng</h4>
            <div className="customer-info-grid">
              <div className="info-row">
                <span className="info-label">Họ và tên:</span>
                <span className="info-value">{invoice.customerName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Số điện thoại:</span>
                <span className="info-value">{invoice.customerPhone}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{invoice.customerEmail}</span>
              </div>
            </div>
          </div>

          {/* Pet Info */}
          <div className="invoice-section">
            <h4 className="section-title">🐾 Thông tin thú cưng</h4>
            <div className="pet-info-card">
              <span className="pet-icon-large">{invoice.petIcon}</span>
              <div>
                <p className="pet-name-invoice">{invoice.petName}</p>
                <p className="pet-details-invoice">{invoice.petBreed} • {invoice.petAge} tuổi</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="invoice-section">
            <h4 className="section-title">✨ Dịch vụ đã sử dụng</h4>
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Dịch vụ</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {invoice.services.map((service, index) => (
                  <tr key={index}>
                    <td>
                      <span className="service-icon-small">{service.icon}</span>
                      {service.name}
                    </td>
                    <td className="text-center">{service.quantity}</td>
                    <td className="text-right">{formatCurrency(service.price)}</td>
                    <td className="text-right font-semibold">{formatCurrency(service.price * service.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="invoice-total-section">
            <div className="total-row">
              <span className="total-label">Tạm tính:</span>
              <span className="total-value">{formatCurrency(invoice.subtotal)}</span>
            </div>
            {invoice.discount > 0 && (
              <div className="total-row discount-row">
                <span className="total-label">Giảm giá:</span>
                <span className="total-value">-{formatCurrency(invoice.discount)}</span>
              </div>
            )}
            <div className="total-row final-row">
              <span className="total-label">Tổng cộng:</span>
              <span className="total-value final-amount">{formatCurrency(invoice.total)}</span>
            </div>
          </div>

          {/* Payment Info */}
          {invoice.isPaid && invoice.paymentMethod && (
            <div className="invoice-section">
              <h4 className="section-title">💳 Thông tin thanh toán</h4>
              <div className="payment-info">
                <div className="info-row">
                  <span className="info-label">Phương thức:</span>
                  <span className="info-value">{invoice.paymentMethod}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Thời gian thanh toán:</span>
                  <span className="info-value">{formatDate(invoice.paymentDate)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {invoice.notes && (
            <div className="invoice-section">
              <h4 className="section-title">📝 Ghi chú</h4>
              <p className="invoice-notes">{invoice.notes}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Đóng
          </button>
          <button className="btn-primary" onClick={() => window.print()}>
            🖨️ In hóa đơn
          </button>
          <button className="btn-primary">
            📄 Xuất PDF
          </button>
        </div>
      </div>
    </div>
  );
}