"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Sparkles, Plus, Search, Edit, Pause, Play, CheckCircle2, 
  XCircle, DollarSign, Clock, ClipboardList 
} from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/dashboard/StatsCard";
import AddServiceModal from "@/components/modals/AddServiceModal";
import EditServiceModal from "@/components/modals/EditServiceModal";
import { cn } from "@/lib/utils";

export default function ManagerServicesPage() {
  const searchParams = useSearchParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      setIsAddModalOpen(true);
    }
    loadServices();
  }, [searchParams]);

  const loadServices = () => {
    setServices([
      {
        id: "SRV001",
        name: "Khám sức khỏe tổng quát",
        category: "medical",
        categoryLabel: "Khám bệnh & điều trị",
        categoryIcon: "🏥",
        price: 200000,
        duration: 30,
        description: "Kiểm tra sức khỏe tổng quát, khám lâm sàng",
        isActive: true
      },
      {
        id: "SRV002",
        name: "Tắm spa cao cấp",
        category: "health",
        categoryLabel: "Tắm & vệ sinh",
        categoryIcon: "🛁",
        price: 150000,
        duration: 60,
        description: "Tắm sạch, massage thư giãn, sấy khô",
        isActive: true
      },
      {
        id: "SRV003",
        name: "Cắt tỉa lông tạo kiểu",
        category: "grooming",
        categoryLabel: "Cắt tỉa & làm đẹp",
        categoryIcon: "✂️",
        price: 180000,
        duration: 45,
        description: "Cắt tỉa lông theo yêu cầu, tạo kiểu chuyên nghiệp",
        isActive: true
      },
      {
        id: "SRV004",
        name: "Tiêm phòng dại",
        category: "medical",
        categoryLabel: "Tiêm phòng & xét nghiệm",
        categoryIcon: "💉",
        price: 120000,
        duration: 15,
        description: "Tiêm phòng bệnh dại cho chó mèo",
        isActive: false
      },
      {
        id: "SRV005",
        name: "Massage thư giãn",
        category: "boarding",
        categoryLabel: "Spa & massage",
        categoryIcon: "💆",
        price: 250000,
        duration: 90,
        description: "Massage toàn thân cho thú cưng",
        isActive: true
      },
      {
        id: "SRV006",
        name: "Lưu trú qua đêm",
        category: "boarding",
        categoryLabel: "Lưu trú & chăm sóc",
        categoryIcon: "🏠",
        price: 300000,
        duration: 1440,
        description: "Chăm sóc thú cưng qua đêm, môi trường an toàn",
        isActive: true
      }
    ]);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const getCategoryData = (categoryValue) => {
    const categories = {
      health: { label: "Tắm & vệ sinh", icon: "🛁" },
      grooming: { label: "Cắt tỉa & làm đẹp", icon: "✂️" },
      medical: { label: "Y tế & khám bệnh", icon: "💊" },
      boarding: { label: "Lưu trú & chăm sóc", icon: "🏠" }
    };
    return categories[categoryValue] || { label: "Khác", icon: "✨" };
  };

  const handleAddService = (newService) => {
    const categoryData = getCategoryData(newService.category);
    const service = {
      id: `SRV${String(services.length + 1).padStart(3, '0')}`,
      name: newService.name,
      category: newService.category,
      categoryLabel: categoryData.label,
      categoryIcon: categoryData.icon,
      price: parseFloat(newService.price),
      duration: parseInt(newService.duration),
      description: newService.description,
      isActive: true
    };
    setServices([...services, service]);
    showToast("Đã thêm dịch vụ thành công!", "success");
  };

  const handleEditService = (updatedData) => {
    const categoryData = getCategoryData(updatedData.category);
    
    setServices(services.map(service =>
      service.id === updatedData.id
        ? {
            ...service,
            name: updatedData.name,
            category: updatedData.category,
            categoryLabel: categoryData.label,
            categoryIcon: categoryData.icon,
            price: parseFloat(updatedData.price),
            duration: parseInt(updatedData.duration),
            description: updatedData.description
          }
        : service
    ));
    showToast("Đã cập nhật dịch vụ thành công!", "success");
  };

  const handleOpenEdit = (service) => {
    setEditingService(service);
    setIsEditModalOpen(true);
  };

  const handleToggleService = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    setServices(services.map(s =>
      s.id === serviceId ? { ...s, isActive: !s.isActive } : s
    ));
    showToast(`Đã ${service.isActive ? 'tạm ngưng' : 'kích hoạt'} dịch vụ`, "success");
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const stats = {
    total: services.length,
    active: services.filter(s => s.isActive).length
  };

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader
        title="Quản lý dịch vụ"
        subtitle="Thêm, chỉnh sửa và quản lý các dịch vụ của trung tâm"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard
          icon={Sparkles}
          title="Tổng dịch vụ"
          value={stats.total}
          color="primary"
        />
        <StatsCard
          icon={CheckCircle2}
          title="Đang hoạt động"
          value={stats.active}
          color="success"
        />
      </div>

      {/* Add Button & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm dịch vụ mới
        </Button>

        <div className="w-full sm:w-64">
          <Input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Danh sách dịch vụ
          </h2>
          <Badge variant="outline" className="text-sm">
            {filteredServices.length} dịch vụ
          </Badge>
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-4xl">{service.categoryIcon}</div>
                    <Badge variant={service.isActive ? "success" : "destructive"}>
                      {service.isActive ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Hoạt động
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" />
                          Tạm ngưng
                        </>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <CardTitle className="text-lg mb-1">{service.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {service.categoryIcon} {service.categoryLabel}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Giá:</span>
                      <span className="font-semibold text-foreground">
                        {formatCurrency(service.price)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Thời gian:</span>
                      <span className="font-semibold text-foreground">
                        {service.duration >= 60 
                          ? `${Math.floor(service.duration / 60)} giờ` 
                          : `${service.duration} phút`}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleOpenEdit(service)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Chỉnh sửa
                    </Button>
                    <Button
                      onClick={() => handleToggleService(service.id)}
                      variant={service.isActive ? "secondary" : "default"}
                      size="sm"
                      className="flex-1"
                    >
                      {service.isActive ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Tạm ngưng
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Kích hoạt
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-medium">
                Không tìm thấy dịch vụ nào
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      <AddServiceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddService}
      />

      <EditServiceModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingService(null);
        }}
        onSuccess={handleEditService}
        service={editingService}
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
