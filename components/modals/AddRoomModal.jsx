// components/modals/AddRoomModal.jsx
"use client";
import { useState } from "react";
import { 
  Plus, 
  X, 
  Check, 
  Loader2, 
  Hash, 
  Home, 
  FileText
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils.js";

export default function AddRoomModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    code: "",
    type: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const roomTypes = [
    { value: "small", label: "Nhỏ", icon: Home, subtitle: "Sức chứa: 1 thú cưng", desc: "Dành cho mèo hoặc chó nhỏ" },
    { value: "medium", label: "Trung", icon: Home, subtitle: "Sức chứa: 2 thú cưng", desc: "Dành cho chó cỡ trung" },
    { value: "large", label: "Lớn", icon: Home, subtitle: "Sức chứa: 3 thú cưng", desc: "Dành cho chó lớn hoặc nhiều thú cưng" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = "Vui lòng nhập mã chuồng";
    }

    if (!formData.type) {
      newErrors.type = "Vui lòng chọn loại chuồng";
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
      
      // Reset form
      setFormData({
        code: "",
        type: "",
        notes: ""
      });
      setErrors({});
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      code: "",
      type: "",
      notes: ""
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Plus className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle>Thêm chuồng mới</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mã chuồng */}
          <Input
            label="Mã chuồng"
            name="code"
            type="text"
            value={formData.code}
            onChange={handleChange}
            placeholder="Ví dụ: A01, B12, C03..."
            error={errors.code}
            icon={Hash}
            required
          />

          {/* Loại chuồng */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              Loại chuồng
              <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {roomTypes.map((room) => {
                const RoomIcon = room.icon;
                const isSelected = formData.type === room.value;
                return (
                  <button
                    key={room.value}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, type: room.value }));
                      if (errors.type) {
                        setErrors(prev => ({ ...prev, type: "" }));
                      }
                    }}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all text-left",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-input bg-background hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <RoomIcon className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-foreground">{room.label}</span>
                      </div>
                      {isSelected && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      {room.subtitle}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {room.desc}
                    </p>
                  </button>
                );
              })}
            </div>
            {errors.type && (
              <p className="text-sm text-destructive">{errors.type}</p>
            )}
          </div>

          {/* Ghi chú */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Ghi chú
            </Label>
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Ghi chú về vị trí, đặc điểm..."
              rows={3}
            />
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
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
                  Đang thêm...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Thêm chuồng
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
