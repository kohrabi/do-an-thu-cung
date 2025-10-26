// components/modals/EditStaffModal.jsx
"use client";
import { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const ROLES = [
  { value: "veterinarian", label: "Bác sĩ thú y 👨‍⚕️" },
  { value: "care_staff", label: "Nhân viên chăm sóc 🧑‍🔧" },
  { value: "receptionist", label: "Nhân viên lễ tân 💼" }
];

export default function EditStaffModal({ isOpen, onClose, onSuccess, staff }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    specialization: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (staff) {
      setForm({
        fullName: staff.name || "",
        email: staff.email || "",
        phone: staff.phone || "",
        role: staff.role || "",
        specialization: staff.specialization || ""
      });
    }
  }, [staff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
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
    setTimeout(() => {
      setLoading(false);
      onSuccess(form);
      onClose();
    }, 1000);
  };

  if (!isOpen || !staff) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">✏️ Chỉnh sửa nhân viên</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="staff-id-display">
            <span className="id-label">Mã nhân viên:</span>
            <span className="id-value">{staff.id}</span>
          </div>

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
            placeholder="email@pawlovers.com"
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

          <Input
            label="Chuyên môn"
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            placeholder="Ví dụ: Bác sĩ thú y tổng quát, Grooming chuyên sâu..."
          />

          <div className="modal-footer">
            <Button type="button" variant="secondary" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" loading={loading}>
              💾 Lưu thay đổi
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}