"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import CareNoteModal from "@/components/modals/CareNoteModal";
import { ClipboardList, Clock, RefreshCw, CheckCircle2, Play, FileText, AlertCircle, PawPrint, Cat, Bath, Scissors, Sparkles, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function CareStaffTodayPage() {
  const [todayTasks, setTodayTasks] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  useEffect(() => {
    loadTodayTasks();
  }, []);

  const loadTodayTasks = () => {
    setTodayTasks([
      {
        id: "TASK001",
        time: "09:00 AM",
        type: "service",
        title: "Tắm & Spa cho Lucky",
        petName: "Lucky",
        petIcon: "🐕",
        petType: "Chó Golden Retriever",
        ownerName: "Nguyễn Văn A",
        ownerPhone: "0901234567",
        service: "Tắm & Spa",
        serviceIcon: "🛁",
        status: "completed",
        priority: "normal",
        notes: "Đã hoàn thành tốt"
      },
      {
        id: "TASK002",
        time: "10:30 AM",
        type: "service",
        title: "Cắt tỉa lông cho Miu",
        petName: "Miu",
        petIcon: "🐈",
        petType: "Mèo Ba Tư",
        ownerName: "Trần Thị B",
        ownerPhone: "0909876543",
        service: "Cắt tỉa lông",
        serviceIcon: "✂️",
        status: "in_progress",
        priority: "high",
        notes: ""
      },
      {
        id: "TASK003",
        time: "02:00 PM",
        type: "service",
        title: "Vệ sinh tai cho Coco",
        petName: "Coco",
        petIcon: "🐩",
        petType: "Chó Poodle",
        ownerName: "Lê Văn C",
        ownerPhone: "0912345678",
        service: "Vệ sinh tai",
        serviceIcon: "🧼",
        status: "pending",
        priority: "normal",
        notes: ""
      },
      {
        id: "TASK004",
        time: "03:30 PM",
        type: "service",
        title: "Chải lông cho Max",
        petName: "Max",
        petIcon: "🐕",
        petType: "Chó Husky",
        ownerName: "Phạm Thị D",
        ownerPhone: "0923456789",
        service: "Chải lông",
        serviceIcon: "🪮",
        status: "pending",
        priority: "high",
        notes: ""
      },
      {
        id: "TASK005",
        time: "04:30 PM",
        type: "reminder",
        title: "Kiểm tra dụng cụ",
        description: "Kiểm tra và vệ sinh dụng cụ chăm sóc",
        status: "pending",
        priority: "normal"
      },
      {
        id: "TASK006",
        time: "05:00 PM",
        type: "reminder",
        title: "Cập nhật báo cáo",
        description: "Hoàn thiện báo cáo công việc trong ngày",
        status: "pending",
        priority: "high"
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleStartTask = (taskId) => {
    setTodayTasks(todayTasks.map(task =>
      task.id === taskId ? { ...task, status: "in_progress" } : task
    ));
    showToast("Đã bắt đầu công việc!");
  };

  const handleCompleteTask = (taskId) => {
    setTodayTasks(todayTasks.map(task =>
      task.id === taskId ? { ...task, status: "completed" } : task
    ));
    showToast("Đã hoàn thành công việc!");
  };

  const handleOpenNoteModal = (task) => {
    setSelectedTask(task);
    setIsNoteModalOpen(true);
  };

  const handleNoteSuccess = (data) => {
    showToast("Đã lưu ghi chú chăm sóc!");
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

  const getServiceIcon = (icon) => {
    switch (icon) {
      case '🛁': return Bath;
      case '✂️': return Scissors;
      case '🧼': return Sparkles;
      case '🪮': return Sparkles;
      default: return Sparkles;
    }
  };

  const stats = {
    total: todayTasks.length,
    pending: todayTasks.filter(t => t.status === 'pending').length,
    inProgress: todayTasks.filter(t => t.status === 'in_progress').length,
    completed: todayTasks.filter(t => t.status === 'completed').length
  };

  return (
    <div className="flex-1 space-y-8 p-8">
      <DashboardHeader
        title="Công việc hôm nay"
        subtitle="Danh sách công việc chi tiết - Thứ Hai, 27/10/2025"
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

      {/* Tasks List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary" />
            Chi tiết công việc hôm nay
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
                <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="ml-1 text-sm font-semibold">{task.time}</span>
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

                  {task.type === 'service' && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground">
                        <PetIcon className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{task.petName} - {task.petType}</span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" /> {task.ownerName}
                      </span>
                      {ServiceIcon && (
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <ServiceIcon className="h-3 w-3" /> {task.service}
                        </span>
                      )}
                    </div>
                  )}

                  {task.type === 'reminder' && task.description && (
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  )}

                  {task.notes && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <FileText className="h-3 w-3" />
                      <span>{task.notes}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {task.status === 'pending' && (
                    <Button size="sm" onClick={() => handleStartTask(task.id)}>
                      <Play className="h-4 w-4 mr-2" /> Bắt đầu
                    </Button>
                  )}
                  
                  {task.status === 'in_progress' && task.type === 'service' && (
                    <>
                      <Button variant="outline" size="sm" onClick={() => handleOpenNoteModal(task)}>
                        <FileText className="h-4 w-4 mr-2" /> Ghi chú
                      </Button>
                      <Button variant="success" size="sm" onClick={() => handleCompleteTask(task.id)}>
                        <CheckCircle2 className="h-4 w-4 mr-2" /> Hoàn thành
                      </Button>
                    </>
                  )}
                  
                  {task.status === 'in_progress' && task.type === 'reminder' && (
                    <Button variant="success" size="sm" onClick={() => handleCompleteTask(task.id)}>
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Hoàn thành
                    </Button>
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
