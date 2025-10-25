// components/modals/AddPetModal.jsx
"use client";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const PET_SPECIES = [
  { icon: "🐕", label: "Chó" },
  { icon: "🐈", label: "Mèo" },
  { icon: "🐰", label: "Thỏ" },
  { icon: "🐹", label: "Chuột Hamster" },
  { icon: "🦜", label: "Chim" },
  { icon: "🐢", label: "Rùa" }
];

export default function AddPetModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    weight: "",
    gender: "",
    color: "",
    notes: ""
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

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Vui lòng nhập tên thú cưng";
    if (!form.species) newErrors.species = "Vui lòng chọn loài";
    if (!form.age || parseInt(form.age) < 0) {
      newErrors.age = "Tuổi phải là số dương";
    }
    if (!form.gender) newErrors.gender = "Vui lòng chọn giới tính";
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
      setForm({
        name: "", species: "", breed: "", age: "",
        weight: "", gender: "", color: "", notes: ""
      });
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">🐾 Thêm thú cưng mới</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <Input
            label="Tên thú cưng"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Ví dụ: Lucky, Miu, Coco..."
            required
          />

          <div className="input-group">
            <label className="input-label">
              Loài <span className="text-red-500">*</span>
            </label>
            <div className="species-grid">
              {PET_SPECIES.map((pet, index) => (
                <label
                  key={index}
                  className={`species-option ${form.species === pet.label ? 'species-selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="species"
                    value={pet.label}
                    checked={form.species === pet.label}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="species-icon">{pet.icon}</span>
                  <span className="species-label">{pet.label}</span>
                </label>
              ))}
            </div>
            {errors.species && <p className="error-message">{errors.species}</p>}
          </div>

          <Input
            label="Giống"
            name="breed"
            value={form.breed}
            onChange={handleChange}
            placeholder="Ví dụ: Golden Retriever, Mèo Anh lông ngắn..."
          />

          <div className="input-row">
            <Input
              label="Tuổi"
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              error={errors.age}
              placeholder="3"
              required
            />

            <Input
              label="Cân nặng (kg)"
              name="weight"
              type="number"
              step="0.1"
              value={form.weight}
              onChange={handleChange}
              placeholder="15.5"
            />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label className="input-label">
                Giới tính <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={`input-field ${errors.gender ? 'input-error' : ''}`}
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="Đực">🐕 Đực</option>
                <option value="Cái">🐈 Cái</option>
              </select>
              {errors.gender && <p className="error-message">{errors.gender}</p>}
            </div>

            <Input
              label="Màu sắc"
              name="color"
              value={form.color}
              onChange={handleChange}
              placeholder="Ví dụ: Vàng, đen, trắng..."
            />
          </div>

          <div className="input-group">
            <label className="input-label">Ghi chú sức khỏe</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="input-field"
              rows="3"
              placeholder="Tình trạng sức khỏe, dị ứng, tiền sử bệnh lý..."
            />
          </div>

          <div className="modal-footer">
            <Button type="button" variant="secondary" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" loading={loading}>
              ✅ Thêm thú cưng
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}