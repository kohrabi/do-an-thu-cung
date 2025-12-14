// components/modals/AddStaffModal.jsx
"use client";
import { useState } from "react";
import { 
  Users, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Lock, 
  X, 
  Check,
  Loader2,
  Eye,
  EyeOff,
  Lightbulb
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Input from "@/components/ui/Input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils.js";

export default function AddStaffModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải có 10 chữ số";
    }

    if (!formData.role) {
      newErrors.role = "Vui lòng chọn vai trò";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu tạm";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
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
        fullName: "",
        email: "",
        phone: "",
        role: "",
        password: ""
      });
      setErrors({});
      setShowPassword(false);
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      role: "",
      password: ""
    });
    setErrors({});
    setShowPassword(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle>Thêm nhân viên mới</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Họ và tên */}
          <Input
            label="Họ và tên"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            error={errors.fullName}
            icon={User}
            required
          />

          {/* Email */}
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="nhanvien@pawlovers.com"
            error={errors.email}
            icon={Mail}
            required
          />

          {/* Số điện thoại */}
          <Input
            label="Số điện thoại"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0901234567"
            maxLength="10"
            error={errors.phone}
            icon={Phone}
            required
          />

          {/* Vai trò */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              Vai trò
              <span className="text-destructive">*</span>
            </Label>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={cn(errors.role && "border-destructive")}
            >
              <option value="">Chọn vai trò</option>
              <option value="veterinarian">Bác sĩ thú y</option>
              <option value="care_staff">Nhân viên chăm sóc</option>
              <option value="receptionist">Lễ tân</option>
            </Select>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role}</p>
            )}
          </div>

          {/* Mật khẩu tạm */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              Mật khẩu tạm
              <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập hoặc tự động tạo"
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10",
                  errors.password && "border-destructive focus-visible:ring-destructive"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lightbulb className="h-3 w-3" />
              <span>Nhân viên nên đổi mật khẩu sau lần đăng nhập đầu tiên</span>
            </div>
          </div>

          {/* Buttons */}
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
                  Thêm nhân viên
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
