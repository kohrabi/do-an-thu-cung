// app/(dashboard)/manager/invoices/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import InvoiceDetailModal from "@/components/modals/InvoiceDetailModal";

export default function ManagerInvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    // Mock data
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
          { icon: "🏠", name: "Lưu trú theo ngày", quantity: 3, price: 100000 },
          { icon: "🛁", name: "Tắm spa cao cấp", quantity: 1, price: 150000 }
        ],
        subtotal: 450000,
        discount: 0,
        total: 450000,
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
    const matchStatus = filterStatus === "all" ||
      (filterStatus === "paid" && invoice.isPaid) ||
      (filterStatus === "unpaid" && !invoice.isPaid);
    const matchSearch = invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
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
    // Implementation: Export to PDF
  };

  const totalRevenue = filteredInvoices.reduce((sum, inv) => sum + (inv.isPaid ? inv.total : 0), 0);
  const unpaidAmount = filteredInvoices.reduce((sum, inv) => sum + (inv.isPaid ? 0 : inv.total), 0);

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Quản lý hóa đơn"
        subtitle="Theo dõi và quản lý hóa đơn thanh toán"
      />

      {/* Stats Summary */}
      <div className="stats-grid">
        <div className="stats-card stats-card-primary">
          <div className="stats-icon">🧾</div>
          <div className="stats-content">
            <p className="stats-title">Tổng hóa đơn</p>
            <h3 className="stats-value">{filteredInvoices.length}</h3>
          </div>
        </div>
        
        <div className="stats-card stats-card-success">
          <div className="stats-icon">✅</div>
          <div className="stats-content">
            <p className="stats-title">Đã thanh toán</p>
            <h3 className="stats-value">{filteredInvoices.filter(i => i.isPaid).length}</h3>
            <p className="stats-change stats-up">{formatCurrency(totalRevenue)}</p>
          </div>
        </div>

        <div className="stats-card stats-card-warning">
          <div className="stats-icon">⏳</div>
          <div className="stats-content">
            <p className="stats-title">Chưa thanh toán</p>
            <h3 className="stats-value">{filteredInvoices.filter(i => !i.isPaid).length}</h3>
            <p className="stats-change stats-down">{formatCurrency(unpaidAmount)}</p>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="table-container">
        <div className="table-header">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên khách hàng hoặc mã hóa đơn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="paid">✅ Đã thanh toán</option>
            <option value="unpaid">⏳ Chưa thanh toán</option>
          </select>
        </div>

        {/* Invoice Table */}
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã hóa đơn</th>
                <th>Khách hàng</th>
                <th>Thú cưng</th>
                <th>Ngày tạo</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="font-mono font-semibold">{invoice.id}</td>
                  <td>
                    <div className="customer-cell">
                      <p className="font-semibold">{invoice.customerName}</p>
                      <p className="text-sm text-gray-500">{invoice.customerPhone}</p>
                    </div>
                  </td>
                  <td>
                    <div className="pet-cell">
                      <span className="pet-icon-cell">{invoice.petIcon}</span>
                      <span>{invoice.petName}</span>
                    </div>
                  </td>
                  <td className="text-gray-600">{formatDate(invoice.date)}</td>
                  <td className="font-bold text-lg">{formatCurrency(invoice.total)}</td>
                  <td>
                    <span className={`status-badge ${invoice.isPaid ? 'status-paid' : 'status-unpaid'}`}>
                      {invoice.isPaid ? '✓ Đã thanh toán' : '⏳ Chưa thanh toán'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleViewDetail(invoice)}
                        className="btn-action btn-view"
                        title="Xem chi tiết"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => handleExportPDF(invoice)}
                        className="btn-action btn-download"
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
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <p className="empty-text">Không tìm thấy hóa đơn nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Detail Modal */}
      <InvoiceDetailModal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        invoice={selectedInvoice}
      />

      {/* Toast */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}