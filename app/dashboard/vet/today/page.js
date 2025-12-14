// app/(dashboard)/vet/today/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import VetScheduleDetailModal from "@/components/modals/VetScheduleDetailModal";
import { ClipboardList, Clock, RefreshCw, CheckCircle2, AlertCircle, Eye, PawPrint, Cat, Stethoscope, Syringe, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function VetTodayPage() {
  const router = useRouter();
  const [todayTasks, setTodayTasks] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    loadTodayTasks();
  }, []);

  const loadTodayTasks = () => {
    // Mock data - Công việc hôm nay 2025-10-27
    setTodayTasks([
      {
        id: "TASK001",
        time: "09:00",
        type: "appointment",
        title: "Khám sức khỏe cho Lucky",
        petName: "Lucky",
        petIcon: "🐕",
        petType: "Chó Golden Retriever",
        petAge: "2 tuổi",
        petWeight: "28 kg",
        ownerName: "Nguyễn Văn A",
        ownerPhone: "0901234567",
        serviceName: "Khám sức khỏe tổng quát",
        serviceIcon: "🏥",
        status: "completed",
        priority: "high",
        symptoms: "Ăn uống kém, uể oải",
        previousRecords: [
          {
            date: "2025-09-15",
            diagnosis: "Cảm lạnh nhẹ",
            treatment: "Đã kê đơn thuốc kháng sinh"
          }
        ]
      },
      {
        id: "TASK002",
        time: "10:30",
        type: "appointment",
        title: "Tiêm phòng dại cho Miu",
        petName: "Miu",
        petIcon: "🐈",
        petType: "Mèo Ba Tư",
        petAge: "1 tuổi",
        petWeight: "4 kg",
        ownerName: "Trần Thị B",
        ownerPhone: "0909876543",
        serviceName: "Tiêm phòng dại",
        serviceIcon: "💉",
        status: "completed",
        priority: "normal",
        symptoms: "Tiêm phòng định kỳ",
        previousRecords: []
      },
      {
        id: "TASK003",
        time: "14:00",
        type: "appointment",
        title: "Tái khám cho Coco",
        petName: "Coco",
        petIcon: "🐩",
        petType: "Chó Poodle",
        petAge: "3 tuổi",
        petWeight: "6 kg",
        ownerName: "Lê Văn C",
        ownerPhone: "0912345678",
        serviceName: "Tái khám",
        serviceIcon: "🔄",
        status: "in_progress",
        priority: "normal",
        symptoms: "Kiểm tra sau điều trị",
        previousRecords: [
          {
            date: "2025-10-20",
            diagnosis: "Viêm da",
            treatment: "Đã điều trị thành công"
          }
        ]
      },
      {
        id: "TASK004",
        time: "15:30",
        type: "appointment",
        title: "Khám da liễu cho Max",
        petName: "Max",
        petIcon: "🐕",
        petType: "Chó Husky",
        petAge: "4 tuổi",
        petWeight: "32 kg",
        ownerName: "Phạm Thị D",
        ownerPhone: "0923456789",
        serviceName: "Khám da liễu",
        serviceIcon: "🩺",
        status: "pending",
        priority: "high",
        symptoms: "Ngứa ngáy, rụng lông",
        previousRecords: []
      },
      {
        id: "TASK005",
        time: "16:30",
        type: "appointment",
        title: "Xét nghiệm máu cho Bella",
        petName: "Bella",
        petIcon: "🐈",
        petType: "Mèo Anh lông ngắn",
        petAge: "2 tuổi",
        petWeight: "5 kg",
        ownerName: "Hoàng Thị E",
        ownerPhone: "0934567890",
        serviceName: "Xét nghiệm máu",
        serviceIcon: "💉",
        status: "pending",
        priority: "normal",
        symptoms: "Kiểm tra sức khỏe định kỳ",
        previousRecords: []
      },
      {
        id: "TASK006",
        time: "17:00",
        type: "reminder",
        title: "Cập nhật hồ sơ bệnh án",
        description: "Hoàn thiện 3 hồ sơ bệnh án chưa lưu",
        status: "pending",
        priority: "high"
      }
    ]);
  };

  const handleViewDetail = (task) => {
    if (task.type === 'appointment') {
      // Chuyển đổi task thành appointment format
      const appointment = {
        id: task.id,
        code: task.id,
        time: task.time,
        petName: task.petName,
        petIcon: task.petIcon,
        petType: task.petType,
        petAge: task.petAge,
        petWeight: task.petWeight,
        ownerName: task.ownerName,
        ownerPhone: task.ownerPhone,
        serviceName: task.serviceName,
        serviceIcon: task.serviceIcon,
        symptoms: task.symptoms,
        previousRecords: task.previousRecords || []
      };
      setSelectedAppointment(appointment);
      setIsDetailModalOpen(true);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: "Chưa làm", variant: "warning", icon: Clock },
      in_progress: { label: "Đang làm", variant: "info", icon: RefreshCw },
      completed: { label: "Hoàn thành", variant: "success", icon: CheckCircle2 }
    };
    return badges[status] || badges.pending;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: { label: "Quan trọng", variant: "destructive", icon: AlertCircle },
      normal: { label: "Bình thường", variant: "secondary", icon: Clock }
    };
    return badges[priority] || badges.normal;
  };

  const stats = {
    total: todayTasks.length,
    pending: todayTasks.filter(t => t.status === 'pending').length,
    inProgress: todayTasks.filter(t => t.status === 'in_progress').length,
    completed: todayTasks.filter(t => t.status === 'completed').length
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

  return (
    <div className="flex-1 space-y-8 p-8">
      <DashboardHeader
        title="Công việc hôm nay"
        subtitle="Danh sách công việc và lịch khám trong ngày"
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng công việc</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chưa làm</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang làm</CardTitle>
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

      {/* Today's Tasks */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary" />
            Công việc hôm nay - Thứ Hai, 27/10/2025
          </h2>
          <Badge variant="secondary">{todayTasks.length} công việc</Badge>
        </div>

        <div className="space-y-3">
          {todayTasks.map((task) => {
            const statusBadge = getStatusBadge(task.status);
            const priorityBadge = getPriorityBadge(task.priority);
            const ServiceIcon = task.serviceIcon ? getServiceIcon(task.serviceIcon) : null;
            const PetIcon = task.petIcon === '🐕' ? PawPrint : task.petIcon === '🐈' ? Cat : PawPrint;
            
            return (
              <Card key={task.id} className="flex items-center gap-4 p-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="ml-1 font-semibold">{task.time}</span>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{task.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={priorityBadge.variant} className="flex items-center gap-1">
                        <priorityBadge.icon className="h-3 w-3" /> {priorityBadge.label}
                      </Badge>
                      <Badge variant={statusBadge.variant} className="flex items-center gap-1">
                        <statusBadge.icon className="h-3 w-3" /> {statusBadge.label}
                      </Badge>
                    </div>
                  </div>

                  {task.type === 'appointment' && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground">
                        <PetIcon className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{task.petName}</span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" /> {task.ownerName}
                      </span>
                      {ServiceIcon && (
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <ServiceIcon className="h-3 w-3" /> {task.serviceName}
                        </span>
                      )}
                    </div>
                  )}

                  {task.type === 'reminder' && task.description && (
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  )}
                </div>

                <div>
                  {task.type === 'appointment' && (
                    <Button variant="outline" onClick={() => handleViewDetail(task)}>
                      <Eye className="h-4 w-4 mr-2" /> Chi tiết
                    </Button>
                  )}
                  {task.type === 'reminder' && (
                    <Button variant="outline" onClick={() => router.push("/dashboard/vet/records")}>
                      Xem ngay
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
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
    </div>
  );
}
