"use client";
import { useState, useEffect } from "react";
import { 
  Edit, 
  X, 
  Save, 
  Loader2, 
  PawPrint, 
  Hospital, 
  Calendar, 
  Clock, 
  User,
  FileText,
  Briefcase,
  Lightbulb,
  Hourglass,
  CheckCircle2,
  RefreshCw,
  XCircle
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils.js";

export default function EditAppointmentModal({ isOpen, onClose, onSuccess, appointment }) {
  const [formData, setFormData] = useState({
    status: "",
    assignedStaff: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (appointment && isOpen) {
      setFormData({
        status: appointment.status || "pending",
        assignedStaff: appointment.assignedStaff || "",
        notes: appointment.notes || ""
      });
      setErrors({});
    }
  }, [appointment, isOpen]);

  const statuses = [
    { value: "pending", label: "Đang chờ", icon: Hourglass, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
    { value: "confirmed", label: "Đã xác nhận", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
    { value: "in_progress", label: "Đang thực hiện", icon: RefreshCw, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    { value: "completed", label: "Hoàn thành", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
    { value: "cancelled", label: "Đã hủy", icon: XCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" }
  ];

  const staffList = [
    { value: "", label: "-- Chưa phân công --" },
    { value: "staff1", label: "Nguyễn Văn A - Bác sĩ thú y" },
    { value: "staff2", label: "Trần Thị B - Nhân viên chăm sóc" },
    { value: "staff3", label: "Lê Văn C - Bác sĩ thú y" },
    { value: "staff4", label: "Phạm Thị D - Nhân viên chăm sóc" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleStatusChange = (statusValue) => {
    setFormData(prev => ({ ...prev, status: statusValue }));
    if (errors.status) {
      setErrors(prev => ({ ...prev, status: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.status) {
      newErrors.status = "Vui lòng chọn trạng thái";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      onSuccess(formData);
      onClose();
    }, 1000);
  };

  if (!isOpen || !appointment) return null;

  const currentStatus = statuses.find(s => s.value === formData.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Edit className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle>Cập nhật lịch đặt</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pet Info Card */}
          <div className="p-5 bg-pink-50 rounded-lg border-2 border-pink-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-md">
                {appointment.petIcon || "🐾"}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {appointment.petName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {appointment.petType || 'Thông tin pet'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white p-4 rounded-lg">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Dịch vụ
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {appointment.service}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Ngày giờ
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {appointment.date} • {appointment.time}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Chủ nuôi
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {appointment.owner}
                </p>
              </div>
            </div>
          </div>

          {/* Status Selection */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              Trạng thái
              <span className="text-destructive">*</span>
            </Label>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {statuses.map(status => {
                const StatusIcon = status.icon;
                const isSelected = formData.status === status.value;
                return (
                  <label
                    key={status.value}
                    className={cn(
                      "p-3 rounded-lg border-2 cursor-pointer transition-all",
                      "flex items-center gap-2",
                      isSelected
                        ? `${status.bg} ${status.border} border-2`
                        : "bg-background border-input hover:border-primary/50"
                    )}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={status.value}
                      checked={isSelected}
                      onChange={() => handleStatusChange(status.value)}
                      className="sr-only"
                    />
                    <StatusIcon className={cn(
                      "h-4 w-4",
                      isSelected ? status.color : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "text-sm font-semibold",
                      isSelected ? status.color : "text-muted-foreground"
                    )}>
                      {status.label}
                    </span>
                  </label>
                );
              })}
            </div>

            {errors.status && (
              <p className="text-sm text-destructive flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                {errors.status}
              </p>
            )}

            {/* Status Flow Info */}
            <div className="p-3 bg-muted rounded-lg border border-border">
              <p className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-2">
                <Lightbulb className="h-3 w-3" />
                Luồng trạng thái:
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Đang chờ → Đã xác nhận → Đang thực hiện → Hoàn thành
              </p>
            </div>
          </div>

          {/* Assigned Staff */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              Phân công nhân viên
            </Label>
            <Select
              name="assignedStaff"
              value={formData.assignedStaff}
              onChange={handleChange}
            >
              {staffList.map(staff => (
                <option key={staff.value} value={staff.value}>
                  {staff.label}
                </option>
              ))}
            </Select>
            <p className="text-xs text-muted-foreground italic">
              Dịch vụ y tế chỉ được phân cho bác sĩ thú y
            </p>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Ghi chú quản lý
            </Label>
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Ghi chú nội bộ về lịch hẹn..."
              rows={4}
            />
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              <X className="h-4 w-4" />
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Đang cập nhật...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Cập nhật
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

