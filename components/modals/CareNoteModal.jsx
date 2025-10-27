"use client";
import { useState, useEffect } from "react";

export default function CareNoteModal({ isOpen, onClose, onSuccess, task }) {
  const [formData, setFormData] = useState({
    noteBefore: "",
    noteAfter: "",
    healthObservation: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task && isOpen) {
      console.log('🐾 MODAL OPENED WITH TASK:', task);
      setFormData({
        noteBefore: task.noteBefore || "",
        noteAfter: task.noteAfter || "",
        healthObservation: task.healthObservation || ""
      });
    }
  }, [task, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.noteBefore.trim()) {
      newErrors.noteBefore = "Vui lòng nhập ghi chú trước dịch vụ";
    }
    if (!formData.noteAfter.trim()) {
      newErrors.noteAfter = "Vui lòng nhập ghi chú sau dịch vụ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({ taskId: task.id, noteData: formData });
      setFormData({ noteBefore: "", noteAfter: "", healthObservation: "" });
      setErrors({});
      onClose();
    }, 1000);
  };

  if (!isOpen || !task) return null;

  // DEBUG
  console.table({
    'Pet Name': task.petName || 'MISSING',
    'Pet Type': task.petType || 'MISSING',
    'Owner Name': task.ownerName || 'MISSING',
    'Service': task.service || 'MISSING'
  });

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem'
    },
    container: {
      backgroundColor: 'white',
      borderRadius: '16px',
      width: '100%',
      maxWidth: '900px',
      maxHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
    },
    header: {
      padding: '1.5rem',
      borderBottom: '1px solid #E5E7EB',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#1F2937',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    closeBtn: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: 'none',
      background: '#F3F4F6',
      fontSize: '1.25rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s'
    },
    body: {
      padding: '1.5rem',
      overflowY: 'auto',
      flex: 1
    },
    petCard: {
      padding: '1.5rem',
      background: 'linear-gradient(135deg, #FFF5F7 0%, #FFE4E9 100%)',
      borderRadius: '12px',
      marginBottom: '1.5rem',
      border: '2px solid #FFD4DC'
    },
    petHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
      marginBottom: '1.25rem',
      flexWrap: 'wrap'
    },
    petAvatar: {
      fontSize: '4rem',
      width: '80px',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',
      borderRadius: '50%',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      flexShrink: 0
    },
    petInfo: {
      flex: 1,
      minWidth: '200px'
    },
    petName: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#1F2937',
      margin: '0 0 0.375rem 0'
    },
    petBreed: {
      fontSize: '0.9375rem',
      color: '#6B7280',
      margin: 0
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '1rem',
      padding: '1rem',
      background: 'white',
      borderRadius: '10px'
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    infoIcon: {
      fontSize: '1.75rem',
      flexShrink: 0
    },
    infoContent: {
      minWidth: 0,
      flex: 1
    },
    infoLabel: {
      fontSize: '0.75rem',
      color: '#9CA3AF',
      textTransform: 'uppercase',
      fontWeight: 600,
      margin: '0 0 0.25rem 0',
      letterSpacing: '0.05em'
    },
    infoValue: {
      fontSize: '0.9375rem',
      color: '#1F2937',
      fontWeight: 600,
      margin: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#374151',
      marginBottom: '0.5rem'
    },
    required: {
      color: '#EF4444',
      marginLeft: '0.25rem'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '8px',
      fontSize: '0.9375rem',
      fontFamily: 'inherit',
      resize: 'vertical',
      outline: 'none',
      transition: 'all 0.2s',
      boxSizing: 'border-box'
    },
    hint: {
      fontSize: '0.8125rem',
      color: '#6B7280',
      fontStyle: 'italic',
      marginTop: '0.5rem',
      marginBottom: 0,
      lineHeight: 1.5
    },
    error: {
      color: '#EF4444',
      fontSize: '0.8125rem',
      marginTop: '0.25rem',
      marginBottom: 0
    },
    footer: {
      padding: '1.5rem',
      borderTop: '1px solid #E5E7EB',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.75rem',
      flexWrap: 'wrap'
    },
    btnSecondary: {
      padding: '0.75rem 1.5rem',
      border: '2px solid #E5E7EB',
      borderRadius: '8px',
      background: 'white',
      color: '#374151',
      fontSize: '0.9375rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    btnPrimary: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      background: 'linear-gradient(135deg, #FF6B9D 0%, #FF8FB3 100%)',
      color: 'white',
      fontSize: '0.9375rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    btnDisabled: {
      background: '#D1D5DB',
      cursor: 'not-allowed'
    }
  };

  const getTextareaStyle = (fieldName) => ({
    ...modalStyles.textarea,
    border: `2px solid ${errors[fieldName] ? '#EF4444' : '#E5E7EB'}`
  });

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.container} onClick={(e) => e.stopPropagation()}>
        
        <div style={modalStyles.header}>
          <h2 style={modalStyles.title}>
            <span>📝</span>
            Ghi chú chăm sóc
          </h2>
          <button
            onClick={onClose}
            style={modalStyles.closeBtn}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#EF4444';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#F3F4F6';
              e.currentTarget.style.color = 'inherit';
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          
          <div style={modalStyles.body}>
            
            {/* Pet Info Card - VỚI FALLBACK */}
            <div style={modalStyles.petCard}>
              <div style={modalStyles.petHeader}>
                <span style={modalStyles.petAvatar}>
                  {task.petIcon || '🐾'}
                </span>
                <div style={modalStyles.petInfo}>
                  <h3 style={modalStyles.petName}>
                    {task.petName || 'Tên thú cưng không có'}
                  </h3>
                  <p style={modalStyles.petBreed}>
                    {task.petType || 'Loại: Chưa có thông tin'}
                  </p>
                </div>
              </div>

              <div style={modalStyles.infoGrid}>
                <div style={modalStyles.infoItem}>
                  <span style={modalStyles.infoIcon}>{task.serviceIcon || '🛁'}</span>
                  <div style={modalStyles.infoContent}>
                    <p style={modalStyles.infoLabel}>DỊCH VỤ</p>
                    <p style={modalStyles.infoValue}>
                      {task.service || 'Không có dịch vụ'}
                    </p>
                  </div>
                </div>

                <div style={modalStyles.infoItem}>
                  <span style={modalStyles.infoIcon}>🕐</span>
                  <div style={modalStyles.infoContent}>
                    <p style={modalStyles.infoLabel}>GIỜ</p>
                    <p style={modalStyles.infoValue}>{task.time || '--:--'}</p>
                  </div>
                </div>

                <div style={modalStyles.infoItem}>
                  <span style={modalStyles.infoIcon}>👤</span>
                  <div style={modalStyles.infoContent}>
                    <p style={modalStyles.infoLabel}>CHỦ NUÔI</p>
                    <p style={modalStyles.infoValue}>
                      {task.ownerName || 'Chưa có tên chủ'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form fields... (giữ nguyên) */}
            <div style={modalStyles.formGroup}>
              <label style={modalStyles.label}>
                📋 Ghi chú trước dịch vụ
                <span style={modalStyles.required}>*</span>
              </label>
              <textarea
                name="noteBefore"
                value={formData.noteBefore}
                onChange={handleChange}
                placeholder="Tình trạng ban đầu của thú cưng..."
                rows="4"
                style={getTextareaStyle('noteBefore')}
                onFocus={(e) => {
                  if (!errors.noteBefore) {
                    e.target.style.borderColor = '#FF6B9D';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 157, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.noteBefore ? '#EF4444' : '#E5E7EB';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.noteBefore && <p style={modalStyles.error}>{errors.noteBefore}</p>}
              <p style={modalStyles.hint}>
                💡 Ghi nhận tình trạng sức khỏe trước khi bắt đầu dịch vụ
              </p>
            </div>

            <div style={modalStyles.formGroup}>
              <label style={modalStyles.label}>
                ✅ Ghi chú sau dịch vụ
                <span style={modalStyles.required}>*</span>
              </label>
              <textarea
                name="noteAfter"
                value={formData.noteAfter}
                onChange={handleChange}
                placeholder="Quá trình thực hiện, phản ứng..."
                rows="4"
                style={getTextareaStyle('noteAfter')}
                onFocus={(e) => {
                  if (!errors.noteAfter) {
                    e.target.style.borderColor = '#FF6B9D';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 157, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.noteAfter ? '#EF4444' : '#E5E7EB';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.noteAfter && <p style={modalStyles.error}>{errors.noteAfter}</p>}
              <p style={modalStyles.hint}>
                💡 Mô tả chi tiết quá trình chăm sóc
              </p>
            </div>

            <div style={modalStyles.formGroup}>
              <label style={modalStyles.label}>
                ❤️ Quan sát sức khỏe
              </label>
              <textarea
                name="healthObservation"
                value={formData.healthObservation}
                onChange={handleChange}
                placeholder="Nhiệt độ, nhịp thở..."
                rows="4"
                style={getTextareaStyle('healthObservation')}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FF6B9D';
                  e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 157, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <p style={modalStyles.hint}>
                💡 Ghi chú về sức khỏe tổng quát
              </p>
            </div>

          </div>

          <div style={modalStyles.footer}>
            <button
              type="button"
              onClick={onClose}
              style={modalStyles.btnSecondary}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...modalStyles.btnPrimary,
                ...(loading ? modalStyles.btnDisabled : {})
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid white',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.6s linear infinite'
                  }}></span>
                  Đang lưu...
                </>
              ) : (
                <>
                  <span>💾</span>
                  Lưu ghi chú
                </>
              )}
            </button>
          </div>
        </form>

        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}