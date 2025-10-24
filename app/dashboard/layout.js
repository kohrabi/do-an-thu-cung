// app/(dashboard)/layout.js
"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AccountController } from "@/lib/controllers/AccountController";
import Sidebar from "@/components/layout/Sidebar";
import "@/styles/dashboard.css";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const currentUser = AccountController.getCurrentUser();
    
    if (!currentUser) {
      router.push("/login");
      return;
    }

    // Get role from URL
    const pathSegments = pathname.split('/');
    const urlRole = pathSegments[2]; // /dashboard/[role]/...
    const userRole = currentUser.account.role;

    console.log('🔍 Debug - URL role:', urlRole, '| User role:', userRole, '| Full path:', pathname);

    // ✅ FIX: Nếu chỉ vào /dashboard (không có role), redirect đến dashboard đúng
    if (!urlRole || pathname === '/dashboard') {
      const correctPath = currentUser.redirectTo;
      console.log('⚠️ No role in URL, redirecting to:', correctPath);
      router.push(correctPath);
      return;
    }

    // Check if user is accessing correct dashboard
    const roleMap = {
      'manager': 'manager',
      'vet': 'veterinarian',
      'care-staff': 'care_staff',
      'receptionist': 'receptionist',
      'owner': 'pet_owner'
    };

    // ✅ FIX: Nếu role không khớp, redirect về dashboard đúng
    if (roleMap[urlRole] !== userRole) {
      const correctPath = currentUser.redirectTo;
      console.log('⚠️ Wrong dashboard access, redirecting to:', correctPath);
      router.push(correctPath);
      return;
    }

    console.log('✅ Correct dashboard, loading user');
    setUser(currentUser);
    setLoading(false);
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <div className="paw-loader">🐾</div>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar 
        role={user.account.role} 
        userInfo={{
          name: user.account.email.split('@')[0],
          email: user.account.email
        }}
      />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}