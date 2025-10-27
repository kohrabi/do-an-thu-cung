"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import EditStaffModal from "@/components/modals/EditStaffModal";
import EditServiceModal from "@/components/modals/EditServiceModal.jsx";
import EditAppointmentModal from "@/components/modals/EditAppointmentModal";
import InvoiceDetailModal from "@/components/modals/InvoiceDetailModal";
import { useRouter } from "next/navigation";

export default function ManagerDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalPets: 0,
    totalCustomers: 0,
    totalServices: 0,
    monthlyRevenue: 0,
    todayAppointments: 0,
    activeStaff: 0
  });

  // Modal states
  const [isEditStaffModalOpen, setIsEditStaffModalOpen] = useState(false);
  const [isEditServiceModalOpen, setIsEditServiceModalOpen] = useState(false);
  const [isEditAppointmentModalOpen, setIsEditAppointmentModalOpen] = useState(false);
  const [isInvoiceDetailModalOpen, setIsInvoiceDetailModalOpen] = useState(false);

  // Selected items for modals
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Toast notification
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    setStats({
      totalPets: 156,
      totalCustomers: 89,
      totalServices: 12,
      monthlyRevenue: 45600000,
      todayAppointments: 8,
      activeStaff: 15
    });
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // Modal handlers
  const handleEditStaff = (staff) => {
    setSelectedStaff(staff);
    setIsEditStaffModalOpen(true);
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setIsEditServiceModalOpen(true);
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditAppointmentModalOpen(true);
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsInvoiceDetailModalOpen(true);
  };

  // Success handlers
  const handleEditStaffSuccess = (data) => {
    console.log("Staff updated:", data);
    showToast("✅ Cập nhật nhân viên thành công!");
  };

  const handleEditServiceSuccess = (data) => {
    console.log("Service updated:", data);
    showToast("✅ Cập nhật dịch vụ thành công!");
  };

  const handleEditAppointmentSuccess = (data) => {
    console.log("Appointment updated:", data);
    showToast("✅ Cập nhật lịch đặt thành công!");
  };

  const quickActions = [
    {
      icon: "👥",
      label: "Thêm nhân viên",
      onClick: () => router.push("/dashboard/manager/staff?action=add")
    },
    {
      icon: "✨",
      label: "Thêm dịch vụ",
      onClick: () => router.push("/dashboard/manager/services?action=add")
    },
    {
      icon: "📅",
      label: "Xem lịch đặt",
      onClick: () => router.push("/dashboard/manager/appointments")
    },
    {
      icon: "🏠",
      label: "Xem chuồng nuôi",
      onClick: () => router.push("/dashboard/manager/cages")
    },
    {
      icon: "💰",
      label: "Xem hóa đơn",
      onClick: () => router.push("/dashboard/manager/invoices")
    },
    {
      icon: "📊",
      label: "Xem báo cáo",
      onClick: () => router.push("/dashboard/manager/reports")
    }
  ];

  const recentActivities = [
    {
      icon: "✅",
      text: "Nguyễn Văn A đã hoàn thành dịch vụ spa cho Lucky",
      time: "5 phút trước",
      action: () => handleViewInvoice({
        id: "INV-2025-001",
        date: "10:30 15/01/2025",
        status: "paid",
        customerName: "Nguyễn Văn A",
        customerPhone: "0901234567",
        customerEmail: "nguyenvana@gmail.com",
        petName: "Lucky",
        petIcon: "🐕",
        petBreed: "Golden Retriever",
        petAge: "3 tuổi",
        services: [
          {
            icon: "🩺",
            name: "Khám sức khỏe tổng quát",
            quantity: 1,
            price: 200000,
            total: 200000
          },
          {
            icon: "💉",
            name: "Tiêm phòng dại",
            quantity: 1,
            price: 120000,
            total: 120000
          }
        ],
        subtotal: 320000,
        total: 320000,
        paymentMethod: "cash"
      })
    },
    {
      icon: "📅",
      text: "Khách hàng Trần Thị B đặt lịch khám cho Miu",
      time: "15 phút trước",
      action: () => handleEditAppointment({
        petName: "Miu",
        petIcon: "🐈",
        service: "Khám sức khỏe",
        date: "2025-11-15",
        time: "10:00",
        owner: "Trần Thị B",
        status: "confirmed",
        assignedStaff: "",
        notes: ""
      })
    },
    {
      icon: "💰",
      text: "Hóa đơn #INV-2024-001 đã được thanh toán",
      time: "30 phút trước",
      action: () => handleViewInvoice({
        id: "INV-2024-001",
        date: "09:00 15/01/2025",
        status: "paid",
        customerName: "Lê Văn C",
        customerPhone: "0912345678",
        customerEmail: "levanc@gmail.com",
        petName: "Coco",
        petIcon: "🐩",
        petBreed: "Poodle",
        petAge: "2 tuổi",
        services: [
          {
            icon: "🛁",
            name: "Tắm spa cao cấp",
            quantity: 1,
            price: 250000,
            total: 250000
          }
        ],
        subtotal: 250000,
        total: 250000,
        paymentMethod: "card"
      })
    },
    {
      icon: "👤",
      text: "Nhân viên mới Lê Văn C đã được thêm vào hệ thống",
      time: "1 giờ trước",
      action: () => handleEditStaff({
        id: "EMP003",
        name: "Lê Văn C",
        email: "levanc@pawlovers.com",
        phone: "0912345678",
        role: "vet",
        specialty: "Bác sĩ thú y tổng quát"
      })
    },
    {
      icon: "🏠",
      text: "Chuồng A03 đã được làm sạch và sẵn sàng",
      time: "2 giờ trước"
    }
  ];

  return (
    <div className="dashboard-container">
      <DashboardHeader 
        title="Dashboard Quản lý" 
        subtitle="Tổng quan hoạt động trung tâm PAW LOVERS"
      />

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatsCard
          icon="🐾"
          title="Tổng số thú cưng"
          value={stats.totalPets}
          change="+12%"
          trend="up"
          color="primary"
        />
        <StatsCard
          icon="👥"
          title="Khách hàng"
          value={stats.totalCustomers}
          change="+8%"
          trend="up"
          color="success"
        />
        <StatsCard
          icon="💰"
          title="Doanh thu tháng"
          value={`${(stats.monthlyRevenue / 1000000).toFixed(1)}M`}
          change="+15%"
          trend="up"
          color="warning"
        />
        <StatsCard
          icon="📅"
          title="Lịch hẹn hôm nay"
          value={stats.todayAppointments}
          color="info"
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="dashboard-content-grid">
        <div className="dashboard-col-2">
          <QuickActions actions={quickActions} />
        </div>
        <div className="dashboard-col-1">
          <RecentActivity activities={recentActivities} />
        </div>
      </div>

      {/* Test Modals Section - FOR DEMO */}
      <div className="section-separated">
        <h2 className="section-title-large">
          <span className="title-icon">🧪</span>
          Test Modal Functions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginTop: '15px'
        }}>
          <button
            onClick={() => handleEditStaff({
              id: "EMP001",
              name: "Nguyễn Văn A",
              email: "vet@pawlovers.com",
              phone: "0901234567",
              role: "vet",
              specialty: "Bác sĩ thú y tổng quát"
            })}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            ✏️ Test Edit Staff
          </button>

          <button
            onClick={() => handleEditService({
              id: "SRV001",
              name: "Tắm spa cao cấp",
              category: "health",
              price: "150000",
              duration: "60",
              description: "Tắm sạch, massage thư giãn, sấy khô"
            })}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            ✏️ Test Edit Service
          </button>

          <button
            onClick={() => handleEditAppointment({
              petName: "Lucky",
              petIcon: "🐕",
              service: "Khám sức khỏe",
              date: "2025-11-15",
              time: "10:00",
              owner: "Nguyễn Văn A",
              status: "pending",
              assignedStaff: "",
              notes: ""
            })}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            ✏️ Test Edit Appointment
          </button>

          <button
            onClick={() => handleViewInvoice({
              id: "INV-2025-001",
              date: "10:30 15/01/2025",
              status: "paid",
              customerName: "Nguyễn Văn A",
              customerPhone: "0901234567",
              customerEmail: "nguyenvana@gmail.com",
              petName: "Lucky",
              petIcon: "🐕",
              petBreed: "Golden Retriever",
              petAge: "3 tuổi",
              services: [
                {
                  icon: "🩺",
                  name: "Khám sức khỏe tổng quát",
                  quantity: 1,
                  price: 200000,
                  total: 200000
                },
                {
                  icon: "💉",
                  name: "Tiêm phòng dại",
                  quantity: 1,
                  price: 120000,
                  total: 120000
                }
              ],
              subtotal: 320000,
              total: 320000,
              paymentMethod: "cash"
            })}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            📄 Test View Invoice
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h3 className="section-title">📈 Doanh thu 6 tháng gần đây</h3>
          <div className="chart-placeholder">
            <p className="text-gray-500">Biểu đồ sẽ được hiển thị ở đây</p>
            <p className="text-sm text-gray-400 mt-2">(Sử dụng Recharts hoặc Chart.js)</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditStaffModal
        isOpen={isEditStaffModalOpen}
        onClose={() => {
          setIsEditStaffModalOpen(false);
          setSelectedStaff(null);
        }}
        onSuccess={handleEditStaffSuccess}
        staff={selectedStaff}
      />

      <EditServiceModal
        isOpen={isEditServiceModalOpen}
        onClose={() => {
          setIsEditServiceModalOpen(false);
          setSelectedService(null);
        }}
        onSuccess={handleEditServiceSuccess}
        service={selectedService}
      />

      <EditAppointmentModal
        isOpen={isEditAppointmentModalOpen}
        onClose={() => {
          setIsEditAppointmentModalOpen(false);
          setSelectedAppointment(null);
        }}
        onSuccess={handleEditAppointmentSuccess}
        appointment={selectedAppointment}
      />

      <InvoiceDetailModal
        isOpen={isInvoiceDetailModalOpen}
        onClose={() => {
          setIsInvoiceDetailModalOpen(false);
          setSelectedInvoice(null);
        }}
        invoice={selectedInvoice}
      />

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}