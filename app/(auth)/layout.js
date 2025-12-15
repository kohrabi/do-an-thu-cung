// app/(auth)/layout.js
import "@/styles/globals.css";
import Link from "next/link";

export const metadata = {
  title: "PAW LOVERS - Pet Care Management",
  description: "Hệ thống quản lý dịch vụ chăm sóc thú cưng",
};

export default function AuthLayout({ children }) {
  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-auto">
      {/* Header */}
      <header className="flex-shrink-0">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-2xl">🐾</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PAW LOVERS</h1>
              <p className="text-xs text-gray-500">Pet Care Management System</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          {children}
        </div>
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