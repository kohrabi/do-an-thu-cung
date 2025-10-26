// FILE: app/(dashboard)/manager/staff/page.js
// THAY THẾ TOÀN BỘ NỘI DUNG CŨ BẰNG CODE NÀY

"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Button from "@/components/ui/Button";
import AddStaffModal from "@/components/modals/AddStaffModal";
import EditStaffModal from "@/components/modals/EditStaffModal";

export default function ManagerStaffPage() {
  const searchParams = useSearchParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      setIsAddModalOpen(true);
    }

    // Mock data
    setStaffList([
      {
        id: "EMP001",
        name: "Nguyễn Văn A",
        email: "vet@pawlovers.com",
        phone: "0901234567",
        role: "veterinarian",
        isActive: true,
        joinDate: "2024-01-15",
        specialization: "Bác sĩ thú y tổng quát"
      },
      {
        id: "EMP002",
        name: "Trần Thị B",
        email: "staff@pawlovers.com",
        phone: "0909876543",
        role: "care_staff",
        isActive: true,
        joinDate: "2024-03-20",
        specialization: "Chăm sóc chó mèo"
      },
      {
        id: "EMP003",
        name: "Lê Văn C",
        email: "reception@pawlovers.com",
        phone: "0912345678",
        role: "receptionist",
        isActive: true,
        joinDate: "2024-05-10",
        specialization: "Lễ tân - Tư vấn"
      },
      {
        id: "EMP004",
        name: "Phạm Thị D",
        email: "staff2@pawlovers.com",
        phone: "0923456789",
        role: "care_staff",
        isActive: false,
        joinDate: "2023-11-05",
        specialization: "Grooming chuyên sâu"
      }
    ]);
  }, [searchParams]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleAddStaff = (newStaff) => {
    const staff = {
      id: `EMP${String(staffList.length + 1).padStart(3, '0')}`,
      name: newStaff.fullName,
      email: newStaff.email,
      phone: newStaff.phone,
      role: newStaff.role,
      specialization: newStaff.specialization || "",
      isActive: true,
      joinDate: new Date().toISOString().split('T')[0]
    };
    setStaffList([...staffList, staff]);
    showToast("✅ Đã thêm nhân viên thành công!");
  };

  const handleEditStaff = (updatedData) => {
    setStaffList(staffList.map(staff =>
      staff.id === updatedData.id
        ? { 
            ...staff, 
            name: updatedData.fullName, 
            phone: updatedData.phone, 
            role: updatedData.role,
            specialization: updatedData.specialization || staff.specialization
          }
        : staff
    ));
    showToast("💾 Cập nhật nhân viên thành công!");
  };

  const handleToggleStatus = (staffId) => {
    const staff = staffList.find(s => s.id === staffId);
    if (confirm(`Bạn có chắc muốn ${staff.isActive ? 'vô hiệu hóa' : 'kích hoạt'} nhân viên này?`)) {
      setStaffList(staffList.map(s =>
        s.id === staffId ? { ...s, isActive: !s.isActive } : s
      ));
      showToast("✅ Đã cập nhật trạng thái nhân viên");
    }
  };

  const handleOpenEdit = (staff) => {
    setEditingStaff(staff);
    setIsEditModalOpen(true);
  };

  const filteredStaff = staffList.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role) => {
    const badges = {
      veterinarian: { label: "Bác sĩ", class: "badge-vet", icon: "👨‍⚕️" },
      care_staff: { label: "Nhân viên", class: "badge-staff", icon: "🧑‍🔧" },
      receptionist: { label: "Lễ tân", class: "badge-reception", icon: "💼" }
    };
    return badges[role] || badges.care_staff;
  };

  const stats = {
    total: staffList.length,
    active: staffList.filter(s => s.isActive).length,
    inactive: staffList.filter(s => !s.isActive).length
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Quản lý nhân viên"
        subtitle="Thêm, chỉnh sửa và quản lý thông tin nhân viên"
      />

      {/* 1. STATS SECTION - TÁCH RIÊNG */}
      <div className="section-separated">
        <div className="stats-grid-custom">
          <div className="stat-card-modern stat-primary">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">👥</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Tổng nhân viên</p>
              <h3 className="stat-number">{stats.total}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-success">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">✅</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Đang hoạt động</p>
              <h3 className="stat-number">{stats.active}</h3>
            </div>
          </div>

          <div className="stat-card-modern stat-danger">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">⏸️</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Ngưng hoạt động</p>
              <h3 className="stat-number">{stats.inactive}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ADD BUTTON SECTION - TÁCH RIÊNG */}
      <div className="section-separated">
        <div className="action-button-section">
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn-add-large"
          >
            <span className="btn-icon">➕</span>
            <span>Thêm nhân viên mới</span>
          </Button>
        </div>
      </div>

      {/* 3. SEARCH SECTION - BÊN PHẢI */}
      <div className="section-separated">
        <div className="search-section-right">
          <div className="search-box-modern">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email hoặc mã nhân viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-modern"
            />
          </div>
        </div>
      </div>

      {/* 4. TABLE SECTION - VỚI DÒNG "DANH SÁCH NHÂN VIÊN" */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Danh sách nhân viên
          </h2>
          <span className="section-count">{filteredStaff.length} nhân viên</span>
        </div>

        <div className="table-modern-wrapper">
          <table className="table-modern">
            <thead>
              <tr>
                <th style={{ width: '12%' }}>Mã NV</th>
                <th style={{ width: '20%' }}>Họ và tên</th>
                <th style={{ width: '18%' }}>Email</th>
                <th style={{ width: '13%' }}>Số điện thoại</th>
                <th style={{ width: '15%' }}>Vai trò</th>
                <th style={{ width: '12%' }}>Trạng thái</th>
                <th style={{ width: '10%' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff) => {
                const badge = getRoleBadge(staff.role);
                return (
                  <tr key={staff.id}>
                    <td>
                      <span className="staff-id-badge">{staff.id}</span>
                    </td>
                    <td>
                      <div className="staff-name-cell">
                        <span className="staff-name">{staff.name}</span>
                        {staff.specialization && (
                          <span className="staff-specialization">{staff.specialization}</span>
                        )}
                      </div>
                    </td>
                    <td className="text-gray-700">{staff.email}</td>
                    <td className="text-gray-700">{staff.phone}</td>
                    <td>
                      <span className={`role-badge-modern ${badge.class}`}>
                        <span className="badge-icon">{badge.icon}</span>
                        <span>{badge.label}</span>
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleStatus(staff.id)}
                        className={`status-toggle-btn ${staff.isActive ? 'status-active-btn' : 'status-inactive-btn'}`}
                      >
                        <span className="status-dot"></span>
                        <span>{staff.isActive ? 'Hoạt động' : 'Ngưng'}</span>
                      </button>
                    </td>
                    <td>
                      <div className="action-buttons-modern">
                        <button
                          onClick={() => handleOpenEdit(staff)}
                          className="btn-icon-action btn-edit-icon"
                          title="Chỉnh sửa"
                        >
                          ✏️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredStaff.length === 0 && (
            <div className="empty-state-modern">
              <div className="empty-icon">🔍</div>
              <p className="empty-text">Không tìm thấy nhân viên nào</p>
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      <AddStaffModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddStaff}
      />

      <EditStaffModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingStaff(null);
        }}
        onSuccess={handleEditStaff}
        staff={editingStaff}
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