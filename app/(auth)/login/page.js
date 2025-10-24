// app/(auth)/login/page.js
import LoginForm from "@/components/forms/LoginForm";

export const metadata = {
  title: "Đăng nhập - PAW LOVERS",
  description: "Đăng nhập vào hệ thống quản lý chăm sóc thú cưng",
};

export default function LoginPage() {
  return <LoginForm />;
}