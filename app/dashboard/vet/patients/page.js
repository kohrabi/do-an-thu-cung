// app/(dashboard)/veterinarian/patients/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import VetPatientDetailModal from "@/components/modals/VetPatientDetailModal";

export default function VeterinarianPatientsPage() {
  const [patients, setPatients] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = () => {
    // Mock data - thú cưng do bác sĩ duchai1703 đã khám
    setPatients([
      {
        id: "PET001",
        code: "PET001",
        name: "Lucky",
        icon: "🐕",
        type: "dog",
        breed: "Golden Retriever",
        age: "2 tuổi",
        gender: "Đực",
        weight: "28 kg",
        color: "Vàng",
        dateOfBirth: "2023-03-15",
        ownerId: "CUS001",
        ownerName: "Nguyễn Văn A",
        ownerPhone: "0901234567",
        lastVisit: "2025-10-27",
        totalVisits: 3,
        medicalHistory: [
          {
            date: "2025-10-27",
            diagnosis: "Viêm dạ dày cấp",
            treatment: "Tiêm thuốc giảm đau, truyền dịch"
          },
          {
            date: "2025-09-15",
            diagnosis: "Cảm lạnh nhẹ",
            treatment: "Kê đơn thuốc kháng sinh"
          },
          {
            date: "2025-08-10",
            diagnosis: "Tiêm phòng định kỳ",
            treatment: "Tiêm vaccine 7 bệnh"
          }
        ]
      },
      {
        id: "PET002",
        code: "PET002",
        name: "Miu",
        icon: "🐈",
        type: "cat",
        breed: "Mèo Ba Tư",
        age: "1 tuổi",
        gender: "Cái",
        weight: "4 kg",
        color: "Trắng",
        dateOfBirth: "2024-01-20",
        ownerId: "CUS002",
        ownerName: "Trần Thị B",
        ownerPhone: "0909876543",
        lastVisit: "2025-10-27",
        totalVisits: 2,
        medicalHistory: [
          {
            date: "2025-10-27",
            diagnosis: "Tiêm phòng dại",
            treatment: "Tiêm vaccine dại"
          },
          {
            date: "2025-05-10",
            diagnosis: "Khám sức khỏe",
            treatment: "Khỏe mạnh"
          }
        ]
      },
      {
        id: "PET003",
        code: "PET003",
        name: "Coco",
        icon: "🐩",
        type: "dog",
        breed: "Poodle",
        age: "3 tuổi",
        gender: "Cái",
        weight: "6 kg",
        color: "Nâu",
        dateOfBirth: "2022-07-10",
        ownerId: "CUS003",
        ownerName: "Lê Văn C",
        ownerPhone: "0912345678",
        lastVisit: "2025-10-25",
        totalVisits: 5,
        medicalHistory: [
          {
            date: "2025-10-25",
            diagnosis: "Viêm da do nấm",
            treatment: "Bôi thuốc, tắm thuốc"
          },
          {
            date: "2025-10-10",
            diagnosis: "Tái khám viêm da",
            treatment: "Đã khỏi 80%"
          }
        ]
      },
      {
        id: "PET004",
        code: "PET004",
        name: "Max",
        icon: "🐕",
        type: "dog",
        breed: "Husky",
        age: "4 tuổi",
        gender: "Đực",
        weight: "32 kg",
        color: "Xám trắng",
        dateOfBirth: "2021-05-20",
        ownerId: "CUS004",
        ownerName: "Phạm Thị D",
        ownerPhone: "0923456789",
        lastVisit: "2025-10-20",
        totalVisits: 4,
        medicalHistory: [
          {
            date: "2025-10-20",
            diagnosis: "Khám răng miệng",
            treatment: "Lấy cao răng"
          }
        ]
      }
    ]);
  };

  const handleViewDetail = (patient) => {
    setSelectedPatient(patient);
    setIsDetailModalOpen(true);
  };

  const filteredPatients = patients.filter(patient => {
    const matchFilter = filter === "all" || patient.type === filter;
    const matchSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       patient.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       patient.breed.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const stats = {
    total: patients.length,
    dogs: patients.filter(p => p.type === 'dog').length,
    cats: patients.filter(p => p.type === 'cat').length
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        title="Bệnh nhân của tôi"
        subtitle="Danh sách thú cưng đã và đang điều trị"
      />

      {/* Stats */}
      <div className="section-separated">
        <div className="stats-grid-custom">
          <div className="stat-card-modern stat-primary">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">🐾</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Tổng bệnh nhân</p>
              <h3 className="stat-number">{stats.total}</h3>
            </div>
          </div>

          <div className="stat-card-modern">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">🐕</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Chó</p>
              <h3 className="stat-number">{stats.dogs}</h3>
            </div>
          </div>

          <div className="stat-card-modern">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">🐈</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Mèo</p>
              <h3 className="stat-number">{stats.cats}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="section-separated">
        <div className="filter-buttons-group">
          <button
            onClick={() => setFilter("all")}
            className={`filter-btn-modern ${filter === "all" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">🐾</span>
            <span>Tất cả</span>
          </button>
          <button
            onClick={() => setFilter("dog")}
            className={`filter-btn-modern ${filter === "dog" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">🐕</span>
            <span>Chó</span>
          </button>
          <button
            onClick={() => setFilter("cat")}
            className={`filter-btn-modern ${filter === "cat" ? "filter-btn-active" : ""}`}
          >
            <span className="filter-icon">🐈</span>
            <span>Mèo</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="section-separated">
        <div className="search-section-right">
          <div className="search-box-modern">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên thú cưng, chủ nuôi, giống..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-modern"
            />
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="section-separated">
        <div className="section-header-modern">
          <h2 className="section-title-large">
            <span className="title-icon">📋</span>
            Danh sách bệnh nhân
          </h2>
          <span className="section-count">{filteredPatients.length} bệnh nhân</span>
        </div>

        <div className="table-modern-wrapper">
          <table className="table-modern">
            <thead>
              <tr>
                <th style={{width: '8%'}}>Mã</th>
                <th style={{width: '18%'}}>Thú cưng</th>
                <th style={{width: '12%'}}>Giống</th>
                <th style={{width: '10%'}}>Tuổi</th>
                <th style={{width: '15%'}}>Chủ nuôi</th>
                <th style={{width: '12%'}}>Lần khám gần nhất</th>
                <th style={{width: '10%'}}>Tổng lần khám</th>
                <th style={{width: '10%'}}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <span className="code-badge">{patient.code}</span>
                  </td>
                  
                  <td>
                    <div className="pet-detail-cell">
                      <span className="pet-icon-large">{patient.icon}</span>
                      <div>
                        <p className="pet-name-bold">{patient.name}</p>
                        <p className="pet-info-small">{patient.gender} - {patient.color}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td>
                    <span className="breed-text">{patient.breed}</span>
                  </td>
                  
                  <td>
                    <span className="age-text">🎂 {patient.age}</span>
                  </td>
                  
                  <td>
                    <div className="customer-cell">
                      <p className="font-semibold">{patient.ownerName}</p>
                      <p className="text-sm text-gray-500">{patient.ownerPhone}</p>
                    </div>
                  </td>
                  
                  <td>
                    <span className="date-text">📅 {patient.lastVisit}</span>
                  </td>
                  
                  <td>
                    <span className="visit-count-badge">
                      {patient.totalVisits} lần
                    </span>
                  </td>
                  
                  <td>
                    <div className="action-buttons-modern">
                      <button
                        onClick={() => handleViewDetail(patient)}
                        className="btn-icon-action btn-view-icon"
                        title="Chi tiết"
                      >
                        👁️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPatients.length === 0 && (
            <div className="empty-state-modern">
              <div className="empty-icon">🐾</div>
              <p className="empty-text">Không có bệnh nhân nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <VetPatientDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedPatient(null);
        }}
        patient={selectedPatient}
      />
    </div>
  );
}