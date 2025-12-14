// components/modals/ServiceNoteModal.jsx
"use client";
import { useState, useEffect } from "react";
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
  Heart,
  Lightbulb
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils.js";

export default function ServiceNoteModal({ isOpen, onClose, onSuccess, task }) {
  const [formData, setFormData] = useState({
    noteBefore: "",
    noteAfter: "",
    healthObservation: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task && isOpen) {
      setFormData({
        noteBefore: task.noteBefore || "",
        noteAfter: task.noteAfter || "",
        healthObservation: task.healthObservation || ""
      });
    }
  }, [task, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.noteBefore.trim()) {
      newErrors.noteBefore = "Vui lòng nhập ghi chú trước dịch vụ";
    }
    if (!formData.noteAfter.trim()) {
      newErrors.noteAfter = "Vui lòng nhập ghi chú sau dịch vụ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({ taskId: task.id, noteData: formData });
      setFormData({ noteBefore: "", noteAfter: "", healthObservation: "" });
      setErrors({});
      onClose();
    }, 1000);
  };

  if (!isOpen || !task) return null;

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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pet Info Card */}
          <div className="p-5 bg-pink-50 rounded-lg border-2 border-pink-200">
            <div className="flex items-center gap-5 mb-5 flex-wrap">
              <div className="text-5xl w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-md shrink-0">
                {task.petIcon || "🐾"}
              </div>
              <div className="flex-1 min-w-[200px]">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {task.petName}
                </h3>
                <p className="text-base text-muted-foreground">
                  {task.petType}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{task.serviceIcon || "🛁"}</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    Dịch vụ
                  </p>
                  <p className="text-sm font-semibold text-foreground truncate">
                    {task.service}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-7 w-7 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    Giờ
                  </p>
                  <p className="text-sm font-semibold text-foreground truncate">
                    {task.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="h-7 w-7 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                    Chủ nuôi
                  </p>
                  <p className="text-sm font-semibold text-foreground truncate">
                    {task.ownerName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Note Before */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
              Ghi chú trước dịch vụ
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              name="noteBefore"
              value={formData.noteBefore}
              onChange={handleChange}
              placeholder="Tình trạng ban đầu của thú cưng, điều kiện khi tiếp nhận..."
              rows={4}
              className={cn(errors.noteBefore && "border-destructive")}
            />
            {errors.noteBefore && (
              <p className="text-sm text-destructive">{errors.noteBefore}</p>
            )}
            <p className="text-xs text-muted-foreground italic flex items-center gap-1">
              <Lightbulb className="h-3 w-3" />
              Ghi nhận tình trạng sức khỏe, hành vi, và mọi điều bất thường trước khi bắt đầu dịch vụ
            </p>
          </div>

          {/* Note After */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              Ghi chú sau dịch vụ
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              name="noteAfter"
              value={formData.noteAfter}
              onChange={handleChange}
              placeholder="Quá trình thực hiện, phản ứng của thú cưng, kết quả..."
              rows={4}
              className={cn(errors.noteAfter && "border-destructive")}
            />
            {errors.noteAfter && (
              <p className="text-sm text-destructive">{errors.noteAfter}</p>
            )}
            <p className="text-xs text-muted-foreground italic flex items-center gap-1">
              <Lightbulb className="h-3 w-3" />
              Mô tả chi tiết quá trình chăm sóc và phản ứng của thú cưng
            </p>
          </div>

          {/* Health Observation */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              Quan sát sức khỏe
            </Label>
            <Textarea
              name="healthObservation"
              value={formData.healthObservation}
              onChange={handleChange}
              placeholder="Nhiệt độ, nhịp thở, tình trạng da lông, dấu hiệu bất thường..."
              rows={4}
            />
            <p className="text-xs text-muted-foreground italic flex items-center gap-1">
              <Lightbulb className="h-3 w-3" />
              Ghi chú về sức khỏe tổng quát và các dấu hiệu cần lưu ý
            </p>
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
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Lưu ghi chú
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

