// components/modals/VetPatientDetailModal.jsx
"use client";
import { 
  Eye, 
  X, 
  PawPrint, 
  BarChart3, 
  Scale, 
  Palette, 
  Cake, 
  User, 
  Phone,
  Calendar,
  Hash,
  FileText,
  TrendingUp
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils.js";

export default function VetPatientDetailModal({ isOpen, onClose, patient }) {
  if (!isOpen || !patient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <PawPrint className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle>Hồ sơ bệnh nhân</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient Profile Card */}
          <div className="p-5 bg-card rounded-lg border-2 border-border">
            <div className="flex items-center gap-5 mb-5">
              <div className="text-6xl w-24 h-24 flex items-center justify-center bg-background rounded-full shadow-md shrink-0">
                {patient.icon || "🐾"}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {patient.name}
                </h1>
                <p className="text-base text-muted-foreground mb-3">
                  {patient.breed}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-sm">
                    {patient.type === 'dog' ? '🐕 Chó' : '🐈 Mèo'}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {patient.gender}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {patient.age}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Thông tin cơ bản
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Scale className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Cân nặng</p>
                    <p className="text-sm font-bold text-foreground">{patient.weight}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Palette className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Màu lông</p>
                    <p className="text-sm font-bold text-foreground">{patient.color}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Cake className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Ngày sinh</p>
                    <p className="text-sm font-bold text-foreground">{patient.dateOfBirth}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Thông tin chủ nuôi
              </h3>
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm flex items-center gap-2">
                  <span className="text-muted-foreground">Họ tên:</span>
                  <span className="font-semibold text-foreground">{patient.ownerName}</span>
                </p>
                <p className="text-sm flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Điện thoại:</span>
                  <span className="font-semibold text-foreground">{patient.ownerPhone}</span>
                </p>
              </div>
            </div>

            {/* Visit Stats */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Thống kê khám
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Lần khám gần nhất</p>
                    <p className="text-sm font-bold text-foreground">{patient.lastVisit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Hash className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Tổng số lần khám</p>
                    <p className="text-sm font-bold text-foreground">{patient.totalVisits} lần</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical History */}
            {patient.medicalHistory && patient.medicalHistory.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Lịch sử khám bệnh
                </h3>
                <div className="space-y-3">
                  {patient.medicalHistory.map((record, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg border border-border">
                      <div className="mb-2">
                        <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {record.date}
                        </p>
                      </div>
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
