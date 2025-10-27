// app/(dashboard)/receptionist/reminders/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Button from "@/components/ui/Button";

export default function ReceptionistRemindersPage() {
  const [appointments, setAppointments] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [sendingAll, setSendingAll] = useState(false);
  const [sendingId, setSendingId] = useState(null);

  useEffect(() => {
    // Mock upcoming appointments (trong 24h tới)
    setAppointments([
      {
        id: "APT005",
        code: "APT005",
        customerName: "Nguyễn Thị E",
        customerPhone: "0934567890",
        petName: "Lucky",
        petIcon: "🐕",
        serviceName: "Khám sức khỏe",
        serviceIcon: "🏥",
        date: "2025-10-27",
        time: "09:00",
        lastSent: null
      },
      {
        id: "APT006",
        code: "APT006",
        customerName: "Trần Văn F",
        customerPhone: "0945678901",
        petName: "Miu",
        petIcon: "🐈",
        serviceName: "Tắm spa",
        serviceIcon: "🛁",
        date: "2025-10-27",
        time: "14:00",
        lastSent: "2025-10-26 10:30:00"
      },
      {
        id: "APT007",
        code: "APT007",
        customerName: "Lê Thị G",
        customerPhone: "0956789012",
        petName: "Coco",
        petIcon: "🐩",
        serviceName: "Cắt tỉa lông",
        serviceIcon: "✂️",
        date: "2025-10-27",
        time: "16:30",
        lastSent: null
      }
    ]);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const canSendReminder = (lastSent) => {
    if (!lastSent) return true;
    
    const lastSentTime = new Date(lastSent);
    const now = new Date();
    const diffHours = (now - lastSentTime) / (1000 * 60 * 60);
    
    return diffHours >= 6; // Quy tắc: không gửi lại trong 6 giờ
  };

  const handleSendReminder = (appointment) => {
    if (!canSendReminder(appointment.lastSent)) {
      showToast("⚠️ Đã gửi nhắc lịch trong 6 giờ gần nhất", "warning");
      return;
    }

    setSendingId(appointment.id);
    
    setTimeout(() => {
      setAppointments(appointments.map(apt =>
        apt.id === appointment.id
          ? { ...apt, lastSent: new Date().toISOString() }
          : apt
      ));
      
      setSendingId(null);
      showToast(`🔔 Đã gửi nhắc lịch cho ${appointment.customerName}`, "success");
    }, 1000);
  };

  const handleSendAllReminders = () => {
    const eligibleAppointments = appointments.filter(apt => canSendReminder(apt.lastSent));
    
    if (eligibleAppointments.length === 0) {
      showToast("⚠️ Không có lịch nào cần gửi nhắc", "warning");
      return;
    }

    setSendingAll(true);

    setTimeout(() => {
      const now = new Date().toISOString();
      setAppointments(appointments.map(apt =>
        canSendReminder(apt.lastSent)
          ? { ...apt, lastSent: now }
          : apt
      ));
      
      setSendingAll(false);
      showToast(`🔔 Đã gửi ${eligibleAppointments.length} nhắc lịch thành công!`, "success");
    }, 1500);
  };

  const formatLastSent = (lastSent) => {
    if (!lastSent) return "Chưa gửi";
    
    const date = new Date(lastSent);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntilAppointment = (date, time) => {
    const appointmentDateTime = new Date(`${date} ${time}`);
    const now = new Date();
    const diffHours = Math.round((appointmentDateTime - now) / (1000 * 60 * 60));
    
    if (diffHours < 0) return "Đã qua";
    if (diffHours === 0) return "Trong 1 giờ";
    if (diffHours < 24) return `${diffHours} giờ nữa`;
    return `${Math.floor(diffHours / 24)} ngày nữa`;
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Gửi nhắc lịch"
        subtitle="Gửi thông báo nhắc lịch cho khách hàng trước giờ hẹn"
      />

      {/* Stats */}
      <div className="stats-section-wrapper">
        <div className="stats-grid-compact">
          <div className="stats-card-compact stats-card-primary">
            <div className="stats-icon-compact">📅</div>
            <div className="stats-content-compact">
              <p className="stats-label-compact">Lịch sắp tới</p>
              <h3 className="stats-value-compact">{appointments.length}</h3>
            </div>
          </div>

          <div className="stats-card-compact stats-card-warning">
            <div className="stats-icon-compact">🔔</div>
            <div className="stats-content-compact">
              <p className="stats-label-compact">Cần gửi nhắc</p>
              <h3 className="stats-value-compact">
                {appointments.filter(apt => canSendReminder(apt.lastSent)).length}
              </h3>
            </div>
          </div>

          <div className="stats-card-compact stats-card-success">
            <div className="stats-icon-compact">✅</div>
            <div className="stats-content-compact">
              <p className="stats-label-compact">Đã gửi</p>
              <h3 className="stats-value-compact">
                {appointments.filter(apt => apt.lastSent).length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Send All Button */}
      <div className="content-section-wrapper">
        <div className="action-section">
          <Button
            onClick={handleSendAllReminders}
            loading={sendingAll}
            disabled={sendingAll || appointments.filter(apt => canSendReminder(apt.lastSent)).length === 0}
            className="btn-primary-large"
          >
            <span className="btn-icon">📤</span>
            <span>Gửi tất cả nhắc lịch</span>
          </Button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="content-section-wrapper">
        <div className="section-header-modern">
          <h3 className="section-title-large">
            <span className="title-icon">📋</span>
            Danh sách lịch sắp tới
          </h3>
          <span className="section-count">{appointments.length} lịch hẹn</span>
        </div>

        <div className="table-container-modern">
          <div className="table-wrapper">
            <table className="data-table-wide">
              <thead>
                <tr>
                  <th style={{width: '8%'}}>Mã</th>
                  <th style={{width: '18%'}}>Khách hàng</th>
                  <th style={{width: '12%'}}>Thú cưng</th>
                  <th style={{width: '15%'}}>Dịch vụ</th>
                  <th style={{width: '12%'}}>Ngày & Giờ</th>
                  <th style={{width: '10%'}}>Còn lại</th>
                  <th style={{width: '15%'}}>Lần gửi cuối</th>
                  <th style={{width: '10%'}}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => {
                  const canSend = canSendReminder(apt.lastSent);
                  const isSending = sendingId === apt.id;
                  
                  return (
                    <tr key={apt.id}>
                      <td className="font-mono font-bold">{apt.code}</td>
                      
                      <td>
                        <div className="customer-cell">
                          <p className="font-semibold">{apt.customerName}</p>
                          <p className="text-sm text-gray-500">{apt.customerPhone}</p>
                        </div>
                      </td>
                      
                      <td>
                        <div className="pet-cell">
                          <span className="pet-icon-cell">{apt.petIcon}</span>
                          <span>{apt.petName}</span>
                        </div>
                      </td>
                      
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
                      
                      <td>
                        <span className="time-remaining-badge">
                          ⏰ {getTimeUntilAppointment(apt.date, apt.time)}
                        </span>
                      </td>
                      
                      <td>
                        <span className={apt.lastSent ? 'text-sm text-green-600 font-semibold' : 'text-sm text-gray-400 italic'}>
                          {formatLastSent(apt.lastSent)}
                        </span>
                      </td>
                      
                      <td>
                        <button
                          onClick={() => handleSendReminder(apt)}
                          disabled={!canSend || isSending || sendingAll}
                          className={`btn-action-sm ${!canSend || sendingAll ? 'btn-disabled' : 'btn-send'}`}
                          title={!canSend ? "Đã gửi trong 6 giờ gần nhất" : "Gửi nhắc lịch"}
                        >
                          {isSending ? (
                            <>⏳ Đang gửi...</>
                          ) : (
                            <>🔔 Gửi</>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {appointments.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <p className="empty-text">Không có lịch hẹn sắp tới</p>
            </div>
          )}
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