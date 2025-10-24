// app/page.js
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="logo-icon text-3xl">🐾</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PAW LOVERS</h1>
              <p className="text-xs text-gray-500">Pet Care Management System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/login" className="btn-outline">
              Đăng nhập
            </Link>
            <Link href="/register" className="btn-primary">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </nav>

      <main className="landing-main">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6">🐾 🐶 🐱 🐰</div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Chào mừng đến với PAW LOVERS
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Hệ thống quản lý dịch vụ chăm sóc thú cưng toàn diện
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="feature-card">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="font-bold text-lg mb-2">Quản lý hồ sơ</h3>
                <p className="text-sm text-gray-600">
                  Lưu trữ đầy đủ thông tin thú cưng, bệnh án và lịch sử tiêm phòng
                </p>
              </div>
              
              <div className="feature-card">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="font-bold text-lg mb-2">Đặt lịch online</h3>
                <p className="text-sm text-gray-600">
                  Đặt lịch khám, spa, cắt tỉa lông dễ dàng 24/7
                </p>
              </div>
              
              <div className="feature-card">
                <div className="text-4xl mb-4">💳</div>
                <h3 className="font-bold text-lg mb-2">Thanh toán tiện lợi</h3>
                <p className="text-sm text-gray-600">
                  Thanh toán online an toàn, xem hóa đơn điện tử
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Link href="/register" className="btn-primary text-lg px-8 py-4">
                Bắt đầu ngay - Miễn phí
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <div className="container mx-auto px-4 py-8 text-center text-gray-500">
          <p>© 2025 PAW LOVERS - Hệ thống quản lý dịch vụ chăm sóc thú cưng</p>
          <p className="text-sm mt-2">Đồ án OOAD - Nhóm 9 - UIT</p>
        </div>
      </footer>
    </div>
  );
}