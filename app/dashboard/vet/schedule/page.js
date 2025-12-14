// app/(dashboard)/vet/schedule/page.js
"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import VetScheduleDetailModal from "@/components/modals/VetScheduleDetailModal";
import VetRecordModal from "@/components/modals/VetRecordModal";
import { Calendar, Clock, CheckCircle2, RefreshCw, Search, Eye, Play, ClipboardList, PawPrint, Cat, Stethoscope, Syringe, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function VeterinarianSchedulePage() {
  const [selectedDate, setSelectedDate] = useState("2025-10-27");
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadAppointments();
  }, [selectedDate]);

  const loadAppointments = () => {
    // Mock data - NGÀY 2025-10-27
    setAppointments([
      {
        id: "APT001",
        code: "APT001",
        time: "09:00",
        petId: "PET001",
        petName: "Lucky",
        petIcon: "🐕",
        petType: "Chó Golden Retriever",
        petAge: "2 tuổi",
        petWeight: "28 kg",
        ownerId: "CUS001",
        ownerName: "Nguyễn Văn A",
        ownerPhone: "0901234567",
        serviceId: "SRV001",
        serviceName: "Khám sức khỏe tổng quát",
        serviceIcon: "🏥",
        status: "completed",
        symptoms: "Ăn uống kém, uể oải",
        notes: "Đã khỏe, tiếp tục theo dõi",
        previousRecords: [
          {
            date: "2025-09-15",
            diagnosis: "Cảm lạnh nhẹ",
            treatment: "Đã kê đơn thuốc kháng sinh"
          }
        ]
      },
      {
        id: "APT002",
        code: "APT002",
        time: "10:30",
        petId: "PET002",
        petName: "Miu",
        petIcon: "🐈",
        petType: "Mèo Ba Tư",
        petAge: "1 tuổi",
        petWeight: "4 kg",
        ownerId: "CUS002",
        ownerName: "Trần Thị B",
        ownerPhone: "0909876543",
        serviceId: "SRV002",
        serviceName: "Tiêm phòng dại",
        serviceIcon: "💉",
        status: "completed",
        symptoms: "Tiêm phòng định kỳ",
        notes: "Đã tiêm thành công",
        previousRecords: []
      },
      {
        id: "APT003",
        code: "APT003",
        time: "14:00",
        petId: "PET003",
        petName: "Coco",
        petIcon: "🐩",
        petType: "Chó Poodle",
        petAge: "3 tuổi",
        petWeight: "6 kg",
        ownerId: "CUS003",
        ownerName: "Lê Văn C",
        ownerPhone: "0912345678",
        serviceId: "SRV003",
        serviceName: "Tái khám",
        serviceIcon: "🔄",
        status: "in_progress",
        symptoms: "Kiểm tra sau điều trị",
        notes: "",
        previousRecords: [
          {
            date: "2025-10-20",
            diagnosis: "Viêm da",
            treatment: "Đã điều trị thành công"
          }
        ]
      },
      {
        id: "APT004",
        code: "APT004",
        time: "15:30",
        petId: "PET004",
        petName: "Max",
        petIcon: "🐕",
        petType: "Chó Husky",
        petAge: "4 tuổi",
        petWeight: "32 kg",
        ownerId: "CUS004",
        ownerName: "Phạm Thị D",
        ownerPhone: "0923456789",
        serviceId: "SRV004",
        serviceName: "Khám da liễu",
        serviceIcon: "🩺",
        status: "waiting",
        symptoms: "Ngứa ngáy, rụng lông",
        notes: "",
        previousRecords: []
      },
      {
        id: "APT005",
        code: "APT005",
        time: "16:30",
        petId: "PET005",
        petName: "Bella",
        petIcon: "🐈",
        petType: "Mèo Anh lông ngắn",
        petAge: "2 tuổi",
        petWeight: "5 kg",
        ownerId: "CUS005",
        ownerName: "Hoàng Thị E",
        ownerPhone: "0934567890",
        serviceId: "SRV005",
        serviceName: "Xét nghiệm máu",
        serviceIcon: "💉",
        status: "waiting",
        symptoms: "Kiểm tra sức khỏe định kỳ",
        notes: "",
        previousRecords: []
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleStartExam = (appointmentId) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointmentId
        ? { ...apt, status: "in_progress" }
        : apt
    ));
    showToast("Đã bắt đầu khám");
  };

  const handleCompleteExam = (appointment) => {
    setSelectedAppointment(appointment);
    setIsRecordModalOpen(true);
  };

  const handleRecordSuccess = (data) => {
    setAppointments(appointments.map(apt =>
      apt.id === data.appointmentId
        ? { ...apt, status: "completed", notes: data.recordData.notes }
        : apt
    ));
    showToast("Đã hoàn thành ca khám và lưu bệnh án!");
  };

  const handleViewDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(true);
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchFilter = filter === "all" || apt.status === filter;
    const matchSearch = apt.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       apt.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const getStatusBadge = (status) => {
    const badges = {
      waiting: { label: "Chờ khám", variant: "warning", icon: Clock },
      in_progress: { label: "Đang khám", variant: "info", icon: RefreshCw },
      completed: { label: "Hoàn thành", variant: "success", icon: CheckCircle2 }
    };
    return badges[status] || badges.waiting;
  };

  const getServiceIcon = (icon) => {
    switch (icon) {
      case '🏥': return Stethoscope;
      case '💉': return Syringe;
      case '🔄': return RefreshCw;
      case '🩺': return Stethoscope;
      default: return Stethoscope;
    }
  };

  const stats = {
    total: appointments.length,
    waiting: appointments.filter(a => a.status === 'waiting').length,
    inProgress: appointments.filter(a => a.status === 'in_progress').length,
    completed: appointments.filter(a => a.status === 'completed').length
  };

  return (
    <div className="flex-1 space-y-8 p-8">
      <DashboardHeader
        title="Lịch làm việc"
        subtitle="Quản lý lịch khám và thực hiện ca khám"
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng ca khám</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ khám</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.waiting}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang khám</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoàn thành</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <Tabs value={filter} onValueChange={setFilter} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="waiting">Chờ khám</TabsTrigger>
          <TabsTrigger value="in_progress">Đang khám</TabsTrigger>
          <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Date Picker and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <label className="text-sm font-medium">Chọn ngày:</label>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto"
          />
        </div>
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Tìm kiếm theo tên thú cưng hoặc chủ nuôi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Appointments Table */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary" />
            Lịch khám ngày {selectedDate}
          </h2>
          <Badge variant="secondary">{filteredAppointments.length} ca khám</Badge>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[8%]">Mã</TableHead>
                <TableHead className="w-[8%]">Giờ</TableHead>
                <TableHead className="w-[18%]">Thú cưng</TableHead>
                <TableHead className="w-[15%]">Chủ nuôi</TableHead>
                <TableHead className="w-[16%]">Dịch vụ</TableHead>
                <TableHead className="w-[12%]">Trạng thái</TableHead>
                <TableHead className="w-[23%] text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    <Calendar className="mx-auto h-8 w-8 mb-2" />
                    Không có ca khám nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredAppointments.map((apt) => {
                  const statusBadge = getStatusBadge(apt.status);
                  const ServiceIcon = getServiceIcon(apt.serviceIcon);
                  const PetIcon = apt.petIcon === '🐕' ? PawPrint : apt.petIcon === '🐈' ? Cat : PawPrint;
                  return (
                    <TableRow key={apt.id}>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono text-xs">{apt.code}</Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{apt.time}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground">
                            <PetIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-semibold">{apt.petName}</p>
                            <p className="text-xs text-muted-foreground">{apt.petType}</p>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <p className="font-semibold">{apt.ownerName}</p>
                          <p className="text-sm text-muted-foreground">{apt.ownerPhone}</p>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ServiceIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{apt.serviceName}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant={statusBadge.variant} className="flex items-center gap-1 w-fit">
                          <statusBadge.icon className="h-3 w-3" /> {statusBadge.label}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleViewDetail(apt)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {apt.status === 'waiting' && (
                            <Button variant="default" size="icon" onClick={() => handleStartExam(apt.id)}>
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          
                          {(apt.status === 'in_progress' || apt.status === 'waiting') && (
                            <Button variant="success" size="icon" onClick={() => handleCompleteExam(apt)}>
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modals */}
      {isDetailModalOpen && (
        <VetScheduleDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedAppointment(null);
          }}
          appointment={selectedAppointment}
        />
      )}

      {isRecordModalOpen && (
        <VetRecordModal
          isOpen={isRecordModalOpen}
          onClose={() => {
            setIsRecordModalOpen(false);
            setSelectedAppointment(null);
          }}
          onSuccess={handleRecordSuccess}
          appointment={selectedAppointment}
        />
      )}

      {/* Toast */}
      {toast.show && (
        <div className={cn("fixed bottom-4 right-4 p-3 rounded-md shadow-lg text-white", toast.type === "success" ? "bg-green-500" : "bg-red-500")}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
