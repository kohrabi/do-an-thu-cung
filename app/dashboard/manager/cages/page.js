"use client";
import { useState, useEffect } from "react";
import { 
  Home, Plus, Edit, Eye, Trash2, CheckCircle2, 
  XCircle, AlertTriangle, ClipboardList, BarChart3 
} from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/dashboard/StatsCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CageFormModal from "@/components/modals/CageFormModal";
import CageDetailModal from "@/components/modals/CageDetailModal";
import { cn } from "@/lib/utils";

export default function ManagerCagesPage() {
  const [cages, setCages] = useState([]);
  const [selectedCage, setSelectedCage] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingCage, setEditingCage] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadCages();
  }, []);

  const loadCages = () => {
    setCages([
      {
        id: "CAGE001",
        code: "A01",
        type: "small",
        capacity: 1,
        status: "available",
        notes: "Gần cửa sổ, nhiều ánh sáng",
        pets: []
      },
      {
        id: "CAGE002",
        code: "B02",
        type: "medium",
        capacity: 2,
        status: "occupied",
        notes: "Khu vực yên tĩnh",
        pets: [
          {
            name: "Lucky",
            icon: "🐕",
            breed: "Golden Retriever",
            ownerName: "Nguyễn Văn A",
            checkInDate: "2025-11-10",
            checkOutDate: "2025-11-20"
          }
        ]
      },
      {
        id: "CAGE003",
        code: "C03",
        type: "large",
        capacity: 3,
        status: "maintenance",
        notes: "Đang sửa chữa hệ thống điều hòa",
        pets: []
      },
      {
        id: "CAGE004",
        code: "A02",
        type: "small",
        capacity: 1,
        status: "available",
        notes: "",
        pets: []
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleAddCage = (cageData) => {
    if (cages.some(c => c.code === cageData.code)) {
      showToast("Mã chuồng đã tồn tại", "error");
      return;
    }

    const newCage = {
      id: `CAGE${String(cages.length + 1).padStart(3, '0')}`,
      ...cageData,
      pets: []
    };
    setCages([...cages, newCage]);
    showToast("Đã thêm chuồng thành công!", "success");
  };

  const handleUpdateCage = (cageData) => {
    setCages(cages.map(cage =>
      cage.id === editingCage.id ? { ...cage, ...cageData } : cage
    ));
    showToast("Cập nhật chuồng thành công!", "success");
    setEditingCage(null);
  };

  const handleDeleteCage = (cageId) => {
    const cage = cages.find(c => c.id === cageId);
    if (cage.status === 'occupied') {
      showToast("Không thể xóa chuồng đang có thú cưng", "error");
      return;
    }

    if (confirm(`Xác nhận xóa chuồng ${cage.code}?`)) {
      setCages(cages.filter(c => c.id !== cageId));
      showToast("Đã xóa chuồng", "success");
    }
  };

  const handleOpenEdit = (cage) => {
    setEditingCage(cage);
    setIsFormModalOpen(true);
  };

  const handleViewDetail = (cage) => {
    setSelectedCage(cage);
    setIsDetailModalOpen(true);
  };

  const getCageTypeLabel = (type) => {
    const labels = {
      small: "Nhỏ",
      medium: "Trung",
      large: "Lớn"
    };
    return labels[type] || type;
  };

  const getStatusBadge = (status) => {
    const badges = {
      available: { 
        label: "Trống", 
        variant: "success", 
        icon: CheckCircle2 
      },
      occupied: { 
        label: "Đang sử dụng", 
        variant: "warning", 
        icon: AlertTriangle 
      },
      maintenance: { 
        label: "Bảo trì", 
        variant: "destructive", 
        icon: XCircle 
      }
    };
    return badges[status] || badges.available;
  };

  const stats = {
    total: cages.length,
    available: cages.filter(c => c.status === 'available').length,
    occupied: cages.filter(c => c.status === 'occupied').length,
    maintenance: cages.filter(c => c.status === 'maintenance').length,
    occupancyRate: cages.length > 0 
      ? Math.round((cages.filter(c => c.status === 'occupied').length / cages.length) * 100)
      : 0
  };

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader
        title="Quản lý chuồng nuôi"
        subtitle="Theo dõi và quản lý khu lưu trú thú cưng"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={Home}
          title="Tổng chuồng"
          value={stats.total}
          color="primary"
        />
        <StatsCard
          icon={CheckCircle2}
          title="Đang trống"
          value={stats.available}
          color="success"
        />
        <StatsCard
          icon={AlertTriangle}
          title="Đang sử dụng"
          value={stats.occupied}
          color="warning"
        />
        <StatsCard
          icon={BarChart3}
          title="Tỷ lệ sử dụng"
          value={`${stats.occupancyRate}%`}
          color="info"
        />
      </div>

      {/* Add Button */}
      <div className="flex justify-start">
        <Button
          onClick={() => {
            setEditingCage(null);
            setIsFormModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm chuồng mới
        </Button>
      </div>

      {/* Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Danh sách chuồng nuôi
          </h2>
          <Badge variant="outline" className="text-sm">
            {cages.length} chuồng
          </Badge>
        </div>

        {cages.length > 0 ? (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px]">Mã chuồng</TableHead>
                  <TableHead className="min-w-[100px]">Loại</TableHead>
                  <TableHead className="min-w-[100px]">Sức chứa</TableHead>
                  <TableHead className="min-w-[120px]">Trạng thái</TableHead>
                  <TableHead className="min-w-[200px]">Thú cưng hiện tại</TableHead>
                  <TableHead className="min-w-[150px]">Ghi chú</TableHead>
                  <TableHead className="min-w-[120px] text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cages.map((cage) => {
                  const statusBadge = getStatusBadge(cage.status);
                  const StatusIcon = statusBadge.icon;
                  return (
                    <TableRow key={cage.id}>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-xs">
                          {cage.code}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">
                            {getCageTypeLabel(cage.type)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {cage.capacity}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusBadge.variant} className="flex items-center gap-1 w-fit">
                          <StatusIcon className="h-3 w-3" />
                          {statusBadge.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {cage.pets && cage.pets.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {cage.pets.map((pet, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                <span className="mr-1">{pet.icon}</span>
                                {pet.name}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground italic">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-foreground">
                          {cage.notes || <span className="text-muted-foreground italic">Không có</span>}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {cage.status === 'occupied' && (
                            <Button
                              onClick={() => handleViewDetail(cage)}
                              variant="ghost"
                              size="icon"
                              title="Xem chi tiết"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            onClick={() => handleOpenEdit(cage)}
                            variant="ghost"
                            size="icon"
                            title="Chỉnh sửa"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteCage(cage.id)}
                            variant="ghost"
                            size="icon"
                            title="Xóa"
                            disabled={cage.status === 'occupied'}
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
              <Home className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-medium">
                Chưa có chuồng nào
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      <CageFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingCage(null);
        }}
        onSuccess={editingCage ? handleUpdateCage : handleAddCage}
        cage={editingCage}
      />

      <CageDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedCage(null);
        }}
        cage={selectedCage}
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
