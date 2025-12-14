"use client";
import { useState, useEffect } from "react";
import { 
  Receipt, CheckCircle2, Hourglass, Eye, CreditCard, 
  DollarSign, ClipboardList, XCircle 
} from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/dashboard/StatsCard";
import InvoiceDetailModal from "@/components/modals/InvoiceDetailModal";
import { cn } from "@/lib/utils";

export default function OwnerInvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    setInvoices([
      {
        id: "INV-2025-001",
        customerName: "Bạn",
        customerPhone: "0901234567",
        customerEmail: "customer@example.com",
        petName: "Lucky",
        petIcon: "🐕",
        petBreed: "Golden Retriever",
        petAge: 3,
        date: "2025-01-15T10:30:00",
        services: [
          { icon: "🏥", name: "Khám sức khỏe tổng quát", quantity: 1, price: 200000 },
          { icon: "💉", name: "Tiêm phòng dại", quantity: 1, price: 120000 }
        ],
        subtotal: 320000,
        discount: 0,
        total: 320000,
        isPaid: true,
        paymentMethod: "Tiền mặt",
        paymentDate: "2025-01-15T11:00:00",
        notes: ""
      },
      {
        id: "INV-2025-002",
        customerName: "Bạn",
        customerPhone: "0901234567",
        customerEmail: "customer@example.com",
        petName: "Miu",
        petIcon: "🐈",
        petBreed: "Mèo Anh lông ngắn",
        petAge: 2,
        date: "2025-01-20T14:00:00",
        services: [
          { icon: "🛁", name: "Tắm spa cao cấp", quantity: 1, price: 150000 }
        ],
        subtotal: 150000,
        discount: 15000,
        total: 135000,
        isPaid: false,
        paymentMethod: null,
        paymentDate: null,
        notes: ""
      },
      {
        id: "INV-2025-003",
        customerName: "Bạn",
        customerPhone: "0901234567",
        customerEmail: "customer@example.com",
        petName: "Coco",
        petIcon: "🐩",
        petBreed: "Poodle",
        petAge: 1,
        date: "2025-01-25T09:00:00",
        services: [
          { icon: "✂️", name: "Cắt tỉa lông tạo kiểu", quantity: 1, price: 180000 },
          { icon: "💆", name: "Spa massage", quantity: 1, price: 250000 }
        ],
        subtotal: 430000,
        discount: 0,
        total: 430000,
        isPaid: false,
        paymentMethod: null,
        paymentDate: null,
        notes: ""
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleViewDetail = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handlePayInvoice = (invoice) => {
    if (confirm("Xác nhận thanh toán hóa đơn này?")) {
      setInvoices(invoices.map(inv =>
        inv.id === invoice.id
          ? { ...inv, isPaid: true, paymentMethod: "Online", paymentDate: new Date().toISOString() }
          : inv
      ));
      showToast("Thanh toán thành công!", "success");
    }
  };

  const filteredInvoices = invoices.filter(inv => {
    if (filter === "all") return true;
    if (filter === "paid") return inv.isPaid;
    if (filter === "unpaid") return !inv.isPaid;
    return true;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const totalPaid = invoices.filter(i => i.isPaid).reduce((sum, i) => sum + i.total, 0);
  const totalUnpaid = invoices.filter(i => !i.isPaid).reduce((sum, i) => sum + i.total, 0);

  const filterOptions = [
    { value: "all", label: "Tất cả", icon: ClipboardList },
    { value: "paid", label: "Đã thanh toán", icon: CheckCircle2 },
    { value: "unpaid", label: "Chưa thanh toán", icon: Hourglass }
  ];

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader
        title="Hóa đơn của tôi"
        subtitle="Xem và quản lý hóa đơn thanh toán"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          icon={Receipt}
          title="Tổng hóa đơn"
          value={invoices.length}
          color="primary"
        />
        <StatsCard
          icon={CheckCircle2}
          title="Đã thanh toán"
          value={invoices.filter(i => i.isPaid).length}
          change={formatCurrency(totalPaid)}
          color="success"
        />
        <StatsCard
          icon={Hourglass}
          title="Chưa thanh toán"
          value={invoices.filter(i => !i.isPaid).length}
          change={formatCurrency(totalUnpaid)}
          color="warning"
        />
      </div>

      {/* Filter Tabs */}
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

      {/* Invoices List */}
      <div className="space-y-4">
        {filteredInvoices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInvoices.map((invoice) => (
              <Card key={invoice.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-sm font-mono mb-1">{invoice.id}</CardTitle>
                      <p className="text-xs text-muted-foreground">{formatDate(invoice.date)}</p>
                    </div>
                    <Badge variant={invoice.isPaid ? "success" : "warning"}>
                      {invoice.isPaid ? (
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
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{invoice.petIcon}</div>
                    <div>
                      <p className="font-semibold text-foreground">{invoice.petName}</p>
                      <p className="text-xs text-muted-foreground">{invoice.petBreed}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Dịch vụ đã sử dụng:</p>
                    {invoice.services.map((service, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                        <span className="flex items-center gap-2">
                          <span>{service.icon}</span>
                          <span className="text-foreground">{service.name}</span>
                        </span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(service.price)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {invoice.discount > 0 && (
                    <div className="flex items-center justify-between text-sm p-2 bg-yellow-50 rounded border border-yellow-200">
                      <span className="text-muted-foreground">Giảm giá:</span>
                      <span className="font-semibold text-yellow-700">
                        -{formatCurrency(invoice.discount)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <span className="font-semibold text-foreground">Tổng cộng:</span>
                    <span className="text-lg font-bold text-primary">
                      {formatCurrency(invoice.total)}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleViewDetail(invoice)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Xem chi tiết
                    </Button>
                    {!invoice.isPaid && (
                      <Button
                        onClick={() => handlePayInvoice(invoice)}
                        variant="default"
                        size="sm"
                        className="flex-1"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Thanh toán
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
              <Receipt className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-medium">
                Chưa có hóa đơn nào
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Invoice Detail Modal */}
      <InvoiceDetailModal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
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
              <XCircle className="h-5 w-5" />
            )}
            <p className="font-medium">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
