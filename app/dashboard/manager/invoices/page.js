// app/(dashboard)/manager/invoices/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import InvoiceDetailModal from "@/components/modals/InvoiceDetailModal";

export default function ManagerInvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    setInvoices([
      {
        id: "INV-2025-001",
        customerName: "Nguyễn Văn A",
        customerPhone: "0901234567",
        customerEmail: "nguyenvana@gmail.com",
        petName: "Lucky",
        petIcon: "🐕",
        petBreed: "Golden Retriever",
        petAge: 3,
        date: "2025-01-15T10:30:00",
        services: [
          { icon: "🏥", name: "Khám sức khỏe tổng quát", quantity: 1, price: 200000 },
          { icon: "💉", name: "Tiêm phòng dại", quantity: 1, price: 120000 }
        ],
        subtotal: 320000,
        discount: 0,
        total: 320000,
        isPaid: true,
        paymentMethod: "Tiền mặt",
        paymentDate: "2025-01-15T11:00:00",
        notes: ""
      },
      {
        id: "INV-2025-002",
        customerName: "Trần Thị B",
        customerPhone: "0909876543",
        customerEmail: "tranthib@gmail.com",
        petName: "Miu",
        petIcon: "🐈",
        petBreed: "Mèo Anh lông ngắn",
        petAge: 2,
        date: "2025-01-16T14:00:00",
        services: [
          { icon: "🛁", name: "Tắm spa cao cấp", quantity: 1, price: 150000 },
          { icon: "✂️", name: "Cắt tỉa lông", quantity: 1, price: 180000 }
        ],
        subtotal: 330000,
        discount: 30000,
        total: 300000,
        isPaid: false,
        paymentMethod: null,
        paymentDate: null,
        notes: "Khách yêu cầu gọi trước khi đến"
      },
      {
        id: "INV-2025-003",
        customerName: "Lê Văn C",
        customerPhone: "0912345678",
        customerEmail: "levanc@gmail.com",
        petName: "Coco",
        petIcon: "🐩",
        petBreed: "Poodle",
        petAge: 1,
        date: "2025-01-17T09:00:00",
        services: [
          { icon: "🏠", name: "Lưu trú theo ngày", quantity: 3, price: 100000 }
        ],
        subtotal: 300000,
        discount: 0,
        total: 300000,
        isPaid: true,
        paymentMethod: "Chuyển khoản",
        paymentDate: "2025-01-17T09:30:00",
        notes: ""
      }
    ]);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchSearch = invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleViewDetail = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleExportPDF = (invoice) => {
    showToast(`📄 Đang xuất hóa đơn ${invoice.id} ra PDF...`, "info");
  };

  const totalRevenue = filteredInvoices.reduce((sum, inv) => sum + (inv.isPaid ? inv.total : 0), 0);
  const unpaidAmount = filteredInvoices.reduce((sum, inv) => sum + (inv.isPaid ? 0 : inv.total), 0);

  const stats = {
    total: filteredInvoices.length,
    paid: filteredInvoices.filter(i => i.isPaid).length,
    unpaid: filteredInvoices.filter(i => !i.isPaid).length,
    revenue: totalRevenue,
    pending: unpaidAmount
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Quản lý hóa đơn"
        subtitle="Theo dõi và quản lý hóa đơn thanh toán"
      />

      {/* 1. STATS SECTION - TÁCH RIÊNG */}
      <div className="section-separated">
        <div className="stats-grid-custom">
          <div className="stat-card-modern stat-primary">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">🧾</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Tổng hóa đơn</p>
              <h3 className="stat-number">{stats.total}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-success">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">✅</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Đã thanh toán</p>
              <h3 className="stat-number">{stats.paid}</h3>
              <p className="stat-detail">{formatCurrency(stats.revenue)}</p>
            </div>
          </div>

          <div className="stat-card-modern">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">⏳</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Chưa thanh toán</p>
              <h3 className="stat-number">{stats.unpaid}</h3>
              <p className="stat-detail">{formatCurrency(stats.pending)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SEARCH SECTION - BÊN PHẢI */}
      <div className="section-separated">
        <div className="search-section-right">
          <div className="search-box-modern">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên khách hàng hoặc mã hóa đơn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-modern"
            />
          </div>
        </div>
      </div>

      {/* 3. TABLE SECTION - VỚI DÒNG "DANH SÁCH HÓA ĐƠN" */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Danh sách hóa đơn
          </h2>
          <span className="section-count">{filteredInvoices.length} hóa đơn</span>
        </div>

        <div className="table-modern-wrapper">
          <table className="table-modern">
            <thead>
              <tr>
                <th style={{ width: '12%' }}>Mã hóa đơn</th>
                <th style={{ width: '20%' }}>Khách hàng</th>
                <th style={{ width: '15%' }}>Thú cưng</th>
                <th style={{ width: '13%' }}>Ngày tạo</th>
                <th style={{ width: '15%' }}>Tổng tiền</th>
                <th style={{ width: '13%' }}>Trạng thái</th>
                <th style={{ width: '12%' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>
                    <span className="staff-id-badge">{invoice.id}</span>
                  </td>
                  <td>
                    <div className="staff-name-cell">
                      <span className="staff-name">{invoice.customerName}</span>
                      <span className="staff-specialization">{invoice.customerPhone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="pet-info-cell">
                      <span className="pet-icon-cell">{invoice.petIcon}</span>
                      <span>{invoice.petName}</span>
                    </div>
                  </td>
                  <td className="text-gray-700">{formatDate(invoice.date)}</td>
                  <td>
                    <span className="price-badge">{formatCurrency(invoice.total)}</span>
                  </td>
                  <td>
                    <span className={`status-badge-modern ${invoice.isPaid ? 'status-paid' : 'status-unpaid'}`}>
                      {invoice.isPaid ? '✓ Đã thanh toán' : '⏳ Chưa thanh toán'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons-modern">
                      <button
                        onClick={() => handleViewDetail(invoice)}
                        className="btn-icon-action btn-view-icon"
                        title="Xem chi tiết"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => handleExportPDF(invoice)}
                        className="btn-icon-action btn-download-icon"
                        title="Xuất PDF"
                      >
                        📄
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredInvoices.length === 0 && (
            <div className="empty-state-modern">
              <div className="empty-icon">🔍</div>
              <p className="empty-text">Không tìm thấy hóa đơn nào</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <InvoiceDetailModal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        invoice={selectedInvoice}
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