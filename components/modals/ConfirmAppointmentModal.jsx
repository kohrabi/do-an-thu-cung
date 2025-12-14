"use client";
import { 
  CheckCircle2, 
  X, 
  ArrowLeft, 
  AlertTriangle, 
  User, 
  Phone, 
  PawPrint, 
  Calendar, 
  Clock,
  Hash
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils.js";

export default function ConfirmAppointmentModal({ isOpen, onClose, appointment, onConfirm }) {
  if (!isOpen || !appointment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <DialogTitle>Xác nhận lịch hẹn</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Appointment Info Card */}
          <div className="p-5 bg-green-50 rounded-lg border-2 border-green-200">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-green-700" />
                <div>
                  <p className="text-xs font-semibold text-green-800 uppercase">Khách hàng</p>
                  <p className="text-sm font-bold text-green-900">{appointment.customerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-700" />
                <div>
                  <p className="text-xs font-semibold text-green-800 uppercase">Số điện thoại</p>
                  <p className="text-sm font-bold text-green-900">{appointment.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PawPrint className="h-5 w-5 text-green-700" />
                <div>
                  <p className="text-xs font-semibold text-green-800 uppercase">Thú cưng</p>
                  <p className="text-sm font-bold text-green-900">
                    {appointment.petIcon || "🐾"} {appointment.petName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{appointment.serviceIcon || "🏥"}</span>
                <div>
                  <p className="text-xs font-semibold text-green-800 uppercase">Dịch vụ</p>
                  <p className="text-sm font-bold text-green-900">{appointment.service}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-green-700" />
                <div>
                  <p className="text-xs font-semibold text-green-800 uppercase">Ngày & Giờ</p>
                  <p className="text-sm font-bold text-green-900">
                    {appointment.date} - {appointment.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Hash className="h-5 w-5 text-green-700" />
                <div>
                  <p className="text-xs font-semibold text-green-800 uppercase">Mã lịch</p>
                  <p className="text-sm font-bold text-green-900 font-mono">{appointment.id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Box */}
          <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg flex gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-700 shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-900 leading-relaxed">
              Sau khi xác nhận, hệ thống sẽ gửi thông báo cho khách hàng qua email và SMS.
            </p>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
          >
            <CheckCircle2 className="h-4 w-4" />
            Xác nhận lịch
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

