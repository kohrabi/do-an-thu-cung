"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  PawPrint, Search, Plus, Edit, FileText, Scale, Palette, Cake, 
  CheckCircle2, XCircle, ClipboardList 
} from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/dashboard/StatsCard";
import AddPetModal from "@/components/modals/AddPetModal";
import EditPetModal from "@/components/modals/EditPetModal";
import { cn } from "@/lib/utils";

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
    showToast("Đã thêm thú cưng thành công!", "success");
  };

  const handleEditPet = (updatedPet) => {
    setPets(pets.map(pet =>
      pet.id === updatedPet.id ? updatedPet : pet
    ));
    showToast("Đã cập nhật thông tin thú cưng!", "success");
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
    <div className="p-6 space-y-6">
      <DashboardHeader
        title="Thú cưng của tôi"
        subtitle="Quản lý thông tin thú cưng của bạn"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          icon={PawPrint}
          title="Tổng số thú cưng"
          value={pets.length}
          color="primary"
        />
      </div>

      {/* Add Button & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm thú cưng mới
        </Button>

        <div className="w-full sm:w-64">
          <Input
            type="text"
            placeholder="Tìm kiếm thú cưng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
        </div>
      </div>

      {/* Pets List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Danh sách thú cưng của tôi
          </h2>
          <Badge variant="outline" className="text-sm">
            {filteredPets.length} thú cưng
          </Badge>
        </div>

        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPets.map((pet) => (
              <Card key={pet.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{pet.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{pet.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mb-2">{pet.breed}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {pet.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {pet.gender}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {pet.age}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                      <Scale className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Cân nặng</p>
                        <p className="text-sm font-semibold text-foreground">{pet.weight}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                      <Palette className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Màu lông</p>
                        <p className="text-sm font-semibold text-foreground">{pet.color}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                      <Cake className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Ngày sinh</p>
                        <p className="text-sm font-semibold text-foreground">{pet.dateOfBirth}</p>
                      </div>
                    </div>
                  </div>

                  {pet.notes && (
                    <div className="p-3 bg-muted/50 rounded-lg border border-border">
                      <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        Ghi chú:
                      </p>
                      <p className="text-sm text-foreground">{pet.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleViewDetail(pet.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Chi tiết
                    </Button>
                    <Button
                      onClick={() => handleOpenEdit(pet)}
                      variant="default"
                      size="sm"
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Chỉnh sửa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <PawPrint className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-medium">
                Không tìm thấy thú cưng nào
              </p>
            </CardContent>
          </Card>
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

      {/* Toast Notification */}
      {toast.show && (
        <div className={cn(
          "fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-4",
          toast.type === "success"
            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
            : "bg-red-100 text-red-800 border border-red-200"
        )}>
          <div className="flex items-center gap-2">
            {toast.type === "success" ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            <p className="font-medium">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
