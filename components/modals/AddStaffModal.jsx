// components/modals/AddStaffModal.jsx
"use client";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const ROLES = [
  { value: "veterinarian", label: "Bác sĩ thú y 👨‍⚕️" },
  { value: "care_staff", label: "Nhân viên chăm sóc 🧑‍🔧" },
  { value: "receptionist", label: "Nhân viên lễ tân 💼" }
];

export default function AddStaffModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const generatePassword = () => {
    const password = Math.random().toString(36).slice(-8) + "A1!";
    setForm(prev => ({ ...prev, password }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ tên";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!/^0[0-9]{9,10}$/.test(form.phone)) {
      newErrors.phone = "Số điện thoại phải có 10-11 chữ số";
    }
    if (!form.role) newErrors.role = "Vui lòng chọn vai trò";
    if (!form.password || form.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      onSuccess(form);
      setForm({ fullName: "", email: "", phone: "", role: "", password: "" });
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">👥 Thêm nhân viên mới</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
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
            placeholder="nhanvien@pawlovers.com"
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

          <div className="input-group">
            <label className="input-label">
              Vai trò <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className={`input-field ${errors.role ? 'input-error' : ''}`}
              required
            >
              <option value="">Chọn vai trò</option>
              {ROLES.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            {errors.role && <p className="error-message">{errors.role}</p>}
          </div>

          <div className="input-group">
            <label className="input-label">
              Mật khẩu tạm <span className="text-red-500">*</span>
            </label>
            <div className="input-with-button">
              <input
                type="text"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`input-field ${errors.password ? 'input-error' : ''}`}
                placeholder="Nhập hoặc tự động tạo"
                required
              />
              <button
                type="button"
                onClick={generatePassword}
                className="btn-generate"
                title="Tạo mật khẩu ngẫu nhiên"
              >
                🎲
              </button>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
            <p className="text-xs text-gray-500 mt-1">
              💡 Nhân viên nên đổi mật khẩu sau lần đăng nhập đầu tiên
            </p>
          </div>

          <div className="modal-footer">
            <Button type="button" variant="secondary" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" loading={loading}>
              ✅ Thêm nhân viên
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}