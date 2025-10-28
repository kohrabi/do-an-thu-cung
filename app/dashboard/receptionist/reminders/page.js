"use client";
import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";

export default function RemindersPage() {
  const [reminders, setReminders] = useState([
    {
      id: "APT005",
      customerName: "Nguyễn Thị E",
      phone: "0934567890",
      email: "nguyene@example.com",
      petName: "Lucky",
      petIcon: "🐕",
      service: "Khám sức khỏe",
      serviceIcon: "🏥",
      date: "2025-10-27",
      time: "09:00",
      status: "pending",
      lastReminder: "Chưa gửi"
    },
    {
      id: "APT006",
      customerName: "Trần Văn F",
      phone: "0945678901",
      email: "tranf@example.com",
      petName: "Miu",
      petIcon: "🐈",
      service: "Tắm spa",
      serviceIcon: "🛁",
      date: "2025-10-27",
      time: "14:00",
      status: "pending",
      lastReminder: "10:30 26-10"
    },
    {
      id: "APT007",
      customerName: "Lê Thị G",
      phone: "0956789012",
      email: "leg@example.com",
      petName: "Coco",
      petIcon: "🐩",
      service: "Cắt tỉa lông",
      serviceIcon: "✂️",
      date: "2025-10-27",
      time: "16:30",
      status: "sent",
      lastReminder: "Chưa gửi"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredReminders = reminders.filter(reminder =>
    reminder.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reminder.phone.includes(searchTerm) ||
    reminder.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = reminders.filter(r => r.status === 'pending').length;
  const sentCount = reminders.filter(r => r.status === 'sent').length;

  const handleSendReminder = (id) => {
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, status: 'sent', lastReminder: new Date().toLocaleString('vi-VN') } : r
    ));
    alert(`✅ Đã gửi nhắc lịch cho ${reminders.find(r => r.id === id)?.customerName}`);
  };

  const handleSendAll = () => {
    if (confirm(`Gửi nhắc lịch cho tất cả ${pendingCount} khách hàng?`)) {
      setReminders(reminders.map(r =>
        r.status === 'pending' ? { ...r, status: 'sent', lastReminder: new Date().toLocaleString('vi-VN') } : r
      ));
      alert(`✅ Đã gửi ${pendingCount} nhắc lịch`);
    }
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
          title="Gửi nhắc lịch"
          subtitle="Gửi thông báo nhắc lịch cho khách hàng trước giờ hẹn"
        />

        {/* Stats Row */}
        <div className="section-separated">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              background: 'white',
              padding: '28px',
              borderRadius: '16px',
              border: '2px solid #F3F4F6',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                flexShrink: 0
              }}>
                📅
              </div>
              <div>
                <p style={{
                  margin: '0 0 8px 0',
                  fontSize: '13px',
                  color: '#6B7280',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>
                  Lịch sắp tới
                </p>
                <h3 style={{
                  margin: 0,
                  fontSize: '36px',
                  fontWeight: 800,
                  color: '#1F2937'
                }}>
                  {reminders.length}
                </h3>
              </div>
            </div>

            <div style={{
              background: 'white',
              padding: '28px',
              borderRadius: '16px',
              border: '2px solid #F3F4F6',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                flexShrink: 0
              }}>
                ⏳
              </div>
              <div>
                <p style={{
                  margin: '0 0 8px 0',
                  fontSize: '13px',
                  color: '#6B7280',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>
                  Cần gửi nhắc
                </p>
                <h3 style={{
                  margin: 0,
                  fontSize: '36px',
                  fontWeight: 800,
                  color: '#1F2937'
                }}>
                  {pendingCount}
                </h3>
              </div>
            </div>

            <div style={{
              background: 'white',
              padding: '28px',
              borderRadius: '16px',
              border: '2px solid #F3F4F6',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                flexShrink: 0
              }}>
                ✅
              </div>
              <div>
                <p style={{
                  margin: '0 0 8px 0',
                  fontSize: '13px',
                  color: '#6B7280',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>
                  Đã gửi
                </p>
                <h3 style={{
                  margin: 0,
                  fontSize: '36px',
                  fontWeight: 800,
                  color: '#1F2937'
                }}>
                  {sentCount}
                </h3>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                🔔
              </div>
              <div>
                <h3 style={{
                  margin: '0 0 4px 0',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#1F2937'
                }}>
                  Danh sách lịch sắp tới
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#6B7280'
                }}>
                  {filteredReminders.length} lịch hẹn cần nhắc
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                position: 'relative',
                minWidth: '280px'
              }}>
                <input
                  type="text"
                  placeholder="🔍 Tìm theo tên, SĐT, mã..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
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

              <button
                onClick={handleSendAll}
                disabled={pendingCount === 0}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  background: pendingCount > 0 ? 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)' : '#D1D5DB',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: pendingCount > 0 ? 'pointer' : 'not-allowed',
                  whiteSpace: 'nowrap',
                  boxShadow: pendingCount > 0 ? '0 4px 12px rgba(236, 72, 153, 0.3)' : 'none',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  if (pendingCount > 0) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(236, 72, 153, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = pendingCount > 0 ? '0 4px 12px rgba(236, 72, 153, 0.3)' : 'none';
                }}
              >
                <span>📤</span>
                <span>Gửi tất cả nhắc lịch</span>
              </button>
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
                  background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)'
                }}>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Mã</th>
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
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Còn lại</th>
                  <th style={{
                    padding: '18px 20px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Lần gửi cuối</th>
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
                {filteredReminders.map((reminder, index) => {
                  const statusBadge = reminder.status === 'pending' 
                    ? { label: 'Đã qua', color: '#F59E0B', bg: '#FEF3C7' }
                    : { label: 'Đã gửi', color: '#10B981', bg: '#D1FAE5' };

                  return (
                    <tr key={reminder.id} style={{
                      borderBottom: '1px solid #F3F4F6',
                      background: index % 2 === 0 ? 'white' : '#F9FAFB',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#FEF3C7'}
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
                          {reminder.id}
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
                            {reminder.customerName}
                          </p>
                          <p style={{
                            margin: 0,
                            fontSize: '13px',
                            color: '#6B7280'
                          }}>
                            📞 {reminder.phone}
                          </p>
                        </div>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{ fontSize: '24px' }}>{reminder.petIcon}</span>
                          <span style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#1F2937'
                          }}>
                            {reminder.petName}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 14px',
                          background: '#EEF2FF',
                          borderRadius: '10px',
                          border: '2px solid #C7D2FE'
                        }}>
                          <span style={{ fontSize: '20px' }}>{reminder.serviceIcon}</span>
                          <span style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            color: '#4338CA'
                          }}>
                            {reminder.service}
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
                            📅 {reminder.date}
                          </p>
                          <p style={{
                            margin: 0,
                            fontSize: '13px',
                            color: '#6B7280'
                          }}>
                            🕐 {reminder.time}
                          </p>
                        </div>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <span style={{
                          padding: '8px 14px',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontWeight: 700,
                          background: statusBadge.bg,
                          color: statusBadge.color,
                          border: `2px solid ${statusBadge.color}`,
                          display: 'inline-block'
                        }}>
                          {statusBadge.label}
                        </span>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <span style={{
                          fontSize: '13px',
                          color: '#6B7280',
                          fontWeight: 600
                        }}>
                          {reminder.lastReminder}
                        </span>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <button
                          onClick={() => handleSendReminder(reminder.id)}
                          disabled={reminder.status === 'sent'}
                          style={{
                            padding: '10px 20px',
                            borderRadius: '10px',
                            border: 'none',
                            background: reminder.status === 'pending' 
                              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' 
                              : '#D1D5DB',
                            color: 'white',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: reminder.status === 'pending' ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            margin: '0 auto',
                            transition: 'all 0.2s',
                            boxShadow: reminder.status === 'pending' ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
                          }}
                          onMouseEnter={(e) => {
                            if (reminder.status === 'pending') {
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = reminder.status === 'pending' ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none';
                          }}
                        >
                          <span>📤</span>
                          <span>Gửi</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredReminders.length === 0 && (
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
                  🔔
                </div>
                <h3 style={{
                  margin: '0 0 8px 0',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#1F2937'
                }}>
                  Không có lịch hẹn nào
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