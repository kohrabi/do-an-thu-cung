"use client";
import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";

export default function SlipsPage() {
  const [slips, setSlips] = useState([
    {
      id: "APT002",
      customerName: "Trần Thị B",
      phone: "0909876543",
      email: "tranthib@example.com",
      petName: "Miu",
      petIcon: "🐈",
      service: "Tắm spa",
      serviceIcon: "🛁",
      date: "2025-11-20",
      time: "14:00",
      staff: "Nhân viên Trần Thị B"
    },
    {
      id: "APT004",
      customerName: "Phạm Văn D",
      phone: "0923456789",
      email: "phamvand@example.com",
      petName: "Max",
      petIcon: "🐕",
      service: "Khám sức khỏe",
      serviceIcon: "🏥",
      date: "2025-11-21",
      time: "10:30",
      staff: "BS. Nguyễn Văn A"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSlips = slips.filter(slip =>
    slip.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slip.phone.includes(searchTerm) ||
    slip.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = (slip) => {
    alert(`In phiếu hẹn ${slip.id}`);
  };

  const handleSendEmail = (slip) => {
    alert(`Gửi email cho ${slip.email}`);
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
          title="Quản lý phiếu hẹn"
          subtitle="In và gửi phiếu hẹn cho khách hàng"
        />

        {/* Stats Row */}
        <div className="section-separated">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            {/* Stat 1 */}
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
                  ✅
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: '0 0 4px 0',
                    fontSize: '13px',
                    opacity: 0.9,
                    fontWeight: 600
                  }}>
                    Lịch đã xác nhận
                  </p>
                  <h3 style={{
                    margin: 0,
                    fontSize: '36px',
                    fontWeight: 800
                  }}>
                    {slips.length}
                  </h3>
                </div>
              </div>
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '13px',
                opacity: 0.9
              }}>
                📅 Hôm nay: {new Date().toLocaleDateString('vi-VN')}
              </div>
            </div>

            {/* Stat 2 */}
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
                  🖨️
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: '0 0 4px 0',
                    fontSize: '13px',
                    color: '#6B7280',
                    fontWeight: 600
                  }}>
                    Đã in phiếu
                  </p>
                  <h3 style={{
                    margin: 0,
                    fontSize: '36px',
                    fontWeight: 800,
                    color: '#667EEA'
                  }}>
                    {slips.length}
                  </h3>
                </div>
              </div>
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid #F3F4F6',
                fontSize: '13px',
                color: '#6B7280'
              }}>
                ⏱️ Tuần này
              </div>
            </div>

            {/* Stat 3 */}
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
                  📧
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: '0 0 4px 0',
                    fontSize: '13px',
                    color: '#6B7280',
                    fontWeight: 600
                  }}>
                    Email đã gửi
                  </p>
                  <h3 style={{
                    margin: 0,
                    fontSize: '36px',
                    fontWeight: 800,
                    color: '#10B981'
                  }}>
                    {slips.length}
                  </h3>
                </div>
              </div>
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid #F3F4F6',
                fontSize: '13px',
                color: '#6B7280'
              }}>
                📊 Tháng này
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                📋
              </div>
              <div>
                <h3 style={{
                  margin: '0 0 4px 0',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#1F2937'
                }}>
                  Danh sách phiếu hẹn
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#6B7280'
                }}>
                  Quản lý {filteredSlips.length} phiếu hẹn
                </p>
              </div>
            </div>

            <div style={{
              position: 'relative',
              flex: '1',
              maxWidth: '400px',
              minWidth: '280px'
            }}>
              <input
                type="text"
                placeholder="🔍 Tìm theo tên, SĐT, mã phiếu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid #E5E7EB',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  background: '#F9FAFB'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667EEA';
                  e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                  e.target.style.background = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = '#F9FAFB';
                }}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="section-separated">
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
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Mã phiếu
                  </th>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Khách hàng
                  </th>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Email
                  </th>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Dịch vụ
                  </th>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Ngày & Giờ
                  </th>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Nhân viên
                  </th>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSlips.map((slip, index) => (
                  <tr key={slip.id} style={{
                    borderBottom: '1px solid #F3F4F6',
                    transition: 'all 0.2s',
                    background: index % 2 === 0 ? 'white' : '#F9FAFB'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#EEF2FF';
                    e.currentTarget.style.transform = 'scale(1.01)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = index % 2 === 0 ? 'white' : '#F9FAFB';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  >
                    <td style={{ padding: '20px' }}>
                      <span style={{
                        padding: '8px 14px',
                        background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
                        color: '#667EEA',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        border: '2px solid #C7D2FE',
                        display: 'inline-block'
                      }}>
                        {slip.id}
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
                          background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '16px',
                          flexShrink: 0
                        }}>
                          {slip.customerName.charAt(0)}
                        </div>
                        <div>
                          <p style={{
                            margin: '0 0 4px 0',
                            fontSize: '14px',
                            fontWeight: 700,
                            color: '#1F2937'
                          }}>
                            {slip.customerName}
                          </p>
                          <p style={{
                            margin: 0,
                            fontSize: '13px',
                            color: '#6B7280',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            📞 {slip.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <span style={{
                        fontSize: '13px',
                        color: '#6B7280',
                        fontFamily: 'monospace',
                        padding: '10px 12px',
                        background: '#F3F4F6',
                        borderRadius: '8px',
                        display: 'inline-block'
                      }}>
                        {slip.email}
                      </span>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        background: '#F0FDF4',
                        borderRadius: '10px',
                        border: '2px solid #BBF7D0'
                      }}>
                        <span style={{ fontSize: '24px' }}>{slip.serviceIcon}</span>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#166534'
                        }}>
                          {slip.service}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{
                        padding: '10px 14px',
                        background: '#FEF3C7',
                        borderRadius: '10px',
                        border: '2px solid #FDE68A',
                        display: 'inline-block'
                      }}>
                        <p style={{
                          margin: '0 0 4px 0',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#92400E',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <span>📅</span>
                          <span>{slip.date}</span>
                        </p>
                        <p style={{
                          margin: 0,
                          fontSize: '13px',
                          color: '#B45309',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <span>🕐</span>
                          <span>{slip.time}</span>
                        </p>
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{
                        padding: '10px 14px',
                        background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
                        borderRadius: '10px',
                        border: '2px solid #93C5FD',
                        display: 'inline-block'
                      }}>
                        <span style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#1E40AF'
                        }}>
                          {slip.staff}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center'
                      }}>
                        <button
                          onClick={() => handlePrint(slip)}
                          style={{
                            padding: '10px 18px',
                            borderRadius: '10px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                            color: 'white',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                          }}
                        >
                          <span>🖨️</span>
                          <span>In</span>
                        </button>
                        <button
                          onClick={() => handleSendEmail(slip)}
                          style={{
                            padding: '10px 18px',
                            borderRadius: '10px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                            color: 'white',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                          }}
                        >
                          <span>📧</span>
                          <span>Email</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredSlips.length === 0 && (
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
                  📋
                </div>
                <h3 style={{
                  margin: '0 0 8px 0',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#1F2937'
                }}>
                  Không tìm thấy phiếu hẹn
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
      </div>
    </>
  );
}