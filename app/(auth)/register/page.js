// app/(auth)/register/page.js
import RegistrationForm from "@/components/forms/RegistrationForm";

export const metadata = {
  title: "Đăng ký - PAW LOVERS",
  description: "Tạo tài khoản mới để quản lý thú cưng của bạn",
};

export default function RegisterPage() {
  return <RegistrationForm />;
}