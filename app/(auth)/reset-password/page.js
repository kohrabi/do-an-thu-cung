// app/(auth)/reset-password/page.js
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

export const metadata = {
  title: "Quên mật khẩu - PAW LOVERS",
  description: "Khôi phục mật khẩu tài khoản",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}