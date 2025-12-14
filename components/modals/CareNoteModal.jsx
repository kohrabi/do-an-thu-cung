"use client";
import { useState } from "react";
import { 
  FileText, 
  X, 
  Save, 
  Loader2, 
  PawPrint, 
  Hospital, 
  Clock, 
  User,
  ClipboardList,
  CheckCircle2,
  Heart
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils.js";

export default function CareNoteModal({ isOpen, onClose, onSuccess, task }) {
  const [noteBefore, setNoteBefore] = useState("");
  const [noteAfter, setNoteAfter] = useState("");
  const [health, setHealth] = useState("");
  const [errors, setErrors] = useState({});

  if (!isOpen || !task) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!noteBefore.trim()) {
      newErrors.noteBefore = "Vui lòng nhập ghi chú trước dịch vụ";
    }
    if (!noteAfter.trim()) {
      newErrors.noteAfter = "Vui lòng nhập ghi chú sau dịch vụ";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (onSuccess) {
      onSuccess({
        taskId: task.id,
        noteData: { noteBefore, noteAfter, healthObservation: health }
      });
    }
    
    setNoteBefore("");
    setNoteAfter("");
    setHealth("");
    setErrors({});
    onClose();
  };

  // Lấy giá trị với nhiều fallback
  const petName = task.petName || task.name || task.pet?.name || 'TÊN KHÔNG CÓ';
  const petType = task.petType || task.type || task.breed || task.pet?.type || 'LOẠI KHÔNG CÓ';
  const ownerName = task.ownerName || task.owner || task.customer || task.customerName || 'CHỦ KHÔNG CÓ';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle>Ghi chú chăm sóc</DialogTitle>
          </div>
        </DialogHeader>

        {/* Pet Info Card */}
        <div className="p-5 bg-pink-50 rounded-lg border-2 border-pink-200">
          <div className="flex items-center gap-5 mb-5 flex-wrap">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-5xl shadow-md shrink-0">
              {task.petIcon || task.icon || '🐾'}
            </div>
            <div className="flex-1 min-w-[200px]">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {petName}
              </h3>
              <p className="text-base text-muted-foreground">
                {petType}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Dịch vụ
              </p>
              <p className="text-sm font-semibold text-foreground">
                {task.serviceIcon || '🛁'} {task.service || task.serviceName || 'Không có'}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Giờ
              </p>
              <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {task.time || task.startTime || 'Không có'}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Chủ nuôi
              </p>
              <p className="text-sm font-semibold text-foreground flex items-center gap-1 truncate">
                <User className="h-4 w-4" />
                {ownerName}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
              Ghi chú trước dịch vụ
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              value={noteBefore}
              onChange={(e) => {
                setNoteBefore(e.target.value);
                if (errors.noteBefore) {
                  setErrors(prev => ({ ...prev, noteBefore: "" }));
                }
              }}
              placeholder="Tình trạng ban đầu của thú cưng..."
              rows={4}
              className={cn(errors.noteBefore && "border-destructive")}
            />
            {errors.noteBefore && (
              <p className="text-sm text-destructive">{errors.noteBefore}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              Ghi chú sau dịch vụ
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              value={noteAfter}
              onChange={(e) => {
                setNoteAfter(e.target.value);
                if (errors.noteAfter) {
                  setErrors(prev => ({ ...prev, noteAfter: "" }));
                }
              }}
              placeholder="Quá trình thực hiện..."
              rows={4}
              className={cn(errors.noteAfter && "border-destructive")}
            />
            {errors.noteAfter && (
              <p className="text-sm text-destructive">{errors.noteAfter}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              Quan sát sức khỏe
            </Label>
            <Textarea
              value={health}
              onChange={(e) => setHealth(e.target.value)}
              placeholder="Nhiệt độ, nhịp thở..."
              rows={4}
            />
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              Hủy
            </Button>
            <Button
              type="submit"
            >
              <Save className="h-4 w-4" />
              Lưu ghi chú
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

