// components/modals/CageFormModal.jsx
"use client";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const CAGE_TYPES = [
  { value: "small", label: "Nhỏ", icon: "🏠", capacity: 1, description: "Dành cho mèo hoặc chó nhỏ" },
  { value: "medium", label: "Trung", icon: "🏡", capacity: 2, description: "Dành cho chó cỡ trung" },
  { value: "large", label: "Lớn", icon: "🏘️", capacity: 3, description: "Dành cho chó lớn hoặc nhiều thú cưng" }
];

export default function CageFormModal({ isOpen, onClose, onSuccess, cage = null }) {
  const [form, setForm] = useState({
    code: "",
    type: "",
    capacity: 1,
    notes: "",
    status: "available"
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cage) {
      setForm({
        code: cage.code || "",
        type: cage.type || "",
        capacity: cage.capacity || 1,
        notes: cage.notes || "",
        status: cage.status || "available"
      });
    } else {
      setForm({
        code: "",
        type: "",
        capacity: 1,
        notes: "",
        status: "available"
      });
    }
  }, [cage, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleTypeSelect = (type) => {
    const selectedType = CAGE_TYPES.find(t => t.value === type);
    setForm(prev => ({
      ...prev,
      type: type,
      capacity: selectedType.capacity
    }));
    if (errors.type) {
      setErrors(prev => ({ ...prev, type: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.code.trim()) newErrors.code = "Vui lòng nhập mã chuồng";
    if (!/^[A-Z0-9]{2,6}$/.test(form.code.toUpperCase())) {
      newErrors.code = "Mã chuồng phải là 2-6 ký tự chữ và số (ví dụ: A01, B12)";
    }
    if (!form.type) newErrors.type = "Vui lòng chọn loại chuồng";
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
      onSuccess({ ...form, code: form.code.toUpperCase() });
      setForm({ code: "", type: "", capacity: 1, notes: "", status: "available" });
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {cage ? '✏️ Chỉnh sửa chuồng' : '➕ Thêm chuồng mới'}
          </h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <Input
            label="Mã chuồng"
            name="code"
            value={form.code}
            onChange={handleChange}
            error={errors.code}
            placeholder="Ví dụ: A01, B12, C03..."
            required
            disabled={!!cage}
          />

          {cage && (
            <p className="input-hint">
              ℹ️ Không thể thay đổi mã chuồng sau khi tạo
            </p>
          )}

          {/* Cage Type Selection */}
          <div className="input-group">
            <label className="input-label">
              Loại chuồng <span className="text-red-500">*</span>
            </label>
            <div className="cage-type-grid">
              {CAGE_TYPES.map(type => (
                <label
                  key={type.value}
                  className={`cage-type-option ${form.type === type.value ? 'cage-type-selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={type.value}
                    checked={form.type === type.value}
                    onChange={() => handleTypeSelect(type.value)}
                    className="hidden"
                  />
                  <span className="cage-type-icon">{type.icon}</span>
                  <div className="cage-type-info">
                    <p className="cage-type-label">{type.label}</p>
                    <p className="cage-type-capacity">Sức chứa: {type.capacity} thú cưng</p>
                    <p className="cage-type-description">{type.description}</p>
                  </div>
                  {form.type === type.value && <span className="cage-check">✓</span>}
                </label>
              ))}
            </div>
            {errors.type && <p className="error-message">{errors.type}</p>}
          </div>

          {/* Status */}
          {cage && (
            <div className="input-group">
              <label className="input-label">Trạng thái</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="input-field"
              >
                <option value="available">🟢 Trống</option>
                <option value="occupied">🟡 Đang sử dụng</option>
                <option value="maintenance">🔴 Bảo trì</option>
              </select>
            </div>
          )}

          {/* Notes */}
          <div className="input-group">
            <label className="input-label">Ghi chú</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="input-field"
              rows="3"
              placeholder="Ghi chú về chuồng (vị trí, đặc điểm...)"
            />
          </div>

          <div className="modal-footer">
            <Button type="button" variant="secondary" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" loading={loading}>
              {cage ? '💾 Cập nhật' : '✅ Thêm chuồng'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}