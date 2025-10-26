// FILE: app/(dashboard)/manager/cages/page.js
// THAY THẾ TOÀN BỘ NỘI DUNG CŨ

"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Button from "@/components/ui/Button";
import CageFormModal from "@/components/modals/CageFormModal";
import CageDetailModal from "@/components/modals/CageDetailModal";

export default function ManagerCagesPage() {
  const [cages, setCages] = useState([]);
  const [selectedCage, setSelectedCage] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingCage, setEditingCage] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadCages();
  }, []);

  const loadCages = () => {
    setCages([
      {
        id: "CAGE001",
        code: "A01",
        type: "small",
        capacity: 1,
        status: "available",
        notes: "Gần cửa sổ, nhiều ánh sáng",
        pets: []
      },
      {
        id: "CAGE002",
        code: "B02",
        type: "medium",
        capacity: 2,
        status: "occupied",
        notes: "Khu vực yên tĩnh",
        pets: [
          {
            name: "Lucky",
            icon: "🐕",
            breed: "Golden Retriever",
            ownerName: "Nguyễn Văn A",
            checkInDate: "2025-11-10",
            checkOutDate: "2025-11-20"
          }
        ]
      },
      {
        id: "CAGE003",
        code: "C03",
        type: "large",
        capacity: 3,
        status: "maintenance",
        notes: "Đang sửa chữa hệ thống điều hòa",
        pets: []
      },
      {
        id: "CAGE004",
        code: "A02",
        type: "small",
        capacity: 1,
        status: "available",
        notes: "",
        pets: []
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleAddCage = (cageData) => {
    if (cages.some(c => c.code === cageData.code)) {
      showToast("❌ Mã chuồng đã tồn tại", "error");
      return;
    }

    const newCage = {
      id: `CAGE${String(cages.length + 1).padStart(3, '0')}`,
      ...cageData,
      pets: []
    };
    setCages([...cages, newCage]);
    showToast("✅ Đã thêm chuồng thành công!");
  };

  const handleUpdateCage = (cageData) => {
    setCages(cages.map(cage =>
      cage.id === editingCage.id ? { ...cage, ...cageData } : cage
    ));
    showToast("💾 Cập nhật chuồng thành công!");
    setEditingCage(null);
  };

  const handleDeleteCage = (cageId) => {
    const cage = cages.find(c => c.id === cageId);
    if (cage.status === 'occupied') {
      showToast("⚠️ Không thể xóa chuồng đang có thú cưng", "error");
      return;
    }

    if (confirm(`Xác nhận xóa chuồng ${cage.code}?`)) {
      setCages(cages.filter(c => c.id !== cageId));
      showToast("🗑️ Đã xóa chuồng");
    }
  };

  const handleOpenEdit = (cage) => {
    setEditingCage(cage);
    setIsFormModalOpen(true);
  };

  const handleViewDetail = (cage) => {
    setSelectedCage(cage);
    setIsDetailModalOpen(true);
  };

  const getCageTypeLabel = (type) => {
    const labels = {
      small: "Nhỏ",
      medium: "Trung",
      large: "Lớn"
    };
    return labels[type] || type;
  };

  const getCageTypeIcon = (type) => {
    const icons = {
      small: "🏠",
      medium: "🏡",
      large: "🏘️"
    };
    return icons[type] || "🏠";
  };

  const stats = {
    total: cages.length,
    available: cages.filter(c => c.status === 'available').length,
    occupied: cages.filter(c => c.status === 'occupied').length,
    maintenance: cages.filter(c => c.status === 'maintenance').length,
    occupancyRate: cages.length > 0 
      ? Math.round((cages.filter(c => c.status === 'occupied').length / cages.length) * 100)
      : 0
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Quản lý chuồng nuôi"
        subtitle="Theo dõi và quản lý khu lưu trú thú cưng"
      />

      {/* 1. STATS SECTION - TÁCH RIÊNG */}
      <div className="section-separated">
        <div className="stats-grid-custom">
          <div className="stat-card-modern stat-primary">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">🏠</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Tổng chuồng</p>
              <h3 className="stat-number">{stats.total}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-success">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">🟢</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Đang trống</p>
              <h3 className="stat-number">{stats.available}</h3>
            </div>
          </div>

          <div className="stat-card-modern">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">🟡</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Đang sử dụng</p>
              <h3 className="stat-number">{stats.occupied}</h3>
            </div>
          </div>

          <div className="stat-card-modern">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">📊</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Tỷ lệ sử dụng</p>
              <h3 className="stat-number">{stats.occupancyRate}%</h3>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ADD BUTTON SECTION - TÁCH RIÊNG */}
      <div className="section-separated">
        <div className="action-button-section">
          <Button 
            onClick={() => {
              setEditingCage(null);
              setIsFormModalOpen(true);
            }}
            className="btn-add-large"
          >
            <span className="btn-icon">➕</span>
            <span>Thêm chuồng mới</span>
          </Button>
        </div>
      </div>

      {/* 3. TABLE SECTION - VỚI DÒNG "DANH SÁCH CHUỒNG NUÔI" */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Danh sách chuồng nuôi
          </h2>
          <span className="section-count">{cages.length} chuồng</span>
        </div>

        <div className="table-modern-wrapper">
          <table className="table-modern">
            <thead>
              <tr>
                <th style={{ width: '12%' }}>Mã chuồng</th>
                <th style={{ width: '15%' }}>Loại</th>
                <th style={{ width: '10%' }}>Sức chứa</th>
                <th style={{ width: '13%' }}>Trạng thái</th>
                <th style={{ width: '25%' }}>Thú cưng hiện tại</th>
                <th style={{ width: '15%' }}>Ghi chú</th>
                <th style={{ width: '10%' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cages.map((cage) => (
                <tr key={cage.id}>
                  <td>
                    <span className="staff-id-badge">{cage.code}</span>
                  </td>
                  <td>
                    <div className="pet-info-cell">
                      <span className="cage-type-icon-cell">{getCageTypeIcon(cage.type)}</span>
                      <span>{getCageTypeLabel(cage.type)}</span>
                    </div>
                  </td>
                  <td className="text-center font-semibold">{cage.capacity}</td>
                  <td>
                    <span className={`status-badge-modern ${
                      cage.status === 'available' ? 'status-available' :
                      cage.status === 'occupied' ? 'status-occupied' :
                      'status-maintenance'
                    }`}>
                      {cage.status === 'available' && '🟢 Trống'}
                      {cage.status === 'occupied' && '🟡 Đang sử dụng'}
                      {cage.status === 'maintenance' && '🔴 Bảo trì'}
                    </span>
                  </td>
                  <td>
                    {cage.pets && cage.pets.length > 0 ? (
                      <div className="pets-in-cage-cell">
                        {cage.pets.map((pet, idx) => (
                          <span key={idx} className="pet-tag-small">
                            {pet.icon} {pet.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="text-sm text-gray-700">
                    {cage.notes || <span className="text-gray-400 italic">Không có</span>}
                  </td>
                  <td>
                    <div className="action-buttons-modern">
                      {cage.status === 'occupied' && (
                        <button
                          onClick={() => handleViewDetail(cage)}
                          className="btn-icon-action btn-view-icon"
                          title="Xem chi tiết"
                        >
                          👁️
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenEdit(cage)}
                        className="btn-icon-action btn-edit-icon"
                        title="Chỉnh sửa"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteCage(cage.id)}
                        className="btn-icon-action btn-delete-icon"
                        title="Xóa"
                        disabled={cage.status === 'occupied'}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {cages.length === 0 && (
            <div className="empty-state-modern">
              <div className="empty-icon">🏠</div>
              <p className="empty-text">Chưa có chuồng nào</p>
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      <CageFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingCage(null);
        }}
        onSuccess={editingCage ? handleUpdateCage : handleAddCage}
        cage={editingCage}
      />

      <CageDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedCage(null);
        }}
        cage={selectedCage}
      />

      {/* TOAST */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}