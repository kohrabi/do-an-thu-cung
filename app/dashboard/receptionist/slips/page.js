"use client";
import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, Printer, Mail, Calendar, Clock, PawPrint, Cat, Stethoscope, Bath, Scissors, ClipboardList, Search, User, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SlipsPage() {
  const [slips, setSlips] = useState([
    {
      id: "APT002",
      customerName: "Trần Thị B",
      phone: "0909876543",
      email: "tranthib@example.com",
      petName: "Miu",
      petIcon: "🐈",
      service: "Tắm spa",
      serviceIcon: "🛁",
      date: "2025-11-20",
      time: "14:00",
      staff: "Nhân viên Trần Thị B"
    },
    {
      id: "APT004",
      customerName: "Phạm Văn D",
      phone: "0923456789",
      email: "phamvand@example.com",
      petName: "Max",
      petIcon: "🐕",
      service: "Khám sức khỏe",
      serviceIcon: "🏥",
      date: "2025-11-21",
      time: "10:30",
      staff: "BS. Nguyễn Văn A"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSlips = slips.filter(slip =>
    slip.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slip.phone.includes(searchTerm) ||
    slip.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getServiceIcon = (icon) => {
    switch (icon) {
      case '🏥': return Stethoscope;
      case '🛁': return Bath;
      case '✂️': return Scissors;
      default: return ClipboardList;
    }
  };

  const handlePrint = (slip) => {
    alert(`In phiếu hẹn ${slip.id}`);
  };

  const handleSendEmail = (slip) => {
    alert(`Gửi email cho ${slip.email}`);
  };

  return (
    <div className="flex-1 space-y-8 p-8">
      <DashboardHeader
        title="Quản lý phiếu hẹn"
        subtitle="In và gửi phiếu hẹn cho khách hàng"
      />

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Lịch đã xác nhận</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-white/90" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{slips.length}</div>
            <p className="text-xs text-white/80 mt-2">
              📅 Hôm nay: {new Date().toLocaleDateString('vi-VN')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã in phiếu</CardTitle>
            <Printer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{slips.length}</div>
            <p className="text-xs text-muted-foreground mt-2">⏱️ Tuần này</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email đã gửi</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{slips.length}</div>
            <p className="text-xs text-muted-foreground mt-2">📊 Tháng này</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                <ClipboardList className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Danh sách phiếu hẹn</h3>
                <p className="text-sm text-muted-foreground">Quản lý {filteredSlips.length} phiếu hẹn</p>
              </div>
            </div>
            <div className="relative flex-1 max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tìm theo tên, SĐT, mã phiếu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <div className="space-y-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã phiếu</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Dịch vụ</TableHead>
                <TableHead>Ngày & Giờ</TableHead>
                <TableHead>Nhân viên</TableHead>
                <TableHead className="text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSlips.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    <ClipboardList className="mx-auto h-8 w-8 mb-2" />
                    Không tìm thấy phiếu hẹn
                  </TableCell>
                </TableRow>
              ) : (
                filteredSlips.map((slip) => {
                  const PetIcon = slip.petIcon === '🐕' ? PawPrint : Cat;
                  const ServiceIcon = getServiceIcon(slip.serviceIcon);
                  return (
                    <TableRow key={slip.id}>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono">{slip.id}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {slip.customerName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{slip.customerName}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Phone className="h-3 w-3" /> {slip.phone}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-xs">{slip.email}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ServiceIcon className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{slip.service}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium flex items-center gap-1">
                            <Calendar className="h-4 w-4" /> {slip.date}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {slip.time}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          <User className="h-3 w-3" /> {slip.staff}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button size="sm" onClick={() => handlePrint(slip)}>
                            <Printer className="h-4 w-4 mr-2" /> In
                          </Button>
                          <Button size="sm" variant="success" onClick={() => handleSendEmail(slip)}>
                            <Mail className="h-4 w-4 mr-2" /> Email
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
