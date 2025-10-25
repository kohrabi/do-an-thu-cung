// app/(dashboard)/owner/pets/page.js
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Button from "@/components/ui/Button";
import AddPetModal from "@/components/modals/AddPetModal";

export default function OwnerPetsPage() {
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pets, setPets] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      setIsModalOpen(true);
    }

    // Mock data
    setPets([
      {
        id: "PET001",
        name: "Lucky",
        species: "Chó",
        icon: "🐕",
        breed: "Golden Retriever",
        age: 3,
        weight: 25,
        gender: "Đực",
        color: "Vàng",
        healthStatus: "Khỏe mạnh",
        nextVaccine: "2025-12-15",
        notes: "Hoạt bát, thân thiện"
      },
      {
        id: "PET002",
        name: "Miu",
        species: "Mèo",
        icon: "🐈",
        breed: "Mèo Anh lông ngắn",
        age: 2,
        weight: 4.5,
        gender: "Cái",
        color: "Xám",
        healthStatus: "Khỏe mạnh",
        nextVaccine: "2025-11-20",
        notes: "Ngoan ngoãn, ăn nhiều"
      },
      {
        id: "PET003",
        name: "Coco",
        species: "Chó",
        icon: "🐩",
        breed: "Poodle",
        age: 1,
        weight: 8,
        gender: "Cái",
        color: "Trắng",
        healthStatus: "Khỏe mạnh",
        nextVaccine: "2025-12-01",
        notes: "Thích chơi đùa"
      }
    ]);
  }, [searchParams]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleAddPet = (newPet) => {
    const pet = {
      id: `PET${String(pets.length + 1).padStart(3, '0')}`,
      name: newPet.name,
      species: newPet.species,
      icon: getSpeciesIcon(newPet.species),
      breed: newPet.breed,
      age: parseInt(newPet.age),
      weight: parseFloat(newPet.weight) || 0,
      gender: newPet.gender,
      color: newPet.color,
      healthStatus: "Khỏe mạnh",
      nextVaccine: null,
      notes: newPet.notes
    };
    setPets([...pets, pet]);
    showToast("🎉 Đã thêm thú cưng thành công!");
  };

  const getSpeciesIcon = (species) => {
    const icons = {
      "Chó": "🐕",
      "Mèo": "🐈",
      "Thỏ": "🐰",
      "Chuột Hamster": "🐹",
      "Chim": "🦜",
      "Rùa": "🐢"
    };
    return icons[species] || "🐾";
  };

  const handleViewDetails = (pet) => {
    console.log("View pet details:", pet);
    showToast("ℹ️ Chức năng xem chi tiết đang phát triển");
  };

  const handleEditPet = (pet) => {
    console.log("Edit pet:", pet);
    showToast("✏️ Chức năng chỉnh sửa đang phát triển");
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Thú cưng của tôi"
        subtitle="Quản lý thông tin và sức khỏe thú cưng"
      />

      <div className="action-bar">
        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-label">Tổng số thú cưng:</span>
            <span className="stat-value">{pets.length}</span>
          </div>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
          ➕ Thêm thú cưng
        </Button>
      </div>

      {/* Pets Grid */}
      <div className="pets-detailed-grid">
        {pets.map((pet) => (
          <div key={pet.id} className="pet-detail-card">
            <div className="pet-card-header-bg">
              <div className="pet-avatar-large">{pet.icon}</div>
            </div>

            <div className="pet-card-body">
              <h3 className="pet-detail-name">{pet.name}</h3>
              <p className="pet-detail-breed">{pet.breed}</p>

              <div className="pet-info-grid">
                <div className="pet-info-item">
                  <span className="info-icon">🏷️</span>
                  <div>
                    <p className="info-label">Mã số</p>
                    <p className="info-value">{pet.id}</p>
                  </div>
                </div>

                <div className="pet-info-item">
                  <span className="info-icon">🐾</span>
                  <div>
                    <p className="info-label">Loài</p>
                    <p className="info-value">{pet.species}</p>
                  </div>
                </div>

                <div className="pet-info-item">
                  <span className="info-icon">🎂</span>
                  <div>
                    <p className="info-label">Tuổi</p>
                    <p className="info-value">{pet.age} tuổi</p>
                  </div>
                </div>

                <div className="pet-info-item">
                  <span className="info-icon">⚖️</span>
                  <div>
                    <p className="info-label">Cân nặng</p>
                    <p className="info-value">{pet.weight} kg</p>
                  </div>
                </div>

                <div className="pet-info-item">
                  <span className="info-icon">🚻</span>
                  <div>
                    <p className="info-label">Giới tính</p>
                    <p className="info-value">{pet.gender}</p>
                  </div>
                </div>

                <div className="pet-info-item">
                  <span className="info-icon">🎨</span>
                  <div>
                    <p className="info-label">Màu sắc</p>
                    <p className="info-value">{pet.color}</p>
                  </div>
                </div>
              </div>

              <div className="pet-health-status">
                <div className="health-badge health-good">
                  ❤️ {pet.healthStatus}
                </div>
                {pet.nextVaccine && (
                  <div className="vaccine-reminder">
                    💉 Tiêm phòng tiếp theo: {new Date(pet.nextVaccine).toLocaleDateString('vi-VN')}
                  </div>
                )}
              </div>

              {pet.notes && (
                <div className="pet-notes">
                  <p className="notes-label">📝 Ghi chú:</p>
                  <p className="notes-text">{pet.notes}</p>
                </div>
              )}

              <div className="pet-card-actions">
                <button
                  onClick={() => handleViewDetails(pet)}
                  className="btn-pet-action btn-view"
                >
                  👁️ Chi tiết
                </button>
                <button
                  onClick={() => handleEditPet(pet)}
                  className="btn-pet-action btn-edit"
                >
                  ✏️ Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddPetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAddPet}
      />

      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}