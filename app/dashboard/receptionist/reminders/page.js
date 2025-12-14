"use client";
import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Calendar, Clock, CheckCircle2, Send, Bell, Search, PawPrint, Cat, Stethoscope, Bath, Scissors, ClipboardList, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RemindersPage() {
  const [reminders, setReminders] = useState([
    {
      id: "APT005",
      customerName: "Nguyễn Thị E",
      phone: "0934567890",
      email: "nguyene@example.com",
      petName: "Lucky",
      petIcon: "🐕",
      service: "Khám sức khỏe",
      serviceIcon: "🏥",
      date: "2025-10-27",
      time: "09:00",
      status: "pending",
      lastReminder: "Chưa gửi"
    },
    {
      id: "APT006",
      customerName: "Trần Văn F",
      phone: "0945678901",
      email: "tranf@example.com",
      petName: "Miu",
      petIcon: "🐈",
      service: "Tắm spa",
      serviceIcon: "🛁",
      date: "2025-10-27",
      time: "14:00",
      status: "pending",
      lastReminder: "10:30 26-10"
    },
    {
      id: "APT007",
      customerName: "Lê Thị G",
      phone: "0956789012",
      email: "leg@example.com",
      petName: "Coco",
      petIcon: "🐩",
      service: "Cắt tỉa lông",
      serviceIcon: "✂️",
      date: "2025-10-27",
      time: "16:30",
      status: "sent",
      lastReminder: "Chưa gửi"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredReminders = reminders.filter(reminder =>
    reminder.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reminder.phone.includes(searchTerm) ||
    reminder.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getServiceIcon = (icon) => {
    switch (icon) {
      case '🏥': return Stethoscope;
      case '🛁': return Bath;
      case '✂️': return Scissors;
      default: return ClipboardList;
    }
  };

  const pendingCount = reminders.filter(r => r.status === 'pending').length;
  const sentCount = reminders.filter(r => r.status === 'sent').length;

  const handleSendReminder = (id) => {
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, status: 'sent', lastReminder: new Date().toLocaleString('vi-VN') } : r
    ));
    alert(`✅ Đã gửi nhắc lịch cho ${reminders.find(r => r.id === id)?.customerName}`);
  };

  const handleSendAll = () => {
    if (confirm(`Gửi nhắc lịch cho tất cả ${pendingCount} khách hàng?`)) {
      setReminders(reminders.map(r =>
        r.status === 'pending' ? { ...r, status: 'sent', lastReminder: new Date().toLocaleString('vi-VN') } : r
      ));
      alert(`✅ Đã gửi ${pendingCount} nhắc lịch`);
    }
  };

  return (
    <div className="flex-1 space-y-8 p-8">
      <DashboardHeader
        title="Gửi nhắc lịch"
        subtitle="Gửi thông báo nhắc lịch cho khách hàng trước giờ hẹn"
      />

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lịch sắp tới</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{reminders.length}</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700">Cần gửi nhắc</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Đã gửi</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{sentCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Action Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Danh sách lịch sắp tới</h3>
                <p className="text-sm text-muted-foreground">{filteredReminders.length} lịch hẹn cần nhắc</p>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Tìm theo tên, SĐT, mã..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button onClick={handleSendAll} disabled={pendingCount === 0}>
                <Send className="h-4 w-4 mr-2" /> Gửi tất cả nhắc lịch
              </Button>
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
                <TableHead>Mã</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Thú cưng</TableHead>
                <TableHead>Dịch vụ</TableHead>
                <TableHead>Ngày & Giờ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Lần gửi cuối</TableHead>
                <TableHead className="text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReminders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                    <Bell className="mx-auto h-8 w-8 mb-2" />
                    Không có lịch hẹn nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredReminders.map((reminder) => {
                  const statusBadge = reminder.status === 'pending' 
                    ? { label: 'Cần gửi', variant: 'warning', icon: Clock }
                    : { label: 'Đã gửi', variant: 'success', icon: CheckCircle2 };
                  const PetIcon = reminder.petIcon === '🐕' ? PawPrint : Cat;
                  const ServiceIcon = getServiceIcon(reminder.serviceIcon);
                  return (
                    <TableRow key={reminder.id}>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono">{reminder.id}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{reminder.customerName}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {reminder.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <PetIcon className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{reminder.petName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ServiceIcon className="h-5 w-5 text-muted-foreground" />
                          <span>{reminder.service}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium flex items-center gap-1">
                            <Calendar className="h-4 w-4" /> {reminder.date}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {reminder.time}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusBadge.variant} className="flex items-center gap-1 w-fit">
                          <statusBadge.icon className="h-3 w-3" /> {statusBadge.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{reminder.lastReminder}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          onClick={() => handleSendReminder(reminder.id)}
                          disabled={reminder.status === 'sent'}
                          variant={reminder.status === 'pending' ? 'default' : 'secondary'}
                        >
                          <Send className="h-4 w-4 mr-2" /> Gửi
                        </Button>
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
