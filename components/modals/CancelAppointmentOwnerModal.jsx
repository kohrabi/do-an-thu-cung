"use client";
import { useState } from "react";
import { 
  AlertTriangle, 
  X, 
  ArrowLeft, 
  Check, 
  Loader2, 
  PawPrint, 
  Hospital, 
  Calendar, 
  Clock,
  FileText,
  Lightbulb
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils.js";

export default function CancelAppointmentOwnerModal({ isOpen, onClose, onSuccess, appointment }) {
  const [cancelReason, setCancelReason] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const predefinedReasons = [
    { value: "schedule_conflict", label: "Trùng lịch, không thể sắp xếp", icon: Calendar },
    { value: "pet_sick", label: "Thú cưng bị ốm, không thể đi", icon: AlertTriangle },
    { value: "emergency", label: "Có việc đột xuất khẩn cấp", icon: AlertTriangle },
    { value: "change_service", label: "Muốn thay đổi dịch vụ khác", icon: Hospital },
    { value: "change_mind", label: "Không muốn sử dụng dịch vụ nữa", icon: FileText },
    { value: "other", label: "Lý do khác", icon: FileText }
  ];

  const handleReasonSelect = (value) => {
    setSelectedReason(value);
    setError("");
    
    if (value !== "other") {
      setCancelReason("");
    }
  };

  const validateForm = () => {
    if (!selectedReason) {
      setError("Vui lòng chọn lý do hủy lịch");
      return false;
    }

    if (selectedReason === "other" && !cancelReason.trim()) {
      setError("Vui lòng nhập lý do hủy lịch");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const finalReason = selectedReason === "other" 
      ? cancelReason 
      : predefinedReasons.find(r => r.value === selectedReason)?.label;

    setTimeout(() => {
      setLoading(false);
      onSuccess({
        appointmentId: appointment.id,
        reason: finalReason,
        cancelledAt: new Date().toISOString()
      });
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    if (!loading) {
      setCancelReason("");
      setSelectedReason("");
      setError("");
      onClose();
    }
  };

  if (!isOpen || !appointment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle>Hủy lịch đặt</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Bạn có chắc chắn muốn hủy lịch này?
              </p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Appointment Info */}
          <div className="p-5 bg-orange-50 rounded-lg border-2 border-orange-200">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Thông tin lịch đặt
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">{appointment.petIcon || "🐾"}</div>
              <div className="flex-1">
                <p className="text-lg font-bold text-foreground mb-1">
                  {appointment.petName}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>{appointment.serviceIcon || "🏥"}</span>
                  <span>{appointment.serviceName}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-4 pt-4 border-t border-orange-200">
              <div className="flex-1">
                <p className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Ngày
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {appointment.date}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Giờ
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {appointment.time}
                </p>
              </div>
            </div>
          </div>

          {/* Reason Selection */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Lý do hủy lịch
              <span className="text-destructive">*</span>
            </Label>

            {/* Predefined Reasons */}
            <div className="grid grid-cols-1 gap-3">
              {predefinedReasons.map(reason => {
                const ReasonIcon = reason.icon;
                const isSelected = selectedReason === reason.value;
                return (
                  <label
                    key={reason.value}
                    className={cn(
                      "p-4 rounded-lg border-2 cursor-pointer transition-all",
                      "flex items-center gap-3",
                      isSelected
                        ? "bg-red-50 border-red-200"
                        : "bg-background border-input hover:border-red-200 hover:bg-red-50/50"
                    )}
                  >
                    <input
                      type="radio"
                      name="cancelReason"
                      value={reason.value}
                      checked={isSelected}
                      onChange={() => handleReasonSelect(reason.value)}
                      className="sr-only"
                    />
                    <ReasonIcon className={cn(
                      "h-5 w-5",
                      isSelected ? "text-red-600" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "text-sm font-medium flex-1",
                      isSelected ? "text-red-900 font-semibold" : "text-foreground"
                    )}>
                      {reason.label}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Custom Reason Input */}
            {selectedReason === "other" && (
              <div className="mt-4">
                <Textarea
                  value={cancelReason}
                  onChange={(e) => {
                    setCancelReason(e.target.value);
                    setError("");
                  }}
                  placeholder="Nhập lý do hủy lịch của bạn..."
                  rows={4}
                  className={cn(error && "border-destructive")}
                />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 rounded-lg border border-red-200 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <p className="text-sm text-red-900 font-medium">
                  {error}
                </p>
              </div>
            )}

            {/* Warning Box */}
            <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <p className="text-sm font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Lưu ý khi hủy lịch
              </p>
              <ul className="text-xs text-yellow-900 space-y-1 list-disc list-inside leading-relaxed">
                <li>Lịch hẹn sẽ bị hủy ngay lập tức</li>
                <li>Bạn có thể đặt lịch mới bất cứ lúc nào</li>
                <li>Nếu đã thanh toán, vui lòng liên hệ quản lý để hoàn tiền</li>
                <li>Thú cưng của bạn sẽ không được phục vụ vào thời gian này</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Xác nhận hủy lịch
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
