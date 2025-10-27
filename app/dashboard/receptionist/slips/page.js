// app/(dashboard)/receptionist/slips/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";

export default function ReceptionistSlipsPage() {
  const [appointments, setAppointments] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    // Mock confirmed appointments
    setAppointments([
      {
        id: "APT002",
        code: "APT002",
        customerName: "Trần Thị B",
        customerEmail: "tranthib@example.com",
        customerPhone: "0909876543",
        petName: "Miu",
        petIcon: "🐈",
        serviceName: "Tắm spa",
        serviceIcon: "🛁",
        date: "2025-11-20",
        time: "14:00",
        staffName: "Nhân viên Trần Thị B"
      },
      {
        id: "APT004",
        code: "APT004",
        customerName: "Phạm Văn D",
        customerEmail: "phamvand@example.com",
        customerPhone: "0923456789",
        petName: "Max",
        petIcon: "🐕",
        serviceName: "Khám sức khỏe",
        serviceIcon: "🏥",
        date: "2025-11-21",
        time: "10:30",
        staffName: "BS. Nguyễn Văn A"
      }
    ]);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handlePrintSlip = (appointment) => {
    showToast(`📄 Đang in phiếu hẹn cho ${appointment.customerName}...`, "info");
    // Implementation: Generate PDF
  };

  const handleSendEmail = (appointment) => {
    showToast(`📩 Đã gửi phiếu hẹn qua email cho ${appointment.customerEmail}`, "success");
    // Implementation: Send email
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Quản lý phiếu hẹn"
        subtitle="In và gửi phiếu hẹn cho khách hàng"
      />

      {/* Stats */}
      <div className="stats-section-wrapper">
        <div className="stats-grid-compact">
          <div className="stats-card-compact stats-card-success">
            <div className="stats-icon-compact">✅</div>
            <div className="stats-content-compact">
              <p className="stats-label-compact">Lịch đã xác nhận</p>
              <h3 className="stats-value-compact">{appointments.length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="content-section-wrapper">
        <div className="section-header-modern">
          <h3 className="section-title-large">
            <span className="title-icon">📋</span>
            Danh sách lịch đã xác nhận
          </h3>
          <span className="section-count">{appointments.length} phiếu hẹn</span>
        </div>

        <div className="table-container-modern">
          <div className="table-wrapper">
            <table className="data-table-wide">
              <thead>
                <tr>
                  <th style={{width: '10%'}}>Mã</th>
                  <th style={{width: '20%'}}>Khách hàng</th>
                  <th style={{width: '18%'}}>Email</th>
                  <th style={{width: '12%'}}>Dịch vụ</th>
                  <th style={{width: '12%'}}>Ngày & Giờ</th>
                  <th style={{width: '15%'}}>Nhân viên</th>
                  <th style={{width: '13%'}}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt.id}>
                    <td className="font-mono font-bold">{apt.code}</td>
                    <td>
                      <div className="customer-cell">
                        <p className="font-semibold">{apt.customerName}</p>
                        <p className="text-sm text-gray-500">{apt.customerPhone}</p>
                      </div>
                    </td>
                    <td className="text-gray-600 text-sm">{apt.customerEmail}</td>
                    <td>
                      <span className="service-icon-small">{apt.serviceIcon}</span>
                      {apt.serviceName}
                    </td>
                    <td>
                      <div className="datetime-cell">
                        <p className="font-semibold">{apt.date}</p>
                        <p className="text-sm text-gray-500">🕐 {apt.time}</p>
                      </div>
                    </td>
                    <td className="text-sm">{apt.staffName}</td>
                    <td>
                      <div className="action-buttons-horizontal">
                        <button
                          onClick={() => handlePrintSlip(apt)}
                          className="btn-action-sm btn-print"
                          title="In phiếu"
                        >
                          🖨️
                        </button>
                        <button
                          onClick={() => handleSendEmail(apt)}
                          className="btn-action-sm btn-email"
                          title="Gửi email"
                        >
                          📧
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}