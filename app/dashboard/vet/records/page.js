// app/(dashboard)/veterinarian/records/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import VetRecordDetailModal from "@/components/modals/VetRecordDetailModal";
import VetRecordFormModal from "@/components/modals/VetRecordFormModal";

export default function VeterinarianRecordsPage() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
  // Mock data - CÁC HỒ SƠ GẦN ĐÂY
  setRecords([
    {
      id: "REC001",
      code: "REC001",
      petId: "PET001",
      petName: "Lucky",
      petIcon: "🐕",
      petType: "Chó Golden Retriever",
      ownerId: "CUS001",
      ownerName: "Nguyễn Văn A",
      ownerPhone: "0901234567",
      date: "2025-10-27",
      symptoms: "Ăn uống kém, uể oải, sốt nhẹ",
      diagnosis: "Viêm dạ dày cấp",
      prescription: "Omeprazole 20mg x 2 lần/ngày, Metronidazole 500mg x 2 lần/ngày",
      treatment: "Tiêm thuốc giảm đau, truyền dịch",
      notes: "Kiêng ăn 12 giờ, sau đó cho ăn thức ăn mềm",
      followUpDate: "2025-11-03",
      veterinarianId: "VET001",
      veterinarianName: "BS. Đức Hải",
      invoiceCreated: true,
      invoiceId: "INV001"
    },
    {
      id: "REC002",
      code: "REC002",
      petId: "PET002",
      petName: "Miu",
      petIcon: "🐈",
      petType: "Mèo Ba Tư",
      ownerId: "CUS002",
      ownerName: "Trần Thị B",
      ownerPhone: "0909876543",
      date: "2025-10-27",
      symptoms: "Tiêm phòng định kỳ",
      diagnosis: "Khỏe mạnh, tiêm phòng dại",
      prescription: "Không",
      treatment: "Tiêm vaccine dại",
      notes: "Tiêm phòng lần 2, hẹn tiêm tiếp sau 1 năm",
      followUpDate: "2026-10-27",
      veterinarianId: "VET001",
      veterinarianName: "BS. Đức Hải",
      invoiceCreated: true,
      invoiceId: "INV002"
    },
    {
      id: "REC003",
      code: "REC003",
      petId: "PET003",
      petName: "Coco",
      petIcon: "🐩",
      petType: "Chó Poodle",
      ownerId: "CUS003",
      ownerName: "Lê Văn C",
      ownerPhone: "0912345678",
      date: "2025-10-25",
      symptoms: "Ngứa ngáy, da đỏ, rụng lông",
      diagnosis: "Viêm da do nấm",
      prescription: "Ketoconazole 200mg x 1 lần/ngày, Dung dịch tắm trị nấm",
      treatment: "Bôi thuốc tại chỗ, tắm thuốc",
      notes: "Tránh ẩm ướt, giữ khô ráo. Tái khám sau 2 tuần",
      followUpDate: "2025-11-08",
      veterinarianId: "VET001",
      veterinarianName: "BS. Đức Hải",
      invoiceCreated: false,
      invoiceId: null
    },
    {
      id: "REC004",
      code: "REC004",
      petId: "PET004",
      petName: "Max",
      petIcon: "🐕",
      petType: "Chó Husky",
      ownerId: "CUS004",
      ownerName: "Phạm Thị D",
      ownerPhone: "0923456789",
      date: "2025-10-20",
      symptoms: "Khám răng miệng định kỳ",
      diagnosis: "Cao răng nhẹ",
      prescription: "Không",
      treatment: "Lấy cao răng, vệ sinh răng miệng",
      notes: "Nên đánh răng định kỳ cho thú cưng",
      followUpDate: "2026-04-20",
      veterinarianId: "VET001",
      veterinarianName: "BS. Đức Hải",
      invoiceCreated: true,
      invoiceId: "INV003"
    }
  ]);
};

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleViewDetail = (record) => {
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  const handleCreateRecord = () => {
    setEditingRecord(null);
    setIsFormModalOpen(true);
  };

  const handleEditRecord = (record) => {
    setEditingRecord(record);
    setIsFormModalOpen(true);
  };

  const handleSaveRecord = (recordData) => {
    if (editingRecord) {
      // Update existing record
      setRecords(records.map(rec =>
        rec.id === editingRecord.id
          ? { ...rec, ...recordData, date: new Date().toISOString().split('T')[0] }
          : rec
      ));
      showToast("💾 Đã cập nhật hồ sơ bệnh án!");
    } else {
      // Create new record
      const newRecord = {
        id: `REC${String(records.length + 1).padStart(3, '0')}`,
        code: `REC${String(records.length + 1).padStart(3, '0')}`,
        ...recordData,
        date: new Date().toISOString().split('T')[0],
        veterinarianId: "VET001",
        veterinarianName: "BS. Đức Hải",
        invoiceCreated: false,
        invoiceId: null
      };
      setRecords([newRecord, ...records]);
      showToast("🎉 Đã tạo hồ sơ bệnh án mới!");
    }
  };

  const handleCreateInvoice = (recordId) => {
    const record = records.find(r => r.id === recordId);
    if (record && !record.invoiceCreated) {
      const newInvoiceId = `INV${String(records.length + 1).padStart(3, '0')}`;
      setRecords(records.map(rec =>
        rec.id === recordId
          ? { ...rec, invoiceCreated: true, invoiceId: newInvoiceId }
          : rec
      ));
      showToast(`💰 Đã tạo hóa đơn ${newInvoiceId}`);
    }
  };

  const filteredRecords = records.filter(rec => {
    const matchFilter = filter === "all" || 
                       (filter === "with_invoice" && rec.invoiceCreated) ||
                       (filter === "no_invoice" && !rec.invoiceCreated);
    const matchSearch = rec.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       rec.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       rec.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const stats = {
    total: records.length,
    withInvoice: records.filter(r => r.invoiceCreated).length,
    noInvoice: records.filter(r => !r.invoiceCreated).length
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Hồ sơ bệnh án"
        subtitle="Quản lý và tra cứu hồ sơ khám bệnh"
      />

      {/* Stats */}
      <div className="section-separated">
        <div className="stats-grid-custom">
          <div className="stat-card-modern stat-primary">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">📋</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Tổng hồ sơ</p>
              <h3 className="stat-number">{stats.total}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-success">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">💰</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Đã có hóa đơn</p>
              <h3 className="stat-number">{stats.withInvoice}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-warning">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">⏳</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Chưa có hóa đơn</p>
              <h3 className="stat-number">{stats.noInvoice}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
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
            onClick={() => setFilter("with_invoice")}
            className={`filter-btn-modern ${filter === "with_invoice" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">💰</span>
            <span>Đã có hóa đơn</span>
          </button>
          <button
            onClick={() => setFilter("no_invoice")}
            className={`filter-btn-modern ${filter === "no_invoice" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">⏳</span>
            <span>Chưa có hóa đơn</span>
          </button>
        </div>
      </div>

      {/* Add Button */}
      <div className="section-separated">
        <div className="action-button-section">
          <button
            onClick={handleCreateRecord}
            className="btn-add-large"
          >
            <span className="btn-icon">➕</span>
            <span>Tạo hồ sơ mới</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="section-separated">
        <div className="search-section-right">
          <div className="search-box-modern">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên thú cưng, chủ nuôi, mã hồ sơ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-modern"
            />
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Danh sách hồ sơ bệnh án
          </h2>
          <span className="section-count">{filteredRecords.length} hồ sơ</span>
        </div>

        <div className="table-modern-wrapper">
          <table className="table-modern">
            <thead>
              <tr>
                <th style={{width: '8%'}}>Mã</th>
                <th style={{width: '10%'}}>Ngày khám</th>
                <th style={{width: '15%'}}>Thú cưng</th>
                <th style={{width: '13%'}}>Chủ nuôi</th>
                <th style={{width: '20%'}}>Chẩn đoán</th>
                <th style={{width: '12%'}}>Tái khám</th>
                <th style={{width: '10%'}}>Hóa đơn</th>
                <th style={{width: '12%'}}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>
                    <span className="code-badge">{record.code}</span>
                  </td>
                  
                  <td>
                    <span className="date-text">📅 {record.date}</span>
                  </td>
                  
                  <td>
                    <div className="pet-detail-cell">
                      <span className="pet-icon-large">{record.petIcon}</span>
                      <div>
                        <p className="pet-name-bold">{record.petName}</p>
                        <p className="pet-info-small">{record.petType}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td>
                    <div className="customer-cell">
                      <p className="font-semibold">{record.ownerName}</p>
                      <p className="text-sm text-gray-500">{record.ownerPhone}</p>
                    </div>
                  </td>
                  
                  <td>
                    <p className="diagnosis-text">{record.diagnosis}</p>
                  </td>
                  
                  <td>
                    <span className="follow-up-date">
                      🔄 {record.followUpDate}
                    </span>
                  </td>
                  
                  <td>
                    {record.invoiceCreated ? (
                      <span className="invoice-badge invoice-created">
                        ✓ {record.invoiceId}
                      </span>
                    ) : (
                      <span className="invoice-badge invoice-pending">
                        ✕ Chưa có
                      </span>
                    )}
                  </td>
                  
                  <td>
                    <div className="action-buttons-modern">
                      <button
                        onClick={() => handleViewDetail(record)}
                        className="btn-icon-action btn-view-icon"
                        title="Chi tiết"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => handleEditRecord(record)}
                        className="btn-icon-action btn-edit-icon"
                        title="Chỉnh sửa"
                      >
                        ✏️
                      </button>
                      {!record.invoiceCreated && (
                        <button
                          onClick={() => handleCreateInvoice(record.id)}
                          className="btn-icon-action btn-invoice-icon"
                          title="Tạo hóa đơn"
                        >
                          💰
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRecords.length === 0 && (
            <div className="empty-state-modern">
              <div className="empty-icon">📋</div>
              <p className="empty-text">Không có hồ sơ nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <VetRecordDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedRecord(null);
        }}
        record={selectedRecord}
      />

      <VetRecordFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingRecord(null);
        }}
        onSuccess={handleSaveRecord}
        record={editingRecord}
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