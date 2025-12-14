"use client";
import { useState } from "react";
import { Search, Edit, Trash2, User, Stethoscope, Wrench, Briefcase, CheckCircle2, XCircle } from "lucide-react";
import Input from "@/components/ui/Input";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function StaffTable({ staffList, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const filteredStaff = staffList.filter(staff => {
    const matchSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === "all" || staff.role === filterRole;
    return matchSearch && matchRole;
  });

  const getRoleBadge = (role) => {
    const badges = {
      veterinarian: { 
        label: "Bác sĩ", 
        variant: "info", 
        icon: Stethoscope 
      },
      care_staff: { 
        label: "Nhân viên", 
        variant: "secondary", 
        icon: Wrench 
      },
      receptionist: { 
        label: "Lễ tân", 
        variant: "default", 
        icon: Briefcase 
      }
    };
    return badges[role] || badges.care_staff;
  };

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Tìm kiếm nhân viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="w-full"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="veterinarian">Bác sĩ</option>
            <option value="care_staff">Nhân viên chăm sóc</option>
            <option value="receptionist">Lễ tân</option>
          </Select>
        </div>
      </div>

      {/* Table */}
      {filteredStaff.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã NV</TableHead>
                <TableHead>Họ và tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => {
                const badge = getRoleBadge(staff.role);
                const BadgeIcon = badge.icon;
                return (
                  <TableRow key={staff.id}>
                    <TableCell className="font-mono text-sm">
                      {staff.id}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {staff.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {staff.email}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {staff.phone}
                    </TableCell>
                    <TableCell>
                      <Badge variant={badge.variant} className="flex items-center gap-1 w-fit">
                        <BadgeIcon className="h-3 w-3" />
                        {badge.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={staff.isActive ? "success" : "destructive"}>
                        {staff.isActive ? (
                          <>
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Hoạt động
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3 mr-1" />
                            Ngưng
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          onClick={() => onEdit(staff)}
                          variant="ghost"
                          size="icon"
                          title="Chỉnh sửa"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => onDelete(staff.id)}
                          variant="ghost"
                          size="icon"
                          title="Vô hiệu hóa"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-medium">
              Không tìm thấy nhân viên nào
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
