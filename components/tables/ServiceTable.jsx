"use client";
import { useState } from "react";
import {
  Search,
  Sparkles,
  DollarSign,
  Clock,
  Edit,
  Pause,
  Play,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ServiceTable({ services, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {service.icon ? (
                      typeof service.icon === "string" ? (
                        <span className="text-2xl">{service.icon}</span>
                      ) : (
                        <service.icon className="h-6 w-6 text-primary" />
                      )
                    ) : (
                      <Sparkles className="h-6 w-6 text-primary" />
                    )}
                  </div>
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
              <CardContent className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.category}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>Giá:</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Thời gian:</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {service.duration} phút
                    </span>
                  </div>
                </div>

                {service.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {service.description}
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => onEdit(service)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                  <Button
                    onClick={() => onDelete(service.id)}
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
  );
}
