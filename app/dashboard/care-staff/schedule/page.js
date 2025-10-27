// app/(dashboard)/care-staff/schedule/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";

export default function CareStaffSchedulePage() {
  const [selectedDate, setSelectedDate] = useState("2025-10-27");
  const [schedule, setSchedule] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadSchedule();
  }, [selectedDate]);

  const loadSchedule = () => {
    // Mock data
    setSchedule([
      {
        id: "SCH001",
        time: "09:00",
        petName: "Lucky",
        petIcon: "🐕",
        petType: "Chó Golden Retriever",
        ownerName: "Nguyễn Văn A",
        ownerPhone: "0901234567",
        service: "Tắm & Spa",
        serviceIcon: "🛁",
        status: "completed",
        notes: "Đã hoàn thành tốt"
      },
      {
        id: "SCH002",
        time: "10:30",
        petName: "Miu",
        petIcon: "🐈",
        petType: "Mèo Ba Tư",
        ownerName: "Trần Thị B",
        ownerPhone: "0909876543",
        service: "Cắt tỉa lông",
        serviceIcon: "✂️",
        status: "in_progress",
        notes: ""
      },
      {
        id: "SCH003",
        time: "14:00",
        petName: "Coco",
        petIcon: "🐩",
        petType: "Chó Poodle",
        ownerName: "Lê Văn C",
        ownerPhone: "0912345678",
        service: "Vệ sinh tai",
        serviceIcon: "🧼",
        status: "pending",
        notes: ""
      },
      {
        id: "SCH004",
        time: "15:30",
        petName: "Max",
        petIcon: "🐕",
        petType: "Chó Husky",
        ownerName: "Phạm Thị D",
        ownerPhone: "0923456789",
        service: "Chải lông",
        serviceIcon: "🪮",
        status: "pending",
        notes: ""
      }
    ]);
  };

  const filteredSchedule = schedule.filter(item => {
    const matchFilter = filter === "all" || item.status === filter;
    const matchSearch = item.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: "Chưa làm", class: "status-pending", icon: "⏳" },
      in_progress: { label: "Đang làm", class: "status-in-progress", icon: "🔄" },
      completed: { label: "Hoàn thành", class: "status-completed", icon: "✓" }
    };
    return badges[status] || badges.pending;
  };

  const stats = {
    total: schedule.length,
    pending: schedule.filter(s => s.status === 'pending').length,
    inProgress: schedule.filter(s => s.status === 'in_progress').length,
    completed: schedule.filter(s => s.status === 'completed').length
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Lịch làm việc"
        subtitle="Quản lý lịch chăm sóc thú cưng"
      />

      {/* Stats */}
      <div className="section-separated">
        <div className="stats-grid-custom">
          <div className="stat-card-modern stat-primary">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">📅</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Tổng lịch</p>
              <h3 className="stat-number">{stats.total}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-warning">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">⏳</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Chưa làm</p>
              <h3 className="stat-number">{stats.pending}</h3>
            </div>
          </div>

          <div className="stat-card-modern">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">🔄</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Đang làm</p>
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

      {/* Filters */}
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
            onClick={() => setFilter("pending")}
            className={`filter-btn-modern ${filter === "pending" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">⏳</span>
            <span>Chưa làm</span>
          </button>
          <button
            onClick={() => setFilter("in_progress")}
            className={`filter-btn-modern ${filter === "in_progress" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">🔄</span>
            <span>Đang làm</span>
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

      {/* Date Picker & Search */}
      <div className="section-separated">
        <div className="date-search-row">
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

      {/* Schedule List */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Lịch ngày {selectedDate}
          </h2>
          <span className="section-count">{filteredSchedule.length} lịch</span>
        </div>

        <div className="schedule-list-staff">
          {filteredSchedule.map((item) => {
            const statusBadge = getStatusBadge(item.status);
            return (
              <div key={item.id} className="schedule-item-staff">
                <div className="schedule-time-staff">{item.time}</div>
                
                <div className="schedule-pet-staff">
                  <span className="schedule-pet-icon-staff">{item.petIcon}</span>
                  <div>
                    <p className="schedule-pet-name-staff">{item.petName}</p>
                    <p className="schedule-pet-type-staff">{item.petType}</p>
                  </div>
                </div>

                <div className="schedule-owner-staff">
                  <p className="schedule-owner-name-staff">{item.ownerName}</p>
                  <p className="schedule-owner-phone-staff">{item.ownerPhone}</p>
                </div>

                <div className="schedule-service-staff">
                  <span className="schedule-service-icon-staff">{item.serviceIcon}</span>
                  <span>{item.service}</span>
                </div>

                <span className={`schedule-status-badge-staff ${statusBadge.class}`}>
                  {statusBadge.icon} {statusBadge.label}
                </span>
              </div>
            );
          })}
        </div>

        {filteredSchedule.length === 0 && (
          <div className="empty-state-modern">
            <div className="empty-icon">📅</div>
            <p className="empty-text">Không có lịch nào</p>
          </div>
        )}
      </div>
    </div>
  );
}