// app/(dashboard)/owner/payments/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import PaymentDetailModal from "@/components/modals/PaymentDetailModal";

export default function OwnerPaymentsPage() {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    setInvoices([
      {
        id: "INV001",
        code: "INV001",
        serviceName: "Khám sức khỏe tổng quát",
        serviceIcon: "🏥",
        petName: "Lucky",
        petIcon: "🐕",
        date: "2025-10-25",
        amount: 200000,
        status: "paid",
        paymentMethod: "Tiền mặt",
        paidAt: "2025-10-25 14:30"
      },
      {
        id: "INV002",
        code: "INV002",
        serviceName: "Tắm spa cao cấp",
        serviceIcon: "🛁",
        petName: "Miu",
        petIcon: "🐈",
        date: "2025-10-26",
        amount: 150000,
        status: "pending",
        paymentMethod: null,
        paidAt: null
      },
      {
        id: "INV003",
        code: "INV003",
        serviceName: "Cắt tỉa lông",
        serviceIcon: "✂️",
        petName: "Coco",
        petIcon: "🐩",
        date: "2025-10-24",
        amount: 180000,
        status: "paid",
        paymentMethod: "Chuyển khoản",
        paidAt: "2025-10-24 16:45"
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleViewDetail = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailModalOpen(true);
  };

  const handlePayNow = (invoiceId) => {
    if (confirm("Xác nhận thanh toán hóa đơn này?")) {
      setInvoices(invoices.map(inv =>
        inv.id === invoiceId
          ? { ...inv, status: "paid", paymentMethod: "Tiền mặt", paidAt: new Date().toISOString() }
          : inv
      ));
      showToast("✅ Thanh toán thành công!");
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchFilter = filter === "all" || invoice.status === filter;
    const matchSearch = invoice.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       invoice.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    return status === 'paid'
      ? { label: "Đã thanh toán", class: "status-paid", icon: "✅" }
      : { label: "Chưa thanh toán", class: "status-pending", icon: "⏳" };
  };

  const stats = {
    total: invoices.length,
    paid: invoices.filter(i => i.status === 'paid').length,
    pending: invoices.filter(i => i.status === 'pending').length
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Thanh toán"
        subtitle="Quản lý hóa đơn và thanh toán dịch vụ"
      />

      {/* Stats */}
      <div className="section-separated">
        <div className="stats-grid-custom">
          <div className="stat-card-modern stat-primary">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">💳</span>
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
            </div>
          </div>

          <div className="stat-card-modern stat-warning">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">⏳</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Chưa thanh toán</p>
              <h3 className="stat-number">{stats.pending}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons - Tách biệt, đẹp */}
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
            onClick={() => setFilter("paid")}
            className={`filter-btn-modern ${filter === "paid" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">✅</span>
            <span>Đã thanh toán</span>
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`filter-btn-modern ${filter === "pending" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">⏳</span>
            <span>Chưa thanh toán</span>
          </button>
        </div>
      </div>

      {/* Search Bar - BÊN PHẢI */}
      <div className="section-separated">
        <div className="search-section-right">
          <div className="search-box-modern">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm hóa đơn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-modern"
            />
          </div>
        </div>
      </div>

      {/* Invoices List - TÁCH BIỆT TỪNG HÓA ĐƠN */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Danh sách hóa đơn
          </h2>
          <span className="section-count">{filteredInvoices.length} hóa đơn</span>
        </div>

        <div className="invoices-list-separated">
          {filteredInvoices.map((invoice) => {
            const statusBadge = getStatusBadge(invoice.status);
            return (
              <div key={invoice.id} className="invoice-card-separated">
                <div className="invoice-card-header">
                  <div className="invoice-code-section">
                    <span className="invoice-code-badge">{invoice.code}</span>
                    <span className="invoice-date">📅 {invoice.date}</span>
                  </div>
                  <span className={`invoice-status-badge ${statusBadge.class}`}>
                    {statusBadge.icon} {statusBadge.label}
                  </span>
                </div>

                <div className="invoice-card-body">
                  <div className="invoice-service-info">
                    <span className="service-icon-large">{invoice.serviceIcon}</span>
                    <div>
                      <p className="service-name-bold">{invoice.serviceName}</p>
                      <p className="pet-info-small">
                        {invoice.petIcon} {invoice.petName}
                      </p>
                    </div>
                  </div>

                  <div className="invoice-amount-section">
                    <p className="amount-label">Tổng tiền</p>
                    <h3 className="amount-value">{formatCurrency(invoice.amount)}</h3>
                  </div>
                </div>

                <div className="invoice-card-footer">
                  <button
                    onClick={() => handleViewDetail(invoice)}
                    className="btn-invoice-action btn-view-detail"
                  >
                    <span>📋</span>
                    <span>Xem chi tiết</span>
                  </button>
                  {invoice.status === 'pending' && (
                    <button
                      onClick={() => handlePayNow(invoice.id)}
                      className="btn-invoice-action btn-pay-now"
                    >
                      <span>💳</span>
                      <span>Thanh toán ngay</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredInvoices.length === 0 && (
          <div className="empty-state-modern">
            <div className="empty-icon">💳</div>
            <p className="empty-text">Không tìm thấy hóa đơn nào</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <PaymentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedInvoice(null);
        }}
        invoice={selectedInvoice}
      />

      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}