// app/(dashboard)/manager/cages/page.js
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
  const [filter, setFilter] = useState("all");
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
          },
          {
            name: "Miu",
            icon: "🐈",
            breed: "Mèo Anh lông ngắn",
            ownerName: "Trần Thị B",
            checkInDate: "2025-11-12",
            checkOutDate: "2025-11-18"
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
      },
      {
        id: "CAGE005",
        code: "B03",
        type: "medium",
        capacity: 2,
        status: "available",
        notes: "Chuồng mới",
        pets: []
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleAddCage = (cageData) => {
    // Check duplicate code
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

  const filteredCages = cages.filter(cage => {
    if (filter === "all") return true;
    return cage.status === filter;
  });

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

      {/* Stats */}
      <div className="stats-grid">
        <div className="stats-card stats-card-primary">
          <div className="stats-icon">🏠</div>
          <div className="stats-content">
            <p className="stats-title">Tổng chuồng</p>
            <h3 className="stats-value">{stats.total}</h3>
          </div>
        </div>

        <div className="stats-card stats-card-success">
          <div className="stats-icon">🟢</div>
          <div className="stats-content">
            <p className="stats-title">Đang trống</p>
            <h3 className="stats-value">{stats.available}</h3>
          </div>
        </div>

        <div className="stats-card stats-card-warning">
          <div className="stats-icon">🟡</div>
          <div className="stats-content">
            <p className="stats-title">Đang sử dụng</p>
            <h3 className="stats-value">{stats.occupied}</h3>
          </div>
        </div>

        <div className="stats-card stats-card-info">
          <div className="stats-icon">📊</div>
          <div className="stats-content">
            <p className="stats-title">Tỷ lệ sử dụng</p>
            <h3 className="stats-value">{stats.occupancyRate}%</h3>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="action-bar">
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tất cả
          </button>
          <button
            className={`filter-tab ${filter === 'available' ? 'active' : ''}`}
            onClick={() => setFilter('available')}
          >
            🟢 Trống
          </button>
          <button
            className={`filter-tab ${filter === 'occupied' ? 'active' : ''}`}
            onClick={() => setFilter('occupied')}
          >
            🟡 Đang sử dụng
          </button>
          <button
            className={`filter-tab ${filter === 'maintenance' ? 'active' : ''}`}
            onClick={() => setFilter('maintenance')}
          >
            🔴 Bảo trì
          </button>
        </div>

        <Button onClick={() => {
          setEditingCage(null);
          setIsFormModalOpen(true);
        }}>
          ➕ Thêm chuồng
        </Button>
      </div>

      {/* Cages Table */}
      <div className="table-container">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã chuồng</th>
                <th>Loại</th>
                <th>Sức chứa</th>
                <th>Trạng thái</th>
                <th>Thú cưng hiện tại</th>
                <th>Ghi chú</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredCages.map((cage) => (
                <tr key={cage.id}>
                  <td className="font-mono font-bold text-lg">{cage.code}</td>
                  <td>
                    <div className="cage-type-cell">
                      <span className="cage-type-icon-cell">{getCageTypeIcon(cage.type)}</span>
                      <span>{getCageTypeLabel(cage.type)}</span>
                    </div>
                  </td>
                  <td className="text-center font-semibold">{cage.capacity}</td>
                  <td>
                    <span className={`status-badge ${
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
                      <div className="pets-in-cage">
                        {cage.pets.map((pet, idx) => (
                          <span key={idx} className="pet-tag">
                            {pet.icon} {pet.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="text-sm text-gray-600">
                    {cage.notes || <span className="text-gray-400 italic">Không có</span>}
                  </td>
                  <td>
                    <div className="action-buttons">
                      {cage.status === 'occupied' && (
                        <button
                          onClick={() => handleViewDetail(cage)}
                          className="btn-action btn-view"
                          title="Xem chi tiết"
                        >
                          👁️
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenEdit(cage)}
                        className="btn-action btn-edit"
                        title="Chỉnh sửa"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteCage(cage.id)}
                        className="btn-action btn-delete"
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

          {filteredCages.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🏠</div>
              <p className="empty-text">Không tìm thấy chuồng nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      <CageFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingCage(null);
        }}
        onSuccess={editingCage ? handleUpdateCage : handleAddCage}
        cage={editingCage}
      />

      {/* Detail Modal */}
      <CageDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedCage(null);
        }}
        cage={selectedCage}
      />

      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}