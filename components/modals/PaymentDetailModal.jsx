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
  XCircle,
  Clock
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils.js";

export default function PaymentDetailModal({ isOpen, onClose, invoice }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !invoice) return null;

  const formatCurrency = (amount) => {
    let numAmount = 0;
    
    if (amount !== null && amount !== undefined) {
      numAmount = parseFloat(amount);
      if (isNaN(numAmount)) {
        numAmount = 0;
      }
    }
    
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numAmount) + ' ₫';
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

  const getPaymentMethodLabel = (method) => {
    const methods = {
      cash: "Tiền mặt",
      card: "Thẻ ngân hàng",
      transfer: "Chuyển khoản",
      momo: "Ví MoMo",
      zalopay: "ZaloPay"
    };
    return methods[method] || method || "Chưa có";
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
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              Mã hóa đơn:
            </p>
            <div className="p-3 bg-muted rounded-lg border border-border">
              <p className="text-lg font-bold text-foreground font-mono">
                {invoice.invoiceCode || 'N/A'}
              </p>
            </div>
          </div>

          {/* Service Info */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              Dịch vụ:
            </p>
            <div className="p-4 bg-muted rounded-lg border border-border flex items-center gap-3">
              <div className="text-3xl">{invoice.serviceIcon || '🏥'}</div>
              <p className="text-base font-semibold text-foreground">
                {invoice.serviceName || 'Chưa có tên dịch vụ'}
              </p>
            </div>
          </div>

          {/* Pet Info */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              Thú cưng:
            </p>
            <div className="p-4 bg-muted rounded-lg border border-border flex items-center gap-3">
              <div className="text-4xl">{invoice.petIcon || '🐕'}</div>
              <p className="text-base font-semibold text-foreground">
                {invoice.petName || 'Chưa có tên'}
              </p>
            </div>
          </div>

          {/* Service Date */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              Ngày sử dụng:
            </p>
            <div className="p-3 bg-muted rounded-lg border border-border">
              <p className="text-base font-semibold text-foreground">
                {invoice.serviceDate || 'Chưa có ngày'}
              </p>
            </div>
          </div>

          {/* Total Amount */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              Tổng tiền:
            </p>
            <div className="p-5 bg-red-50 rounded-lg border-2 border-red-200 text-right">
              <p className="text-3xl font-bold text-red-600 font-mono">
                {formatCurrency(invoice.totalAmount)}
              </p>
            </div>
          </div>

          {/* Payment Status */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              Trạng thái:
            </p>
            <div className={cn(
              "p-4 rounded-lg border-2 flex items-center gap-3",
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
          {invoice.paymentStatus === 'paid' && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Phương thức:
              </p>
              <div className="p-3 bg-muted rounded-lg border border-border">
                <p className="text-base font-semibold text-foreground">
                  {getPaymentMethodLabel(invoice.paymentMethod)}
                </p>
              </div>
            </div>
          )}

          {/* Payment Time (if paid) */}
          {invoice.paymentStatus === 'paid' && invoice.paidAt && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Thời gian thanh toán:
              </p>
              <div className="p-3 bg-muted rounded-lg border border-border">
                <p className="text-base font-semibold text-foreground">
                  {invoice.paidAt}
                </p>
              </div>
            </div>
          )}

          {/* Notes (if any) */}
          {invoice.notes && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                <FileText className="h-3 w-3" />
                Ghi chú:
              </p>
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

