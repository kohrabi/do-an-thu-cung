// components/modals/EditServiceModal.jsx
"use client";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const SERVICE_CATEGORIES = [
  { icon: "🏥", label: "🏥 Khám bệnh & điều trị" },
  { icon: "💉", label: "💉 Tiêm phòng & xét nghiệm" },
  { icon: "🛁", label: "🛁 Tắm & vệ sinh" },
  { icon: "✂️", label: "✂️ Cắt tỉa & tạo kiểu" },
  { icon: "💆", label: "💆 Spa & massage" },
  { icon: "🏠", label: "🏠 Lưu trú & chăm sóc" }
];

export default function EditServiceModal({ isOpen, onClose, onSuccess, service }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    duration: "",
    description: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setForm({
        name: service.name || "",
        category: service.category || "",
        price: service.price?.toString() || "",
        duration: service.duration?.toString() || "",
        description: service.description || ""
      });
    }
  }, [service, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Vui lòng nhập tên dịch vụ";
    if (!form.category) newErrors.category = "Vui lòng chọn loại dịch vụ";
    if (!form.price || parseFloat(form.price) <= 0) {
      newErrors.price = "Giá phải lớn hơn 0";
    }
    if (!form.duration || parseInt(form.duration) <= 0) {
      newErrors.duration = "Thời lượng phải lớn hơn 0";
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
    setTimeout(() => {
      setLoading(false);
      onSuccess({ ...form, id: service.id });
      onClose();
    }, 800);
  };

  if (!isOpen || !service) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">✏️ Chỉnh sửa dịch vụ</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <Input
            label="Tên dịch vụ"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Ví dụ: Tắm spa cao cấp"
            required
          />

          <div className="input-group">
            <label className="input-label">
              Loại dịch vụ <span className="text-red-500">*</span>
            </label>
            <div className="category-grid">
              {SERVICE_CATEGORIES.map((cat, index) => (
                <label
                  key={index}
                  className={`category-option ${form.category === cat.label ? 'category-selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat.label}
                    checked={form.category === cat.label}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="category-icon">{cat.icon}</span>
                  <span className="category-label">{cat.label}</span>
                </label>
              ))}
            </div>
            {errors.category && <p className="error-message">{errors.category}</p>}
          </div>

          <div className="input-row">
            <Input
              label="Giá dịch vụ (VNĐ)"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              error={errors.price}
              placeholder="100000"
              required
            />

            <Input
              label="Thời lượng (phút)"
              name="duration"
              type="number"
              value={form.duration}
              onChange={handleChange}
              error={errors.duration}
              placeholder="60"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Mô tả dịch vụ</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="input-field"
              rows="4"
              placeholder="Mô tả chi tiết về dịch vụ, quy trình thực hiện..."
            />
          </div>

          <div className="modal-footer">
            <Button type="button" variant="secondary" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" loading={loading}>
              💾 Cập nhật
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}