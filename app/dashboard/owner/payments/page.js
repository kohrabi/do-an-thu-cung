"use client";
import { useState, useEffect } from "react";
import { 
  CreditCard, CheckCircle2, Hourglass, Search, Eye, 
  Calendar, Receipt, ClipboardList 
} from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/dashboard/StatsCard";
import PaymentDetailModal from "@/components/modals/PaymentDetailModal";
import { cn } from "@/lib/utils";

export default function OwnerPaymentsPage() {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    setInvoices([
      {
        id: "INV001",
        invoiceCode: "INV001",
        serviceName: "Khám sức khỏe tổng quát",
        serviceIcon: "🏥",
        petName: "Lucky",
        petIcon: "🐕",
        serviceDate: "2025-10-25",
        totalAmount: 200000,
        paymentStatus: "paid",
        paymentMethod: "cash",
        paidAt: "2025-10-25 14:30"
      },
      {
        id: "INV002",
        invoiceCode: "INV002",
        serviceName: "Tắm spa cao cấp",
        serviceIcon: "🛁",
        petName: "Miu",
        petIcon: "🐈",
        serviceDate: "2025-10-26",
        totalAmount: 150000,
        paymentStatus: "unpaid",
        paymentMethod: null,
        paidAt: null
      },
      {
        id: "INV003",
        invoiceCode: "INV003",
        serviceName: "Cắt tỉa lông",
        serviceIcon: "✂️",
        petName: "Coco",
        petIcon: "🐩",
        serviceDate: "2025-10-24",
        totalAmount: 180000,
        paymentStatus: "paid",
        paymentMethod: "transfer",
        paidAt: "2025-10-24 16:45"
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleViewDetail = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailModalOpen(true);
  };

  const handlePayNow = (invoiceId) => {
    if (confirm("Xác nhận thanh toán hóa đơn này?")) {
      setInvoices(invoices.map(inv =>
        inv.id === invoiceId
          ? { 
              ...inv, 
              paymentStatus: "paid", 
              paymentMethod: "cash", 
              paidAt: new Date().toLocaleString('vi-VN')
            }
          : inv
      ));
      showToast("Thanh toán thành công!", "success");
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchFilter = filter === "all" || invoice.paymentStatus === filter;
    const matchSearch = invoice.invoiceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       invoice.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const formatCurrency = (amount) => {
    const num = Number(amount) || 0;
    return new Intl.NumberFormat('vi-VN').format(num) + ' ₫';
  };

  const stats = {
    total: invoices.length,
    paid: invoices.filter(i => i.paymentStatus === 'paid').length,
    pending: invoices.filter(i => i.paymentStatus === 'unpaid').length
  };

  const filterOptions = [
    { value: "all", label: "Tất cả", icon: ClipboardList },
    { value: "paid", label: "Đã thanh toán", icon: CheckCircle2 },
    { value: "unpaid", label: "Chưa thanh toán", icon: Hourglass }
  ];

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader
        title="Thanh toán"
        subtitle="Quản lý hóa đơn và thanh toán dịch vụ"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          icon={CreditCard}
          title="Tổng hóa đơn"
          value={stats.total}
          color="primary"
        />
        <StatsCard
          icon={CheckCircle2}
          title="Đã thanh toán"
          value={stats.paid}
          color="success"
        />
        <StatsCard
          icon={Hourglass}
          title="Chưa thanh toán"
          value={stats.pending}
          color="warning"
        />
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={option.value}
                onClick={() => setFilter(option.value)}
                variant={filter === option.value ? "default" : "outline"}
                size="sm"
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {option.label}
              </Button>
            );
          })}
        </div>

        <div className="w-full sm:w-64">
          <Input
            type="text"
            placeholder="Tìm kiếm hóa đơn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {filteredInvoices.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredInvoices.map((invoice) => (
              <Card key={invoice.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono">
                        {invoice.invoiceCode}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {invoice.serviceDate}
                      </div>
                    </div>
                    <Badge 
                      variant={invoice.paymentStatus === 'paid' ? "success" : "warning"}
                    >
                      {invoice.paymentStatus === 'paid' ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Đã thanh toán
                        </>
                      ) : (
                        <>
                          <Hourglass className="h-3 w-3 mr-1" />
                          Chưa thanh toán
                        </>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-4 flex-1 p-4 bg-muted rounded-lg">
                      <div className="text-5xl">{invoice.serviceIcon}</div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground mb-1">
                          {invoice.serviceName}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <span>{invoice.petIcon}</span>
                          {invoice.petName}
                        </p>
                      </div>
                    </div>

                    <div className="sm:w-64 p-4 bg-pink-50 rounded-lg border-2 border-pink-200 text-right">
                      <p className="text-xs font-semibold text-pink-900 uppercase mb-2">
                        Tổng tiền
                      </p>
                      <h2 className="text-3xl font-bold text-pink-700 font-mono">
                        {formatCurrency(invoice.totalAmount)}
                      </h2>
                    </div>
                  </div>

                  <div className={cn(
                    "flex gap-2 pt-4 mt-4 border-t",
                    invoice.paymentStatus === 'paid' && "flex-col"
                  )}>
                    <Button
                      onClick={() => handleViewDetail(invoice)}
                      variant="outline"
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Xem chi tiết
                    </Button>
                    {invoice.paymentStatus === 'unpaid' && (
                      <Button
                        onClick={() => handlePayNow(invoice.id)}
                        variant="default"
                        className="flex-1"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Thanh toán ngay
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-medium">
                Không tìm thấy hóa đơn nào
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <PaymentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedInvoice(null);
        }}
        invoice={selectedInvoice}
      />

      {/* Toast Notification */}
      {toast.show && (
        <div className={cn(
          "fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-4",
          toast.type === "success"
            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
            : "bg-red-100 text-red-800 border border-red-200"
        )}>
          <div className="flex items-center gap-2">
            {toast.type === "success" ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <Hourglass className="h-5 w-5" />
            )}
            <p className="font-medium">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
