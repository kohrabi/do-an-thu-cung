"use client";
import { useState } from "react";
import { 
  ClipboardList, 
  X, 
  Check, 
  PawPrint, 
  Hospital, 
  Calendar, 
  Clock, 
  FileText,
  Loader2,
  Hourglass,
  CheckCircle2,
  RefreshCw,
  XCircle
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils.js";

export default function AppointmentDetailModal({ isOpen, onClose, appointment }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !appointment) return null;

  const getStatusBadge = (status) => {
    const badges = {
      pending: { 
        label: "Sắp tới", 
        icon: Hourglass, 
        color: "text-yellow-600", 
        bg: "bg-yellow-50", 
        border: "border-yellow-200" 
      },
      confirmed: { 
        label: "Đã xác nhận", 
        icon: CheckCircle2, 
        color: "text-green-600", 
        bg: "bg-green-50", 
        border: "border-green-200" 
      },
      in_progress: { 
        label: "Đang thực hiện", 
        icon: RefreshCw, 
        color: "text-blue-600", 
        bg: "bg-blue-50", 
        border: "border-blue-200" 
      },
      completed: { 
        label: "Hoàn thành", 
        icon: CheckCircle2, 
        color: "text-green-600", 
        bg: "bg-green-50", 
        border: "border-green-200" 
      },
      cancelled: { 
        label: "Đã hủy", 
        icon: XCircle, 
        color: "text-red-600", 
        bg: "bg-red-50", 
        border: "border-red-200" 
      }
    };
    return badges[status] || badges.pending;
  };

  const handleClose = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 300);
  };

  const statusBadge = getStatusBadge(appointment.status);
  const StatusIcon = statusBadge.icon;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <ClipboardList className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle>Chi tiết lịch đặt</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Appointment Code & Status */}
          <div className="p-4 bg-muted rounded-lg border border-border">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Mã lịch
                </p>
                <p className="text-xl font-bold text-foreground font-mono">
                  {appointment.code}
                </p>
              </div>
              <div className={cn(
                "px-4 py-2 rounded-full flex items-center gap-2",
                statusBadge.bg,
                statusBadge.border,
                "border"
              )}>
                <StatusIcon className={cn("h-4 w-4", statusBadge.color)} />
                <span className={cn("text-sm font-semibold", statusBadge.color)}>
                  {statusBadge.label}
                </span>
              </div>
            </div>
          </div>

          {/* Pet Info */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <PawPrint className="h-4 w-4" />
              Thông tin thú cưng
            </h3>
            <div className="p-4 bg-muted rounded-lg border border-border flex items-center gap-3">
              <div className="text-4xl">{appointment.petIcon || "🐾"}</div>
              <div className="flex-1">
                <p className="text-lg font-bold text-foreground mb-1">
                  {appointment.petName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {appointment.petType || 'Chó'}
                </p>
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Hospital className="h-4 w-4" />
              Dịch vụ
            </h3>
            <div className="p-4 bg-muted rounded-lg border border-border flex items-center gap-3">
              <div className="text-3xl">{appointment.serviceIcon || "🏥"}</div>
              <p className="text-base font-semibold text-foreground">
                {appointment.serviceName}
              </p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Ngày
              </h3>
              <div className="p-4 bg-muted rounded-lg border border-border text-center">
                <p className="text-lg font-bold text-foreground">
                  {appointment.date}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Giờ
              </h3>
              <div className="p-4 bg-muted rounded-lg border border-border text-center">
                <p className="text-lg font-bold text-foreground">
                  {appointment.time}
                </p>
              </div>
            </div>
          </div>

          {/* Status Info */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Hourglass className="h-4 w-4" />
              Trạng thái
            </h3>
            <div className={cn(
              "p-4 rounded-lg border-2 flex items-center gap-3",
              statusBadge.bg,
              statusBadge.border
            )}>
              <StatusIcon className={cn("h-8 w-8", statusBadge.color)} />
              <p className={cn("text-base font-semibold", statusBadge.color)}>
                {statusBadge.label}
              </p>
            </div>
          </div>

          {/* Notes */}
          {appointment.notes && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Ghi chú
              </h3>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-900 leading-relaxed">
                  {appointment.notes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter>
          <Button
            onClick={handleClose}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Đang đóng...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Đóng
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

