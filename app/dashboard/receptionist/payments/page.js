"use client";
import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([
    {
      id: "INV001",
      customerName: "Nguyễn Văn A",
      phone: "0901234567",
      email: "nguyenvana@example.com",
      service: "Khám sức khỏe",
      serviceIcon: "🏥",
      amount: 500000,
      date: "2025-11-20",
      time: "10:00",
      status: "pending",
      paymentMethod: null
    },
    {
      id: "INV002",
      customerName: "Trần Thị B",
      phone: "0909876543",
      email: "tranthib@example.com",
      service: "Tắm spa",
      serviceIcon: "🛁",
      amount: 300000,
      date: "2025-11-20",
      time: "14:00",
      status: "paid",
      paymentMethod: "Tiền mặt"
    },
    {
      id: "INV003",
      customerName: "Lê Văn C",
      phone: "0912345678",
      email: "levanc@example.com",
      service: "Cắt tỉa lông",
      serviceIcon: "✂️",
      amount: 200000,
      date: "2025-11-21",
      time: "09:00",
      status: "paid",
      paymentMethod: "Chuyển khoản"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("");

  const filteredPayments = payments.filter(payment => {
    const matchFilter = filter === "all" || payment.status === filter;
    const matchSearch = payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       payment.phone.includes(searchTerm) ||
                       payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalRevenue = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const paidCount = payments.filter(p => p.status === 'paid').length;
  const pendingCount = payments.filter(p => p.status === 'pending').length;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleOpenPaymentModal = (payment) => {
    setSelectedPayment(payment);
    setSelectedMethod("");
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setSelectedPayment(null);
    setSelectedMethod("");
  };

  const handleConfirmPayment = () => {
    if (!selectedMethod) {
      alert("⚠️ Vui lòng chọn phương thức thanh toán!");
      return;
    }

    setPayments(payments.map(p =>
      p.id === selectedPayment.id ? { ...p, status: 'paid', paymentMethod: selectedMethod } : p
    ));
    
    alert(`✅ Đã xác nhận thanh toán ${selectedPayment.id} qua ${selectedMethod}`);
    handleCloseModal();
  };

  return (
    <>
      <style jsx>{`
        table td {
          vertical-align: middle !important;
        }
      `}</style>

      <div className="dashboard-container">
        <DashboardHeader
          title="Quản lý thanh toán"
          subtitle="Theo dõi và xác nhận thanh toán từ khách hàng"
        />

        {/* Stats Row */}
        <div className="section-separated">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}>
            {/* Total Revenue */}
            <div style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              padding: '28px',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
              color: 'white'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px'
                }}>
                  💰
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: '0 0 4px 0',
                    fontSize: '13px',
                    opacity: 0.9,
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    Tổng doanh thu
                  </p>
                  <h3 style={{
                    margin: 0,
                    fontSize: '28px',
                    fontWeight: 800
                  }}>
                    {formatCurrency(totalRevenue)}
                  </h3>
                </div>
              </div>
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '13px',
                opacity: 0.9
              }}>
                ✅ {paidCount} đơn đã thanh toán
              </div>
            </div>

            {/* Pending Amount */}
            <div style={{
              background: 'white',
              padding: '28px',
              borderRadius: '16px',
              border: '2px solid #FDE68A',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: '#FEF3C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px'
                }}>
                  ⏳
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: '0 0 4px 0',
                    fontSize: '13px',
                    color: '#92400E',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    Chờ thanh toán
                  </p>
                  <h3 style={{
                    margin: 0,
                    fontSize: '28px',
                    fontWeight: 800,
                    color: '#D97706'
                  }}>
                    {formatCurrency(pendingAmount)}
                  </h3>
                </div>
              </div>
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid #FDE68A',
                fontSize: '13px',
                color: '#92400E'
              }}>
                ⏳ {pendingCount} đơn chờ xử lý
              </div>
            </div>

            {/* Total Orders */}
            <div style={{
              background: 'white',
              padding: '28px',
              borderRadius: '16px',
              border: '2px solid #F3F4F6',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: '#EEF2FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px'
                }}>
                  📋
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: '0 0 4px 0',
                    fontSize: '13px',
                    color: '#6B7280',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    Tổng đơn hàng
                  </p>
                  <h3 style={{
                    margin: 0,
                    fontSize: '36px',
                    fontWeight: 800,
                    color: '#667EEA'
                  }}>
                    {payments.length}
                  </h3>
                </div>
              </div>
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid #F3F4F6',
                fontSize: '13px',
                color: '#6B7280'
              }}>
                📅 Hôm nay
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="section-separated">
          <div style={{
            background: 'white',
            padding: '20px 24px',
            borderRadius: '16px',
            border: '2px solid #F3F4F6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setFilter("all")}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: '2px solid',
                  borderColor: filter === "all" ? '#667EEA' : '#E5E7EB',
                  background: filter === "all" ? '#667EEA' : 'white',
                  color: filter === "all" ? 'white' : '#6B7280',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                📋 Tất cả
              </button>
              <button
                onClick={() => setFilter("pending")}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: '2px solid',
                  borderColor: filter === "pending" ? '#F59E0B' : '#E5E7EB',
                  background: filter === "pending" ? '#F59E0B' : 'white',
                  color: filter === "pending" ? 'white' : '#6B7280',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                ⏳ Chờ thanh toán
              </button>
              <button
                onClick={() => setFilter("paid")}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: '2px solid',
                  borderColor: filter === "paid" ? '#10B981' : '#E5E7EB',
                  background: filter === "paid" ? '#10B981' : 'white',
                  color: filter === "paid" ? 'white' : '#6B7280',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                ✅ Đã thanh toán
              </button>
            </div>

            {/* Search */}
            <div style={{
              position: 'relative',
              minWidth: '300px'
            }}>
              <input
                type="text"
                placeholder="🔍 Tìm theo tên, SĐT, mã hóa đơn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '2px solid #E5E7EB',
                  fontSize: '14px',
                  outline: 'none',
                  background: '#F9FAFB'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667EEA';
                  e.target.style.background = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB';
                  e.target.style.background = '#F9FAFB';
                }}
              />
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="section-separated">
          <div className="section-header-modern">
            <h2 className="section-title-large">
              <span className="title-icon">💳</span>
              Danh sách thanh toán
            </h2>
            <span className="section-count">{filteredPayments.length} hóa đơn</span>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '2px solid #F3F4F6',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                }}>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Mã HĐ</th>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Khách hàng</th>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Dịch vụ</th>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Ngày & Giờ</th>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'right',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Số tiền</th>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Trạng thái</th>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment, index) => {
                  const statusBadge = payment.status === 'pending'
                    ? { label: 'Chờ thanh toán', color: '#F59E0B', bg: '#FEF3C7', icon: '⏳' }
                    : { label: 'Đã thanh toán', color: '#10B981', bg: '#D1FAE5', icon: '✅' };

                  return (
                    <tr key={payment.id} style={{
                      borderBottom: '1px solid #F3F4F6',
                      background: index % 2 === 0 ? 'white' : '#F9FAFB',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F0FDF4'}
                    onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? 'white' : '#F9FAFB'}
                    >
                      <td style={{ padding: '20px' }}>
                        <span style={{
                          padding: '8px 14px',
                          background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
                          color: '#1E40AF',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 700,
                          fontFamily: 'monospace',
                          border: '2px solid #93C5FD'
                        }}>
                          {payment.id}
                        </span>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <div>
                          <p style={{
                            margin: '0 0 4px 0',
                            fontSize: '14px',
                            fontWeight: 700,
                            color: '#1F2937'
                          }}>
                            {payment.customerName}
                          </p>
                          <p style={{
                            margin: 0,
                            fontSize: '13px',
                            color: '#6B7280'
                          }}>
                            📞 {payment.phone}
                          </p>
                        </div>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 14px',
                          background: '#F3F4F6',
                          borderRadius: '10px'
                        }}>
                          <span style={{ fontSize: '20px' }}>{payment.serviceIcon}</span>
                          <span style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            color: '#1F2937'
                          }}>
                            {payment.service}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <div>
                          <p style={{
                            margin: '0 0 4px 0',
                            fontSize: '14px',
                            fontWeight: 700,
                            color: '#1F2937'
                          }}>
                            📅 {payment.date}
                          </p>
                          <p style={{
                            margin: 0,
                            fontSize: '13px',
                            color: '#6B7280'
                          }}>
                            🕐 {payment.time}
                          </p>
                        </div>
                      </td>
                      <td style={{ padding: '20px', textAlign: 'right' }}>
                        <span style={{
                          fontSize: '18px',
                          fontWeight: 800,
                          color: '#10B981',
                          fontFamily: 'monospace'
                        }}>
                          {formatCurrency(payment.amount)}
                        </span>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <span style={{
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontWeight: 700,
                          background: statusBadge.bg,
                          color: statusBadge.color,
                          border: `2px solid ${statusBadge.color}`,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <span>{statusBadge.icon}</span>
                          <span>{statusBadge.label}</span>
                        </span>
                      </td>
                      <td style={{ padding: '20px' }}>
                        {payment.status === 'pending' ? (
                          <button
                            onClick={() => handleOpenPaymentModal(payment)}
                            style={{
                              padding: '10px 20px',
                              borderRadius: '10px',
                              border: 'none',
                              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                              color: 'white',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              margin: '0 auto'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                            }}
                          >
                            <span>✅</span>
                            <span>Xác nhận</span>
                          </button>
                        ) : (
                          <div style={{
                            textAlign: 'center',
                            padding: '8px 14px',
                            background: '#D1FAE5',
                            borderRadius: '10px',
                            border: '2px solid #6EE7B7'
                          }}>
                            <span style={{
                              fontSize: '13px',
                              color: '#065F46',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              justifyContent: 'center'
                            }}>
                              <span>💳</span>
                              <span>{payment.paymentMethod}</span>
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredPayments.length === 0 && (
              <div style={{
                padding: '80px 20px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  fontSize: '56px'
                }}>
                  💳
                </div>
                <h3 style={{
                  margin: '0 0 8px 0',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#1F2937'
                }}>
                  Không tìm thấy hóa đơn
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#6B7280'
                }}>
                  Thử tìm kiếm với từ khóa khác
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Method Modal */}
        {showPaymentModal && selectedPayment && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            animation: 'fadeIn 0.2s'
          }}
          onClick={handleCloseModal}
          >
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '500px',
              width: '100%',
              animation: 'slideUp 0.3s'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                paddingBottom: '20px',
                borderBottom: '2px solid #F3F4F6'
              }}>
                <h2 style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#1F2937',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span>💳</span>
                  <span>Chọn phương thức thanh toán</span>
                </h2>
                <button
                  onClick={handleCloseModal}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#F3F4F6',
                    color: '#6B7280',
                    fontSize: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#E5E7EB';
                    e.currentTarget.style.color = '#374151';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#F3F4F6';
                    e.currentTarget.style.color = '#6B7280';
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Payment Info */}
              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
                borderRadius: '16px',
                marginBottom: '24px',
                border: '2px solid #93C5FD'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <span style={{
                    fontSize: '13px',
                    color: '#1E40AF',
                    fontWeight: 600
                  }}>
                    Mã hóa đơn
                  </span>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#1E40AF',
                    fontFamily: 'monospace'
                  }}>
                    {selectedPayment.id}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <span style={{
                    fontSize: '13px',
                    color: '#1E40AF',
                    fontWeight: 600
                  }}>
                    Khách hàng
                  </span>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#1E40AF'
                  }}>
                    {selectedPayment.customerName}
                  </span>
                </div>
                <div style={{
                  paddingTop: '12px',
                  borderTop: '1px solid #93C5FD',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '14px',
                    color: '#1E40AF',
                    fontWeight: 700
                  }}>
                    Số tiền thanh toán
                  </span>
                  <span style={{
                    fontSize: '24px',
                    fontWeight: 800,
                    color: '#1E40AF'
                  }}>
                    {formatCurrency(selectedPayment.amount)}
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div style={{ marginBottom: '24px' }}>
                <p style={{
                  margin: '0 0 16px 0',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#374151'
                }}>
                  Chọn phương thức thanh toán: <span style={{ color: '#EF4444' }}>*</span>
                </p>
                
                <div style={{ display: 'grid', gap: '12px' }}>
                  {/* Cash */}
                  <button
                    onClick={() => setSelectedMethod("Tiền mặt")}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '12px',
                      border: '2px solid',
                      borderColor: selectedMethod === "Tiền mặt" ? '#10B981' : '#E5E7EB',
                      background: selectedMethod === "Tiền mặt" ? '#D1FAE5' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: selectedMethod === "Tiền mặt" ? '#10B981' : '#F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0
                    }}>
                      💵
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        margin: '0 0 4px 0',
                        fontSize: '16px',
                        fontWeight: 700,
                        color: selectedMethod === "Tiền mặt" ? '#065F46' : '#1F2937'
                      }}>
                        Tiền mặt
                      </p>
                      <p style={{
                        margin: 0,
                        fontSize: '13px',
                        color: selectedMethod === "Tiền mặt" ? '#065F46' : '#6B7280'
                      }}>
                        Thanh toán bằng tiền mặt trực tiếp
                      </p>
                    </div>
                    {selectedMethod === "Tiền mặt" && (
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#10B981',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 700
                      }}>
                        ✓
                      </div>
                    )}
                  </button>

                  {/* Bank Transfer */}
                  <button
                    onClick={() => setSelectedMethod("Chuyển khoản")}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '12px',
                      border: '2px solid',
                      borderColor: selectedMethod === "Chuyển khoản" ? '#3B82F6' : '#E5E7EB',
                      background: selectedMethod === "Chuyển khoản" ? '#DBEAFE' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: selectedMethod === "Chuyển khoản" ? '#3B82F6' : '#F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0
                    }}>
                      🏦
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        margin: '0 0 4px 0',
                        fontSize: '16px',
                        fontWeight: 700,
                        color: selectedMethod === "Chuyển khoản" ? '#1E40AF' : '#1F2937'
                      }}>
                        Chuyển khoản
                      </p>
                      <p style={{
                        margin: 0,
                        fontSize: '13px',
                        color: selectedMethod === "Chuyển khoản" ? '#1E40AF' : '#6B7280'
                      }}>
                        Thanh toán qua ngân hàng/ví điện tử
                      </p>
                    </div>
                    {selectedMethod === "Chuyển khoản" && (
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#3B82F6',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 700
                      }}>
                        ✓
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <button
                  onClick={handleCloseModal}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#F3F4F6',
                    color: '#6B7280',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#E5E7EB';
                    e.currentTarget.style.color = '#374151';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#F3F4F6';
                    e.currentTarget.style.color = '#6B7280';
                  }}
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmPayment}
                  disabled={!selectedMethod}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: selectedMethod 
                      ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' 
                      : '#D1D5DB',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: selectedMethod ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    boxShadow: selectedMethod ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedMethod) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = selectedMethod ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none';
                  }}
                >
                  ✅ Xác nhận thanh toán
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}