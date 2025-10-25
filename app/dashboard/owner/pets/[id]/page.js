// app/(dashboard)/owner/pets/[id]/page.js
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Button from "@/components/ui/Button";

export default function PetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPetDetail();
  }, [params.id]);

  const loadPetDetail = () => {
    // Mock data
    const mockPets = {
      "PET001": {
        id: "PET001",
        name: "Lucky",
        species: "Chó",
        icon: "🐕",
        breed: "Golden Retriever",
        age: 3,
        birthDate: "2022-03-15",
        weight: 25,
        gender: "Đực",
        color: "Vàng",
        healthStatus: "Khỏe mạnh",
        notes: "Hoạt bát, thân thiện với trẻ em",
        vaccinations: [
          { name: "Vaccine 7 bệnh", date: "2023-01-15", nextDate: "2026-01-15", vet: "BS. Nguyễn Văn A" },
          { name: "Vaccine dại", date: "2024-06-20", nextDate: "2025-06-20", vet: "BS. Nguyễn Văn A" }
        ],
        serviceHistory: [
          { date: "2025-10-15", service: "Khám sức khỏe", icon: "🏥", result: "Bình thường", vet: "BS. Nguyễn Văn A" },
          { date: "2025-09-10", service: "Tắm spa", icon: "🛁", result: "Hoàn thành tốt", staff: "NV. Trần Thị B" },
          { date: "2025-08-05", service: "Cắt tỉa lông", icon: "✂️", result: "Đã hoàn thành", staff: "NV. Lê Văn C" }
        ],
        medicalNotes: [
          { date: "2025-10-15", note: "Sức khỏe tốt, không có vấn đề gì", vet: "BS. Nguyễn Văn A" },
          { date: "2024-12-20", note: "Đã điều trị viêm tai nhẹ, đã khỏi", vet: "BS. Nguyễn Văn A" }
        ]
      },
      "PET002": {
        id: "PET002",
        name: "Miu",
        species: "Mèo",
        icon: "🐈",
        breed: "Mèo Anh lông ngắn",
        age: 2,
        birthDate: "2023-05-10",
        weight: 4.5,
        gender: "Cái",
        color: "Xám",
        healthStatus: "Khỏe mạnh",
        notes: "Ngoan ngoãn, ăn nhiều",
        vaccinations: [
          { name: "Vaccine 3 bệnh", date: "2023-06-15", nextDate: "2026-06-15", vet: "BS. Nguyễn Văn A" }
        ],
        serviceHistory: [
          { date: "2025-10-20", service: "Tắm spa", icon: "🛁", result: "Hoàn thành", staff: "NV. Trần Thị B" }
        ],
        medicalNotes: []
      }
    };

    const petData = mockPets[params.id];
    if (petData) {
      setPet(petData);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <div className="paw-loader">🐾</div>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="dashboard-container">
        <div className="empty-state">
          <div className="empty-icon">😢</div>
          <p className="empty-text">Không tìm thấy thú cưng</p>
          <Button onClick={() => router.push('/dashboard/owner/pets')}>
            ← Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title={`Chi tiết thú cưng: ${pet.name}`}
        subtitle="Xem đầy đủ thông tin và lịch sử chăm sóc"
      />

      {/* Action Buttons */}
      <div className="action-bar">
        <Button variant="secondary" onClick={() => router.push('/dashboard/owner/pets')}>
          ← Quay lại
        </Button>
        <Button onClick={() => router.push(`/dashboard/owner/pets/${pet.id}/edit`)}>
          ✏️ Chỉnh sửa
        </Button>
      </div>

      {/* Pet Profile Card */}
      <div className="pet-profile-card">
        <div className="pet-profile-header">
          <div className="pet-profile-avatar">{pet.icon}</div>
          <div className="pet-profile-info">
            <h2 className="pet-profile-name">{pet.name}</h2>
            <p className="pet-profile-breed">{pet.breed}</p>
            <div className="pet-profile-badges">
              <span className="profile-badge">
                🏷️ {pet.id}
              </span>
              <span className={`health-badge ${pet.healthStatus === 'Khỏe mạnh' ? 'health-good' : 'health-warning'}`}>
                ❤️ {pet.healthStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="pet-profile-grid">
          <div className="profile-item">
            <span className="profile-icon">🐾</span>
            <div>
              <p className="profile-label">Loài</p>
              <p className="profile-value">{pet.species}</p>
            </div>
          </div>

          <div className="profile-item">
            <span className="profile-icon">🎂</span>
            <div>
              <p className="profile-label">Tuổi</p>
              <p className="profile-value">{pet.age} tuổi</p>
            </div>
          </div>

          <div className="profile-item">
            <span className="profile-icon">📅</span>
            <div>
              <p className="profile-label">Ngày sinh</p>
              <p className="profile-value">{pet.birthDate}</p>
            </div>
          </div>

          <div className="profile-item">
            <span className="profile-icon">⚖️</span>
            <div>
              <p className="profile-label">Cân nặng</p>
              <p className="profile-value">{pet.weight} kg</p>
            </div>
          </div>

          <div className="profile-item">
            <span className="profile-icon">🚻</span>
            <div>
              <p className="profile-label">Giới tính</p>
              <p className="profile-value">{pet.gender}</p>
            </div>
          </div>

          <div className="profile-item">
            <span className="profile-icon">🎨</span>
            <div>
              <p className="profile-label">Màu sắc</p>
              <p className="profile-value">{pet.color}</p>
            </div>
          </div>
        </div>

        {pet.notes && (
          <div className="profile-notes">
            <h4 className="notes-title">📝 Ghi chú</h4>
            <p className="notes-content">{pet.notes}</p>
          </div>
        )}
      </div>

      {/* Vaccination History */}
      <div className="section-card">
        <h3 className="section-title">💉 Lịch sử tiêm phòng</h3>
        <div className="vaccination-list">
          {pet.vaccinations.map((vac, idx) => (
            <div key={idx} className="vaccination-item">
              <div className="vaccination-icon">💉</div>
              <div className="vaccination-info">
                <h4 className="vaccination-name">{vac.name}</h4>
                <p className="vaccination-detail">
                  <span className="detail-label">Ngày tiêm:</span> {vac.date}
                </p>
                <p className="vaccination-detail">
                  <span className="detail-label">Bác sĩ:</span> {vac.vet}
                </p>
              </div>
              <div className="vaccination-next">
                <p className="next-label">Mũi tiếp theo</p>
                <p className="next-date">{vac.nextDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service History */}
      <div className="section-card">
        <h3 className="section-title">✨ Lịch sử dịch vụ</h3>
        <div className="service-history-list">
          {pet.serviceHistory.map((service, idx) => (
            <div key={idx} className="service-history-item">
              <div className="service-date">
                <div className="date-day">{new Date(service.date).getDate()}</div>
                <div className="date-month">Th{new Date(service.date).getMonth() + 1}</div>
              </div>
              <div className="service-info">
                <h4 className="service-name">
                  <span className="service-icon-history">{service.icon}</span>
                  {service.service}
                </h4>
                <p className="service-result">{service.result}</p>
                <p className="service-staff">
                  👤 {service.vet || service.staff}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Notes */}
      {pet.medicalNotes && pet.medicalNotes.length > 0 && (
        <div className="section-card">
          <h3 className="section-title">🩺 Ghi chú y tế</h3>
          <div className="medical-notes-list">
            {pet.medicalNotes.map((note, idx) => (
              <div key={idx} className="medical-note-item">
                <div className="note-header">
                  <span className="note-date">{note.date}</span>
                  <span className="note-vet">👨‍⚕️ {note.vet}</span>
                </div>
                <p className="note-content">{note.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}