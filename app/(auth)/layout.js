// app/(auth)/layout.js
import "@/styles/globals.css";
import Link from "next/link";

export const metadata = {
  title: "PAW LOVERS - Pet Care Management",
  description: "Hệ thống quản lý dịch vụ chăm sóc thú cưng",
};

export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      {/* Background decoration */}
      <div className="auth-background">
        <div className="auth-bg-shape shape-1"></div>
        <div className="auth-bg-shape shape-2"></div>
        <div className="auth-bg-shape shape-3"></div>
      </div>

      {/* Header */}
      <header className="auth-header">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="logo-icon">🐾</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PAW LOVERS</h1>
              <p className="text-xs text-gray-500">Pet Care Management System</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="auth-main">
        {children}
      </main>

      {/* Footer */}
      <footer className="auth-footer">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-gray-500">
            © 2025 PAW LOVERS. Hệ thống quản lý dịch vụ chăm sóc thú cưng.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Đồ án OOAD - Nhóm 9 - UIT
          </p>
        </div>
      </footer>
    </div>
  );
}