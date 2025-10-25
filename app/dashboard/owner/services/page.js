// app/(dashboard)/owner/services/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import BookAppointmentModal from "@/components/modals/BookAppointmentModal";

export default function OwnerServicesPage() {
  const [services, setServices] = useState([]);
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Mock pets
    setPets([
      { id: "PET001", name: "Lucky", icon: "🐕", breed: "Golden Retriever", age: 3 },
      { id: "PET002", name: "Miu", icon: "🐈", breed: "Mèo Anh lông ngắn", age: 2 }
    ]);

    // Mock services
    setServices([
      {
        id: "SRV001",
        name: "Khám sức khỏe tổng quát",
        category: "🏥 Khám bệnh & điều trị",
        price: 200000,
        duration: 30,
        icon: "🏥",
        description: "Kiểm tra sức khỏe tổng quát, khám lâm sàng cơ bản, tư vấn dinh dưỡng",
        isActive: true,
        requirements: ["Đặt lịch trước", "Nhịn ăn 4 giờ trước khám"]
      },
      {
        id: "SRV002",
        name: "Tắm spa cao cấp",
        category: "🛁 Tắm & vệ sinh",
        price: 150000,
        duration: 60,
        icon: "🛁",
        description: "Tắm sạch, massage thư giãn, sấy khô, chải lông, vệ sinh tai mắt",
        isActive: true,
        requirements: ["Thú cưng khỏe mạnh", "Đã tiêm phòng đầy đủ"]
      },
      {
        id: "SRV003",
        name: "Cắt tỉa lông tạo kiểu",
        category: "✂️ Cắt tỉa & tạo kiểu",
        price: 180000,
        duration: 45,
        icon: "✂️",
        description: "Cắt tỉa lông theo yêu cầu, tạo kiểu chuyên nghiệp, làm đẹp",
        isActive: true,
        requirements: ["Tắm trước khi cắt", "Lông không quá rối"]
      },
      {
        id: "SRV004",
        name: "Tiêm phòng dại",
        category: "💉 Tiêm phòng & xét nghiệm",
        price: 120000,
        duration: 15,
        icon: "💉",
        description: "Tiêm phòng bệnh dại cho chó mèo, cấp giấy chứng nhận",
        isActive: true,
        requirements: ["Thú cưng khỏe mạnh", "Trên 3 tháng tuổi"]
      },
      {
        id: "SRV005",
        name: "Lưu trú theo ngày",
        category: "🏠 Lưu trú & chăm sóc",
        price: 100000,
        duration: 1440,
        icon: "🏠",
        description: "Chăm sóc và lưu trú thú cưng 24/24, cho ăn uống đầy đủ",
        isActive: true,
        requirements: ["Đặt trước 1 ngày", "Đã tiêm phòng đầy đủ", "Mang theo đồ ăn quen thuộc"]
      },
      {
        id: "SRV006",
        name: "Spa massage thư giãn",
        category: "💆 Spa & massage",
        price: 250000,
        duration: 90,
        icon: "💆",
        description: "Massage chuyên sâu, chăm sóc da lông, trị liệu thư giãn",
        isActive: true,
        requirements: ["Đặt lịch trước", "Thú cưng hiền"]
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleBookService = (service) => {
    if (pets.length === 0) {
      showToast("⚠️ Bạn cần thêm thú cưng trước khi đặt lịch", "warning");
      return;
    }
    setSelectedService(service);
    setIsBookModalOpen(true);
  };

  const handleBookingSuccess = (formData) => {
    showToast("✅ Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận sớm nhất.");
  };

  const filteredServices = services.filter(service => {
    const matchFilter = filter === "all" || service.category === filter;
    const matchSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch && service.isActive;
  });

  const categories = [...new Set(services.map(s => s.category))];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Dịch vụ của chúng tôi"
        subtitle="Khám phá các dịch vụ chăm sóc thú cưng chuyên nghiệp"
      />

      {/* Search & Filter */}
      <div className="services-filter-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">Tất cả dịch vụ</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Services Grid */}
      <div className="owner-services-grid">
        {filteredServices.map((service) => (
          <div key={service.id} className="owner-service-card">
            <div className="service-card-badge">
              <span className="service-category-badge">{service.category}</span>
            </div>

            <div className="service-card-icon-large">{service.icon}</div>

            <div className="service-card-content">
              <h3 className="service-card-title">{service.name}</h3>
              <p className="service-card-description">{service.description}</p>

              <div className="service-card-details">
                <div className="service-detail-row">
                  <span className="detail-icon">💰</span>
                  <span className="detail-text">
                    <strong>{formatCurrency(service.price)}</strong>
                  </span>
                </div>
                <div className="service-detail-row">
                  <span className="detail-icon">⏱️</span>
                  <span className="detail-text">{service.duration} phút</span>
                </div>
              </div>

              {service.requirements && service.requirements.length > 0 && (
                <div className="service-requirements">
                  <p className="requirements-title">📋 Yêu cầu:</p>
                  <ul className="requirements-list">
                    {service.requirements.map((req, idx) => (
                      <li key={idx} className="requirement-item">• {req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="service-card-footer">
              <button
                onClick={() => handleBookService(service)}
                className="btn-book-service"
              >
                📅 Đặt lịch ngay
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p className="empty-text">Không tìm thấy dịch vụ nào</p>
        </div>
      )}

      {/* Book Modal */}
      <BookAppointmentModal
        isOpen={isBookModalOpen}
        onClose={() => {
          setIsBookModalOpen(false);
          setSelectedService(null);
        }}
        onSuccess={handleBookingSuccess}
        pets={pets}
        services={selectedService ? [selectedService] : services}
      />

      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}