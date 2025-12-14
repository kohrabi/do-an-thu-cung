"use client";
import { useState, useEffect } from "react";
import { 
  Receipt, Search, Eye, FileDown, CheckCircle2, 
  Hourglass, ClipboardList, DollarSign 
} from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/dashboard/StatsCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import InvoiceDetailModal from "@/components/modals/InvoiceDetailModal";
import { cn } from "@/lib/utils";

export default function ManagerInvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    setInvoices([
      {
        id: "INV-2025-001",
        customerName: "Nguyễn Văn A",
        customerPhone: "0901234567",
        customerEmail: "nguyenvana@gmail.com",
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
        customerName: "Trần Thị B",
        customerPhone: "0909876543",
        customerEmail: "tranthib@gmail.com",
        petName: "Miu",
        petIcon: "🐈",
        petBreed: "Mèo Anh lông ngắn",
        petAge: 2,
        date: "2025-01-16T14:00:00",
        services: [
          { icon: "🛁", name: "Tắm spa cao cấp", quantity: 1, price: 150000 },
          { icon: "✂️", name: "Cắt tỉa lông", quantity: 1, price: 180000 }
        ],
        subtotal: 330000,
        discount: 30000,
        total: 300000,
        isPaid: false,
        paymentMethod: null,
        paymentDate: null,
        notes: "Khách yêu cầu gọi trước khi đến"
      },
      {
        id: "INV-2025-003",
        customerName: "Lê Văn C",
        customerPhone: "0912345678",
        customerEmail: "levanc@gmail.com",
        petName: "Coco",
        petIcon: "🐩",
        petBreed: "Poodle",
        petAge: 1,
        date: "2025-01-17T09:00:00",
        services: [
          { icon: "🏠", name: "Lưu trú theo ngày", quantity: 3, price: 100000 }
        ],
        subtotal: 300000,
        discount: 0,
        total: 300000,
        isPaid: true,
        paymentMethod: "Chuyển khoản",
        paymentDate: "2025-01-17T09:30:00",
        notes: ""
      }
    ]);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchSearch = invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
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

  const handleViewDetail = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleExportPDF = (invoice) => {
    showToast(`Đang xuất hóa đơn ${invoice.id} ra PDF...`, "info");
  };

  const totalRevenue = filteredInvoices.reduce((sum, inv) => sum + (inv.isPaid ? inv.total : 0), 0);
  const unpaidAmount = filteredInvoices.reduce((sum, inv) => sum + (inv.isPaid ? 0 : inv.total), 0);

  const stats = {
    total: filteredInvoices.length,
    paid: filteredInvoices.filter(i => i.isPaid).length,
    unpaid: filteredInvoices.filter(i => !i.isPaid).length,
    revenue: totalRevenue,
    pending: unpaidAmount
  };

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader
        title="Quản lý hóa đơn"
        subtitle="Theo dõi và quản lý hóa đơn thanh toán"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={Receipt}
          title="Tổng hóa đơn"
          value={stats.total}
          color="primary"
        />
        <StatsCard
          icon={CheckCircle2}
          title="Đã thanh toán"
          value={stats.paid}
          change={formatCurrency(stats.revenue)}
          color="success"
        />
        <StatsCard
          icon={Hourglass}
          title="Chưa thanh toán"
          value={stats.unpaid}
          change={formatCurrency(stats.pending)}
          color="warning"
        />
        <StatsCard
          icon={DollarSign}
          title="Tổng doanh thu"
          value={formatCurrency(stats.revenue)}
          color="info"
        />
      </div>

      {/* Search */}
      <div className="flex justify-end">
        <div className="w-full sm:w-64">
          <Input
            type="text"
            placeholder="Tìm kiếm theo tên khách hàng hoặc mã hóa đơn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
        </div>
      </div>

      {/* Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Danh sách hóa đơn
          </h2>
          <Badge variant="outline" className="text-sm">
            {filteredInvoices.length} hóa đơn
          </Badge>
        </div>

        {filteredInvoices.length > 0 ? (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Mã hóa đơn</TableHead>
                  <TableHead className="min-w-[150px]">Khách hàng</TableHead>
                  <TableHead className="min-w-[120px]">Thú cưng</TableHead>
                  <TableHead className="min-w-[100px]">Ngày tạo</TableHead>
                  <TableHead className="min-w-[120px]">Tổng tiền</TableHead>
                  <TableHead className="min-w-[120px]">Trạng thái</TableHead>
                  <TableHead className="min-w-[120px] text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-xs">
                        {invoice.id}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-foreground">{invoice.customerName}</p>
                        <p className="text-xs text-muted-foreground">{invoice.customerPhone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{invoice.petIcon}</span>
                        <span className="text-sm font-medium text-foreground">{invoice.petName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(invoice.date)}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-foreground">
                        {formatCurrency(invoice.total)}
                      </span>
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          onClick={() => handleViewDetail(invoice)}
                          variant="ghost"
                          size="icon"
                          title="Xem chi tiết"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleExportPDF(invoice)}
                          variant="ghost"
                          size="icon"
                          title="Xuất PDF"
                        >
                          <FileDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-medium">
                Không tìm thấy hóa đơn nào
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal */}
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
            : toast.type === "info"
            ? "bg-blue-100 text-blue-800 border border-blue-200"
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
