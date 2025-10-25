// app/(dashboard)/manager/reports/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import RevenueChart from "@/components/charts/RevenueChart";
import Button from "@/components/ui/Button";

export default function ManagerReportsPage() {
  const [period, setPeriod] = useState("month");
  const [year, setYear] = useState(new Date().getFullYear());
  const [revenueData, setRevenueData] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalAppointments: 0,
    totalCustomers: 0,
    avgRevenuePerCustomer: 0
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadRevenueData();
  }, [period, year]);

  const loadRevenueData = () => {
    // Mock data - Replace with actual API call
    const mockData = [
      { month: 1, year: 2025, revenue: 15600000 },
      { month: 2, year: 2025, revenue: 18200000 },
      { month: 3, year: 2025, revenue: 22400000 },
      { month: 4, year: 2025, revenue: 19800000 },
      { month: 5, year: 2025, revenue: 25600000 },
      { month: 6, year: 2025, revenue: 28900000 },
      { month: 7, year: 2025, revenue: 31200000 },
      { month: 8, year: 2025, revenue: 29500000 },
      { month: 9, year: 2025, revenue: 33800000 },
      { month: 10, year: 2025, revenue: 45600000 },
      { month: 11, year: 2025, revenue: 38400000 },
      { month: 12, year: 2025, revenue: 42100000 }
    ];

    setRevenueData(mockData);

    const totalRevenue = mockData.reduce((sum, d) => sum + d.revenue, 0);
    setStats({
      totalRevenue,
      totalAppointments: 342,
      totalCustomers: 89,
      avgRevenuePerCustomer: totalRevenue / 89
    });
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleExportExcel = () => {
    showToast("📊 Đang xuất báo cáo ra Excel...", "info");
    // Implementation: Export to Excel
  };

  const handleExportPDF = () => {
    showToast("📄 Đang xuất báo cáo ra PDF...", "info");
    // Implementation: Export to PDF
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Báo cáo & Thống kê"
        subtitle="Phân tích doanh thu và hoạt động trung tâm"
      />

      {/* Overview Stats */}
      <div className="stats-grid">
        <div className="stats-card stats-card-primary">
          <div className="stats-icon">💰</div>
          <div className="stats-content">
            <p className="stats-title">Tổng doanh thu {year}</p>
            <h3 className="stats-value">{formatCurrency(stats.totalRevenue)}</h3>
          </div>
        </div>

        <div className="stats-card stats-card-success">
          <div className="stats-icon">📅</div>
          <div className="stats-content">
            <p className="stats-title">Tổng lượt dịch vụ</p>
            <h3 className="stats-value">{stats.totalAppointments}</h3>
          </div>
        </div>

        <div className="stats-card stats-card-info">
          <div className="stats-icon">👥</div>
          <div className="stats-content">
            <p className="stats-title">Tổng khách hàng</p>
            <h3 className="stats-value">{stats.totalCustomers}</h3>
          </div>
        </div>

        <div className="stats-card stats-card-warning">
          <div className="stats-icon">📊</div>
          <div className="stats-content">
            <p className="stats-title">TB/Khách hàng</p>
            <h3 className="stats-value">{formatCurrency(stats.avgRevenuePerCustomer)}</h3>
          </div>
        </div>
      </div>

      {/* Revenue Chart Section */}
      <div className="section-card">
        <div className="section-header">
          <div>
            <h3 className="section-title">📈 Biểu đồ doanh thu</h3>
            <p className="section-subtitle">Theo dõi xu hướng doanh thu theo thời gian</p>
          </div>
          <div className="chart-controls">
            <select
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="filter-select"
            >
              <option value={2025}>Năm 2025</option>
              <option value={2024}>Năm 2024</option>
              <option value={2023}>Năm 2023</option>
            </select>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="filter-select"
            >
              <option value="month">Theo tháng</option>
              <option value="quarter">Theo quý</option>
              <option value="year">Theo năm</option>
            </select>
          </div>
        </div>

        <RevenueChart data={revenueData} period={period} />
      </div>

      {/* Export Actions */}
      <div className="section-card">
        <div className="export-section">
          <div>
            <h3 className="section-title">📥 Xuất báo cáo</h3>
            <p className="section-subtitle">Tải báo cáo doanh thu và thống kê</p>
          </div>
          <div className="export-buttons">
            <Button onClick={handleExportExcel}>
              📊 Xuất Excel
            </Button>
            <Button onClick={handleExportPDF} variant="secondary">
              📄 Xuất PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Top Services */}
      <div className="reports-grid">
        <div className="section-card">
          <h3 className="section-title">🏆 Dịch vụ phổ biến nhất</h3>
          <div className="ranking-list">
            {[
              { rank: 1, icon: "🏥", name: "Khám sức khỏe", count: 89, revenue: 17800000 },
              { rank: 2, icon: "🛁", name: "Tắm spa", count: 76, revenue: 11400000 },
              { rank: 3, icon: "✂️", name: "Cắt tỉa lông", count: 64, revenue: 11520000 },
              { rank: 4, icon: "💉", name: "Tiêm phòng", count: 52, revenue: 6240000 },
              { rank: 5, icon: "🏠", name: "Lưu trú", count: 45, revenue: 4500000 }
            ].map((service) => (
              <div key={service.rank} className="ranking-item">
                <div className="ranking-badge">{service.rank}</div>
                <span className="ranking-icon">{service.icon}</span>
                <div className="ranking-info">
                  <p className="ranking-name">{service.name}</p>
                  <p className="ranking-stats">
                    {service.count} lượt • {formatCurrency(service.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <h3 className="section-title">⭐ Khách hàng thân thiết</h3>
          <div className="ranking-list">
            {[
              { rank: 1, name: "Nguyễn Văn A", pets: 3, spent: 5600000 },
              { rank: 2, name: "Trần Thị B", pets: 2, spent: 4200000 },
              { rank: 3, name: "Lê Văn C", pets: 2, spent: 3800000 },
              { rank: 4, name: "Phạm Thị D", pets: 1, spent: 3200000 },
              { rank: 5, name: "Hoàng Văn E", pets: 4, spent: 2900000 }
            ].map((customer) => (
              <div key={customer.rank} className="ranking-item">
                <div className="ranking-badge">{customer.rank}</div>
                <span className="ranking-icon">👤</span>
                <div className="ranking-info">
                  <p className="ranking-name">{customer.name}</p>
                  <p className="ranking-stats">
                    {customer.pets} thú cưng • {formatCurrency(customer.spent)}
                  </p>
                </div>
              </div>
            ))}
          </div>
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