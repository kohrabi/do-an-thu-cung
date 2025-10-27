// app/(dashboard)/owner/pets/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import AddPetModal from "@/components/modals/AddPetModal";
import EditPetModal from "@/components/modals/EditPetModal";

export default function OwnerPetsPage() {
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = () => {
    setPets([
      {
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
        medicalHistory: "Đã tiêm phòng đầy đủ",
        notes: "Rất thân thiện, thích chơi đùa"
      },
      {
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
        medicalHistory: "Tiêm phòng cơ bản",
        notes: "Ngoan, ít kêu"
      },
      {
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
        notes: "Thích được chải lông"
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleAddPet = (newPet) => {
    const pet = {
      id: `PET${String(pets.length + 1).padStart(3, '0')}`,
      ...newPet,
      icon: newPet.type === 'Chó' ? '🐕' : '🐈'
    };
    setPets([...pets, pet]);
    showToast("🎉 Đã thêm thú cưng thành công!");
  };

  const handleEditPet = (updatedPet) => {
    setPets(pets.map(pet =>
      pet.id === updatedPet.id ? updatedPet : pet
    ));
    showToast("💾 Đã cập nhật thông tin thú cưng!");
  };

  const handleOpenEdit = (pet) => {
    setEditingPet(pet);
    setIsEditModalOpen(true);
  };

  const handleViewDetail = (petId) => {
    router.push(`/dashboard/owner/pets/${petId}`);
  };

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Thú cưng của tôi"
        subtitle="Quản lý thông tin thú cưng của bạn"
      />

      {/* Stats */}
      <div className="section-separated">
        <div className="stats-grid-custom">
          <div className="stat-card-modern stat-primary">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">🐾</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Tổng số thú cưng</p>
              <h3 className="stat-number">{pets.length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <div className="section-separated">
        <div className="action-button-section">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-add-large"
          >
            <span className="btn-icon">➕</span>
            <span>Thêm thú cưng mới</span>
          </button>
        </div>
      </div>

      {/* Search Bar - BÊN PHẢI */}
      <div className="section-separated">
        <div className="search-section-right">
          <div className="search-box-modern">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm thú cưng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-modern"
            />
          </div>
        </div>
      </div>

      {/* Pets List - TÁCH BIỆT TỪNG CON */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Danh sách thú cưng của tôi
          </h2>
          <span className="section-count">{filteredPets.length} thú cưng</span>
        </div>

        <div className="pets-list-separated">
          {filteredPets.map((pet) => (
            <div key={pet.id} className="pet-card-separated">
              <div className="pet-card-header">
                <div className="pet-icon-section">
                  <span className="pet-icon-huge">{pet.icon}</span>
                </div>
                <div className="pet-basic-info">
                  <h3 className="pet-name-large">{pet.name}</h3>
                  <p className="pet-breed-text">{pet.breed}</p>
                  <div className="pet-tags">
                    <span className="pet-tag">{pet.type}</span>
                    <span className="pet-tag">{pet.gender}</span>
                    <span className="pet-tag">{pet.age}</span>
                  </div>
                </div>
              </div>

              <div className="pet-card-body">
                <div className="pet-info-grid">
                  <div className="pet-info-item">
                    <span className="info-icon">⚖️</span>
                    <div>
                      <p className="info-label">Cân nặng</p>
                      <p className="info-value">{pet.weight}</p>
                    </div>
                  </div>
                  <div className="pet-info-item">
                    <span className="info-icon">🎨</span>
                    <div>
                      <p className="info-label">Màu lông</p>
                      <p className="info-value">{pet.color}</p>
                    </div>
                  </div>
                  <div className="pet-info-item">
                    <span className="info-icon">🎂</span>
                    <div>
                      <p className="info-label">Ngày sinh</p>
                      <p className="info-value">{pet.dateOfBirth}</p>
                    </div>
                  </div>
                </div>

                <div className="pet-notes-section">
                  <p className="notes-label">📝 Ghi chú:</p>
                  <p className="notes-text">{pet.notes}</p>
                </div>
              </div>

              <div className="pet-card-footer">
                <button
                  onClick={() => handleViewDetail(pet.id)}
                  className="btn-pet-action btn-view-pet"
                >
                  <span>📋</span>
                  <span>Chi tiết</span>
                </button>
                <button
                  onClick={() => handleOpenEdit(pet)}
                  className="btn-pet-action btn-edit-pet"
                >
                  <span>✏️</span>
                  <span>Chỉnh sửa</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPets.length === 0 && (
          <div className="empty-state-modern">
            <div className="empty-icon">🐾</div>
            <p className="empty-text">Không tìm thấy thú cưng nào</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddPetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddPet}
      />

      <EditPetModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingPet(null);
        }}
        onSuccess={handleEditPet}
        pet={editingPet}
      />

      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}