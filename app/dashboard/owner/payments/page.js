"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import PaymentInvoiceDetailModal from "@/components/modals/PaymentDetailModal";

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
        invoiceCode: "INV001",
        serviceName: "Khám sức khỏe tổng quát",
        serviceIcon: "🏥",
        petName: "Lucky",
        petIcon: "🐕",
        serviceDate: "2025-10-25",
        totalAmount: 200000,
        paymentStatus: "paid",
        paymentMethod: "cash",
        paidAt: "2025-10-25 14:30"
      },
      {
        id: "INV002",
        invoiceCode: "INV002",
        serviceName: "Tắm spa cao cấp",
        serviceIcon: "🛁",
        petName: "Miu",
        petIcon: "🐈",
        serviceDate: "2025-10-26",
        totalAmount: 150000,
        paymentStatus: "unpaid",
        paymentMethod: null,
        paidAt: null
      },
      {
        id: "INV003",
        invoiceCode: "INV003",
        serviceName: "Cắt tỉa lông",
        serviceIcon: "✂️",
        petName: "Coco",
        petIcon: "🐩",
        serviceDate: "2025-10-24",
        totalAmount: 180000,
        paymentStatus: "paid",
        paymentMethod: "transfer",
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
          ? { 
              ...inv, 
              paymentStatus: "paid", 
              paymentMethod: "cash", 
              paidAt: new Date().toLocaleString('vi-VN')
            }
          : inv
      ));
      showToast("✅ Thanh toán thành công!");
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchFilter = filter === "all" || invoice.paymentStatus === filter;
    const matchSearch = invoice.invoiceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       invoice.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const formatCurrency = (amount) => {
    const num = Number(amount) || 0;
    return new Intl.NumberFormat('vi-VN').format(num) + ' ₫';
  };

  const getStatusBadge = (status) => {
    return status === 'paid'
      ? { label: "Đã thanh toán", icon: "✅", color: "#10B981", bg: "#D1FAE5" }
      : { label: "Chưa thanh toán", icon: "⏳", color: "#F59E0B", bg: "#FEF3C7" };
  };

  const stats = {
    total: invoices.length,
    paid: invoices.filter(i => i.paymentStatus === 'paid').length,
    pending: invoices.filter(i => i.paymentStatus === 'unpaid').length
  };

  return (
    <>
      <style jsx global>{`
        .payments-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .stat-box {
          background: white;
          padding: 24px;
          border-radius: 12px;
          border: 2px solid #F3F4F6;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .stat-icon-box {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }
        
        .stat-icon-box.primary { background: #DBEAFE; }
        .stat-icon-box.success { background: #D1FAE5; }
        .stat-icon-box.warning { background: #FEF3C7; }
        
        .stat-info h4 {
          margin: 0 0 4px 0;
          font-size: 13px;
          color: #6B7280;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .stat-info p {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: #1F2937;
        }
        
        .filter-tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        
        .filter-tab {
          padding: 12px 24px;
          border: 2px solid #E5E7EB;
          background: white;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        
        .filter-tab:hover {
          border-color: #D1D5DB;
          background: #F9FAFB;
        }
        
        .filter-tab.active {
          background: linear-gradient(135deg, #EC4899 0%, #F472B6 100%);
          color: white;
          border-color: #EC4899;
        }
        
        .search-wrapper {
          margin-bottom: 24px;
        }
        
        .search-input-box {
          max-width: 400px;
          margin-left: auto;
          position: relative;
        }
        
        .search-input-box input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          border: 2px solid #E5E7EB;
          border-radius: 10px;
          font-size: 15px;
          box-sizing: border-box;
        }
        
        .search-input-box::before {
          content: '🔍';
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
        }
        
        .invoices-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .invoice-box {
          background: white;
          border: 2px solid #F3F4F6;
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s;
        }
        
        .invoice-box:hover {
          border-color: #EC4899;
          box-shadow: 0 8px 24px rgba(236, 72, 153, 0.15);
        }
        
        .invoice-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 2px solid #F3F4F6;
        }
        
        .invoice-code-badge {
          padding: 8px 16px;
          background: #FDF2F8;
          color: #BE185D;
          border-radius: 8px;
          font-weight: 700;
          font-size: 15px;
          font-family: monospace;
          border: 2px solid #FBCFE8;
        }
        
        .invoice-status-badge {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .invoice-content-row {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .invoice-service-box {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: #F9FAFB;
          border-radius: 12px;
        }
        
        .service-icon-large {
          font-size: 56px;
        }
        
        .service-details h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
          font-weight: 700;
          color: #1F2937;
        }
        
        .service-details p {
          margin: 0;
          font-size: 14px;
          color: #6B7280;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .invoice-amount-box {
          min-width: 280px;
          padding: 24px;
          background: linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%);
          border: 2px solid #FECDD3;
          border-radius: 12px;
          text-align: right;
        }
        
        .amount-label {
          margin: 0 0 8px 0;
          font-size: 13px;
          color: #BE185D;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .amount-value {
          margin: 0;
          font-size: 36px;
          font-weight: 700;
          color: #E11D48;
          font-family: monospace;
        }
        
        .invoice-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding-top: 16px;
          border-top: 2px solid #F3F4F6;
        }
        
        .invoice-actions.single {
          grid-template-columns: 1fr;
        }
        
        .invoice-btn {
          padding: 14px;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }
        
        .invoice-btn.view {
          background: linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%);
          color: #1E40AF;
        }
        
        .invoice-btn.view:hover {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          color: white;
          transform: translateY(-2px);
        }
        
        .invoice-btn.pay {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: white;
        }
        
        .invoice-btn.pay:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          transform: translateY(-2px);
        }
        
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 16px;
          border: 2px dashed #E5E7EB;
        }
        
        .empty-state-icon {
          font-size: 64px;
          margin-bottom: 16px;
        }
        
        .empty-state-text {
          font-size: 16px;
          color: #6B7280;
        }
        
        .toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          padding: 16px 24px;
          background: #10B981;
          color: white;
          border-radius: 12px;
          font-weight: 600;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          z-index: 10000;
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @media (max-width: 768px) {
          .invoice-content-row {
            flex-direction: column;
          }
          
          .invoice-amount-box {
            min-width: auto;
          }
          
          .invoice-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="payments-container">
        <DashboardHeader
          title="Thanh toán"
          subtitle="Quản lý hóa đơn và thanh toán dịch vụ"
        />

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-icon-box primary">💳</div>
            <div className="stat-info">
              <h4>Tổng hóa đơn</h4>
              <p>{stats.total}</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon-box success">✅</div>
            <div className="stat-info">
              <h4>Đã thanh toán</h4>
              <p>{stats.paid}</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon-box warning">⏳</div>
            <div className="stat-info">
              <h4>Chưa thanh toán</h4>
              <p>{stats.pending}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-tabs">
          <button
            onClick={() => setFilter("all")}
            className={`filter-tab ${filter === "all" ? "active" : ""}`}
          >
            <span>📋</span>
            <span>Tất cả</span>
          </button>
          <button
            onClick={() => setFilter("paid")}
            className={`filter-tab ${filter === "paid" ? "active" : ""}`}
          >
            <span>✅</span>
            <span>Đã thanh toán</span>
          </button>
          <button
            onClick={() => setFilter("unpaid")}
            className={`filter-tab ${filter === "unpaid" ? "active" : ""}`}
          >
            <span>⏳</span>
            <span>Chưa thanh toán</span>
          </button>
        </div>

        {/* Search */}
        <div className="search-wrapper">
          <div className="search-input-box">
            <input
              type="text"
              placeholder="Tìm kiếm hóa đơn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Invoices List */}
        <div className="invoices-grid">
          {filteredInvoices.map((invoice) => {
            const statusBadge = getStatusBadge(invoice.paymentStatus);
            return (
              <div key={invoice.id} className="invoice-box">
                <div className="invoice-header-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="invoice-code-badge">{invoice.invoiceCode}</span>
                    <span style={{ fontSize: '14px', color: '#6B7280' }}>
                      📅 {invoice.serviceDate}
                    </span>
                  </div>
                  <span 
                    className="invoice-status-badge"
                    style={{
                      background: statusBadge.bg,
                      color: statusBadge.color,
                      border: `2px solid ${statusBadge.color}`
                    }}
                  >
                    <span>{statusBadge.icon}</span>
                    <span>{statusBadge.label}</span>
                  </span>
                </div>

                <div className="invoice-content-row">
                  <div className="invoice-service-box">
                    <span className="service-icon-large">{invoice.serviceIcon}</span>
                    <div className="service-details">
                      <h3>{invoice.serviceName}</h3>
                      <p>
                        <span>{invoice.petIcon}</span>
                        <span>{invoice.petName}</span>
                      </p>
                    </div>
                  </div>

                  <div className="invoice-amount-box">
                    <p className="amount-label">Tổng tiền</p>
                    <h2 className="amount-value">{formatCurrency(invoice.totalAmount)}</h2>
                  </div>
                </div>

                <div className={`invoice-actions ${invoice.paymentStatus === 'paid' ? 'single' : ''}`}>
                  <button
                    onClick={() => handleViewDetail(invoice)}
                    className="invoice-btn view"
                  >
                    <span>📋</span>
                    <span>Xem chi tiết</span>
                  </button>
                  {invoice.paymentStatus === 'unpaid' && (
                    <button
                      onClick={() => handlePayNow(invoice.id)}
                      className="invoice-btn pay"
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
          <div className="empty-state">
            <div className="empty-state-icon">💳</div>
            <p className="empty-state-text">Không tìm thấy hóa đơn nào</p>
          </div>
        )}
      </div>

      <PaymentInvoiceDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedInvoice(null);
        }}
        invoice={selectedInvoice}
      />

      {toast.show && (
        <div className="toast">
          {toast.message}
        </div>
      )}
    </>
  );
}