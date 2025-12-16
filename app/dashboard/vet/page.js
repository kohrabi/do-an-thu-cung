// app/(dashboard)/veterinarian/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import { Calendar, RefreshCw, CheckCircle2, FileText, Bell, Clock, Sparkles, ClipboardList, PawPrint, Cat, Stethoscope, Syringe, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function VeterinarianDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    todayAppointments: 0,
    inProgress: 0,
    completed: 0,
    newRecords: 0
  });

  const [todaySchedule, setTodaySchedule] = useState([]);
  const [upcomingAlert, setUpcomingAlert] = useState(null);

  useEffect(() => {
    loadDashboardData();
    checkUpcomingAppointments();
  }, []);

  const loadDashboardData = () => {
    // Mock stats - UPDATED
    setStats({
      todayAppointments: 5,
      inProgress: 1,
      completed: 2,
      newRecords: 3
    });

    // Mock today schedule - NGÀY HÔM NAY: 2025-10-27
    setTodaySchedule([
      {
        id: "APT001",
        time: "09:00",
        petName: "Lucky",
        petIcon: "🐕",
        ownerName: "Nguyễn Văn A",
        service: "Khám sức khỏe tổng quát",
        serviceIcon: "🏥",
        status: "completed"
      },
      {
        id: "APT002",
        time: "10:30",
        petName: "Miu",
        petIcon: "🐈",
        ownerName: "Trần Thị B",
        service: "Tiêm phòng dại",
        serviceIcon: "💉",
        status: "completed"
      },
      {
        id: "APT003",
        time: "14:00",
        petName: "Coco",
        petIcon: "🐩",
        ownerName: "Lê Văn C",
        service: "Tái khám",
        serviceIcon: "🔄",
        status: "in_progress"
      },
      {
        id: "APT004",
        time: "15:30",
        petName: "Max",
        petIcon: "🐕",
        ownerName: "Phạm Thị D",
        service: "Khám da liễu",
        serviceIcon: "🩺",
        status: "waiting"
      },
      {
        id: "APT005",
        time: "16:30",
        petName: "Bella",
        petIcon: "🐈",
        ownerName: "Hoàng Thị E",
        service: "Xét nghiệm máu",
        serviceIcon: "💉",
        status: "waiting"
      }
    ]);
  };

  const checkUpcomingAppointments = () => {
    // Current time: 08:31 (UTC)
    // Show alert for 09:00 appointment (within 30 minutes)
    setUpcomingAlert({
      petName: "Lucky",
      time: "09:00"
    });
  };

  const quickActions = [
    {
      icon: Calendar,
      label: "Xem lịch khám",
      onClick: () => router.push("/dashboard/vet/schedule")
    },
    {
      icon: FileText,
      label: "Hồ sơ bệnh án",
      onClick: () => router.push("/dashboard/vet/records")
    },
    {
      icon: ClipboardList,
      label: "Công việc hôm nay",
      onClick: () => router.push("/dashboard/vet/today")
    },
    {
      icon: PawPrint,
      label: "Bệnh nhân của tôi",
      onClick: () => router.push("/dashboard/vet/patients")
    }
  ];

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

  return (
    <div className="flex-1 space-y-8 p-8">
      <DashboardHeader
        title="Dashboard Bác sĩ thú y"
        subtitle={`Chào buổi chiều, BS. Đức Hải - ${new Date().toLocaleDateString('vi-VN')}`}
      />

      {/* Upcoming Alert */}
      {upcomingAlert && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-primary" />
              <p className="text-sm">
                Sắp đến giờ khám cho <strong>{upcomingAlert.petName}</strong> ({upcomingAlert.time})
              </p>
            </div>
            <Button onClick={() => router.push("/dashboard/vet/schedule")} size="sm">
              Xem lịch
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard icon={Calendar} title="Lịch khám hôm nay" value={stats.todayAppointments} color="primary" />
        <StatsCard icon={RefreshCw} title="Đang thực hiện" value={stats.inProgress} color="info" />
        <StatsCard icon={CheckCircle2} title="Đã hoàn thành" value={stats.completed} color="success" />
        <StatsCard icon={FileText} title="Bệnh án mới" value={stats.newRecords} color="warning" />
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Thao tác nhanh
        </h2>
        <QuickActions actions={quickActions} />
      </div>

      {/* Today's Schedule */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary" />
            Lịch khám hôm nay
          </h2>
          <Badge variant="secondary">{todaySchedule.length} ca khám</Badge>
        </div>

        <div className="space-y-3">
          {todaySchedule.map((appointment) => {
            const statusBadge = getStatusBadge(appointment.status);
            const ServiceIcon = getServiceIcon(appointment.serviceIcon);
            const PetIcon = appointment.petIcon === '🐕' ? PawPrint : appointment.petIcon === '🐈' ? Cat : PawPrint;
            return (
              <Card key={appointment.id} className="flex items-center gap-4 p-4">
                <div className="flex flex-col items-center justify-center w-20 h-20 rounded-lg bg-primary/10 flex-shrink-0 overflow-hidden">
                  <Clock className="h-5 w-5 text-primary mb-1" />
                  <span className="text-sm font-semibold text-primary truncate w-full text-center px-1">{appointment.time}</span>
                </div>

                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-secondary-foreground">
                    <PetIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{appointment.petName}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <User className="h-3 w-3" /> {appointment.ownerName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-1">
                  <ServiceIcon className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{appointment.service}</p>
                </div>

                <Badge variant={statusBadge.variant} className="flex items-center gap-1">
                  <statusBadge.icon className="h-3 w-3" /> {statusBadge.label}
                </Badge>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}