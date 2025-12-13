"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateLogin } from "@/lib/utils/validation";
import { AccountController } from "@/lib/controllers/AccountController";
import { getMockAccounts } from "@/lib/api/auth";
import { RoleLabels } from "@/lib/utils/constants";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showAccounts, setShowAccounts] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const validationErrors = validateLogin(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const response = await AccountController.handleLogin(form);
    setLoading(false);

    if (response.success) {
      setMessage({ type: "success", text: response.message });
      setTimeout(() => {
        router.push(response.data.redirectTo);
      }, 1000);
    } else {
      setMessage({ type: "error", text: response.message });
    }
  };

  const handleQuickLogin = (account) => {
    setForm({ email: account.email, password: account.password });
    setShowAccounts(false);
  };

  return (
    <div className="form-container">
      {/* HEADER - KHÔNG CÓ ICON */}
      <div className="form-header">
        <h2 className="form-title">Đăng nhập</h2>
        <p className="form-subtitle">Chào mừng quay trở lại PAW LOVERS</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          label="Mật khẩu"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-gray-600">Ghi nhớ đăng nhập</span>
          </label>
          <a
            href="/reset-password"
            className="text-blue-600 hover:underline font-medium"
          >
            Quên mật khẩu?
          </a>
        </div>

        <Button type="submit" loading={loading} className="w-full">
          Đăng nhập
        </Button>

        {message.text && (
          <div
            className={`message ${
              message.type === "success" ? "message-success" : "message-error"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Demo accounts */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setShowAccounts(!showAccounts)}
            className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            {showAccounts ? "🔼 Ẩn tài khoản demo" : "🔽 Xem tài khoản demo"}
          </button>

          {showAccounts && (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-gray-500 mb-3">Click để điền nhanh:</p>
              {getMockAccounts().map((account, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleQuickLogin(account)}
                  className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                >
                  <div className="font-medium text-gray-900">
                    {RoleLabels[account.role]}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {account.email}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Chưa có tài khoản?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Đăng ký ngay
          </a>
        </p>
      </form>
    </div>
  );
}
