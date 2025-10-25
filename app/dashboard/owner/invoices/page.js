// app/(dashboard)/owner/invoices/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import InvoiceDetailModal from "@/components/modals/InvoiceDetailModal";

export default function OwnerInvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadInvoices();
    }, []);

  const loadInvoices = () => {
    // Mock data
    setInvoices([
      {
        id: "INV-2025-001",
        customerName: "Bạn",
        customerPhone: "0901234567",
        customerEmail: "customer@example.com",
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
        customerName: "Bạn",
        customerPhone: "0901234567",
        customerEmail: "customer@example.com",
        petName: "Miu",
        petIcon: "🐈",
        petBreed: "Mèo Anh lông ngắn",
        petAge: 2,
        date: "2025-01-20T14:00:00",
        services: [
          { icon: "🛁", name: "Tắm spa cao cấp", quantity: 1, price: 150000 }
        ],
        subtotal: 150000,
        discount: 15000,
        total: 135000,
        isPaid: false,
        paymentMethod: null,
        paymentDate: null,
        notes: ""
      },
      {
        id: "INV-2025-003",
        customerName: "Bạn",
        customerPhone: "0901234567",
        customerEmail: "customer@example.com",
        petName: "Coco",
        petIcon: "🐩",
        petBreed: "Poodle",
        petAge: 1,
        date: "2025-01-25T09:00:00",
        services: [
          { icon: "✂️", name: "Cắt tỉa lông tạo kiểu", quantity: 1, price: 180000 },
          { icon: "💆", name: "Spa massage", quantity: 1, price: 250000 }
        ],
        subtotal: 430000,
        discount: 0,
        total: 430000,
        isPaid: false,
        paymentMethod: null,
        paymentDate: null,
        notes: ""
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleViewDetail = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handlePayInvoice = (invoice) => {
    if (confirm("Xác nhận thanh toán hóa đơn này?")) {
      setInvoices(invoices.map(inv =>
        inv.id === invoice.id
          ? { ...inv, isPaid: true, paymentMethod: "Online", paymentDate: new Date().toISOString() }
          : inv
      ));
      showToast("✅ Thanh toán thành công!");
    }
  };

  const filteredInvoices = invoices.filter(inv => {
    if (filter === "all") return true;
    if (filter === "paid") return inv.isPaid;
    if (filter === "unpaid") return !inv.isPaid;
    return true;
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

  const totalPaid = invoices.filter(i => i.isPaid).reduce((sum, i) => sum + i.total, 0);
  const totalUnpaid = invoices.filter(i => !i.isPaid).reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Hóa đơn của tôi"
        subtitle="Xem và quản lý hóa đơn thanh toán"
      />

      {/* Stats */}
      <div className="stats-grid">
        <div className="stats-card stats-card-primary">
          <div className="stats-icon">🧾</div>
          <div className="stats-content">
            <p className="stats-title">Tổng hóa đơn</p>
            <h3 className="stats-value">{invoices.length}</h3>
          </div>
        </div>

        <div className="stats-card stats-card-success">
          <div className="stats-icon">✅</div>
          <div className="stats-content">
            <p className="stats-title">Đã thanh toán</p>
            <h3 className="stats-value">{invoices.filter(i => i.isPaid).length}</h3>
            <p className="stats-change stats-up">{formatCurrency(totalPaid)}</p>
          </div>
        </div>

        <div className="stats-card stats-card-warning">
          <div className="stats-icon">⏳</div>
          <div className="stats-content">
            <p className="stats-title">Chưa thanh toán</p>
            <h3 className="stats-value">{invoices.filter(i => !i.isPaid).length}</h3>
            <p className="stats-change stats-down">{formatCurrency(totalUnpaid)}</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs-container">
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tất cả
          </button>
          <button
            className={`filter-tab ${filter === 'paid' ? 'active' : ''}`}
            onClick={() => setFilter('paid')}
          >
            ✅ Đã thanh toán
          </button>
          <button
            className={`filter-tab ${filter === 'unpaid' ? 'active' : ''}`}
            onClick={() => setFilter('unpaid')}
          >
            ⏳ Chưa thanh toán
          </button>
        </div>
      </div>

      {/* Invoices List */}
      <div className="invoices-owner-list">
        {filteredInvoices.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🧾</div>
            <p className="empty-text">Chưa có hóa đơn nào</p>
          </div>
        ) : (
          <div className="invoice-cards-grid">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="invoice-owner-card">
                <div className="invoice-owner-header">
                  <div>
                    <h4 className="invoice-owner-id">{invoice.id}</h4>
                    <p className="invoice-owner-date">{formatDate(invoice.date)}</p>
                  </div>
                  <span className={`status-badge ${invoice.isPaid ? 'status-paid' : 'status-unpaid'}`}>
                    {invoice.isPaid ? '✓ Đã thanh toán' : '⏳ Chưa thanh toán'}
                  </span>
                </div>

                <div className="invoice-owner-body">
                  <div className="invoice-pet-info-section">
                    <span className="invoice-pet-icon">{invoice.petIcon}</span>
                    <div>
                      <p className="invoice-pet-name">{invoice.petName}</p>
                      <p className="invoice-pet-breed">{invoice.petBreed}</p>
                    </div>
                  </div>

                  <div className="invoice-services-summary">
                    <p className="services-label">Dịch vụ đã sử dụng:</p>
                    {invoice.services.map((service, idx) => (
                      <div key={idx} className="service-summary-item">
                        <span>{service.icon} {service.name}</span>
                        <span className="service-price">{formatCurrency(service.price)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="invoice-total-section-owner">
                    {invoice.discount > 0 && (
                      <div className="invoice-discount">
                        <span>Giảm giá:</span>
                        <span className="discount-amount">-{formatCurrency(invoice.discount)}</span>
                      </div>
                    )}
                    <div className="invoice-total-owner">
                      <span className="total-label">Tổng cộng:</span>
                      <span className="total-amount">{formatCurrency(invoice.total)}</span>
                    </div>
                  </div>
                </div>

                <div className="invoice-owner-footer">
                  <button
                    onClick={() => handleViewDetail(invoice)}
                    className="btn-invoice-action btn-view-invoice"
                  >
                    👁️ Xem chi tiết
                  </button>
                  {!invoice.isPaid && (
                    <button
                      onClick={() => handlePayInvoice(invoice)}
                      className="btn-invoice-action btn-pay-invoice"
                    >
                      💳 Thanh toán
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invoice Detail Modal */}
      <InvoiceDetailModal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
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