// components/modals/ServiceNoteModal.jsx
"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function ServiceNoteModal({ isOpen, onClose, onSuccess, task }) {
  const [form, setForm] = useState({
    preServiceNotes: "",
    postServiceNotes: "",
    healthObservations: "",
    recommendations: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.preServiceNotes && !form.postServiceNotes) {
      newErrors.general = "Vui lòng nhập ít nhất một loại ghi chú";
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
      onSuccess({ taskId: task?.id, ...form });
      setForm({ preServiceNotes: "", postServiceNotes: "", healthObservations: "", recommendations: "" });
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">📝 Ghi chú chăm sóc</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* Task Info */}
          {task && (
            <div className="note-task-info">
              <div className="task-info-header">
                <span className="task-info-icon">🐾</span>
                <div>
                  <h4 className="task-info-title">{task.pet}</h4>
                  <p className="task-info-subtitle">{task.service} • {task.time}</p>
                </div>
              </div>
            </div>
          )}

          {errors.general && (
            <div className="error-banner">
              ⚠️ {errors.general}
            </div>
          )}

          {/* Pre-Service Notes */}
          <div className="input-group">
            <label className="input-label">
              <span className="label-icon">📋</span>
              Ghi chú trước dịch vụ
            </label>
            <textarea
              name="preServiceNotes"
              value={form.preServiceNotes}
              onChange={handleChange}
              className="input-field note-textarea"
              rows="4"
              placeholder="Tình trạng ban đầu của thú cưng, điều kiện khi tiếp nhận..."
            />
            <p className="input-hint">
              💡 Ghi nhận tình trạng sức khỏe, hành vi, và mọi điều bất thường trước khi bắt đầu dịch vụ
            </p>
          </div>

          {/* Post-Service Notes */}
          <div className="input-group">
            <label className="input-label">
              <span className="label-icon">✅</span>
              Ghi chú sau dịch vụ
            </label>
            <textarea
              name="postServiceNotes"
              value={form.postServiceNotes}
              onChange={handleChange}
              className="input-field note-textarea"
              rows="4"
              placeholder="Quá trình thực hiện, phản ứng của thú cưng, kết quả..."
            />
            <p className="input-hint">
              💡 Mô tả chi tiết quá trình chăm sóc và phản ứng của thú cưng
            </p>
          </div>

          {/* Health Observations */}
          <div className="input-group">
            <label className="input-label">
              <span className="label-icon">❤️</span>
              Quan sát sức khỏe
            </label>
            <textarea
              name="healthObservations"
              value={form.healthObservations}
              onChange={handleChange}
              className="input-field note-textarea"
              rows="3"
              placeholder="Nhiệt độ, nhịp thở, tình trạng da lông, dấu hiệu bất thường..."
            />
          </div>

          {/* Recommendations */}
          <div className="input-group">
            <label className="input-label">
              <span className="label-icon">💡</span>
              Khuyến nghị cho chủ nuôi
            </label>
            <textarea
              name="recommendations"
              value={form.recommendations}
              onChange={handleChange}
              className="input-field note-textarea"
              rows="3"
              placeholder="Lời khuyên về chế độ dinh dưỡng, chăm sóc tiếp theo, lịch tái khám..."
            />
          </div>

          {/* Character Count */}
          <div className="note-stats">
            <span className="stat-badge">
              📊 Tổng ký tự: {Object.values(form).join('').length}
            </span>
          </div>

          <div className="modal-footer">
            <Button type="button" variant="secondary" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" loading={loading}>
              💾 Lưu ghi chú
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}