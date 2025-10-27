"use client";
import { useState } from "react";

export default function CareNoteModal({ isOpen, onClose, onSuccess, task }) {
  const [noteBefore, setNoteBefore] = useState("");
  const [noteAfter, setNoteAfter] = useState("");
  const [health, setHealth] = useState("");
  const [errors, setErrors] = useState({});

  if (!isOpen || !task) return null;

  // ===== DEBUG LOG - QUAN TRỌNG =====
  console.log('========================================');
  console.log('🔍 MODAL RECEIVED TASK:', task);
  console.log('📛 Pet Name:', task.petName);
  console.log('🐾 Pet Type:', task.petType);
  console.log('👤 Owner Name:', task.ownerName);
  console.log('🛁 Service:', task.service);
  console.log('🕐 Time:', task.time);
  console.log('📦 ALL KEYS:', Object.keys(task));
  console.log('📦 FULL OBJECT:', JSON.stringify(task, null, 2));
  console.log('========================================');
  // ===================================

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!noteBefore.trim()) {
      newErrors.noteBefore = "Vui lòng nhập ghi chú trước dịch vụ";
    }
    if (!noteAfter.trim()) {
      newErrors.noteAfter = "Vui lòng nhập ghi chú sau dịch vụ";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (onSuccess) {
      onSuccess({
        taskId: task.id,
        noteData: { noteBefore, noteAfter, healthObservation: health }
      });
    }
    
    setNoteBefore("");
    setNoteAfter("");
    setHealth("");
    setErrors({});
    onClose();
  };

  // Lấy giá trị với nhiều fallback
  const petName = task.petName || task.name || task.pet?.name || 'TÊN KHÔNG CÓ';
  const petType = task.petType || task.type || task.breed || task.pet?.type || 'LOẠI KHÔNG CÓ';
  const ownerName = task.ownerName || task.owner || task.customer || task.customerName || 'CHỦ KHÔNG CÓ';

  console.log('🎨 DISPLAY VALUES:');
  console.log('   Pet Name:', petName);
  console.log('   Pet Type:', petType);
  console.log('   Owner Name:', ownerName);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'white',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '800px',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>
            📝 Ghi chú chăm sóc
          </h2>
          <button 
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              background: '#f3f4f6',
              fontSize: '20px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Pet Info Card */}
        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #FFF5F7 0%, #FFE4E9 100%)',
          margin: '20px',
          borderRadius: '12px',
          border: '2px solid #FFD4DC'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px', 
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '50px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              flexShrink: 0
            }}>
              {task.petIcon || task.icon || '🐾'}
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h3 style={{ 
                margin: '0 0 8px 0', 
                fontSize: '24px', 
                fontWeight: 700,
                color: '#1F2937'
              }}>
                {petName}
              </h3>
              <p style={{ 
                margin: 0, 
                color: '#6B7280', 
                fontSize: '16px' 
              }}>
                {petType}
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '15px',
            background: 'white',
            padding: '15px',
            borderRadius: '10px'
          }}>
            <div>
              <p style={{ 
                margin: '0 0 5px 0', 
                fontSize: '11px', 
                color: '#9CA3AF', 
                textTransform: 'uppercase', 
                fontWeight: 600,
                letterSpacing: '0.05em'
              }}>
                DỊCH VỤ
              </p>
              <p style={{ 
                margin: 0, 
                fontSize: '15px', 
                fontWeight: 600,
                color: '#1F2937'
              }}>
                {task.serviceIcon || '🛁'} {task.service || task.serviceName || 'Không có'}
              </p>
            </div>
            <div>
              <p style={{ 
                margin: '0 0 5px 0', 
                fontSize: '11px', 
                color: '#9CA3AF', 
                textTransform: 'uppercase', 
                fontWeight: 600,
                letterSpacing: '0.05em'
              }}>
                GIỜ
              </p>
              <p style={{ 
                margin: 0, 
                fontSize: '15px', 
                fontWeight: 600,
                color: '#1F2937'
              }}>
                🕐 {task.time || task.startTime || 'Không có'}
              </p>
            </div>
            <div>
              <p style={{ 
                margin: '0 0 5px 0', 
                fontSize: '11px', 
                color: '#9CA3AF', 
                textTransform: 'uppercase', 
                fontWeight: 600,
                letterSpacing: '0.05em'
              }}>
                CHỦ NUÔI
              </p>
              <p style={{ 
                margin: 0, 
                fontSize: '15px', 
                fontWeight: 600,
                color: '#1F2937',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                👤 {ownerName}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 600,
              fontSize: '14px',
              color: '#374151'
            }}>
              📋 Ghi chú trước dịch vụ <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <textarea
              value={noteBefore}
              onChange={(e) => {
                setNoteBefore(e.target.value);
                if (errors.noteBefore) {
                  setErrors(prev => ({ ...prev, noteBefore: "" }));
                }
              }}
              placeholder="Tình trạng ban đầu của thú cưng..."
              rows="4"
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${errors.noteBefore ? '#EF4444' : '#e5e7eb'}`,
                borderRadius: '8px',
                fontSize: '15px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
            {errors.noteBefore && (
              <p style={{ color: '#EF4444', fontSize: '13px', margin: '5px 0 0 0' }}>
                {errors.noteBefore}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 600,
              fontSize: '14px',
              color: '#374151'
            }}>
              ✅ Ghi chú sau dịch vụ <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <textarea
              value={noteAfter}
              onChange={(e) => {
                setNoteAfter(e.target.value);
                if (errors.noteAfter) {
                  setErrors(prev => ({ ...prev, noteAfter: "" }));
                }
              }}
              placeholder="Quá trình thực hiện..."
              rows="4"
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${errors.noteAfter ? '#EF4444' : '#e5e7eb'}`,
                borderRadius: '8px',
                fontSize: '15px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
            {errors.noteAfter && (
              <p style={{ color: '#EF4444', fontSize: '13px', margin: '5px 0 0 0' }}>
                {errors.noteAfter}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 600,
              fontSize: '14px',
              color: '#374151'
            }}>
              ❤️ Quan sát sức khỏe
            </label>
            <textarea
              value={health}
              onChange={(e) => setHealth(e.target.value)}
              placeholder="Nhiệt độ, nhịp thở..."
              rows="4"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '15px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                background: 'white',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Hủy
            </button>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #FF6B9D 0%, #FF8FB3 100%)',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              💾 Lưu ghi chú
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}