// components/tables/StaffTable.jsx
"use client";
import { useState } from "react";

export default function StaffTable({ staffList, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const filteredStaff = staffList.filter(staff => {
    const matchSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === "all" || staff.role === filterRole;
    return matchSearch && matchRole;
  });

  const getRoleBadge = (role) => {
    const badges = {
      veterinarian: { label: "Bác sĩ", class: "badge-vet", icon: "👨‍⚕️" },
      care_staff: { label: "Nhân viên", class: "badge-staff", icon: "🧑‍🔧" },
      receptionist: { label: "Lễ tân", class: "badge-reception", icon: "💼" }
    };
    return badges[role] || badges.care_staff;
  };

  return (
    <div className="table-container">
      {/* Filter Bar */}
      <div className="table-header">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm nhân viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="filter-select"
        >
          <option value="all">Tất cả vai trò</option>
          <option value="veterinarian">👨‍⚕️ Bác sĩ</option>
          <option value="care_staff">🧑‍🔧 Nhân viên chăm sóc</option>
          <option value="receptionist">💼 Lễ tân</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Mã NV</th>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff) => {
              const badge = getRoleBadge(staff.role);
              return (
                <tr key={staff.id}>
                  <td className="font-mono text-sm">{staff.id}</td>
                  <td className="font-semibold">{staff.name}</td>
                  <td className="text-gray-600">{staff.email}</td>
                  <td className="text-gray-600">{staff.phone}</td>
                  <td>
                    <span className={`role-badge ${badge.class}`}>
                      {badge.icon} {badge.label}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${staff.isActive ? 'status-active' : 'status-inactive'}`}>
                      {staff.isActive ? '✓ Hoạt động' : '⊗ Ngưng'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => onEdit(staff)}
                        className="btn-action btn-edit"
                        title="Chỉnh sửa"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => onDelete(staff.id)}
                        className="btn-action btn-delete"
                        title="Vô hiệu hóa"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredStaff.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p className="empty-text">Không tìm thấy nhân viên nào</p>
          </div>
        )}
      </div>
    </div>
  );
}