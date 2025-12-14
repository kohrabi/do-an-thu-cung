// components/modals/CageDetailModal.jsx
"use client";
import { 
  Eye, 
  X, 
  BarChart3, 
  PawPrint, 
  FileText, 
  Home, 
  HomeIcon,
  CheckCircle2,
  AlertCircle,
  XCircle,
  User,
  Calendar
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils.js";

export default function CageDetailModal({ isOpen, onClose, cage }) {
  if (!isOpen || !cage) return null;

  const getCageTypeLabel = (type) => {
    const labels = {
      small: "Chuồng nhỏ",
      medium: "Chuồng trung",
      large: "Chuồng lớn"
    };
    return labels[type] || type;
  };

  const getCageTypeIcon = (type) => {
    return Home;
  };

  const getStatusBadge = (status) => {
    const badges = {
      available: { 
        label: "Trống", 
        icon: CheckCircle2, 
        color: "text-green-600", 
        bg: "bg-green-50", 
        border: "border-green-200" 
      },
      occupied: { 
        label: "Đang sử dụng", 
        icon: AlertCircle, 
        color: "text-yellow-600", 
        bg: "bg-yellow-50", 
        border: "border-yellow-200" 
      },
      maintenance: { 
        label: "Bảo trì", 
        icon: XCircle, 
        color: "text-red-600", 
        bg: "bg-red-50", 
        border: "border-red-200" 
      }
    };
    return badges[status] || badges.available;
  };

  const statusBadge = getStatusBadge(cage.status);
  const StatusIcon = statusBadge.icon;
  const CageTypeIcon = getCageTypeIcon(cage.type);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle>Chi tiết chuồng {cage.code}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cage Info Card */}
          <div className="p-5 bg-card rounded-lg border-2 border-border">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CageTypeIcon className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold text-foreground font-mono">{cage.code}</span>
                </div>
                <p className="text-sm text-muted-foreground">{getCageTypeLabel(cage.type)}</p>
              </div>
              <div className={cn(
                "px-4 py-2 rounded-full flex items-center gap-2 border",
                statusBadge.bg,
                statusBadge.border
              )}>
                <StatusIcon className={cn("h-4 w-4", statusBadge.color)} />
                <span className={cn("text-sm font-semibold", statusBadge.color)}>
                  {statusBadge.label}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Sức chứa</p>
                  <p className="text-sm font-bold text-foreground">{cage.capacity} thú cưng</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <PawPrint className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Đang ở</p>
                  <p className="text-sm font-bold text-foreground">
                    {cage.pets?.length || 0} / {cage.capacity}
                  </p>
                </div>
              </div>
            </div>

            {cage.notes && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-xs font-semibold text-yellow-900 mb-1 flex items-center gap-2">
                  <FileText className="h-3 w-3" />
                  Ghi chú:
                </p>
                <p className="text-sm text-yellow-900">{cage.notes}</p>
              </div>
            )}
          </div>

          {/* Pets in Cage */}
          {cage.status === 'occupied' && cage.pets && cage.pets.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <PawPrint className="h-4 w-4" />
                Thú cưng đang ở chuồng
              </h3>

              <div className="space-y-3">
                {cage.pets.map((pet, idx) => (
                  <div key={idx} className="p-4 bg-muted rounded-lg border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl">{pet.icon || "🐾"}</div>
                      <div className="flex-1">
                        <p className="text-base font-bold text-foreground">{pet.name}</p>
                        <p className="text-sm text-muted-foreground">{pet.breed}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Chủ:</span>
                        <span className="font-semibold text-foreground">{pet.ownerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Check-in:</span>
                        <span className="font-semibold text-foreground">{pet.checkInDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Check-out:</span>
                        <span className="font-semibold text-foreground">{pet.checkOutDate || 'Chưa xác định'}</span>
                      </div>
                    </div>
                  </div>
                ))}
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

