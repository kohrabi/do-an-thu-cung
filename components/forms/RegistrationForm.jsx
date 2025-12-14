// components/forms/RegistrationForm.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PawPrint, User, Mail, Phone, Lock, CheckCircle2, XCircle } from "lucide-react";
import { validateRegister } from "@/lib/utils/validation";
import { AccountController } from "@/lib/controllers/AccountController";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils.js";

/**
 * Boundary Class: RegistrationForm
 * Implements UC-02: Register Account
 * Allows Pet Owner to create a new account
 */
export default function RegistrationForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validate form
    const validationErrors = validateRegister(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit registration
    setLoading(true);
    const response = await AccountController.handleRegistration(form);
    setLoading(false);

    if (response.success) {
      setMessage({ type: 'success', text: response.message });
      setForm({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      setMessage({ type: 'error', text: response.message });
    }
  };

  return (
    <div className="w-full max-w-[440px] bg-card p-10 rounded-2xl shadow-lg border border-border">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10">
            <PawPrint className="h-8 w-8 text-primary animate-bounce" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Đăng ký tài khoản</h2>
        <p className="text-sm text-muted-foreground">Tạo tài khoản để quản lý thú cưng của bạn</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Họ và tên"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Nguyễn Văn A"
          icon={User}
          required
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="email@example.com"
          icon={Mail}
          required
        />

        <Input
          label="Số điện thoại"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="0901234567"
          icon={Phone}
          required
        />

        <Input
          label="Mật khẩu"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
          icon={Lock}
          required
        />

        <Input
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="••••••••"
          icon={Lock}
          required
        />

        <Button 
          type="submit" 
          loading={loading}
          className="w-full"
        >
          Đăng ký
        </Button>

        {message.text && (
          <div className={cn(
            "flex items-center gap-2 p-4 rounded-lg text-sm font-medium",
            message.type === 'success' 
              ? "bg-green-50 text-green-800 border border-green-200" 
              : "bg-destructive/10 text-destructive border border-destructive/20"
          )}>
            {message.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            {message.text}
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground mt-4">
          Đã có tài khoản?{' '}
          <a href="/login" className="text-primary hover:underline font-medium">
            Đăng nhập ngay
          </a>
        </p>
      </form>
    </div>
  );
}
