// app/(dashboard)/manager/staff/page.js
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Button from "@/components/ui/Button";
import AddStaffModal from "@/components/modals/AddStaffModal";
import StaffTable from "@/components/tables/StaffTable";

export default function ManagerStaffPage() {
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    // Check if should open modal
    if (searchParams.get('action') === 'add') {
      setIsModalOpen(true);
    }

    // Mock data
    setStaffList([
      {
        id: "EMP001",
        name: "Nguyễn Văn A",
        email: "vet@pawlovers.com",
        phone: "0901234567",
        role: "veterinarian",
        isActive: true
      },
      {
        id: "EMP002",
        name: "Trần Thị B",
        email: "staff@pawlovers.com",
        phone: "0909876543",
        role: "care_staff",
        isActive: true
      },
      {
        id: "EMP003",
        name: "Lê Văn C",
        email: "reception@pawlovers.com",
        phone: "0912345678",
        role: "receptionist",
        isActive: true
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
      isActive: true
    };
    setStaffList([...staffList, staff]);
    showToast("✅ Đã thêm nhân viên thành công!");
  };

  const handleEditStaff = (staff) => {
    console.log("Edit staff:", staff);
    showToast("✏️ Chức năng chỉnh sửa đang phát triển");
  };

  const handleDeleteStaff = (staffId) => {
    if (confirm("Bạn có chắc muốn vô hiệu hóa nhân viên này?")) {
      setStaffList(staffList.map(s =>
        s.id === staffId ? { ...s, isActive: false } : s
      ));
      showToast("🗑️ Đã vô hiệu hóa nhân viên");
    }
  };

 return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Quản lý nhân viên"
        subtitle="Thêm, chỉnh sửa và quản lý thông tin nhân viên"
      />

      {/* Action Bar */}
      <div className="action-bar">
        <div className="stats-summary">
         <div className="stat-item">
            <span className="stat-label">Tổng nhân viên:</span>
            <span className="stat-value">{staffList.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Đang hoạt động:</span>
            <span className="stat-value text-green-600">
              {staffList.filter(s => s.isActive).length}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Ngưng hoạt động:</span>
            <span className="stat-value text-red-600">
              {staffList.filter(s => !s.isActive).length}
            </span>
          </div>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
          ➕ Thêm nhân viên
        </Button>
      </div>

      {/* Staff Table */}
      <StaffTable
        staffList={staffList}
        onEdit={handleEditStaff}
        onDelete={handleDeleteStaff}
      />

      {/* Add Staff Modal */}
      <AddStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAddStaff}
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