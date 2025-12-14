"use client";
import { useState } from "react";
import { 
  Receipt, 
  X, 
  Check, 
  Loader2, 
  PawPrint, 
  Hospital, 
  Calendar, 
  DollarSign,
  CreditCard,
  FileText,
  CheckCircle2,
  Hourglass,
  RefreshCw,
  XCircle
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils.js";

export default function InvoiceDetailModal({ isOpen, onClose, invoice }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !invoice) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount) + ' ₫';
  };

  const getPaymentStatusBadge = (status) => {
    const badges = {
      paid: { 
        label: "Đã thanh toán", 
        icon: CheckCircle2, 
        color: "text-green-600", 
        bg: "bg-green-50", 
        border: "border-green-200" 
      },
      unpaid: { 
        label: "Chưa thanh toán", 
        icon: Hourglass, 
        color: "text-yellow-600", 
        bg: "bg-yellow-50", 
        border: "border-yellow-200" 
      },
      pending: { 
        label: "Đang xử lý", 
        icon: RefreshCw, 
        color: "text-blue-600", 
        bg: "bg-blue-50", 
        border: "border-blue-200" 
      },
      cancelled: { 
        label: "Đã hủy", 
        icon: XCircle, 
        color: "text-red-600", 
        bg: "bg-red-50", 
        border: "border-red-200" 
      }
    };
    return badges[status] || badges.unpaid;
  };

  const handleClose = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 300);
  };

  const statusBadge = getPaymentStatusBadge(invoice.paymentStatus);
  const StatusIcon = statusBadge.icon;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100">
              <Receipt className="h-5 w-5 text-orange-600" />
            </div>
            <DialogTitle>Chi tiết hóa đơn</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invoice Code */}
          <div className="p-4 bg-muted rounded-lg border border-border">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Mã hóa đơn
                </p>
                <p className="text-xl font-bold text-foreground font-mono">
                  {invoice.invoiceCode}
                </p>
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
          </div>

          {/* Service Info */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Hospital className="h-4 w-4" />
              Dịch vụ
            </h3>
            <div className="p-4 bg-muted rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{invoice.serviceIcon || "🏥"}</div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-foreground mb-1">
                    {invoice.serviceName}
                  </p>
                  {invoice.serviceDescription && (
                    <p className="text-sm text-muted-foreground">
                      {invoice.serviceDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pet Info */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <PawPrint className="h-4 w-4" />
              Thú cưng
            </h3>
            <div className="p-4 bg-muted rounded-lg border border-border flex items-center gap-3">
              <div className="text-4xl">{invoice.petIcon || "🐾"}</div>
              <p className="text-base font-semibold text-foreground">
                {invoice.petName}
              </p>
            </div>
          </div>

          {/* Date */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Ngày sử dụng
            </h3>
            <div className="p-4 bg-muted rounded-lg border border-border text-center">
              <p className="text-lg font-bold text-foreground">
                {invoice.serviceDate}
              </p>
            </div>
          </div>

          {/* Amount */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Tổng tiền
            </h3>
            <div className="p-5 bg-red-50 rounded-lg border-2 border-red-200 text-center">
              <p className="text-3xl font-bold text-red-600 font-mono">
                {formatCurrency(invoice.totalAmount)}
              </p>
            </div>
          </div>

          {/* Payment Status */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Trạng thái
            </h3>
            <div className={cn(
              "p-4 rounded-lg border-2 flex items-center justify-center gap-3",
              statusBadge.bg,
              statusBadge.border
            )}>
              <StatusIcon className={cn("h-8 w-8", statusBadge.color)} />
              <p className={cn("text-lg font-bold", statusBadge.color)}>
                {statusBadge.label}
              </p>
            </div>
          </div>

          {/* Payment Method (if paid) */}
          {invoice.paymentMethod && invoice.paymentStatus === 'paid' && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Phương thức thanh toán
              </h3>
              <div className="p-4 bg-muted rounded-lg border border-border text-center">
                <p className="text-sm font-semibold text-foreground">
                  {invoice.paymentMethod}
                </p>
              </div>
            </div>
          )}

          {/* Notes (if any) */}
          {invoice.notes && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Ghi chú
              </h3>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-900 leading-relaxed">
                  {invoice.notes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter>
          <Button
            onClick={handleClose}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Đang đóng...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Đóng
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

