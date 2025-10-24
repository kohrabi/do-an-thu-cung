// app/layout.js
import "@/styles/globals.css";

export const metadata = {
  title: "PAW LOVERS - Pet Care Management System",
  description: "Hệ thống quản lý dịch vụ chăm sóc thú cưng chuyên nghiệp",
  keywords: "pet care, quản lý thú cưng, veterinarian, spa thú cưng",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        {children}
      </body>
    </html>
  );
}