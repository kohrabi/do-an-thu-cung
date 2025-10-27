// app/(dashboard)/vet/schedule/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import VetScheduleDetailModal from "@/components/modals/VetScheduleDetailModal";
import VetRecordModal from "@/components/modals/VetRecordModal";

export default function VeterinarianSchedulePage() {
  const [selectedDate, setSelectedDate] = useState("2025-10-27");
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadAppointments();
  }, [selectedDate]);

  const loadAppointments = () => {
    // Mock data - NGÀY 2025-10-27
    setAppointments([
      {
        id: "APT001",
        code: "APT001",
        time: "09:00",
        petId: "PET001",
        petName: "Lucky",
        petIcon: "🐕",
        petType: "Chó Golden Retriever",
        petAge: "2 tuổi",
        petWeight: "28 kg",
        ownerId: "CUS001",
        ownerName: "Nguyễn Văn A",
        ownerPhone: "0901234567",
        serviceId: "SRV001",
        serviceName: "Khám sức khỏe tổng quát",
        serviceIcon: "🏥",
        status: "completed",
        symptoms: "Ăn uống kém, uể oải",
        notes: "Đã khỏe, tiếp tục theo dõi",
        previousRecords: [
          {
            date: "2025-09-15",
            diagnosis: "Cảm lạnh nhẹ",
            treatment: "Đã kê đơn thuốc kháng sinh"
          }
        ]
      },
      {
        id: "APT002",
        code: "APT002",
        time: "10:30",
        petId: "PET002",
        petName: "Miu",
        petIcon: "🐈",
        petType: "Mèo Ba Tư",
        petAge: "1 tuổi",
        petWeight: "4 kg",
        ownerId: "CUS002",
        ownerName: "Trần Thị B",
        ownerPhone: "0909876543",
        serviceId: "SRV002",
        serviceName: "Tiêm phòng dại",
        serviceIcon: "💉",
        status: "completed",
        symptoms: "Tiêm phòng định kỳ",
        notes: "Đã tiêm thành công",
        previousRecords: []
      },
      {
        id: "APT003",
        code: "APT003",
        time: "14:00",
        petId: "PET003",
        petName: "Coco",
        petIcon: "🐩",
        petType: "Chó Poodle",
        petAge: "3 tuổi",
        petWeight: "6 kg",
        ownerId: "CUS003",
        ownerName: "Lê Văn C",
        ownerPhone: "0912345678",
        serviceId: "SRV003",
        serviceName: "Tái khám",
        serviceIcon: "🔄",
        status: "in_progress",
        symptoms: "Kiểm tra sau điều trị",
        notes: "",
        previousRecords: [
          {
            date: "2025-10-20",
            diagnosis: "Viêm da",
            treatment: "Đã điều trị thành công"
          }
        ]
      },
      {
        id: "APT004",
        code: "APT004",
        time: "15:30",
        petId: "PET004",
        petName: "Max",
        petIcon: "🐕",
        petType: "Chó Husky",
        petAge: "4 tuổi",
        petWeight: "32 kg",
        ownerId: "CUS004",
        ownerName: "Phạm Thị D",
        ownerPhone: "0923456789",
        serviceId: "SRV004",
        serviceName: "Khám da liễu",
        serviceIcon: "🩺",
        status: "waiting",
        symptoms: "Ngứa ngáy, rụng lông",
        notes: "",
        previousRecords: []
      },
      {
        id: "APT005",
        code: "APT005",
        time: "16:30",
        petId: "PET005",
        petName: "Bella",
        petIcon: "🐈",
        petType: "Mèo Anh lông ngắn",
        petAge: "2 tuổi",
        petWeight: "5 kg",
        ownerId: "CUS005",
        ownerName: "Hoàng Thị E",
        ownerPhone: "0934567890",
        serviceId: "SRV005",
        serviceName: "Xét nghiệm máu",
        serviceIcon: "💉",
        status: "waiting",
        symptoms: "Kiểm tra sức khỏe định kỳ",
        notes: "",
        previousRecords: []
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleStartExam = (appointmentId) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointmentId
        ? { ...apt, status: "in_progress" }
        : apt
    ));
    showToast("🔄 Đã bắt đầu khám");
  };

  const handleCompleteExam = (appointment) => {
    setSelectedAppointment(appointment);
    setIsRecordModalOpen(true);
  };

  const handleRecordSuccess = (data) => {
    setAppointments(appointments.map(apt =>
      apt.id === data.appointmentId
        ? { ...apt, status: "completed", notes: data.recordData.notes }
        : apt
    ));
    showToast("✅ Đã hoàn thành ca khám và lưu bệnh án!");
  };

  const handleViewDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(true);
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchFilter = filter === "all" || apt.status === filter;
    const matchSearch = apt.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       apt.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const getStatusBadge = (status) => {
    const badges = {
      waiting: { label: "Chờ khám", class: "status-waiting", icon: "⏳" },
      in_progress: { label: "Đang khám", class: "status-in-progress", icon: "🔄" },
      completed: { label: "Hoàn thành", class: "status-completed", icon: "✓" }
    };
    return badges[status] || badges.waiting;
  };

  const stats = {
    total: appointments.length,
    waiting: appointments.filter(a => a.status === 'waiting').length,
    inProgress: appointments.filter(a => a.status === 'in_progress').length,
    completed: appointments.filter(a => a.status === 'completed').length
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Lịch làm việc"
        subtitle="Quản lý lịch khám và thực hiện ca khám"
      />

      {/* Stats */}
      <div className="section-separated">
        <div className="stats-grid-custom">
          <div className="stat-card-modern stat-primary">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">📅</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Tổng ca khám</p>
              <h3 className="stat-number">{stats.total}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-warning">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">⏳</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Chờ khám</p>
              <h3 className="stat-number">{stats.waiting}</h3>
            </div>
          </div>

          <div className="stat-card-modern">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">🔄</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Đang khám</p>
              <h3 className="stat-number">{stats.inProgress}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-success">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">✓</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Hoàn thành</p>
              <h3 className="stat-number">{stats.completed}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="section-separated">
        <div className="filter-buttons-group">
          <button
            onClick={() => setFilter("all")}
            className={`filter-btn-modern ${filter === "all" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">📋</span>
            <span>Tất cả</span>
          </button>
          <button
            onClick={() => setFilter("waiting")}
            className={`filter-btn-modern ${filter === "waiting" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">⏳</span>
            <span>Chờ khám</span>
          </button>
          <button
            onClick={() => setFilter("in_progress")}
            className={`filter-btn-modern ${filter === "in_progress" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">🔄</span>
            <span>Đang khám</span>
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`filter-btn-modern ${filter === "completed" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">✓</span>
            <span>Hoàn thành</span>
          </button>
        </div>
      </div>

      {/* Date Picker */}
      <div className="section-separated">
        <div className="date-filter-section">
          <label className="filter-label">
            <span className="filter-icon">📅</span>
            Chọn ngày
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-input-modern"
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="section-separated">
        <div className="search-section-right">
          <div className="search-box-modern">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên thú cưng hoặc chủ nuôi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-modern"
            />
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Lịch khám ngày {selectedDate}
          </h2>
          <span className="section-count">{filteredAppointments.length} ca khám</span>
        </div>

        <div className="table-modern-wrapper">
          <table className="table-modern">
            <thead>
              <tr>
                <th style={{width: '8%'}}>Mã</th>
                <th style={{width: '8%'}}>Giờ</th>
                <th style={{width: '18%'}}>Thú cưng</th>
                <th style={{width: '15%'}}>Chủ nuôi</th>
                <th style={{width: '16%'}}>Dịch vụ</th>
                <th style={{width: '12%'}}>Trạng thái</th>
                <th style={{width: '23%', textAlign: 'center'}}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((apt) => {
                const statusBadge = getStatusBadge(apt.status);
                return (
                  <tr key={apt.id}>
                    <td>
                      <span className="code-badge">{apt.code}</span>
                    </td>
                    
                    <td>
                      <span className="time-badge">🕐 {apt.time}</span>
                    </td>
                    
                    <td>
                      <div className="pet-detail-cell">
                        <span className="pet-icon-large">{apt.petIcon}</span>
                        <div>
                          <p className="pet-name-bold">{apt.petName}</p>
                          <p className="pet-info-small">{apt.petType}</p>
                        </div>
                      </div>
                    </td>
                    
                    <td>
                      <div className="customer-cell">
                        <p className="font-semibold">{apt.ownerName}</p>
                        <p className="text-sm text-gray-500">{apt.ownerPhone}</p>
                      </div>
                    </td>
                    
                    <td>
                      <span className="service-icon-small">{apt.serviceIcon}</span>
                      {apt.serviceName}
                    </td>
                    
                    <td>
                      <span className={`status-badge-wide ${statusBadge.class}`}>
                        <span className="status-icon">{statusBadge.icon}</span>
                        <span className="status-text">{statusBadge.label}</span>
                      </span>
                    </td>
                    
                    <td>
                      <div className="action-buttons-modern action-buttons-centered">
                        <button
                          onClick={() => handleViewDetail(apt)}
                          className="btn-icon-action btn-view-icon"
                          title="Chi tiết"
                        >
                          👁️
                        </button>
                        
                        {apt.status === 'waiting' && (
                          <button
                            onClick={() => handleStartExam(apt.id)}
                            className="btn-icon-action btn-start-icon"
                            title="Bắt đầu khám"
                          >
                            ▶️
                          </button>
                        )}
                        
                        {(apt.status === 'in_progress' || apt.status === 'waiting') && (
                          <button
                            onClick={() => handleCompleteExam(apt)}
                            className="btn-icon-action btn-complete-icon"
                            title="Hoàn thành"
                          >
                            ✓
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredAppointments.length === 0 && (
            <div className="empty-state-modern">
              <div className="empty-icon">📅</div>
              <p className="empty-text">Không có ca khám nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isDetailModalOpen && (
        <VetScheduleDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedAppointment(null);
          }}
          appointment={selectedAppointment}
        />
      )}

      {isRecordModalOpen && (
        <VetRecordModal
          isOpen={isRecordModalOpen}
          onClose={() => {
            setIsRecordModalOpen(false);
            setSelectedAppointment(null);
          }}
          onSuccess={handleRecordSuccess}
          appointment={selectedAppointment}
        />
      )}

      {/* Toast */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}