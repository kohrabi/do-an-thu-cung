"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Users,
  Sparkles,
  Calendar,
  DollarSign,
  BarChart3,
  Bell,
  LogOut,
  ClipboardList,
  FileText,
  CreditCard,
  ShoppingBag,
  PawPrint,
  Box,
} from "lucide-react";
import { AccountController } from "@/lib/controllers/AccountController";
import { cn } from "@/lib/utils.js";

// Icon mapping function
const getIcon = (iconName, label) => {
  // Special case: "Chuồng nuôi" uses Box icon instead of Home
  if (label === "Chuồng nuôi") {
    return Box;
  }

  const iconMap = {
    "🏠": Home,
    "👥": Users,
    "✨": Sparkles,
    "📅": Calendar,
    "💰": DollarSign,
    "📊": BarChart3,
    "🔔": Bell,
    "🚪": LogOut,
    "📋": ClipboardList,
    "📄": FileText,
    "💳": CreditCard,
    "🛍️": ShoppingBag,
    "🐾": PawPrint,
  };
  return iconMap[iconName] || Home;
};

const menuItems = {
  manager: [
    { icon: "🏠", label: "Tổng quan", path: "/dashboard/manager" },
    { icon: "👥", label: "Nhân viên", path: "/dashboard/manager/staff" },
    { icon: "✨", label: "Dịch vụ", path: "/dashboard/manager/services" },
    { icon: "📅", label: "Lịch đặt", path: "/dashboard/manager/appointments" },
    { icon: "🏠", label: "Chuồng nuôi", path: "/dashboard/manager/cages" },
    { icon: "💰", label: "Hóa đơn", path: "/dashboard/manager/invoices" },
    { icon: "📊", label: "Báo cáo", path: "/dashboard/manager/reports" },
  ],
  veterinarian: [
    { icon: "🏠", label: "Tổng quan", path: "/dashboard/vet" },
    { icon: "📅", label: "Lịch làm việc", path: "/dashboard/vet/schedule" },
    { icon: "👥", label: "Hồ sơ bệnh án", path: "/dashboard/vet/records" },
    { icon: "📋", label: "Công việc hôm nay", path: "/dashboard/vet/today" },
    { icon: "🐾", label: "Bệnh nhân", path: "/dashboard/vet/patients" },
  ],
  care_staff: [
    { icon: "🏠", label: "Tổng quan", path: "/dashboard/care-staff" },
    {
      icon: "📅",
      label: "Lịch làm việc",
      path: "/dashboard/care-staff/schedule",
    },
    {
      icon: "📋",
      label: "Công việc hôm nay",
      path: "/dashboard/care-staff/today",
    },
  ],
  receptionist: [
    { icon: "🏠", label: "Tổng quan", path: "/dashboard/receptionist" },
    {
      icon: "📅",
      label: "Đặt lịch",
      path: "/dashboard/receptionist/appointments",
    },
    { icon: "📄", label: "Phiếu hẹn", path: "/dashboard/receptionist/slips" },
    {
      icon: "🔔",
      label: "Nhắc lịch",
      path: "/dashboard/receptionist/reminders",
    },
    {
      icon: "💳",
      label: "Thanh toán",
      path: "/dashboard/receptionist/payments",
    },
    {
      icon: "👥",
      label: "Khách hàng",
      path: "/dashboard/receptionist/customers",
    },
  ],
  pet_owner: [
    { icon: "🏠", label: "Tổng quan", path: "/dashboard/owner" },
    { icon: "🐾", label: "Thú cưng của tôi", path: "/dashboard/owner/pets" },
    { icon: "📅", label: "Lịch đặt", path: "/dashboard/owner/appointments" },
    { icon: "💳", label: "Thanh Toán", path: "/dashboard/owner/payments" },
    { icon: "🛍️", label: "Xem dịch vụ", path: "/dashboard/owner/services" },
  ],
};

function getRoleLabel(role) {
  const labels = {
    manager: "Quản lý",
    veterinarian: "Bác sĩ",
    care_staff: "Nhân viên",
    receptionist: "Lễ tân",
    pet_owner: "Chủ nuôi",
  };
  return labels[role] || "User";
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
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-[1000] flex flex-col transition-all duration-300",
        "bg-gradient-to-b from-[#FF6B9D] to-[#C239B3] text-white shadow-lg"
      )}
      style={{ width: isCollapsed ? "80px" : "280px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10">
            <PawPrint className="h-6 w-6" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                PAW LOVERS
              </h2>
              <p className="text-xs opacity-90">Pet Care System</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <span className="text-white">→</span>
          ) : (
            <span className="text-white">←</span>
          )}
        </button>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 p-4 border-b border-white/10">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 font-bold text-lg shrink-0">
          {userInfo?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        {!isCollapsed && (
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm truncate">
              {userInfo?.name || "User"}
            </p>
            <p className="text-xs opacity-80 truncate">{getRoleLabel(role)}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        {menuList.map((item, index) => {
          const isActive = pathname === item.path;
          const IconComponent = getIcon(item.icon, item.label);

          return (
            <Link
              key={index}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all",
                "hover:bg-white/10 active:bg-white/20",
                isActive && "bg-white/20 shadow-md"
              )}
            >
              <IconComponent
                className={cn("h-5 w-5 shrink-0", isActive && "text-white")}
              />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {isActive && !isCollapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer - Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-3 rounded-lg",
            "hover:bg-white/10 active:bg-white/20 transition-colors",
            "text-left"
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && (
            <span className="font-medium text-sm">Đăng xuất</span>
          )}
        </button>
      </div>
    </aside>
  );
}
