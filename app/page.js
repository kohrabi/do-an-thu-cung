"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const features = [
    {
      icon: "📋",
      title: "Quản lý hồ sơ",
      description: "Lưu trữ đầy đủ thông tin thú cưng, bệnh án và lịch sử tiêm phòng",
      gradient: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)"
    },
    {
      icon: "🏥",
      title: "Đặt lịch online",
      description: "Đặt lịch khám, spa, cắt tỉa lông dễ dàng 24/7",
      gradient: "linear-gradient(135deg, #F093FB 0%, #F5576C 100%)"
    },
    {
      icon: "💳",
      title: "Thanh toán tiện lợi",
      description: "Thanh toán online an toàn, xem hóa đơn điện tử",
      gradient: "linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)"
    }
  ];

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
          min-height: 100vh;
        }

        .landing-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .header {
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          font-size: 40px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .logo-text h1 {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }

        .logo-text p {
          font-size: 12px;
          color: #6B7280;
          margin: 0;
        }

        .auth-buttons {
          display: flex;
          gap: 12px;
        }

        .btn-auth {
          padding: 12px 28px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }

        .btn-login {
          background: white;
          color: #667EEA;
          border: 2px solid #667EEA;
        }

        .btn-login:hover {
          background: #667EEA;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-register {
          background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
          color: white;
        }

        .btn-register:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        /* Hero Section */
        .hero-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
        }

        .hero-icons {
          font-size: 64px;
          margin-bottom: 24px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .hero-title {
          font-size: 48px;
          font-weight: 800;
          color: #1F2937;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 20px;
          color: #1c155fff;
          margin-bottom: 48px;
          max-width: 600px;
          font-weight: bold;
        }

        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          max-width: 1200px;
          width: 100%;
          margin-bottom: 48px;
        }

        .feature-card {
          background: white;
          border-radius: 20px;
          padding: 32px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.4s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: var(--gradient);
          transition: height 0.4s;
        }

        .feature-card:hover::before {
          height: 100%;
          opacity: 0.1;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .feature-icon {
          font-size: 56px;
          margin-bottom: 20px;
          display: inline-block;
          animation: rotate 4s linear infinite;
        }

        @keyframes rotate {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }

        .feature-title {
          font-size: 24px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 12px;
        }

        .feature-description {
          font-size: 15px;
          color: #6B7280;
          line-height: 1.6;
        }

        /* CTA Button */
        .cta-button {
          padding: 18px 48px;
          background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          transition: all 0.3s;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .cta-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
          animation: none;
        }

        /* Footer */
        .footer {
          padding: 32px 20px;
          text-align: center;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(0, 0, 0, 0.05);
        }

        .footer-text {
          color: #6B7280;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .footer-credit {
          color: #9CA3AF;
          font-size: 12px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .header {
            padding: 16px 20px;
            flex-direction: column;
            gap: 16px;
          }

          .hero-title {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .btn-auth {
            padding: 10px 20px;
            font-size: 14px;
          }
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-card {
          animation: fadeInUp 0.6s ease-out;
          animation-fill-mode: both;
        }

        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
      `}</style>

      <div className="landing-container">
        {/* Header */}
        <header className="header">
          <div className="logo-section">
            <span className="logo-icon">🐾</span>
            <div className="logo-text">
              <h1>PAW LOVERS</h1>
              <p>Pet Care Management System</p>
            </div>
          </div>
          <div className="auth-buttons">
            <button 
              className="btn-auth btn-login"
              onClick={() => router.push('/login')}
            >
              Đăng nhập
            </button>
            <button 
              className="btn-auth btn-register"
              onClick={() => router.push('/register')}
            >
              Đăng ký ngay
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <main className="hero-section">
          <div className="hero-icons">🐕 🐈 🐩</div>
          <h1 className="hero-title">
            Chào mừng đến với PAW LOVERS
          </h1>
          <p className="hero-subtitle">
            Hệ thống quản lý dịch vụ và chăm sóc thú cưng toàn diện
          </p>

          {/* Features Grid */}
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                style={{ '--gradient': feature.gradient }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button 
            className="cta-button"
            onClick={() => router.push('/register')}
          >
            ✨ Bắt đầu ngay - Miễn phí
          </button>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">
            © 2025 PAW LOVERS - Hệ thống quản lý dịch vụ chăm sóc thú cưng
          </p>
          <p className="footer-credit">
            Đồ án OOAD - Nhóm 9 - UIT
          </p>
        </footer>
      </div>
    </>
  );
}