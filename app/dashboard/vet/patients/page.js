// app/(dashboard)/veterinarian/patients/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import VetPatientDetailModal from "@/components/modals/VetPatientDetailModal";
import { PawPrint, Cat, Search, Eye, Calendar, Cake, ClipboardList, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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
    <div className="flex-1 space-y-8 p-8">
      <DashboardHeader
        title="Bệnh nhân của tôi"
        subtitle="Danh sách thú cưng đã và đang điều trị"
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng bệnh nhân</CardTitle>
            <PawPrint className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chó</CardTitle>
            <PawPrint className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.dogs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mèo</CardTitle>
            <Cat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cats}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <Tabs value={filter} onValueChange={setFilter} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="dog">Chó</TabsTrigger>
          <TabsTrigger value="cat">Mèo</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search Bar */}
      <div className="relative flex-1 max-w-sm ml-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Tìm kiếm theo tên thú cưng, chủ nuôi, giống..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Patients Table */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary" />
            Danh sách bệnh nhân
          </h2>
          <Badge variant="secondary">{filteredPatients.length} bệnh nhân</Badge>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[8%]">Mã</TableHead>
                <TableHead className="w-[18%]">Thú cưng</TableHead>
                <TableHead className="w-[12%]">Giống</TableHead>
                <TableHead className="w-[10%]">Tuổi</TableHead>
                <TableHead className="w-[15%]">Chủ nuôi</TableHead>
                <TableHead className="w-[12%]">Lần khám gần nhất</TableHead>
                <TableHead className="w-[10%]">Tổng lần khám</TableHead>
                <TableHead className="w-[10%]">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                    <PawPrint className="mx-auto h-8 w-8 mb-2" />
                    Không có bệnh nhân nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map((patient) => {
                  const PetIcon = patient.icon === '🐕' ? PawPrint : patient.icon === '🐈' ? Cat : PawPrint;
                  return (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono text-xs">{patient.code}</Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground">
                            <PetIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-semibold">{patient.name}</p>
                            <p className="text-xs text-muted-foreground">{patient.gender} - {patient.color}</p>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <span className="text-sm">{patient.breed}</span>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Cake className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{patient.age}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <p className="font-semibold">{patient.ownerName}</p>
                          <p className="text-sm text-muted-foreground">{patient.ownerPhone}</p>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{patient.lastVisit}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant="secondary">{patient.totalVisits} lần</Badge>
                      </TableCell>
                      
                      <TableCell>
                        <Button variant="outline" size="icon" onClick={() => handleViewDetail(patient)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
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
