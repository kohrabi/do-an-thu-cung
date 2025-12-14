// app/(dashboard)/owner/pets/[id]/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";

export default function PetDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    // Mock data - thực tế sẽ fetch từ API
    const mockPets = {
      "PET001": {
        id: "PET001",
        name: "Lucky",
        icon: "🐕",
        type: "Chó",
        breed: "Golden Retriever",
        age: "2 tuổi",
        gender: "Đực",
        weight: "28 kg",
        color: "Vàng",
        dateOfBirth: "2023-03-15",
        medicalHistory: "Đã tiêm phòng đầy đủ: Dại, Parvo, Distemper",
        notes: "Rất thân thiện, thích chơi đùa. Ăn 2 lần/ngày.",
        vaccinations: [
          { name: "Vaccine dại", date: "2024-03-15", nextDue: "2025-03-15" },
          { name: "Vaccine Parvo", date: "2024-04-20", nextDue: "2025-04-20" }
        ],
        appointments: [
          { date: "2025-10-20", service: "Khám sức khỏe", status: "Hoàn thành" },
          { date: "2025-11-05", service: "Tắm spa", status: "Sắp tới" }
        ]
      },
      "PET002": {
        id: "PET002",
        name: "Miu",
        icon: "🐈",
        type: "Mèo",
        breed: "Mèo Ba Tư",
        age: "1 tuổi",
        gender: "Cái",
        weight: "4 kg",
        color: "Trắng",
        dateOfBirth: "2024-01-20",
        medicalHistory: "Tiêm phòng cơ bản đầy đủ",
        notes: "Ngoan, ít kêu. Ăn thức ăn hạt cho mèo.",
        vaccinations: [
          { name: "Vaccine 3 trong 1", date: "2024-05-10", nextDue: "2025-05-10" }
        ],
        appointments: [
          { date: "2025-10-25", service: "Tiêm phòng", status: "Hoàn thành" }
        ]
      },
      "PET003": {
        id: "PET003",
        name: "Coco",
        icon: "🐩",
        type: "Chó",
        breed: "Poodle",
        age: "3 tuổi",
        gender: "Cái",
        weight: "6 kg",
        color: "Nâu",
        dateOfBirth: "2022-07-10",
        medicalHistory: "Đã triệt sản, tiêm phòng đầy đủ",
        notes: "Thích được chải lông. Rất năng động.",
        vaccinations: [
          { name: "Vaccine dại", date: "2024-07-10", nextDue: "2025-07-10" }
        ],
        appointments: [
          { date: "2025-10-15", service: "Cắt tỉa lông", status: "Hoàn thành" },
          { date: "2025-11-10", service: "Tắm spa", status: "Sắp tới" }
        ]
      }
    };

    setPet(mockPets[params.id] || null);
  }, [params.id]);

  if (!pet) {
    return (
      <div className="dashboard-container">
        <DashboardHeader title="Chi tiết thú cưng" />
        <div className="empty-state-modern">
          <div className="empty-icon">🐾</div>
          <p className="empty-text">Không tìm thấy thú cưng</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Chi tiết thú cưng"
        subtitle="Thông tin đầy đủ về thú cưng của bạn"
      />

      {/* Back Button */}
      <div className="section-separated">
        <button
          onClick={() => router.back()}
          className="btn-back"
        >
          <span>←</span>
          <span>Quay lại</span>
        </button>
      </div>

      {/* Pet Profile Card */}
      <div className="section-separated">
        <div className="pet-detail-profile">
          <div className="pet-profile-header">
            <div className="pet-avatar-section">
              <span className="pet-avatar-huge">{pet.icon}</span>
            </div>
            <div className="pet-profile-info">
              <h1 className="pet-profile-name">{pet.name}</h1>
              <p className="pet-profile-breed">{pet.breed}</p>
              <div className="pet-profile-tags">
                <span className="profile-tag tag-type">{pet.type}</span>
                <span className="profile-tag tag-gender">{pet.gender}</span>
                <span className="profile-tag tag-age">{pet.age}</span>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="pet-detail-section">
            <h3 className="detail-section-title">
              <span className="title-icon">📊</span>
              Thông tin cơ bản
            </h3>
            <div className="detail-info-grid">
              <div className="detail-info-card">
                <span className="detail-icon">⚖️</span>
                <div>
                  <p className="detail-label">Cân nặng</p>
                  <p className="detail-value">{pet.weight}</p>
                </div>
              </div>
              <div className="detail-info-card">
                <span className="detail-icon">🎨</span>
                <div>
                  <p className="detail-label">Màu lông</p>
                  <p className="detail-value">{pet.color}</p>
                </div>
              </div>
              <div className="detail-info-card">
                <span className="detail-icon">🎂</span>
                <div>
                  <p className="detail-label">Ngày sinh</p>
                  <p className="detail-value">{pet.dateOfBirth}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div className="pet-detail-section">
            <h3 className="detail-section-title">
              <span className="title-icon">🏥</span>
              Lịch sử y tế
            </h3>
            <div className="medical-history-box">
              <p className="medical-text">{pet.medicalHistory}</p>
            </div>
          </div>

          {/* Vaccinations */}
          <div className="pet-detail-section">
            <h3 className="detail-section-title">
              <span className="title-icon">💉</span>
              Lịch sử tiêm phòng
            </h3>
            <div className="vaccinations-list">
              {pet.vaccinations.map((vac, index) => (
                <div key={index} className="vaccination-item">
                  <div className="vaccination-info">
                    <p className="vaccination-name">{vac.name}</p>
                    <p className="vaccination-date">Đã tiêm: {vac.date}</p>
                  </div>
                  <div className="vaccination-next">
                    <p className="next-label">Tiêm tiếp:</p>
                    <p className="next-date">{vac.nextDue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Appointments History */}
          <div className="pet-detail-section">
            <h3 className="detail-section-title">
              <span className="title-icon">📅</span>
              Lịch sử dịch vụ
            </h3>
            <div className="appointments-history-list">
              {pet.appointments.map((apt, index) => (
                <div key={index} className="appointment-history-item">
                  <div className="appointment-date-badge">
                    <span>{apt.date}</span>
                  </div>
                  <div className="appointment-info">
                    <p className="appointment-service">{apt.service}</p>
                    <p className={`appointment-status status-${apt.status === 'Hoàn thành' ? 'completed' : 'upcoming'}`}>
                      {apt.status === 'Hoàn thành' ? '✓' : '⏳'} {apt.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="pet-detail-section">
            <h3 className="detail-section-title">
              <span className="title-icon">📝</span>
              Ghi chú
            </h3>
            <div className="notes-box">
              <p className="notes-content">{pet.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}