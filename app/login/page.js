"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AccountController } from "@/lib/controllers/AccountController";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await AccountController.handleLogin(formData);

      if (response.success) {
        // Lấy role và redirect đến dashboard tương ứng
        const role = response.data.account.role;
        const roleRoutes = {
          'manager': '/dashboard/manager',
          'veterinarian': '/dashboard/vet',
          'care_staff': '/dashboard/care-staff',
          'receptionist': '/dashboard/receptionist',
          'pet_owner': '/dashboard/owner'
        };

        const redirectPath = roleRoutes[role] || '/dashboard/owner';
        
        // Lưu redirectTo vào localStorage
        const userData = {
          ...response.data,
          redirectTo: redirectPath
        };
        localStorage.setItem('auth_token', JSON.stringify(userData));
        
        // Redirect
        router.push(redirectPath);
      } else {
        setError(response.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại!");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🐾</div>
          <h1 className="text-3xl font-bold text-gray-800">PAW LOVERS</h1>
          <p className="text-gray-600 mt-2">Pet Care System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Tài khoản test:</p>
          <p>manager@test.com / vet@test.com / owner@test.com</p>
        </div>
      </div>
    </div>
  );
}