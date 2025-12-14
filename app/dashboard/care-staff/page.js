"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import CareNoteModal from "@/components/modals/CareNoteModal";
import QuickActions from "@/components/dashboard/QuickActions";
import StatsCard from "@/components/dashboard/StatsCard";
import { ClipboardList, Clock, RefreshCw, CheckCircle2, Calendar, Sparkles, FileText, Save, Play, PawPrint, Cat, Bath, Scissors, Home, Sparkles as SparklesIcon, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function CareStaffDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalTasks: 0,
    inProgress: 0,
    completed: 0
  });

  const [todayTasks, setTodayTasks] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    setStats({
      totalTasks: 4,
      inProgress: 1,
      completed: 1
    });

    setTodayTasks([
      {
        id: "TASK001",
        time: "09:00 AM",
        petName: "Lucky",
        petIcon: "🐕",
        petType: "Chó Golden Retriever",
        ownerName: "Nguyễn Văn A",
        ownerPhone: "0901234567",
        service: "Tắm & Spa",
        serviceIcon: "🛁",
        status: "completed",
        notes: "Đã hoàn thành tốt"
      },
      {
        id: "TASK002",
        time: "10:30 AM",
        petName: "Miu",
        petIcon: "🐈",
        petType: "Mèo Ba Tư",
        ownerName: "Trần Thị B",
        ownerPhone: "0909876543",
        service: "Cắt tỉa lông",
        serviceIcon: "✂️",
        status: "in_progress",
        notes: "1 ghi chú"
      },
      {
        id: "TASK003",
        time: "02:00 PM",
        petName: "Coco",
        petIcon: "🐩",
        petType: "Chó Poodle",
        ownerName: "Lê Văn C",
        ownerPhone: "0912345678",
        service: "Lưu trú 3 ngày",
        serviceIcon: "🏠",
        status: "pending",
        priority: "high"
      },
      {
        id: "TASK004",
        time: "03:30 PM",
        petName: "Max",
        petIcon: "🐕",
        petType: "Chó Husky",
        ownerName: "Phạm Thị D",
        ownerPhone: "0923456789",
        service: "Chải lông",
        serviceIcon: "🪮",
        status: "pending",
        priority: "normal"
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleSaveNote = () => {
    if (!noteText.trim()) {
      showToast("Vui lòng nhập nội dung ghi chú", "error");
      return;
    }
    showToast("Đã lưu ghi chú thành công!");
    setNoteText("");
  };

  const handleStartTask = (taskId) => {
    setTodayTasks(todayTasks.map(task =>
      task.id === taskId ? { ...task, status: "in_progress" } : task
    ));
    showToast("Đã bắt đầu công việc!");
  };

  const handleOpenNoteModal = (task) => {
    setSelectedTask(task);
    setIsNoteModalOpen(true);
  };

  const handleNoteSuccess = (data) => {
    showToast("Đã lưu ghi chú chăm sóc!");
  };

  const handleCompleteTask = (taskId) => {
    setTodayTasks(todayTasks.map(task =>
      task.id === taskId ? { ...task, status: "completed" } : task
    ));
    showToast("Đã hoàn thành công việc!");
  };

  const quickActions = [
    {
      icon: Calendar,
      label: "Xem lịch làm việc",
      onClick: () => router.push("/dashboard/care-staff/schedule")
    },
    {
      icon: ClipboardList,
      label: "Công việc hôm nay",
      onClick: () => router.push("/dashboard/care-staff/today")
    },
    {
      icon: FileText,
      label: "Ghi chú nhanh",
      onClick: () => {
        document.getElementById('note-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: "Chưa làm", variant: "warning", icon: Clock },
      in_progress: { label: "Đang làm", variant: "info", icon: RefreshCw },
      completed: { label: "Hoàn thành", variant: "success", icon: CheckCircle2 }
    };
    return badges[status] || badges.pending;
  };

  const getServiceIcon = (icon) => {
    switch (icon) {
      case '🛁': return Bath;
      case '✂️': return Scissors;
      case '🏠': return Home;
      case '🪮': return SparklesIcon;
      default: return FileText;
    }
  };

  return (
    <div className="flex-1 space-y-8 p-8">
      <DashboardHeader
        title="Công việc hôm nay"
        subtitle="Quản lý và thực hiện các dịch vụ chăm sóc"
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard icon={ClipboardList} title="Tổng công việc" value={stats.totalTasks} color="primary" />
        <StatsCard icon={RefreshCw} title="Đang thực hiện" value={stats.inProgress} color="info" />
        <StatsCard icon={CheckCircle2} title="Đã hoàn thành" value={stats.completed} color="success" />
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Thao tác nhanh
        </h2>
        <QuickActions actions={quickActions} />
      </div>

      {/* Task List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary" />
            Danh sách công việc
          </h2>
          <Badge variant="secondary">{todayTasks.length} công việc</Badge>
        </div>

        <div className="space-y-3">
          {todayTasks.map((task) => {
            const statusBadge = getStatusBadge(task.status);
            const ServiceIcon = getServiceIcon(task.serviceIcon);
            const PetIcon = task.petIcon === '🐕' ? PawPrint : task.petIcon === '🐈' ? Cat : PawPrint;
            return (
              <Card key={task.id} className="flex items-center gap-4 p-4">
                <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="ml-1 text-sm font-semibold">{task.time}</span>
                </div>
                
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-secondary-foreground">
                    <PetIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{task.petName}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <User className="h-3 w-3" /> {task.ownerName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-1">
                  <ServiceIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{task.service}</span>
                </div>

                <Badge variant={statusBadge.variant} className="flex items-center gap-1">
                  <statusBadge.icon className="h-3 w-3" /> {statusBadge.label}
                </Badge>

                <div className="flex gap-2">
                  {task.status === 'pending' && (
                    <Button size="sm" onClick={() => handleStartTask(task.id)}>
                      <Play className="h-4 w-4 mr-2" /> Bắt đầu
                    </Button>
                  )}

                  {task.status === 'in_progress' && (
                    <>
                      <Button variant="outline" size="sm" onClick={() => handleOpenNoteModal(task)}>
                        <FileText className="h-4 w-4 mr-2" /> Ghi chú
                      </Button>
                      <Button variant="success" size="sm" onClick={() => handleCompleteTask(task.id)}>
                        <CheckCircle2 className="h-4 w-4 mr-2" /> Hoàn thành
                      </Button>
                    </>
                  )}

                  {task.status === 'completed' && (
                    <Badge variant="success">Đã xong</Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Note Section */}
      <Card id="note-section" className="p-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Ghi chú công việc
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Nhập ghi chú về công việc hôm nay..."
            rows={4}
          />
          <Button onClick={handleSaveNote}>
            <Save className="h-4 w-4 mr-2" /> Lưu ghi chú
          </Button>
        </CardContent>
      </Card>

      {/* Modal */}
      {isNoteModalOpen && selectedTask && (
        <CareNoteModal
          isOpen={isNoteModalOpen}
          onClose={() => {
            setIsNoteModalOpen(false);
            setSelectedTask(null);
          }}
          onSuccess={handleNoteSuccess}
          task={selectedTask}
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
