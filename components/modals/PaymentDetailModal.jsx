// components/modals/PaymentDetailModal.jsx
"use client";

export default function PaymentDetailModal({ isOpen, onClose, invoice }) {
  if (!isOpen || !invoice) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">📋 Chi tiết hóa đơn</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="invoice-detail-section">
            <div className="detail-row">
              <span className="detail-label">Mã hóa đơn:</span>
              <span className="detail-value-bold">{invoice.code}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Dịch vụ:</span>
              <span className="detail-value">
                {invoice.serviceIcon} {invoice.serviceName}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Thú cưng:</span>
              <span className="detail-value">
                {invoice.petIcon} {invoice.petName}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Ngày sử dụng:</span>
              <span className="detail-value">{invoice.date}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Tổng tiền:</span>
              <span className="detail-value-amount">{formatCurrency(invoice.amount)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Trạng thái:</span>
              <span className={invoice.status === 'paid' ? 'status-paid-text' : 'status-pending-text'}>
                {invoice.status === 'paid' ? '✅ Đã thanh toán' : '⏳ Chưa thanh toán'}
              </span>
            </div>
            {invoice.status === 'paid' && (
              <>
                <div className="detail-row">
                  <span className="detail-label">Phương thức:</span>
                  <span className="detail-value">{invoice.paymentMethod}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Thời gian thanh toán:</span>
                  <span className="detail-value">{invoice.paidAt}</span>
                </div>
              </>
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