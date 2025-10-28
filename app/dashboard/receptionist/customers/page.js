"use client";
import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    {
      id: "CUS001",
      name: "Nguyễn Văn A",
      phone: "0901234567",
      email: "nguyenvana@example.com",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      joinDate: "2025-01-15",
      totalVisits: 12,
      totalSpent: 5500000,
      lastVisit: "2025-11-20",
      pets: [
        { name: "Lucky", type: "Chó", icon: "🐕" },
        { name: "Miu", type: "Mèo", icon: "🐈" }
      ],
      status: "active"
    },
    {
      id: "CUS002",
      name: "Trần Thị B",
      phone: "0909876543",
      email: "tranthib@example.com",
      address: "456 Đường XYZ, Quận 3, TP.HCM",
      joinDate: "2025-02-20",
      totalVisits: 8,
      totalSpent: 3200000,
      lastVisit: "2025-11-18",
      pets: [
        { name: "Coco", type: "Chó", icon: "🐩" }
      ],
      status: "active"
    },
    {
      id: "CUS003",
      name: "Lê Văn C",
      phone: "0912345678",
      email: "levanc@example.com",
      address: "789 Đường DEF, Quận 5, TP.HCM",
      joinDate: "2025-03-10",
      totalVisits: 5,
      totalSpent: 1800000,
      lastVisit: "2025-10-15",
      pets: [
        { name: "Max", type: "Chó", icon: "🐕" }
      ],
      status: "inactive"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter(customer => {
    const matchFilter = filter === "all" || customer.status === filter;
    const matchSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       customer.phone.includes(searchTerm) ||
                       customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const inactiveCustomers = customers.filter(c => c.status === 'inactive').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
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
          title="Quản lý khách hàng"
          subtitle="Theo dõi và quản lý thông tin khách hàng"
        />

        {/* Stats Row */}
        <div className="section-separated">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            {/* Total Customers */}
            <div style={{
              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
              padding: '28px',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
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
                  👥
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: '0 0 4px 0',
                    fontSize: '13px',
                    opacity: 0.9,
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    Tổng khách hàng
                  </p>
                  <h3 style={{
                    margin: 0,
                    fontSize: '36px',
                    fontWeight: 800
                  }}>
                    {totalCustomers}
                  </h3>
                </div>
              </div>
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '13px',
                opacity: 0.9
              }}>
                📅 Tổng hợp toàn bộ
              </div>
            </div>

            {/* Active Customers */}
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
                  background: '#D1FAE5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px'
                }}>
                  ✅
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: '0 0 4px 0',
                    fontSize: '13px',
                    color: '#6B7280',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    Khách hàng active
                  </p>
                  <h3 style={{
                    margin: 0,
                    fontSize: '36px',
                    fontWeight: 800,
                    color: '#10B981'
                  }}>
                    {activeCustomers}
                  </h3>
                </div>
              </div>
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid #F3F4F6',
                fontSize: '13px',
                color: '#6B7280'
              }}>
                📊 {Math.round((activeCustomers/totalCustomers)*100)}% tổng số
              </div>
            </div>

            {/* Inactive Customers */}
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
                  background: '#FEE2E2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px'
                }}>
                  😴
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: '0 0 4px 0',
                    fontSize: '13px',
                    color: '#6B7280',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    Khách lâu không đến
                  </p>
                  <h3 style={{
                    margin: 0,
                    fontSize: '36px',
                    fontWeight: 800,
                    color: '#EF4444'
                  }}>
                    {inactiveCustomers}
                  </h3>
                </div>
              </div>
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid #F3F4F6',
                fontSize: '13px',
                color: '#6B7280'
              }}>
                ⏰ Cần chăm sóc lại
              </div>
            </div>

            {/* Total Revenue */}
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
                  background: '#FEF3C7',
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
                    color: '#6B7280',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    Tổng doanh thu
                  </p>
                  <h3 style={{
                    margin: 0,
                    fontSize: '24px',
                    fontWeight: 800,
                    color: '#F59E0B'
                  }}>
                    {formatCurrency(totalRevenue)}
                  </h3>
                </div>
              </div>
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid #F3F4F6',
                fontSize: '13px',
                color: '#6B7280'
              }}>
                📈 Từ {totalCustomers} khách hàng
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
                👥 Tất cả
              </button>
              <button
                onClick={() => setFilter("active")}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: '2px solid',
                  borderColor: filter === "active" ? '#10B981' : '#E5E7EB',
                  background: filter === "active" ? '#10B981' : 'white',
                  color: filter === "active" ? 'white' : '#6B7280',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                ✅ Active
              </button>
              <button
                onClick={() => setFilter("inactive")}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: '2px solid',
                  borderColor: filter === "inactive" ? '#EF4444' : '#E5E7EB',
                  background: filter === "inactive" ? '#EF4444' : 'white',
                  color: filter === "inactive" ? 'white' : '#6B7280',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                😴 Inactive
              </button>
            </div>

            {/* Search */}
            <div style={{
              position: 'relative',
              minWidth: '300px'
            }}>
              <input
                type="text"
                placeholder="🔍 Tìm theo tên, SĐT, email..."
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

        {/* Customers Table */}
        <div className="section-separated">
          <div className="section-header-modern">
            <h2 className="section-title-large">
              <span className="title-icon">👥</span>
              Danh sách khách hàng
            </h2>
            <span className="section-count">{filteredCustomers.length} khách hàng</span>
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
                  background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)'
                }}>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Mã KH</th>
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
                  }}>Thú cưng</th>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Lượt đến</th>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'right',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Tổng chi tiêu</th>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Lần cuối</th>
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
                  }}>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => {
                  const statusBadge = customer.status === 'active'
                    ? { label: 'Active', color: '#10B981', bg: '#D1FAE5', icon: '✅' }
                    : { label: 'Inactive', color: '#EF4444', bg: '#FEE2E2', icon: '😴' };

                  return (
                    <tr key={customer.id} style={{
                      borderBottom: '1px solid #F3F4F6',
                      background: index % 2 === 0 ? 'white' : '#F9FAFB',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#EEF2FF'}
                    onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? 'white' : '#F9FAFB'}
                    >
                      <td style={{ padding: '20px' }}>
                        <span style={{
                          padding: '8px 14px',
                          background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                          color: '#92400E',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 700,
                          fontFamily: 'monospace',
                          border: '2px solid #FCD34D'
                        }}>
                          {customer.id}
                        </span>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '16px',
                            flexShrink: 0
                          }}>
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <p style={{
                              margin: '0 0 4px 0',
                              fontSize: '14px',
                              fontWeight: 700,
                              color: '#1F2937'
                            }}>
                              {customer.name}
                            </p>
                            <p style={{
                              margin: 0,
                              fontSize: '13px',
                              color: '#6B7280'
                            }}>
                              📞 {customer.phone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <div style={{
                          display: 'flex',
                          gap: '6px',
                          flexWrap: 'wrap'
                        }}>
                          {customer.pets.map((pet, idx) => (
                            <span key={idx} style={{
                              padding: '6px 12px',
                              background: '#F0FDF4',
                              borderRadius: '8px',
                              fontSize: '13px',
                              fontWeight: 600,
                              color: '#166534',
                              border: '2px solid #BBF7D0',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <span>{pet.icon}</span>
                              <span>{pet.name}</span>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '20px', textAlign: 'center' }}>
                        <span style={{
                          fontSize: '20px',
                          fontWeight: 800,
                          color: '#667EEA'
                        }}>
                          {customer.totalVisits}
                        </span>
                      </td>
                      <td style={{ padding: '20px', textAlign: 'right' }}>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: 800,
                          color: '#10B981',
                          fontFamily: 'monospace'
                        }}>
                          {formatCurrency(customer.totalSpent)}
                        </span>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <span style={{
                          fontSize: '13px',
                          color: '#6B7280',
                          fontWeight: 600
                        }}>
                          📅 {customer.lastVisit}
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
                        <button
                          onClick={() => handleViewDetails(customer)}
                          style={{
                            padding: '10px 20px',
                            borderRadius: '10px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                            color: 'white',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            margin: '0 auto'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                          }}
                        >
                          <span>👁️</span>
                          <span>Xem</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredCustomers.length === 0 && (
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
                  👥
                </div>
                <h3 style={{
                  margin: '0 0 8px 0',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#1F2937'
                }}>
                  Không tìm thấy khách hàng
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

        {/* Customer Detail Modal */}
        {selectedCustomer && (
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
            padding: '20px'
          }}
          onClick={handleCloseModal}
          >
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
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
                  color: '#1F2937'
                }}>
                  Thông tin khách hàng
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
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px',
                  background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
                  borderRadius: '16px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 800,
                    fontSize: '28px'
                  }}>
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{
                      margin: '0 0 8px 0',
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#1F2937'
                    }}>
                      {selectedCustomer.name}
                    </h3>
                    <p style={{
                      margin: 0,
                      fontSize: '13px',
                      color: '#6B7280',
                      fontWeight: 600
                    }}>
                      {selectedCustomer.id}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{
                    padding: '16px',
                    background: '#F9FAFB',
                    borderRadius: '12px',
                    border: '2px solid #F3F4F6'
                  }}>
                    <p style={{
                      margin: '0 0 8px 0',
                      fontSize: '12px',
                      color: '#6B7280',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      📞 Số điện thoại
                    </p>
                    <p style={{
                      margin: 0,
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#1F2937'
                    }}>
                      {selectedCustomer.phone}
                    </p>
                  </div>

                  <div style={{
                    padding: '16px',
                    background: '#F9FAFB',
                    borderRadius: '12px',
                    border: '2px solid #F3F4F6'
                  }}>
                    <p style={{
                      margin: '0 0 8px 0',
                      fontSize: '12px',
                      color: '#6B7280',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      📧 Email
                    </p>
                    <p style={{
                      margin: 0,
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#1F2937'
                    }}>
                      {selectedCustomer.email}
                    </p>
                  </div>

                  <div style={{
                    padding: '16px',
                    background: '#F9FAFB',
                    borderRadius: '12px',
                    border: '2px solid #F3F4F6'
                  }}>
                    <p style={{
                      margin: '0 0 8px 0',
                      fontSize: '12px',
                      color: '#6B7280',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      📍 Địa chỉ
                    </p>
                    <p style={{
                      margin: 0,
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#1F2937'
                    }}>
                      {selectedCustomer.address}
                    </p>
                  </div>

                  <div style={{
                    padding: '16px',
                    background: '#F0FDF4',
                    borderRadius: '12px',
                    border: '2px solid #BBF7D0'
                  }}>
                    <p style={{
                      margin: '0 0 12px 0',
                      fontSize: '12px',
                      color: '#166534',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}>
                      🐾 Thú cưng ({selectedCustomer.pets.length})
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {selectedCustomer.pets.map((pet, idx) => (
                        <span key={idx} style={{
                          padding: '8px 14px',
                          background: 'white',
                          borderRadius: '10px',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#166534',
                          border: '2px solid #BBF7D0',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <span style={{ fontSize: '20px' }}>{pet.icon}</span>
                          <span>{pet.name} ({pet.type})</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px'
                  }}>
                    <div style={{
                      padding: '16px',
                      background: '#FEF3C7',
                      borderRadius: '12px',
                      border: '2px solid #FCD34D',
                      textAlign: 'center'
                    }}>
                      <p style={{
                        margin: '0 0 8px 0',
                        fontSize: '24px',
                        fontWeight: 800,
                        color: '#92400E'
                      }}>
                        {selectedCustomer.totalVisits}
                      </p>
                      <p style={{
                        margin: 0,
                        fontSize: '12px',
                        color: '#92400E',
                        fontWeight: 600,
                        textTransform: 'uppercase'
                      }}>
                        Lượt đến
                      </p>
                    </div>

                    <div style={{
                      padding: '16px',
                      background: '#D1FAE5',
                      borderRadius: '12px',
                      border: '2px solid #6EE7B7',
                      textAlign: 'center'
                    }}>
                      <p style={{
                        margin: '0 0 8px 0',
                        fontSize: '16px',
                        fontWeight: 800,
                        color: '#065F46'
                      }}>
                        {formatCurrency(selectedCustomer.totalSpent)}
                      </p>
                      <p style={{
                        margin: 0,
                        fontSize: '12px',
                        color: '#065F46',
                        fontWeight: 600,
                        textTransform: 'uppercase'
                      }}>
                        Tổng chi tiêu
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}