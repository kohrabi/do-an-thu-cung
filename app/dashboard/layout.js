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
    const role = pathname.split('/')[2]; // /dashboard/[role]/...
    const userRole = currentUser.account.role;

    // Check if user is accessing correct dashboard
    const roleMap = {
      'manager': 'manager',
      'vet': 'veterinarian',
      'care-staff': 'care_staff',
      'receptionist': 'receptionist',
      'owner': 'pet_owner'
    };

    if (roleMap[role] !== userRole) {
      // Redirect to correct dashboard
      router.push(currentUser.redirectTo);
      return;
    }

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