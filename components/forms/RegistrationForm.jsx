// components/forms/RegistrationForm.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateRegister } from "@/lib/utils/validation";
import { AccountController } from "@/lib/controllers/AccountController";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

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
    <div className="form-container">
      <div className="form-header">
        <div className="form-icon">🐾</div>
        <h2 className="form-title">Đăng ký tài khoản</h2>
        <p className="form-subtitle">Tạo tài khoản để quản lý thú cưng của bạn</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Họ và tên"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Nguyễn Văn A"
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
          required
        />

        <Input
          label="Số điện thoại"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="0901234567"
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
          <div className={`message ${message.type === 'success' ? 'message-success' : 'message-error'}`}>
            {message.text}
          </div>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          Đã có tài khoản?{' '}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Đăng nhập ngay
          </a>
        </p>
      </form>
    </div>
  );
}