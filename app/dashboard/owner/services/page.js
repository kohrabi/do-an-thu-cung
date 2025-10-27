// app/(dashboard)/owner/services/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";

export default function OwnerServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setServices([
      {
        id: "SRV001",
        name: "Khám sức khỏe tổng quát",
        category: "🏥 Khám bệnh & điều trị",
        price: 200000,
        duration: 30,
        icon: "🏥",
        description: "Kiểm tra sức khỏe toàn diện, khám lâm sàng cơ bản"
      },
      {
        id: "SRV002",
        name: "Tiêm phòng dại",
        category: "💉 Tiêm phòng & xét nghiệm",
        price: 120000,
        duration: 15,
        icon: "💉",
        description: "Tiêm vaccine phòng bệnh dại cho chó mèo"
      },
      {
        id: "SRV003",
        name: "Tắm spa cao cấp",
        category: "🛁 Tắm & vệ sinh",
        price: 150000,
        duration: 60,
        icon: "🛁",
        description: "Tắm sạch, massage thư giãn, sấy khô"
      },
      {
        id: "SRV004",
        name: "Cắt tỉa lông tạo kiểu",
        category: "✂️ Cắt tỉa & tạo kiểu",
        price: 180000,
        duration: 45,
        icon: "✂️",
        description: "Cắt tỉa lông theo yêu cầu, tạo kiểu chuyên nghiệp"
      },
      {
        id: "SRV005",
        name: "Massage thư giãn",
        category: "💆 Spa & massage",
        price: 250000,
        duration: 90,
        icon: "💆",
        description: "Massage toàn thân giúp thú cưng thư giãn"
      }
    ]);
  }, []);

  const handleBookService = (serviceId) => {
    router.push(`/dashboard/owner/appointments?action=book&serviceId=${serviceId}`);
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Xem dịch vụ"
        subtitle="Khám phá các dịch vụ chăm sóc thú cưng của chúng tôi"
      />

      {/* Search Bar - BÊN PHẢI */}
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

        {/* Services Grid - Đẹp, tách biệt từng nhóm */}
        <div className="services-owner-grid">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-owner-card">
              <div className="service-owner-header">
                <div className="service-owner-icon">{service.icon}</div>
                <span className="service-owner-category">{service.category}</span>
              </div>

              <div className="service-owner-body">
                <h3 className="service-owner-name">{service.name}</h3>
                <p className="service-owner-description">{service.description}</p>

                <div className="service-owner-info">
                  <div className="service-info-item">
                    <span className="info-icon">💰</span>
                    <span className="info-value">{formatCurrency(service.price)}</span>
                  </div>
                  <div className="service-info-item">
                    <span className="info-icon">⏱️</span>
                    <span className="info-value">{service.duration} phút</span>
                  </div>
                </div>
              </div>

              <div className="service-owner-footer">
                <button
                  onClick={() => handleBookService(service.id)}
                  className="btn-book-service"
                >
                  <span className="btn-icon">📅</span>
                  <span>Đặt lịch ngay</span>
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
    </div>
  );
}