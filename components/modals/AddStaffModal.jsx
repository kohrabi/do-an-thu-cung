// components/modals/AddStaffModal.jsx
"use client";
import { useState } from "react";

export default function AddStaffModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải có 10 chữ số";
    }

    if (!formData.role) {
      newErrors.role = "Vui lòng chọn vai trò";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu tạm";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onSuccess(formData);
      onClose();
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        role: "",
        password: ""
      });
      setErrors({});
      setShowPassword(false);
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      role: "",
      password: ""
    });
    setErrors({});
    setShowPassword(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-beautiful" onClick={handleClose}>
      <div className="modal-container-beautiful" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-beautiful">
          <div className="modal-header-content">
            <span className="modal-icon-beautiful">👥</span>
            <h2 className="modal-title-beautiful">Thêm nhân viên mới</h2>
          </div>
          <button onClick={handleClose} className="modal-close-beautiful">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body-beautiful">
          {/* Họ và tên */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">👤</span>
              Họ và tên
              <span className="required-star">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              className={`form-input-beautiful ${errors.fullName ? 'input-error-beautiful' : ''}`}
            />
            {errors.fullName && <span className="error-text-beautiful">{errors.fullName}</span>}
          </div>

          {/* Email */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">📧</span>
              Email
              <span className="required-star">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nhanvien@pawlovers.com"
              className={`form-input-beautiful ${errors.email ? 'input-error-beautiful' : ''}`}
            />
            {errors.email && <span className="error-text-beautiful">{errors.email}</span>}
          </div>

          {/* Số điện thoại */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">📱</span>
              Số điện thoại
              <span className="required-star">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0901234567"
              maxLength="10"
              className={`form-input-beautiful ${errors.phone ? 'input-error-beautiful' : ''}`}
            />
            {errors.phone && <span className="error-text-beautiful">{errors.phone}</span>}
          </div>

          {/* Vai trò */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">💼</span>
              Vai trò
              <span className="required-star">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`form-select-beautiful ${errors.role ? 'input-error-beautiful' : ''}`}
            >
              <option value="">Chọn vai trò</option>
              <option value="veterinarian">👨‍⚕️ Bác sĩ thú y</option>
              <option value="care_staff">🧑‍🔧 Nhân viên chăm sóc</option>
              <option value="receptionist">👩‍💼 Lễ tân</option>
            </select>
            {errors.role && <span className="error-text-beautiful">{errors.role}</span>}
          </div>

          {/* Mật khẩu tạm */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">🔑</span>
              Mật khẩu tạm
              <span className="required-star">*</span>
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập hoặc tự động tạo"
                className={`form-input-beautiful ${errors.password ? 'input-error-beautiful' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password && <span className="error-text-beautiful">{errors.password}</span>}
            <span className="hint-text-beautiful">
              💡 Nhân viên nên đổi mật khẩu sau lần đăng nhập đầu tiên
            </span>
          </div>

          {/* Buttons */}
          <div className="modal-footer-beautiful">
            <button
              type="button"
              onClick={handleClose}
              className="btn-beautiful btn-cancel-beautiful"
            >
              <span className="btn-icon-beautiful">✕</span>
              <span>Hủy</span>
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-beautiful btn-primary-beautiful"
            >
              {loading ? (
                <>
                  <span className="spinner-beautiful"></span>
                  <span>Đang thêm...</span>
                </>
              ) : (
                <>
                  <span className="btn-icon-beautiful">✓</span>
                  <span>Thêm nhân viên</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}