"use client";
import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import ConfirmAppointmentModal from "@/components/modals/ConfirmAppointmentModal";
import CancelAppointmentModal from "@/components/modals/CancelAppointmentModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Calendar, Clock, CheckCircle2, XCircle, Search, PawPrint, Cat, Stethoscope, Bath, Scissors, ClipboardList, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AppointmentsPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [appointments, setAppointments] = useState([
    {
      id: "APT001",
      customerName: "Nguyễn Văn A",
      phone: "0901234567",
      petName: "Lucky",
      petIcon: "🐕",
      service: "Khám sức khỏe",
      serviceIcon: "🏥",
      date: "2025-11-20",
      time: "10:00",
      status: "pending"
    },
    {
      id: "APT002",
      customerName: "Trần Thị B",
      phone: "0909876543",
      petName: "Miu",
      petIcon: "🐈",
      service: "Tắm spa",
      serviceIcon: "🛁",
      date: "2025-11-20",
      time: "14:00",
      status: "confirmed"
    },
    {
      id: "APT003",
      customerName: "Lê Văn C",
      phone: "0912345678",
      petName: "Coco",
      petIcon: "🐩",
      service: "Cắt tỉa lông",
      serviceIcon: "✂️",
      date: "2025-11-21",
      time: "09:00",
      status: "cancelled"
    }
  ]);

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: "Chờ xác nhận", variant: "warning", icon: Clock },
      confirmed: { label: "Đã xác nhận", variant: "success", icon: CheckCircle2 },
      cancelled: { label: "Đã hủy", variant: "destructive", icon: XCircle }
    };
    return badges[status] || badges.pending;
  };

  const getServiceIcon = (icon) => {
    switch (icon) {
      case '🏥': return Stethoscope;
      case '🛁': return Bath;
      case '✂️': return Scissors;
      default: return ClipboardList;
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchFilter = filter === "all" || apt.status === filter;
    const matchSearch = apt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       apt.phone.includes(searchTerm) ||
                       apt.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleConfirm = (appointment) => {
    setSelectedAppointment(appointment);
    setShowConfirmModal(true);
  };

  const handleCancel = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const confirmAppointment = () => {
    setAppointments(appointments.map(apt =>
      apt.id === selectedAppointment.id ? { ...apt, status: "confirmed" } : apt
    ));
    setShowConfirmModal(false);
  };

  const cancelAppointment = (reason) => {
    setAppointments(appointments.map(apt =>
      apt.id === selectedAppointment.id ? { ...apt, status: "cancelled", cancelReason: reason } : apt
    ));
    setShowCancelModal(false);
  };

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length
  };

  return (
    <div className="flex-1 space-y-8 p-8">
      <DashboardHeader
        title="Quản lý lịch đặt"
        subtitle="Xác nhận và quản lý lịch hẹn khách hàng"
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng lịch hẹn</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700">Chờ xác nhận</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Đã xác nhận</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Đã hủy</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        <Tabs value={filter} onValueChange={setFilter} className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="pending">Chờ xác nhận</TabsTrigger>
            <TabsTrigger value="confirmed">Đã xác nhận</TabsTrigger>
            <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Tìm theo tên, SĐT, mã lịch..."
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
            Danh sách lịch đặt
          </h2>
          <Badge variant="secondary">{filteredAppointments.length} lịch hẹn</Badge>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10%]">Mã lịch</TableHead>
                <TableHead className="w-[18%]">Khách hàng</TableHead>
                <TableHead className="w-[15%]">Thú cưng</TableHead>
                <TableHead className="w-[18%]">Dịch vụ</TableHead>
                <TableHead className="w-[15%]">Ngày & Giờ</TableHead>
                <TableHead className="w-[12%]">Trạng thái</TableHead>
                <TableHead className="w-[12%] text-center">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    <Calendar className="mx-auto h-8 w-8 mb-2" />
                    Không có lịch hẹn nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredAppointments.map((apt) => {
                  const statusBadge = getStatusBadge(apt.status);
                  const PetIcon = apt.petIcon === '🐕' ? PawPrint : Cat;
                  const ServiceIcon = getServiceIcon(apt.serviceIcon);
                  return (
                    <TableRow key={apt.id}>
                      <TableCell className="font-mono text-sm">{apt.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{apt.customerName}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {apt.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <PetIcon className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{apt.petName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ServiceIcon className="h-5 w-5 text-muted-foreground" />
                          <span>{apt.service}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{apt.date}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {apt.time}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusBadge.variant} className="flex items-center gap-1 w-fit">
                          <statusBadge.icon className="h-3 w-3" /> {statusBadge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          {apt.status === 'pending' && (
                            <Button size="sm" onClick={() => handleConfirm(apt)}>
                              <CheckCircle2 className="h-4 w-4 mr-2" /> Xác nhận
                            </Button>
                          )}
                          {apt.status !== 'cancelled' && (
                            <Button variant="destructive" size="sm" onClick={() => handleCancel(apt)}>
                              <XCircle className="h-4 w-4 mr-2" /> Hủy
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
      <ConfirmAppointmentModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        appointment={selectedAppointment}
        onConfirm={confirmAppointment}
      />

      <CancelAppointmentModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        appointment={selectedAppointment}
        onCancel={cancelAppointment}
      />
    </div>
  );
}
