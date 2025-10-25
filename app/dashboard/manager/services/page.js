// app/(dashboard)/manager/services/page.js
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Button from "@/components/ui/Button";
import AddServiceModal from "@/components/modals/AddServiceModal";
import ServiceTable from "@/components/tables/ServiceTable";

export default function ManagerServicesPage() {
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      setIsModalOpen(true);
    }

    // Mock data
    setServices([
      {
        id: "SRV001",
        name: "Khám sức khỏe tổng quát",
        category: "🏥 Khám bệnh & điều trị",
        price: 200000,
        duration: 30,
        icon: "🏥",
        description: "Kiểm tra sức khỏe tổng quát, khám lâm sàng",
        isActive: true
      },
      {
        id: "SRV002",
        name: "Tắm spa cao cấp",
        category: "🛁 Tắm & vệ sinh",
        price: 150000,
        duration: 60,
        icon: "🛁",
        description: "Tắm sạch, massage thư giãn, sấy khô",
        isActive: true
      },
      {
        id: "SRV003",
        name: "Cắt tỉa lông tạo kiểu",
        category: "✂️ Cắt tỉa & tạo kiểu",
        price: 180000,
        duration: 45,
        icon: "✂️",
        description: "Cắt tỉa lông theo yêu cầu, tạo kiểu chuyên nghiệp",
        isActive: true
      },
      {
        id: "SRV004",
        name: "Tiêm phòng dại",
        category: "💉 Tiêm phòng & xét nghiệm",
        price: 120000,
        duration: 15,
        icon: "💉",
        description: "Tiêm phòng bệnh dại cho chó mèo",
        isActive: true
      },
      {
        id: "SRV005",
        name: "Lưu trú theo ngày",
        category: "🏠 Lưu trú & chăm sóc",
        price: 100000,
        duration: 1440,
        icon: "🏠",
        description: "Chăm sóc và lưu trú thú cưng 24/24",
        isActive: true
      },
      {
        id: "SRV006",
        name: "Spa massage thư giãn",
        category: "💆 Spa & massage",
        price: 250000,
        duration: 90,
        icon: "💆",
        description: "Massage thư giãn, chăm sóc da lông",
        isActive: true
      }
    ]);
  }, [searchParams]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleAddService = (newService) => {
    const service = {
      id: `SRV${String(services.length + 1).padStart(3, '0')}`,
      name: newService.name,
      category: newService.category,
      price: parseFloat(newService.price),
      duration: parseInt(newService.duration),
      icon: getCategoryIcon(newService.category),
      description: newService.description,
      isActive: true
    };
    setServices([...services, service]);
    showToast("🎉 Đã thêm dịch vụ thành công!");
  };

  const handleEditService = (service) => {
    console.log("Edit service:", service);
    showToast("✏️ Chức năng chỉnh sửa đang phát triển");
  };

  const handleToggleService = (serviceId) => {
    setServices(services.map(s =>
      s.id === serviceId ? { ...s, isActive: !s.isActive } : s
    ));
    showToast("✅ Đã cập nhật trạng thái dịch vụ");
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "🏥 Khám bệnh & điều trị": "🏥",
      "💉 Tiêm phòng & xét nghiệm": "💉",
      "🛁 Tắm & vệ sinh": "🛁",
      "✂️ Cắt tỉa & tạo kiểu": "✂️",
      "💆 Spa & massage": "💆",
      "🏠 Lưu trú & chăm sóc": "🏠"
    };
    return icons[category] || "✨";
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Quản lý dịch vụ"
        subtitle="Thêm, chỉnh sửa và quản lý các dịch vụ của trung tâm"
      />

      <div className="action-bar">
        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-label">Tổng dịch vụ:</span>
            <span className="stat-value">{services.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Đang hoạt động:</span>
            <span className="stat-value text-green-600">
              {services.filter(s => s.isActive).length}
            </span>
          </div>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
          ➕ Thêm dịch vụ
        </Button>
      </div>

      <ServiceTable
        services={services}
        onEdit={handleEditService}
        onDelete={handleToggleService}
      />

      <AddServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAddService}
      />

      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}