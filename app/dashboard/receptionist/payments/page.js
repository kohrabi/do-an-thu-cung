"use client";
import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DollarSign, Clock, CheckCircle2, CreditCard, Search, Calendar, Phone, Stethoscope, Bath, Scissors, ClipboardList, Banknote, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([
    {
      id: "INV001",
      customerName: "Nguyễn Văn A",
      phone: "0901234567",
      email: "nguyenvana@example.com",
      service: "Khám sức khỏe",
      serviceIcon: "🏥",
      amount: 500000,
      date: "2025-11-20",
      time: "10:00",
      status: "pending",
      paymentMethod: null
    },
    {
      id: "INV002",
      customerName: "Trần Thị B",
      phone: "0909876543",
      email: "tranthib@example.com",
      service: "Tắm spa",
      serviceIcon: "🛁",
      amount: 300000,
      date: "2025-11-20",
      time: "14:00",
      status: "paid",
      paymentMethod: "Tiền mặt"
    },
    {
      id: "INV003",
      customerName: "Lê Văn C",
      phone: "0912345678",
      email: "levanc@example.com",
      service: "Cắt tỉa lông",
      serviceIcon: "✂️",
      amount: 200000,
      date: "2025-11-21",
      time: "09:00",
      status: "paid",
      paymentMethod: "Chuyển khoản"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("");

  const filteredPayments = payments.filter(payment => {
    const matchFilter = filter === "all" || payment.status === filter;
    const matchSearch = payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       payment.phone.includes(searchTerm) ||
                       payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalRevenue = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const paidCount = payments.filter(p => p.status === 'paid').length;
  const pendingCount = payments.filter(p => p.status === 'pending').length;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getServiceIcon = (icon) => {
    switch (icon) {
      case '🏥': return Stethoscope;
      case '🛁': return Bath;
      case '✂️': return Scissors;
      default: return ClipboardList;
    }
  };

  const handleOpenPaymentModal = (payment) => {
    setSelectedPayment(payment);
    setSelectedMethod("");
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setSelectedPayment(null);
    setSelectedMethod("");
  };

  const handleConfirmPayment = () => {
    if (!selectedMethod) {
      alert("⚠️ Vui lòng chọn phương thức thanh toán!");
      return;
    }

    setPayments(payments.map(p =>
      p.id === selectedPayment.id ? { ...p, status: 'paid', paymentMethod: selectedMethod } : p
    ));
    
    alert(`✅ Đã xác nhận thanh toán ${selectedPayment.id} qua ${selectedMethod}`);
    handleCloseModal();
  };

  return (
    <div className="flex-1 space-y-8 p-8">
      <DashboardHeader
        title="Quản lý thanh toán"
        subtitle="Theo dõi và xác nhận thanh toán từ khách hàng"
      />

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Tổng doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-white/90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-white/80 mt-2">✅ {paidCount} đơn đã thanh toán</p>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700">Chờ thanh toán</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{formatCurrency(pendingAmount)}</div>
            <p className="text-xs text-yellow-700 mt-2">⏳ {pendingCount} đơn chờ xử lý</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{payments.length}</div>
            <p className="text-xs text-muted-foreground mt-2">📅 Hôm nay</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        <Tabs value={filter} onValueChange={setFilter} className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="pending">Chờ thanh toán</TabsTrigger>
            <TabsTrigger value="paid">Đã thanh toán</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Tìm theo tên, SĐT, mã hóa đơn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-primary" />
            Danh sách thanh toán
          </h2>
          <Badge variant="secondary">{filteredPayments.length} hóa đơn</Badge>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã HĐ</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Dịch vụ</TableHead>
                <TableHead>Ngày & Giờ</TableHead>
                <TableHead className="text-right">Số tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    <CreditCard className="mx-auto h-8 w-8 mb-2" />
                    Không tìm thấy hóa đơn
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => {
                  const statusBadge = payment.status === 'pending'
                    ? { label: 'Chờ thanh toán', variant: 'warning', icon: Clock }
                    : { label: 'Đã thanh toán', variant: 'success', icon: CheckCircle2 };
                  const ServiceIcon = getServiceIcon(payment.serviceIcon);
                  return (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono">{payment.id}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{payment.customerName}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {payment.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ServiceIcon className="h-5 w-5 text-muted-foreground" />
                          <span>{payment.service}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium flex items-center gap-1">
                            <Calendar className="h-4 w-4" /> {payment.date}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {payment.time}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-lg font-bold text-green-600 font-mono">
                          {formatCurrency(payment.amount)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusBadge.variant} className="flex items-center gap-1 w-fit">
                          <statusBadge.icon className="h-3 w-3" /> {statusBadge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {payment.status === 'pending' ? (
                          <Button size="sm" onClick={() => handleOpenPaymentModal(payment)}>
                            <CheckCircle2 className="h-4 w-4 mr-2" /> Xác nhận
                          </Button>
                        ) : (
                          <Badge variant="success" className="flex items-center gap-1">
                            <CreditCard className="h-3 w-3" /> {payment.paymentMethod}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Payment Method Modal */}
      <Dialog open={showPaymentModal} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Chọn phương thức thanh toán
            </DialogTitle>
          </DialogHeader>

          {selectedPayment && (
            <>
              {/* Payment Info */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700 font-medium">Mã hóa đơn</span>
                      <span className="text-sm font-bold text-blue-700 font-mono">{selectedPayment.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700 font-medium">Khách hàng</span>
                      <span className="text-sm font-bold text-blue-700">{selectedPayment.customerName}</span>
                    </div>
                    <div className="pt-3 border-t border-blue-300 flex justify-between items-center">
                      <span className="text-sm font-bold text-blue-700">Số tiền thanh toán</span>
                      <span className="text-2xl font-bold text-blue-700">{formatCurrency(selectedPayment.amount)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <div className="space-y-3">
                <p className="text-sm font-semibold">
                  Chọn phương thức thanh toán: <span className="text-red-500">*</span>
                </p>
                
                <Button
                  variant={selectedMethod === "Tiền mặt" ? "default" : "outline"}
                  className={cn(
                    "w-full justify-start h-auto py-4",
                    selectedMethod === "Tiền mặt" && "bg-green-50 border-green-300"
                  )}
                  onClick={() => setSelectedMethod("Tiền mặt")}
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-lg",
                      selectedMethod === "Tiền mặt" ? "bg-green-500" : "bg-secondary"
                    )}>
                      <Banknote className={cn(
                        "h-6 w-6",
                        selectedMethod === "Tiền mặt" ? "text-white" : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={cn(
                        "font-semibold",
                        selectedMethod === "Tiền mặt" ? "text-green-700" : ""
                      )}>Tiền mặt</p>
                      <p className={cn(
                        "text-xs",
                        selectedMethod === "Tiền mặt" ? "text-green-600" : "text-muted-foreground"
                      )}>Thanh toán bằng tiền mặt trực tiếp</p>
                    </div>
                    {selectedMethod === "Tiền mặt" && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                </Button>

                <Button
                  variant={selectedMethod === "Chuyển khoản" ? "default" : "outline"}
                  className={cn(
                    "w-full justify-start h-auto py-4",
                    selectedMethod === "Chuyển khoản" && "bg-blue-50 border-blue-300"
                  )}
                  onClick={() => setSelectedMethod("Chuyển khoản")}
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-lg",
                      selectedMethod === "Chuyển khoản" ? "bg-blue-500" : "bg-secondary"
                    )}>
                      <Building2 className={cn(
                        "h-6 w-6",
                        selectedMethod === "Chuyển khoản" ? "text-white" : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={cn(
                        "font-semibold",
                        selectedMethod === "Chuyển khoản" ? "text-blue-700" : ""
                      )}>Chuyển khoản</p>
                      <p className={cn(
                        "text-xs",
                        selectedMethod === "Chuyển khoản" ? "text-blue-600" : "text-muted-foreground"
                      )}>Thanh toán qua ngân hàng/ví điện tử</p>
                    </div>
                    {selectedMethod === "Chuyển khoản" && (
                      <CheckCircle2 className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                </Button>
              </div>

              {/* Actions */}
              <DialogFooter>
                <Button variant="outline" onClick={handleCloseModal}>
                  Hủy
                </Button>
                <Button onClick={handleConfirmPayment} disabled={!selectedMethod}>
                  <CheckCircle2 className="h-4 w-4 mr-2" /> Xác nhận thanh toán
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
