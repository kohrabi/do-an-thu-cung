"use client";
import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";

export default function ReceptionistDashboardPage() {
  const todayStats = {
    newCustomers: 3,
    totalCalls: 12,
    emailsSent: 8,
    appointmentsConfirmed: 5,
    appointmentsPending: 2,
    appointmentsCancelled: 1
  };

  const quickActions = [
    {
      id: 1,
      title: "Quản lý lịch đặt",
      icon: "📅",
      color: "#667EEA",
      bg: "#EEF2FF",
      link: "/dashboard/receptionist/appointments"
    },
    {
      id: 2,
      title: "Quản lý phiếu hẹn",
      icon: "📋",
      color: "#EC4899",
      bg: "#FCE7F3",
      link: "/dashboard/receptionist/tickets"
    },
    {
      id: 3,
      title: "Gửi nhắc lịch",
      icon: "🔔",
      color: "#F59E0B",
      bg: "#FEF3C7",
      link: "/dashboard/receptionist/reminders"
    },
    {
      id: 4,
      title: "Thanh toán",
      icon: "💳",
      color: "#10B981",
      bg: "#D1FAE5",
      link: "/dashboard/receptionist/payments"
    },
    {
      id: 5,
      title: "Khách hàng",
      icon: "👥",
      color: "#8B5CF6",
      bg: "#EDE9FE",
      link: "/dashboard/receptionist/customers"
    }
  ];

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Tổng quan"
        subtitle="Xin chào! Chúc bạn một ngày làm việc tốt lành"
      />

      {/* Quick Actions Grid */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">⚡</span>
            Thao tác nhanh
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {quickActions.map((action) => (
            <a
              key={action.id}
              href={action.link}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px 24px',
                background: 'white',
                borderRadius: '16px',
                border: '2px solid #F3F4F6',
                textDecoration: 'none',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = action.color;
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = `0 10px 30px ${action.color}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#F3F4F6';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: action.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
                marginBottom: '16px'
              }}>
                {action.icon}
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#1F2937',
                margin: 0,
                textAlign: 'center'
              }}>
                {action.title}
              </h3>
            </a>
          ))}
        </div>
      </div>

      {/* Today's Overview */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📊</span>
            Tổng quan hôm nay
          </h2>
          <span className="section-count">
            {new Date().toLocaleDateString('vi-VN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {/* Stat Card 1 */}
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '16px',
            border: '2px solid #F3F4F6',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px'
            }}>
              👥
            </div>
            <div>
              <p style={{
                margin: '0 0 8px 0',
                fontSize: '14px',
                color: '#6B7280',
                fontWeight: 600
              }}>
                Khách hàng mới
              </p>
              <h3 style={{
                margin: 0,
                fontSize: '32px',
                fontWeight: 800,
                color: '#1F2937'
              }}>
                {todayStats.newCustomers}
              </h3>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '16px',
            border: '2px solid #F3F4F6',
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
              fontSize: '32px'
            }}>
              📞
            </div>
            <div>
              <p style={{
                margin: '0 0 8px 0',
                fontSize: '14px',
                color: '#6B7280',
                fontWeight: 600
              }}>
                Cuộc gọi tiếp nhận
              </p>
              <h3 style={{
                margin: 0,
                fontSize: '32px',
                fontWeight: 800,
                color: '#1F2937'
              }}>
                {todayStats.totalCalls}
              </h3>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '16px',
            border: '2px solid #F3F4F6',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px'
            }}>
              📧
            </div>
            <div>
              <p style={{
                margin: '0 0 8px 0',
                fontSize: '14px',
                color: '#6B7280',
                fontWeight: 600
              }}>
                Email đã gửi
              </p>
              <h3 style={{
                margin: 0,
                fontSize: '32px',
                fontWeight: 800,
                color: '#1F2937'
              }}>
                {todayStats.emailsSent}
              </h3>
            </div>
          </div>

          {/* Stat Card 4 - Appointments */}
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '16px',
            border: '2px solid #F3F4F6',
            gridColumn: 'span 3'
          }}>
            <h4 style={{
              margin: '0 0 20px 0',
              fontSize: '16px',
              fontWeight: 700,
              color: '#1F2937',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>📅</span>
              Trạng thái lịch hẹn
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              <div style={{
                padding: '16px',
                background: '#D1FAE5',
                borderRadius: '12px',
                border: '2px solid #6EE7B7'
              }}>
                <p style={{
                  margin: '0 0 8px 0',
                  fontSize: '13px',
                  color: '#065F46',
                  fontWeight: 600
                }}>
                  ✅ Đã xác nhận
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#059669'
                }}>
                  {todayStats.appointmentsConfirmed}
                </p>
              </div>
              <div style={{
                padding: '16px',
                background: '#FEF3C7',
                borderRadius: '12px',
                border: '2px solid #FCD34D'
              }}>
                <p style={{
                  margin: '0 0 8px 0',
                  fontSize: '13px',
                  color: '#92400E',
                  fontWeight: 600
                }}>
                  ⏳ Chờ xác nhận
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#D97706'
                }}>
                  {todayStats.appointmentsPending}
                </p>
              </div>
              <div style={{
                padding: '16px',
                background: '#FEE2E2',
                borderRadius: '12px',
                border: '2px solid #FCA5A5'
              }}>
                <p style={{
                  margin: '0 0 8px 0',
                  fontSize: '13px',
                  color: '#991B1B',
                  fontWeight: 600
                }}>
                  ❌ Đã hủy
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#DC2626'
                }}>
                  {todayStats.appointmentsCancelled}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}