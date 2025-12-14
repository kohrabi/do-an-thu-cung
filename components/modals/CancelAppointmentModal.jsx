"use client";
import { useState } from "react";
import { 
  XCircle, 
  X, 
  ArrowLeft, 
  AlertTriangle, 
  PawPrint, 
  Calendar, 
  Clock,
  FileText
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils.js";

export default function CancelAppointmentModal({ isOpen, onClose, appointment, onCancel }) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  if (!isOpen || !appointment) return null;

  const handleSubmit = () => {
    if (!reason.trim()) {
      setError("Vui lòng nhập lý do hủy lịch hẹn");
      return;
    }
    onCancel(reason);
    setReason("");
    setError("");
  };

  const handleClose = () => {
    setReason("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle>Hủy lịch hẹn</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Appointment Info Card */}
          <div className="p-5 bg-red-50 rounded-lg border-2 border-red-200">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <PawPrint className="h-5 w-5 text-red-700" />
                <strong className="text-red-900">{appointment.customerName}</strong>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">{appointment.serviceIcon || "🏥"}</span>
                <span className="text-sm text-red-800">
                  {appointment.service} - {appointment.date} {appointment.time}
                </span>
              </div>
            </div>
          </div>

          {/* Reason Input */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Lý do hủy
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              className={cn(
                "min-h-[120px]",
                error && "border-destructive"
              )}
              placeholder="Nhập lý do hủy lịch hẹn..."
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setError("");
              }}
            />
            {error && (
              <p className="text-sm text-destructive flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                {error}
              </p>
            )}
          </div>

          {/* Alert Box */}
          <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg flex gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-700 shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-900 leading-relaxed">
              Lịch hẹn sẽ bị hủy và không thể khôi phục. Khách hàng sẽ nhận được thông báo hủy.
            </p>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleSubmit}
          >
            <XCircle className="h-4 w-4" />
            Xác nhận hủy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

