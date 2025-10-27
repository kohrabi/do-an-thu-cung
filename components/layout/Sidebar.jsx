"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AccountController } from "@/lib/controllers/AccountController";

const menuItems = {
  manager: [
    { icon: "🏠", label: "Tổng quan", path: "/dashboard/manager" },
    { icon: "👥", label: "Nhân viên", path: "/dashboard/manager/staff" },
    { icon: "✨", label: "Dịch vụ", path: "/dashboard/manager/services" },
    { icon: "📅", label: "Lịch đặt", path: "/dashboard/manager/appointments" },
    { icon: "🏠", label: "Chuồng nuôi", path: "/dashboard/manager/cages" },
    { icon: "💰", label: "Hóa đơn", path: "/dashboard/manager/invoices" },
    { icon: "📊", label: "Báo cáo", path: "/dashboard/manager/reports" }
  ],
  veterinarian: [
    { icon: "🏠", label: "Tổng quan", path: "/dashboard/vet" },
    { icon: "📅", label: "Lịch làm việc", path: "/dashboard/vet/schedule" },
    { icon: "📋", label: "Công việc hôm nay", path: "/dashboard/vet/today" },
    { icon: "🐾", label: "Bệnh nhân", path: "/dashboard/vet/patients" }
  ],
  care_staff: [
    { icon: "🏠", label: "Tổng quan", path: "/dashboard/care-staff" },
    { icon: "📅", label: "Lịch làm việc", path: "/dashboard/care-staff/schedule" },
    { icon: "📋", label: "Công việc hôm nay", path: "/dashboard/care-staff/today" }
  ],
  receptionist: [
    { icon: "🏠", label: "Tổng quan", path: "/dashboard/receptionist" },
    { icon: "📅", label: "Đặt lịch", path: "/dashboard/receptionist/appointments" },
    { icon: "💳", label: "Thanh toán", path: "/dashboard/receptionist/payments" }
  ],
  pet_owner: [
    { icon: "🏠", label: "Tổng quan", path: "/dashboard/owner" },
    { icon: "🐾", label: "Thú cưng của tôi", path: "/dashboard/owner/pets" },
    { icon: "📅", label: "Lịch đặt", path: "/dashboard/owner/appointments" }
  ]
};

function getRoleLabel(role) {
  const labels = {
    manager: 'Quản lý',
    veterinarian: 'Bác sĩ',
    care_staff: 'Nhân viên',
    receptionist: 'Lễ tân',
    pet_owner: 'Chủ nuôi'
  };
  return labels[role] || 'User';
}

export default function Sidebar({ role, userInfo }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const menuList = menuItems[role] || menuItems.pet_owner;

  const handleLogout = () => {
    AccountController.handleLogout();
    router.push("/login");
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-icon">🐾</span>
          {!isCollapsed && (
            <div className="logo-text">
              <h2>PAW LOVERS</h2>
              <p>Pet Care System</p>
            </div>
          )}
        </div>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="collapse-btn">
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">
          {userInfo?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        {!isCollapsed && (
          <div className="user-info">
            <p className="user-name">{userInfo?.name || 'User'}</p>
            <p className="user-role">{getRoleLabel(role)}</p>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {menuList.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={index}
              href={item.path}
              className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {!isCollapsed && <span className="nav-label">{item.label}</span>}
              {isActive && <span className="nav-indicator" />}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <span className="nav-icon">🚪</span>
          {!isCollapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
}