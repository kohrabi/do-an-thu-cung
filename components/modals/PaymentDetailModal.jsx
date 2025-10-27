"use client";
import { useState } from "react";

export default function PaymentInvoiceDetailModal({ isOpen, onClose, invoice }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !invoice) return null;

  const formatCurrency = (amount) => {
    let numAmount = 0;
    
    if (amount !== null && amount !== undefined) {
      numAmount = parseFloat(amount);
      if (isNaN(numAmount)) {
        numAmount = 0;
      }
    }
    
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numAmount) + ' ₫';
  };

  const getPaymentStatusBadge = (status) => {
    const badges = {
      paid: { label: "Đã thanh toán", icon: "✅", color: "#10B981", bg: "#D1FAE5" },
      unpaid: { label: "Chưa thanh toán", icon: "⏳", color: "#F59E0B", bg: "#FEF3C7" },
      pending: { label: "Đang xử lý", icon: "🔄", color: "#3B82F6", bg: "#DBEAFE" },
      cancelled: { label: "Đã hủy", icon: "✕", color: "#EF4444", bg: "#FEE2E2" }
    };
    return badges[status] || badges.unpaid;
  };

  const getPaymentMethodLabel = (method) => {
    const methods = {
      cash: "Tiền mặt",
      card: "Thẻ ngân hàng",
      transfer: "Chuyển khoản",
      momo: "Ví MoMo",
      zalopay: "ZaloPay"
    };
    return methods[method] || method || "Chưa có";
  };

  const handleClose = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 300);
  };

  const statusBadge = getPaymentStatusBadge(invoice.paymentStatus);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-in'
      }}
      onClick={handleClose}
    >
      <div 
        style={{
          background: 'white',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '650px',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          animation: 'slideUp 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '2px solid #F3F4F6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)'
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '24px', 
            fontWeight: 700, 
            color: '#1F2937',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '28px' }}>🧾</span>
            <span>Chi tiết hóa đơn</span>
          </h2>
          <button 
            type="button"
            onClick={handleClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              background: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#EF4444';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'rotate(90deg)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = 'inherit';
              e.currentTarget.style.transform = 'rotate(0deg)';
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Invoice Code */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ 
              margin: '0 0 8px 0', 
              fontSize: '13px', 
              color: '#6B7280',
              fontWeight: 600
            }}>
              Mã hóa đơn:
            </p>
            <div style={{
              padding: '12px 16px',
              background: '#F9FAFB',
              borderRadius: '8px',
              border: '1px solid #E5E7EB'
            }}>
              <p style={{ 
                margin: 0, 
                fontSize: '18px', 
                fontWeight: 700,
                color: '#1F2937',
                fontFamily: 'monospace'
              }}>
                {invoice.invoiceCode || 'N/A'}
              </p>
            </div>
          </div>

          {/* Service Info */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ 
              margin: '0 0 8px 0', 
              fontSize: '13px', 
              color: '#6B7280',
              fontWeight: 600
            }}>
              Dịch vụ:
            </p>
            <div style={{
              padding: '16px',
              background: '#F9FAFB',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '32px' }}>{invoice.serviceIcon || '🏥'}</span>
              <p style={{ 
                margin: 0, 
                fontSize: '16px', 
                fontWeight: 600,
                color: '#1F2937'
              }}>
                {invoice.serviceName || 'Chưa có tên dịch vụ'}
              </p>
            </div>
          </div>

          {/* Pet Info */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ 
              margin: '0 0 8px 0', 
              fontSize: '13px', 
              color: '#6B7280',
              fontWeight: 600
            }}>
              Thú cưng:
            </p>
            <div style={{
              padding: '16px',
              background: '#F9FAFB',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '40px' }}>{invoice.petIcon || '🐕'}</span>
              <p style={{ 
                margin: 0, 
                fontSize: '16px', 
                fontWeight: 600,
                color: '#1F2937'
              }}>
                {invoice.petName || 'Chưa có tên'}
              </p>
            </div>
          </div>

          {/* Service Date */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ 
              margin: '0 0 8px 0', 
              fontSize: '13px', 
              color: '#6B7280',
              fontWeight: 600
            }}>
              Ngày sử dụng:
            </p>
            <div style={{
              padding: '12px 16px',
              background: '#F9FAFB',
              borderRadius: '8px',
              border: '1px solid #E5E7EB'
            }}>
              <p style={{ 
                margin: 0, 
                fontSize: '16px', 
                fontWeight: 600,
                color: '#1F2937'
              }}>
                {invoice.serviceDate || 'Chưa có ngày'}
              </p>
            </div>
          </div>

          {/* Total Amount */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ 
              margin: '0 0 8px 0', 
              fontSize: '13px', 
              color: '#6B7280',
              fontWeight: 600
            }}>
              Tổng tiền:
            </p>
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
              borderRadius: '12px',
              border: '2px solid #FECDD3',
              textAlign: 'right'
            }}>
              <p style={{ 
                margin: 0, 
                fontSize: '32px', 
                fontWeight: 700,
                color: '#E11D48',
                fontFamily: 'monospace'
              }}>
                {formatCurrency(invoice.totalAmount)}
              </p>
            </div>
          </div>

          {/* Payment Status */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ 
              margin: '0 0 8px 0', 
              fontSize: '13px', 
              color: '#6B7280',
              fontWeight: 600
            }}>
              Trạng thái:
            </p>
            <div style={{
              padding: '16px',
              background: statusBadge.bg,
              borderRadius: '12px',
              border: `2px solid ${statusBadge.color}`,
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '32px' }}>{statusBadge.icon}</span>
              <p style={{ 
                margin: 0, 
                fontSize: '18px', 
                fontWeight: 700,
                color: statusBadge.color
              }}>
                {statusBadge.label}
              </p>
            </div>
          </div>

          {/* Payment Method (if paid) */}
          {invoice.paymentStatus === 'paid' && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ 
                margin: '0 0 8px 0', 
                fontSize: '13px', 
                color: '#6B7280',
                fontWeight: 600
              }}>
                Phương thức:
              </p>
              <div style={{
                padding: '12px 16px',
                background: '#F9FAFB',
                borderRadius: '8px',
                border: '1px solid #E5E7EB'
              }}>
                <p style={{ 
                  margin: 0, 
                  fontSize: '16px', 
                  fontWeight: 600,
                  color: '#1F2937'
                }}>
                  {getPaymentMethodLabel(invoice.paymentMethod)}
                </p>
              </div>
            </div>
          )}

          {/* Payment Time (if paid) */}
          {invoice.paymentStatus === 'paid' && invoice.paidAt && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ 
                margin: '0 0 8px 0', 
                fontSize: '13px', 
                color: '#6B7280',
                fontWeight: 600
              }}>
                Thời gian thanh toán:
              </p>
              <div style={{
                padding: '12px 16px',
                background: '#F9FAFB',
                borderRadius: '8px',
                border: '1px solid #E5E7EB'
              }}>
                <p style={{ 
                  margin: 0, 
                  fontSize: '16px', 
                  fontWeight: 600,
                  color: '#1F2937'
                }}>
                  {invoice.paidAt}
                </p>
              </div>
            </div>
          )}

          {/* Notes (if any) */}
          {invoice.notes && (
            <div style={{ marginBottom: '0' }}>
              <p style={{ 
                margin: '0 0 8px 0', 
                fontSize: '13px', 
                color: '#6B7280',
                fontWeight: 600
              }}>
                📝 Ghi chú:
              </p>
              <div style={{
                padding: '16px',
                background: '#FFFBEB',
                borderRadius: '12px',
                border: '1px solid #FCD34D'
              }}>
                <p style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  color: '#78716C',
                  lineHeight: 1.6
                }}>
                  {invoice.notes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px 24px',
          borderTop: '2px solid #F3F4F6',
          background: '#F9FAFB',
          borderRadius: '0 0 16px 16px'
        }}>
          <button
            onClick={handleClose}
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              border: 'none',
              borderRadius: '12px',
              background: loading 
                ? '#D1D5DB' 
                : 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(245, 158, 11, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <span>✓</span>
            <span>Đóng</span>
          </button>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(20px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}