"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Button from "@/components/ui/Button";
import AddServiceModal from "@/components/modals/AddServiceModal";
import EditServiceModal from "@/components/modals/EditServiceModal.jsx";

export default function ManagerServicesPage() {
  const searchParams = useSearchParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      setIsAddModalOpen(true);
    }
    loadServices();
  }, [searchParams]);

  const loadServices = () => {
    setServices([
      {
        id: "SRV001",
        name: "Khám sức khỏe tổng quát",
        category: "medical",
        categoryLabel: "Khám bệnh & điều trị",
        categoryIcon: "🏥",
        price: 200000,
        duration: 30,
        description: "Kiểm tra sức khỏe tổng quát, khám lâm sàng",
        isActive: true
      },
      {
        id: "SRV002",
        name: "Tắm spa cao cấp",
        category: "health",
        categoryLabel: "Tắm & vệ sinh",
        categoryIcon: "🛁",
        price: 150000,
        duration: 60,
        description: "Tắm sạch, massage thư giãn, sấy khô",
        isActive: true
      },
      {
        id: "SRV003",
        name: "Cắt tỉa lông tạo kiểu",
        category: "grooming",
        categoryLabel: "Cắt tỉa & làm đẹp",
        categoryIcon: "✂️",
        price: 180000,
        duration: 45,
        description: "Cắt tỉa lông theo yêu cầu, tạo kiểu chuyên nghiệp",
        isActive: true
      },
      {
        id: "SRV004",
        name: "Tiêm phòng dại",
        category: "medical",
        categoryLabel: "Tiêm phòng & xét nghiệm",
        categoryIcon: "💉",
        price: 120000,
        duration: 15,
        description: "Tiêm phòng bệnh dại cho chó mèo",
        isActive: false
      },
      {
        id: "SRV005",
        name: "Massage thư giãn",
        category: "boarding",
        categoryLabel: "Spa & massage",
        categoryIcon: "💆",
        price: 250000,
        duration: 90,
        description: "Massage toàn thân cho thú cưng",
        isActive: true
      },
      {
        id: "SRV006",
        name: "Lưu trú qua đêm",
        category: "boarding",
        categoryLabel: "Lưu trú & chăm sóc",
        categoryIcon: "🏠",
        price: 300000,
        duration: 1440,
        description: "Chăm sóc thú cưng qua đêm, môi trường an toàn",
        isActive: true
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const getCategoryData = (categoryValue) => {
    const categories = {
      health: { label: "Tắm & vệ sinh", icon: "🛁" },
      grooming: { label: "Cắt tỉa & làm đẹp", icon: "✂️" },
      medical: { label: "Y tế & khám bệnh", icon: "💊" },
      boarding: { label: "Lưu trú & chăm sóc", icon: "🏠" }
    };
    return categories[categoryValue] || { label: "Khác", icon: "✨" };
  };

  const handleAddService = (newService) => {
    const categoryData = getCategoryData(newService.category);
    const service = {
      id: `SRV${String(services.length + 1).padStart(3, '0')}`,
      name: newService.name,
      category: newService.category,
      categoryLabel: categoryData.label,
      categoryIcon: categoryData.icon,
      price: parseFloat(newService.price),
      duration: parseInt(newService.duration),
      description: newService.description,
      isActive: true
    };
    setServices([...services, service]);
    showToast("🎉 Đã thêm dịch vụ thành công!");
  };

  const handleEditService = (updatedData) => {
    const categoryData = getCategoryData(updatedData.category);
    
    setServices(services.map(service =>
      service.id === updatedData.id
        ? {
            ...service,
            name: updatedData.name,
            category: updatedData.category,
            categoryLabel: categoryData.label,
            categoryIcon: categoryData.icon,
            price: parseFloat(updatedData.price),
            duration: parseInt(updatedData.duration),
            description: updatedData.description
          }
        : service
    ));
    showToast("💾 Đã cập nhật dịch vụ thành công!");
  };

  const handleOpenEdit = (service) => {
    setEditingService(service);
    setIsEditModalOpen(true);
  };

  const handleToggleService = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    setServices(services.map(s =>
      s.id === serviceId ? { ...s, isActive: !s.isActive } : s
    ));
    showToast(`✅ Đã ${service.isActive ? 'tạm ngưng' : 'kích hoạt'} dịch vụ`);
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const stats = {
    total: services.length,
    active: services.filter(s => s.isActive).length
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Quản lý dịch vụ"
        subtitle="Thêm, chỉnh sửa và quản lý các dịch vụ của trung tâm"
      />

      {/* Stats */}
      <div className="section-separated">
        <div className="stats-grid-custom">
          <div className="stat-card-modern stat-primary">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">✨</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Tổng dịch vụ</p>
              <h3 className="stat-number">{stats.total}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-success">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">✅</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Đang hoạt động</p>
              <h3 className="stat-number">{stats.active}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <div className="section-separated">
        <div className="action-button-section">
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn-add-large"
          >
            <span className="btn-icon">➕</span>
            <span>Thêm dịch vụ mới</span>
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="section-separated">
        <div className="search-section-right">
          <div className="search-box-modern">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-modern"
            />
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Danh sách dịch vụ
          </h2>
          <span className="section-count">{filteredServices.length} dịch vụ</span>
        </div>

        <div className="services-grid-beautiful">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-card-beautiful">
              <div className="service-card-header">
                <div className="service-icon-large">{service.categoryIcon}</div>
                <span className={`service-status-badge ${service.isActive ? 'badge-active' : 'badge-inactive'}`}>
                  {service.isActive ? '✓ Hoạt động' : '⏸️ Tạm ngưng'}
                </span>
              </div>

              <div className="service-card-body">
                <h3 className="service-name-beautiful">{service.name}</h3>
                <p className="service-category-beautiful">
                  {service.categoryIcon} {service.categoryLabel}
                </p>
                <p className="service-description-beautiful">{service.description}</p>

                <div className="service-details-row">
                  <div className="service-detail-item">
                    <span className="detail-icon">💰</span>
                    <span className="detail-text">{formatCurrency(service.price)}</span>
                  </div>
                  <div className="service-detail-item">
                    <span className="detail-icon">⏱️</span>
                    <span className="detail-text">
                      {service.duration >= 60 
                        ? `${Math.floor(service.duration / 60)} giờ` 
                        : `${service.duration} phút`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="service-card-footer">
                <button
                  onClick={() => handleOpenEdit(service)}
                  className="btn-service-action btn-edit-service"
                >
                  <span>✏️</span>
                  <span>Chỉnh sửa</span>
                </button>
                <button
                  onClick={() => handleToggleService(service.id)}
                  className={`btn-service-action ${service.isActive ? 'btn-pause-service' : 'btn-activate-service'}`}
                >
                  <span>{service.isActive ? '⏸️' : '▶️'}</span>
                  <span>{service.isActive ? 'Tạm ngưng' : 'Kích hoạt'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="empty-state-modern">
            <div className="empty-icon">🔍</div>
            <p className="empty-text">Không tìm thấy dịch vụ nào</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <AddServiceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleAddService}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingService && (
        <EditServiceModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingService(null);
          }}
          onSuccess={handleEditService}
          service={editingService}
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