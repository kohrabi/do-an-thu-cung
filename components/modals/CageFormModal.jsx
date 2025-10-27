// components/modals/CageFormModal.jsx
"use client";
import { useState, useEffect } from "react";

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
    <div className="modal-overlay-beautiful" onClick={onClose}>
      <div className="modal-container-beautiful" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-beautiful">
          <div className="modal-header-content">
            <span className="modal-icon-beautiful">{cage ? '✏️' : '➕'}</span>
            <h2 className="modal-title-beautiful">
              {cage ? 'Chỉnh sửa chuồng' : 'Thêm chuồng mới'}
            </h2>
          </div>
          <button onClick={onClose} className="modal-close-beautiful">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body-beautiful">
          {/* Mã chuồng */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">🔢</span>
              Mã chuồng
              <span className="required-star">*</span>
            </label>
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="Ví dụ: A01, B12, C03..."
              disabled={!!cage}
              className={`form-input-beautiful ${errors.code ? 'input-error-beautiful' : ''} ${cage ? 'input-disabled' : ''}`}
            />
            {errors.code && <span className="error-text-beautiful">{errors.code}</span>}
            {cage && (
              <span className="hint-text-beautiful">
                💡 Không thể thay đổi mã chuồng sau khi tạo
              </span>
            )}
          </div>

          {/* Loại chuồng */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">🏠</span>
              Loại chuồng
              <span className="required-star">*</span>
            </label>
            <div className="room-type-cards">
              {CAGE_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleTypeSelect(type.value)}
                  className={`room-type-card ${form.type === type.value ? 'room-type-card-active' : ''}`}
                >
                  <div className="room-type-header">
                    <span className="room-type-label">{type.icon} {type.label}</span>
                    {form.type === type.value && (
                      <span className="room-type-check">✓</span>
                    )}
                  </div>
                  <p className="room-type-subtitle">Sức chứa: {type.capacity} thú cưng</p>
                  <p className="room-type-desc">{type.description}</p>
                </button>
              ))}
            </div>
            {errors.type && <span className="error-text-beautiful">{errors.type}</span>}
          </div>

          {/* Trạng thái (chỉ khi edit) */}
          {cage && (
            <div className="form-group-beautiful">
              <label className="form-label-beautiful">
                <span className="label-icon-beautiful">🔄</span>
                Trạng thái
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="form-select-beautiful"
              >
                <option value="available">🟢 Trống</option>
                <option value="occupied">🟡 Đang sử dụng</option>
                <option value="maintenance">🔴 Bảo trì</option>
              </select>
            </div>
          )}

          {/* Ghi chú */}
          <div className="form-group-beautiful">
            <label className="form-label-beautiful">
              <span className="label-icon-beautiful">📝</span>
              Ghi chú
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Ghi chú về chuồng (vị trí, đặc điểm...)"
              rows="3"
              className="form-textarea-beautiful"
            />
          </div>

          {/* Buttons */}
          <div className="modal-footer-beautiful">
            <button
              type="button"
              onClick={onClose}
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
                  <span>{cage ? 'Đang cập nhật...' : 'Đang thêm...'}</span>
                </>
              ) : (
                <>
                  <span className="btn-icon-beautiful">{cage ? '💾' : '✓'}</span>
                  <span>{cage ? 'Cập nhật' : 'Thêm chuồng'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}