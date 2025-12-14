// components/modals/VetRecordDetailModal.jsx
"use client";
import { 
  ClipboardList, 
  X, 
  Calendar, 
  User, 
  Phone, 
  PawPrint, 
  Stethoscope, 
  Microscope, 
  Pill, 
  Syringe, 
  FileText, 
  RefreshCw,
  CheckCircle2,
  Hourglass,
  Hash
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils.js";

export default function VetRecordDetailModal({ isOpen, onClose, record }) {
  if (!isOpen || !record) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <ClipboardList className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle>Chi tiết hồ sơ bệnh án</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Record Header */}
          <div className="p-4 bg-muted rounded-lg border border-border">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold text-foreground font-mono">{record.code}</span>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {record.date}
                </p>
              </div>
              <Badge variant="outline" className="text-sm">
                {record.veterinarianName}
              </Badge>
            </div>
          </div>

          {/* Patient Info Card */}
          <div className="p-5 bg-card rounded-lg border-2 border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">{record.petIcon || "🐾"}</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {record.petName}
                </h3>
                <p className="text-sm text-muted-foreground">{record.petType}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-border space-y-2">
              <p className="text-sm flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Chủ nuôi:</span>
                <span className="font-semibold text-foreground">{record.ownerName}</span>
              </p>
              <p className="text-sm flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Điện thoại:</span>
                <span className="font-semibold text-foreground">{record.ownerPhone}</span>
              </p>
            </div>
          </div>

          {/* Medical Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                Triệu chứng
              </h3>
              <div className="p-4 bg-muted rounded-lg border border-border">
                <p className="text-sm text-foreground leading-relaxed">{record.symptoms}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                <Microscope className="h-4 w-4" />
                Chẩn đoán
              </h3>
              <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <p className="text-sm font-semibold text-blue-900 leading-relaxed">{record.diagnosis}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                <Pill className="h-4 w-4" />
                Đơn thuốc
              </h3>
              <div className="p-4 bg-muted rounded-lg border border-border">
                <p className="text-sm text-foreground leading-relaxed">{record.prescription}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                <Syringe className="h-4 w-4" />
                Điều trị
              </h3>
              <div className="p-4 bg-muted rounded-lg border border-border">
                <p className="text-sm text-foreground leading-relaxed">{record.treatment}</p>
              </div>
            </div>

            {record.notes && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Ghi chú
                </h3>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-900 leading-relaxed">{record.notes}</p>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Lịch tái khám
              </h3>
              <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <p className="text-sm font-semibold text-green-900 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {record.followUpDate}
                </p>
              </div>
            </div>
          </div>

          {/* Invoice Status */}
          <div className="p-4 bg-muted rounded-lg border border-border">
            {record.invoiceCreated ? (
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Hóa đơn</p>
                  <p className="text-sm font-bold text-foreground">Đã tạo - {record.invoiceId}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Hourglass className="h-6 w-6 text-yellow-600" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Hóa đơn</p>
                  <p className="text-sm font-bold text-foreground">Chưa tạo</p>
                </div>
              </div>
            )}
          </div>
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

