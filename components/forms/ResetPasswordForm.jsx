// components/forms/ResetPasswordForm.jsx
"use client";
import { useState } from "react";
import { KeyRound, Mail, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { validateResetPassword } from "@/lib/utils/validation";
import { AccountController } from "@/lib/controllers/AccountController";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils.js";

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
    <div className="w-full max-w-[440px] bg-card p-10 rounded-2xl shadow-lg border border-border">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10">
            <KeyRound className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Quên mật khẩu</h2>
        <p className="text-sm text-muted-foreground">
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
          icon={Mail}
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

        <div className="text-center space-y-2 mt-6">
          <a 
            href="/login" 
            className="flex items-center justify-center gap-2 text-sm text-primary hover:underline font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại đăng nhập
          </a>
          <p className="text-xs text-muted-foreground">
            Nếu bạn không nhận được email, vui lòng kiểm tra thư mục spam hoặc liên hệ{' '}
            <a href="mailto:support@pawlovers.com" className="text-primary hover:underline">
              support@pawlovers.com
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
