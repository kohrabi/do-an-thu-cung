"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Calendar, Search, Plus, FileText, X, Hourglass, CheckCircle2, 
  XCircle, ClipboardList, Clock, Sparkles, PawPrint 
} from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/dashboard/StatsCard";
import BookAppointmentModal from "@/components/modals/BookAppointmentModal";
import AppointmentDetailModal from "@/components/modals/AppointmentDetailModal";
import CancelAppointmentOwnerModal from "@/components/modals/CancelAppointmentOwnerModal";
import { cn } from "@/lib/utils";

export default function OwnerAppointmentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadAppointments();

    if (searchParams.get('action') === 'book') {
      setIsBookModalOpen(true);
    }
  }, [searchParams]);

  const loadAppointments = () => {
    setAppointments([
      {
        id: "APT001",
        code: "APT001",
        petId: "PET001",
        petName: "Lucky",
        petIcon: "🐕",
        serviceId: "SRV001",
        serviceName: "Khám sức khỏe tổng quát",
        serviceIcon: "🏥",
        date: "2025-11-05",
        time: "09:00",
        status: "upcoming",
        notes: "Khám tổng quát định kỳ",
        createdAt: "2025-10-20"
      },
      {
        id: "APT002",
        code: "APT002",
        petId: "PET002",
        petName: "Miu",
        petIcon: "🐈",
        serviceId: "SRV003",
        serviceName: "Tắm spa cao cấp",
        serviceIcon: "🛁",
        date: "2025-11-10",
        time: "14:00",
        status: "upcoming",
        notes: "",
        createdAt: "2025-10-22"
      },
      {
        id: "APT003",
        code: "APT003",
        petId: "PET001",
        petName: "Lucky",
        petIcon: "🐕",
        serviceId: "SRV002",
        serviceName: "Tiêm phòng dại",
        serviceIcon: "💉",
        date: "2025-10-20",
        time: "10:30",
        status: "completed",
        notes: "Đã hoàn thành tốt",
        createdAt: "2025-10-15",
        completedAt: "2025-10-20"
      },
      {
        id: "APT004",
        code: "APT004",
        petId: "PET003",
        petName: "Coco",
        petIcon: "🐩",
        serviceId: "SRV004",
        serviceName: "Cắt tỉa lông",
        serviceIcon: "✂️",
        date: "2025-10-25",
        time: "15:00",
        status: "cancelled",
        notes: "Khách hủy do bận đột xuất",
        cancelReason: "Bận đột xuất, sẽ đặt lại sau",
        createdAt: "2025-10-18",
        cancelledAt: "2025-10-23"
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleBookAppointment = (data) => {
    const newAppointment = {
      id: `APT${String(appointments.length + 1).padStart(3, '0')}`,
      code: `APT${String(appointments.length + 1).padStart(3, '0')}`,
      ...data,
      status: "upcoming",
      createdAt: new Date().toISOString()
    };
    setAppointments([...appointments, newAppointment]);
    showToast("Đặt lịch thành công!", "success");
  };

  const handleViewDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(true);
  };

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsCancelModalOpen(true);
  };

  const handleCancelSuccess = (data) => {
    setAppointments(appointments.map(apt =>
      apt.id === data.appointmentId
        ? { ...apt, status: "cancelled", cancelReason: data.reason, cancelledAt: new Date().toISOString() }
        : apt
    ));
    showToast("Đã hủy lịch hẹn", "success");
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchFilter = filter === "all" || apt.status === filter;
    const matchSearch = apt.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       apt.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       apt.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: { 
        label: "Sắp tới", 
        variant: "secondary", 
        icon: Hourglass 
      },
      completed: { 
        label: "Đã hoàn thành", 
        variant: "success", 
        icon: CheckCircle2 
      },
      cancelled: { 
        label: "Đã hủy", 
        variant: "destructive", 
        icon: XCircle 
      }
    };
    return badges[status] || badges.upcoming;
  };

  const stats = {
    total: appointments.length,
    upcoming: appointments.filter(a => a.status === 'upcoming').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length
  };

  const filterOptions = [
    { value: "all", label: "Tất cả", icon: ClipboardList },
    { value: "upcoming", label: "Sắp tới", icon: Hourglass },
    { value: "completed", label: "Đã hoàn thành", icon: CheckCircle2 },
    { value: "cancelled", label: "Đã hủy", icon: XCircle }
  ];

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader
        title="Lịch đặt"
        subtitle="Quản lý lịch hẹn dịch vụ cho thú cưng"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={Calendar}
          title="Tổng lịch đặt"
          value={stats.total}
          color="primary"
        />
        <StatsCard
          icon={Hourglass}
          title="Sắp tới"
          value={stats.upcoming}
          color="info"
        />
        <StatsCard
          icon={CheckCircle2}
          title="Đã hoàn thành"
          value={stats.completed}
          color="success"
        />
        <StatsCard
          icon={XCircle}
          title="Đã hủy"
          value={stats.cancelled}
          color="warning"
        />
      </div>

      {/* Filter Buttons & Search & Book Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={option.value}
                onClick={() => setFilter(option.value)}
                variant={filter === option.value ? "default" : "outline"}
                size="sm"
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {option.label}
              </Button>
            );
          })}
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <div className="flex-1 sm:w-64">
            <Input
              type="text"
              placeholder="Tìm kiếm lịch đặt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
          </div>
          <Button
            onClick={() => setIsBookModalOpen(true)}
            className="whitespace-nowrap"
          >
            <Plus className="h-4 w-4 mr-2" />
            Đặt lịch mới
          </Button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Lịch đặt của tôi
          </h2>
          <Badge variant="outline" className="text-sm">
            {filteredAppointments.length} lịch hẹn
          </Badge>
        </div>

        {filteredAppointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAppointments.map((apt) => {
              const statusBadge = getStatusBadge(apt.status);
              const StatusIcon = statusBadge.icon;
              return (
                <Card key={apt.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {apt.code}
                      </Badge>
                      <Badge variant={statusBadge.variant} className="flex items-center gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {statusBadge.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {apt.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {apt.time}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{apt.petIcon}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{apt.petName}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          {apt.serviceIcon && <span>{apt.serviceIcon}</span>}
                          {apt.serviceName}
                        </p>
                      </div>
                    </div>

                    {apt.notes && (
                      <div className="p-3 bg-muted/50 rounded-lg border border-border">
                        <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Ghi chú:
                        </p>
                        <p className="text-sm text-foreground">{apt.notes}</p>
                      </div>
                    )}

                    {apt.cancelReason && (
                      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-xs font-medium text-red-900 mb-1 flex items-center gap-1">
                          <XCircle className="h-3 w-3" />
                          Lý do hủy:
                        </p>
                        <p className="text-sm text-red-900">{apt.cancelReason}</p>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => handleViewDetail(apt)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Chi tiết
                      </Button>
                      {apt.status === 'upcoming' && (
                        <Button
                          onClick={() => handleCancelClick(apt)}
                          variant="destructive"
                          size="sm"
                          className="flex-1"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Hủy lịch
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-medium">
                Không tìm thấy lịch đặt nào
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      <BookAppointmentModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onSuccess={handleBookAppointment}
      />

      <AppointmentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedAppointment(null);
        }}
        appointment={selectedAppointment}
      />

      <CancelAppointmentOwnerModal
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setSelectedAppointment(null);
        }}
        onSuccess={handleCancelSuccess}
        appointment={selectedAppointment}
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
