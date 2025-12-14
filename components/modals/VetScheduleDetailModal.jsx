// components/modals/VetScheduleDetailModal.jsx
"use client";
import { 
  Eye, 
  X, 
  PawPrint, 
  Hospital, 
  Clock, 
  User, 
  Phone, 
  Cake, 
  Scale, 
  FileText,
  ClipboardList,
  Hash,
  Stethoscope,
  Calendar
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils.js";

export default function VetScheduleDetailModal({ isOpen, onClose, appointment }) {
  if (!isOpen || !appointment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle>Chi tiết ca khám</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient Info */}
          <div className="p-5 bg-card rounded-lg border-2 border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{appointment.petIcon || "🐾"}</div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {appointment.petName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{appointment.petType}</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <Badge variant="outline" className="text-sm flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {appointment.time}
                </Badge>
                <p className="text-xs font-mono text-muted-foreground">{appointment.code}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Cake className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Tuổi</p>
                  <p className="text-sm font-bold text-foreground">{appointment.petAge}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Scale className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Cân nặng</p>
                  <p className="text-sm font-bold text-foreground">{appointment.petWeight}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Chủ nuôi</p>
                  <p className="text-sm font-bold text-foreground truncate">{appointment.ownerName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Điện thoại</p>
                  <p className="text-sm font-bold text-foreground">{appointment.ownerPhone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Hospital className="h-4 w-4" />
              Dịch vụ
            </h3>
            <div className="p-4 bg-muted rounded-lg border border-border">
              <p className="text-base font-semibold text-foreground">
                {appointment.serviceIcon || "🏥"} {appointment.serviceName}
              </p>
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              Triệu chứng
            </h3>
            <div className="p-4 bg-muted rounded-lg border border-border">
              <p className="text-sm text-foreground leading-relaxed">{appointment.symptoms}</p>
            </div>
          </div>

          {/* Previous Records */}
          {appointment.previousRecords && appointment.previousRecords.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                Lịch sử khám trước
              </h3>
              <div className="space-y-3">
                {appointment.previousRecords.map((record, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg border border-border">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {record.date}
                    </p>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong className="text-foreground">Chẩn đoán:</strong>{' '}
                        <span className="text-muted-foreground">{record.diagnosis}</span>
                      </p>
                      <p>
                        <strong className="text-foreground">Điều trị:</strong>{' '}
                        <span className="text-muted-foreground">{record.treatment}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {appointment.notes && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Ghi chú bác sĩ
              </h3>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-900 leading-relaxed">{appointment.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter>
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            <X className="h-4 w-4" />
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
