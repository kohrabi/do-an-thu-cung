// components/forms/ResetPasswordForm.jsx
"use client";
import { useState } from "react";
import { validateResetPassword } from "@/lib/utils/validation";
import { AccountController } from "@/lib/controllers/AccountController";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

/**
 * Boundary Class: ResetPasswordForm
 * Implements UC-06: Reset Password
 * Allows users to request password reset via email
 */
export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validate email
    const validationErrors = validateResetPassword({ email });
    if (validationErrors.email) {
      setError(validationErrors.email);
      return;
    }

    // Submit reset request
    setLoading(true);
    const response = await AccountController.handlePasswordReset({ email });
    setLoading(false);

    if (response.success) {
      setMessage({ type: 'success', text: response.message });
      setEmail("");
      setError("");
    } else {
      setMessage({ type: 'error', text: response.message });
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="form-icon">🔐</div>
        <h2 className="form-title">Quên mật khẩu</h2>
        <p className="form-subtitle">
          Nhập email của bạn, chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email đã đăng ký"
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          error={error}
          placeholder="email@example.com"
          required
        />

        <Button 
          type="submit" 
          loading={loading}
          className="w-full"
        >
          Gửi yêu cầu khôi phục
        </Button>

        {message.text && (
          <div className={`message ${message.type === 'success' ? 'message-success' : 'message-error'}`}>
            {message.text}
          </div>
        )}

        <div className="text-center space-y-2 mt-6">
          <a href="/login" className="text-sm text-blue-600 hover:underline font-medium block">
            ← Quay lại đăng nhập
          </a>
          <p className="text-xs text-gray-500">
            Nếu bạn không nhận được email, vui lòng kiểm tra thư mục spam hoặc liên hệ{' '}
            <a href="mailto:support@pawlovers.com" className="text-blue-800 hover:underline">
              support@pawlovers.com
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}