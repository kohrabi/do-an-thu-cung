"use client";

export default function InvoiceDetailModal({ isOpen, onClose, invoice }) {
  if (!isOpen || !invoice) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const badges = {
      paid: { label: "Đã thanh toán", color: "#10B981", bg: "#D1FAE5" },
      pending: { label: "Chờ thanh toán", color: "#F59E0B", bg: "#FEF3C7" },
      cancelled: { label: "Đã hủy", color: "#EF4444", bg: "#FEE2E2" }
    };
    return badges[status] || badges.pending;
  };

  const statusBadge = getStatusBadge(invoice.status);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'white',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '700px',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#1F2937' }}>
            📄 Chi tiết hóa đơn
          </h2>
          <button 
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              background: '#f3f4f6',
              fontSize: '20px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: '20px' }}>
          {/* Company Info */}
          <div style={{
            textAlign: 'center',
            marginBottom: '20px',
            paddingBottom: '20px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            <h1 style={{ margin: '0 0 5px 0', fontSize: '28px', fontWeight: 800, color: '#FF6B9D' }}>
              🐾 PAW LOVERS
            </h1>
            <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>
              Pet Care Management System
            </p>
          </div>

          {/* Invoice Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '20px',
            padding: '15px',
            background: '#F9FAFB',
            borderRadius: '10px'
          }}>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#9CA3AF', fontWeight: 600 }}>
                MÃ HÓA ĐƠN
              </p>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1F2937' }}>
                {invoice.id}
              </p>
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#9CA3AF', fontWeight: 600 }}>
                NGÀY TẠO
              </p>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1F2937' }}>
                {invoice.date}
              </p>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: statusBadge.bg,
                color: statusBadge.color,
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 700
              }}>
                ✓ {statusBadge.label}
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div style={{
            padding: '15px',
            background: 'linear-gradient(135deg, #FFF5F7 0%, #FFE4E9 100%)',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '2px solid #FFD4DC'
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 700, color: '#1F2937' }}>
              👤 Thông tin khách hàng
            </h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}>HỌ VÀ TÊN: </span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#1F2937' }}>
                  {invoice.customerName}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}>SỐ ĐIỆN THOẠI: </span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#1F2937' }}>
                  {invoice.customerPhone}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}>EMAIL: </span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#1F2937' }}>
                  {invoice.customerEmail}
                </span>
              </div>
            </div>
          </div>

          {/* Pet Info */}
          <div style={{
            padding: '15px',
            background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '2px solid #BBF7D0'
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 700, color: '#1F2937' }}>
              🐾 Thông tin thú cưng
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '40px' }}>{invoice.petIcon}</span>
              <div>
                <p style={{ margin: '0 0 3px 0', fontSize: '18px', fontWeight: 700, color: '#1F2937' }}>
                  {invoice.petName}
                </p>
                <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>
                  {invoice.petBreed} • {invoice.petAge}
                </p>
              </div>
            </div>
          </div>

          {/* Services Table */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 700, color: '#1F2937' }}>
              ✨ Dịch vụ đã sử dụng
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#6B7280' }}>
                    Dịch vụ
                  </th>
                  <th style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#6B7280' }}>
                    SL
                  </th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: 700, color: '#6B7280' }}>
                    Đơn giá
                  </th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: 700, color: '#6B7280' }}>
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.services.map((service, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      {service.icon} {service.name}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: 600 }}>
                      {service.quantity}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px' }}>
                      {formatCurrency(service.price)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: 700 }}>
                      {formatCurrency(service.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Section */}
          <div style={{
            padding: '15px',
            background: 'linear-gradient(135deg, #FFF5F7 0%, #FFE4E9 100%)',
            borderRadius: '10px',
            border: '2px solid #FFD4DC'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Tạm tính:</span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px dashed #FFD4DC' }}>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Tổng cộng:</span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>{formatCurrency(invoice.total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#1F2937' }}>Tổng thanh toán:</span>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#FF6B9D' }}>
                {formatCurrency(invoice.total)}
              </span>
            </div>
          </div>

          {/* Payment Info */}
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: '#F9FAFB',
            borderRadius: '10px'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 700, color: '#1F2937' }}>
              💳 Thông tin thanh toán
            </h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}>PHƯƠNG THỨC: </span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#1F2937' }}>
                  {invoice.paymentMethod === 'cash' ? '💵 Tiền mặt' : '💳 Chuyển khoản'}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            marginTop: '20px',
            paddingTop: '15px',
            borderTop: '2px solid #E5E7EB',
            textAlign: 'center'
          }}>
            <p style={{ margin: '0 0 5px 0', fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>
              Cảm ơn quý khách đã sử dụng dịch vụ! 🙏
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
              Hotline: 1900-xxxx | Email: support@pawlovers.com
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{
            marginTop: '20px',
            display: 'flex',
            gap: '10px',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => window.print()}
              style={{
                padding: '12px 24px',
                border: '2px solid #FF6B9D',
                borderRadius: '8px',
                background: 'white',
                color: '#FF6B9D',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              🖨️ In hóa đơn
            </button>
            <button
              onClick={onClose}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #FF6B9D 0%, #FF8FB3 100%)',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}