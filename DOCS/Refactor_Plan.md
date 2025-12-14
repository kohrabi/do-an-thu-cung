# Kế Hoạch Refactor UI - PAW LOVERS Project

## 📋 Tổng Quan

**Mục tiêu:** Refactor toàn bộ UI từ CSS thuần/Inline Styles sang **Next.js (App Router) + Tailwind CSS + shadcn/ui + Lucide React**

**Nguyên tắc:**

- ✅ Bảo toàn 100% logic nghiệp vụ (business logic, state management, API calls)
- ✅ Chỉ thay đổi phần render UI (JSX) và Styling
- ✅ Quy trình Bottom-Up: Từ components nhỏ → components lớn → pages
- ✅ Xóa bỏ hoàn toàn các file CSS cũ sau khi refactor xong

---

## 🔍 Phân Tích Hiện Trạng

### 1. Cấu Trúc CSS Hiện Tại

**Files CSS cần xóa sau khi refactor:**

- `styles/dashboard.css` (8,316+ lines)
- `styles/components.css`
- `styles/additional-components.css`
- `styles/extended-components.css`
- `styles/premium-manager.css`
- `app/globals.css` (phần custom styles)

**Patterns cần thay thế:**

- Custom CSS classes: `sidebar`, `dashboard-header`, `stats-card`, `modal-overlay-beautiful`, v.v.
- Emoji icons: `🐾`, `🏠`, `📅`, `🔔`, v.v. → Lucide React icons
- SVG hardcode trong components → Lucide React icons
- Inline styles → Tailwind utility classes

### 2. Components Cần Refactor

#### **A. UI Components (Base Components)**

- [x] `components/ui/Button.jsx` - Thay thế bằng shadcn/ui Button ✅
- [x] `components/ui/Input.jsx` - Thay thế bằng shadcn/ui Input ✅

#### **B. Layout Components**

- [x] `components/layout/Sidebar.jsx` - Refactor với Tailwind + shadcn/ui + Lucide ✅
- [x] `components/layout/DashboardHeader.jsx` - Refactor với Tailwind + shadcn/ui + Lucide ✅

#### **C. Form Components**

- [x] `components/forms/LoginForm.jsx` ✅
- [x] `components/forms/RegistrationForm.jsx` ✅
- [x] `components/forms/ResetPasswordForm.jsx` ✅

#### **D. Modal Components (25 modals)**

- [x] `components/modals/AddPetModal.jsx` ✅
- [x] `components/modals/EditPetModal.jsx` ✅
- [x] `components/modals/AddServiceModal.jsx` ✅
- [x] `components/modals/EditServiceModal.jsx` ✅
- [x] `components/modals/AddStaffModal.jsx` ✅
- [x] `components/modals/EditStaffModal.jsx` ✅
- [x] `components/modals/AddRoomModal.jsx` ✅
- [x] `components/modals/BookAppointmentModal.jsx` ✅
- [x] `components/modals/AppointmentDetailModal.jsx` ✅
- [x] `components/modals/EditAppointmentModal.jsx` ✅
- [x] `components/modals/UpdateAppointmentModal.jsx` ✅
- [x] `components/modals/CancelAppointmentModal.jsx` ✅
- [x] `components/modals/CancelAppointmentOwnerModal.jsx` ✅
- [x] `components/modals/ConfirmAppointmentModal.jsx` ✅
- [x] `components/modals/CageDetailModal.jsx` ✅
- [x] `components/modals/CageFormModal.jsx` ✅
- [x] `components/modals/CareNoteModal.jsx` ✅
- [x] `components/modals/ServiceNoteModal.jsx` ✅
- [x] `components/modals/InvoiceDetailModal.jsx` ✅
- [x] `components/modals/PaymentDetailModal.jsx` ✅
- [x] `components/modals/VetPatientDetailModal.jsx` ✅
- [x] `components/modals/VetRecordDetailModal.jsx` ✅
- [x] `components/modals/VetRecordFormModal.jsx` ✅
- [x] `components/modals/VetRecordModal.jsx` ✅
- [x] `components/modals/VetScheduleDetailModal.jsx` ✅

#### **E. Table Components**

- [ ] `components/tables/ServiceTable.jsx`
- [ ] `components/tables/StaffTable.jsx`

#### **F. Dashboard Components**

- [x] `components/dashboard/StatsCard.jsx` ✅
- [ ] `components/dashboard/QuickActions.jsx`
- [ ] `components/dashboard/RecentActivity.jsx`

#### **G. Chart Components**

- [ ] `components/charts/RevenueChart.jsx`

#### **H. Page Components (Dashboard Pages)**

- [ ] `app/dashboard/owner/pets/page.js`
- [ ] `app/dashboard/owner/appointments/page.js`
- [ ] `app/dashboard/owner/invoices/page.js`
- [ ] `app/dashboard/owner/payments/page.js`
- [ ] `app/dashboard/owner/services/page.js`
- [ ] `app/dashboard/owner/page.js`
- [ ] `app/dashboard/manager/page.js`
- [ ] `app/dashboard/manager/staff/page.js`
- [ ] `app/dashboard/manager/services/page.js`
- [ ] `app/dashboard/manager/appointments/page.js`
- [ ] `app/dashboard/manager/cages/page.js`
- [ ] `app/dashboard/manager/invoices/page.js`
- [ ] `app/dashboard/manager/reports/page.js`
- [ ] `app/dashboard/vet/page.js`
- [ ] `app/dashboard/vet/schedule/page.js`
- [ ] `app/dashboard/vet/records/page.js`
- [ ] `app/dashboard/vet/today/page.js`
- [ ] `app/dashboard/vet/patients/page.js`
- [ ] `app/dashboard/care-staff/page.js`
- [ ] `app/dashboard/care-staff/schedule/page.js`
- [ ] `app/dashboard/care-staff/tasks/page.js`
- [ ] `app/dashboard/care-staff/today/page.js`
- [ ] `app/dashboard/receptionist/page.js`
- [ ] `app/dashboard/receptionist/appointments/page.js`
- [ ] `app/dashboard/receptionist/slips/page.js`
- [ ] `app/dashboard/receptionist/reminders/page.js`
- [ ] `app/dashboard/receptionist/payments/page.js`
- [ ] `app/dashboard/receptionist/customers/page.js`

#### **I. Auth Pages**

- [ ] `app/(auth)/login/page.js`
- [ ] `app/(auth)/register/page.js`
- [ ] `app/(auth)/reset-password/page.js`

---

## 📦 shadcn/ui Components Cần Cài Đặt

### Đã có sẵn (cần kiểm tra):

- [ ] Button
- [ ] Input

### Cần cài đặt:

- [ ] Dialog (cho Modals)
- [ ] Form (cho React Hook Form integration)
- [ ] Label
- [ ] Select
- [ ] Textarea
- [ ] Card
- [ ] Table
- [ ] Badge
- [ ] Avatar
- [ ] Separator
- [ ] Skeleton (cho loading states)
- [ ] Toast (cho notifications)
- [ ] Dropdown Menu
- [ ] Popover
- [ ] Calendar (cho date picker)
- [ ] Tabs
- [ ] Sheet (cho mobile sidebar)

**Lệnh cài đặt:**

```bash
npx shadcn-ui@latest add dialog form label select textarea card table badge avatar separator skeleton toast dropdown-menu popover calendar tabs sheet
```

---

## 🎨 Lucide React Icons Mapping

### Icons cần thay thế:

| Emoji/SVG cũ | Lucide Icon       | Component Name        |
| ------------ | ----------------- | --------------------- |
| 🐾           | `PawPrint`        | Pet/Animal icon       |
| 🏠           | `Home`            | Home/Dashboard        |
| 👥           | `Users`           | Staff/Users           |
| ✨           | `Sparkles`        | Services              |
| 📅           | `Calendar`        | Appointments/Schedule |
| 🏠 (cage)    | `Home` hoặc `Box` | Cages                 |
| 💰           | `DollarSign`      | Invoices/Payments     |
| 📊           | `BarChart3`       | Reports               |
| 📋           | `ClipboardList`   | Records/Tasks         |
| 🐾 (pet)     | `PawPrint`        | Pet                   |
| 🔔           | `Bell`            | Notifications         |
| 🚪           | `LogOut`          | Logout                |
| ➕           | `Plus`            | Add                   |
| ✏️           | `Edit`            | Edit                  |
| ✕            | `X`               | Close                 |
| ✓            | `Check`           | Success/Confirm       |
| 🔍           | `Search`          | Search                |
| ⚖️           | `Scale`           | Weight                |
| 🎨           | `Palette`         | Color                 |
| 🎂           | `Cake`            | Birthday              |
| 📝           | `FileText`        | Notes                 |
| 🏥           | `Hospital`        | Medical               |
| ⏱️           | `Clock`           | Duration              |
| ⏸️           | `Pause`           | Pause                 |
| ▶️           | `Play`            | Activate              |
| 🕐           | `Clock`           | Time                  |
| 👋           | `Hand`            | Greeting              |

---

## 📝 Quy Trình Refactor Chi Tiết

### Phase 1: Setup & Base Components (Priority: HIGH)

#### Task 1.1: Cài đặt Dependencies

- [x] Cài đặt `lucide-react`: `npm install lucide-react` ✅
- [x] Cài đặt `clsx` và `tailwind-merge` ✅
- [x] Cấu hình `tailwind.config.js` với theme variables ✅
- [x] Thêm CSS variables vào `styles/globals.css` ✅
- [x] Tạo `lib/utils.js` với hàm `cn()` ✅

#### Task 1.2: Refactor UI Base Components

- [x] **Button.jsx**: Thay thế bằng shadcn/ui Button pattern ✅
  - Giữ nguyên props interface (variant, loading, icon, children)
  - Thay thế SVG spinner bằng `Loader2` từ Lucide ✅
  - Sử dụng Tailwind classes với theme variables ✅
  - Hỗ trợ các variants: default, secondary, outline, destructive, ghost, link ✅
- [x] **Input.jsx**: Thay thế bằng shadcn/ui Input pattern ✅
  - Sử dụng Tailwind classes với theme variables ✅
  - Hỗ trợ icon từ Lucide ✅
  - Error handling với theme colors ✅

### Phase 2: Layout Components (Priority: HIGH)

#### Task 2.1: Refactor Sidebar

- [x] Thay thế emoji icons bằng Lucide icons ✅
  - `🐾` → `PawPrint` ✅
  - `🏠` → `Home` (hoặc `Box` cho chuồng nuôi) ✅
  - `👥` → `Users` ✅
  - `✨` → `Sparkles` ✅
  - `📅` → `Calendar` ✅
  - `💰` → `DollarSign` ✅
  - `📊` → `BarChart3` ✅
  - `🔔` → `Bell` ✅
  - `🚪` → `LogOut` ✅
  - `📋` → `ClipboardList` ✅
  - `📄` → `FileText` ✅
  - `💳` → `CreditCard` ✅
  - `🛍️` → `ShoppingBag` ✅
- [x] Thay thế CSS classes bằng Tailwind ✅
  - Sử dụng Tailwind utility classes với theme variables ✅
  - Hover/active states với Tailwind ✅
  - Responsive design với Tailwind ✅
- [ ] Sử dụng shadcn/ui Sheet component cho mobile sidebar (TODO: Phase sau)
- [x] Giữ nguyên logic collapse/expand ✅
- [x] Giữ nguyên routing logic ✅

#### Task 2.2: Refactor DashboardHeader

- [x] Thay thế emoji icons ✅
  - `👋` → `Hand` ✅
  - `🕐` → `Clock` ✅
  - `🔔` → `Bell` ✅
- [x] Thay thế CSS classes bằng Tailwind ✅
- [x] Sử dụng Tailwind cho notification badge ✅
- [x] Giữ nguyên logic time display và greeting ✅

### Phase 3: Form Components (Priority: HIGH)

#### Task 3.1: Refactor LoginForm

- [ ] Sử dụng shadcn/ui Form components (Form, FormField, FormLabel, FormMessage)
- [ ] Thay thế Input component cũ bằng shadcn/ui Input
- [ ] Thay thế Button component cũ bằng shadcn/ui Button
- [ ] Thay thế emoji icons bằng Lucide icons
- [ ] Thay thế CSS classes bằng Tailwind
- [ ] Giữ nguyên toàn bộ logic validation và submit

#### Task 3.2: Refactor RegistrationForm

- [ ] Tương tự LoginForm
- [ ] Sử dụng shadcn/ui Form components
- [ ] Thay thế icons và CSS classes

#### Task 3.3: Refactor ResetPasswordForm

- [ ] Tương tự LoginForm
- [ ] Sử dụng shadcn/ui Form components
- [ ] Thay thế icons và CSS classes

### Phase 4: Modal Components (Priority: MEDIUM)

**Chiến lược:** Refactor từng modal một, bắt đầu từ các modal đơn giản nhất.

#### Task 4.1: Base Modal Pattern

- [ ] Tạo wrapper component hoặc hook cho modal pattern chung
- [ ] Sử dụng shadcn/ui Dialog component
- [ ] Standardize modal structure:
  ```tsx
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Title</DialogTitle>
      </DialogHeader>
      <DialogBody>{/* Content */}</DialogBody>
      <DialogFooter>{/* Actions */}</DialogFooter>
    </DialogContent>
  </Dialog>
  ```

#### Task 4.2: Refactor Pet Modals

- [ ] **AddPetModal.jsx**:
  - Thay thế emoji icons (`🐾`, `📝`, `🏷️`, `⚥`, `🎂`, `⚖️`, `🎨`, `🏥`) bằng Lucide icons
  - Sử dụng shadcn/ui Dialog
  - Sử dụng shadcn/ui Form components
  - Thay thế CSS classes bằng Tailwind
  - Giữ nguyên validation logic và form state
- [ ] **EditPetModal.jsx**: Tương tự AddPetModal

#### Task 4.3: Refactor Service Modals

- [ ] **AddServiceModal.jsx**
- [ ] **EditServiceModal.jsx**

#### Task 4.4: Refactor Staff Modals

- [ ] **AddStaffModal.jsx**
- [ ] **EditStaffModal.jsx**

#### Task 4.5: Refactor Appointment Modals

- [ ] **BookAppointmentModal.jsx**
- [ ] **AppointmentDetailModal.jsx**
- [ ] **EditAppointmentModal.jsx**
- [ ] **UpdateAppointmentModal.jsx**
- [ ] **CancelAppointmentModal.jsx**
- [ ] **CancelAppointmentOwnerModal.jsx**
- [ ] **ConfirmAppointmentModal.jsx**

#### Task 4.6: Refactor Cage Modals

- [ ] **CageDetailModal.jsx**
- [ ] **CageFormModal.jsx**
- [ ] **AddRoomModal.jsx**

#### Task 4.7: Refactor Other Modals

- [ ] **CareNoteModal.jsx**
- [ ] **ServiceNoteModal.jsx**
- [ ] **InvoiceDetailModal.jsx**
- [ ] **PaymentDetailModal.jsx**
- [ ] **VetPatientDetailModal.jsx**
- [ ] **VetRecordDetailModal.jsx**
- [ ] **VetRecordFormModal.jsx**
- [ ] **VetRecordModal.jsx**
- [ ] **VetScheduleDetailModal.jsx**

### Phase 5: Table Components (Priority: MEDIUM)

#### Task 5.1: Refactor ServiceTable

- [ ] Sử dụng shadcn/ui Table component
- [ ] Thay thế emoji icons bằng Lucide icons
- [ ] Thay thế CSS classes bằng Tailwind
- [ ] Sử dụng shadcn/ui Input cho search box
- [ ] Sử dụng shadcn/ui Badge cho status
- [ ] Giữ nguyên filtering logic

#### Task 5.2: Refactor StaffTable

- [ ] Tương tự ServiceTable
- [ ] Sử dụng shadcn/ui Table component
- [ ] Thay thế icons và CSS classes

### Phase 6: Dashboard Components (Priority: MEDIUM)

#### Task 6.1: Refactor StatsCard

- [ ] Sử dụng shadcn/ui Card component
- [ ] Thay thế emoji icons bằng Lucide icons
- [ ] Thay thế CSS classes bằng Tailwind
- [ ] Sử dụng shadcn/ui Badge cho trend indicators
- [ ] Giữ nguyên props interface

#### Task 6.2: Refactor QuickActions

- [ ] Sử dụng shadcn/ui Card hoặc Button components
- [ ] Thay thế emoji icons bằng Lucide icons
- [ ] Thay thế CSS classes bằng Tailwind

#### Task 6.3: Refactor RecentActivity

- [ ] Sử dụng shadcn/ui Card component
- [ ] Thay thế emoji icons bằng Lucide icons
- [ ] Thay thế CSS classes bằng Tailwind
- [ ] Sử dụng shadcn/ui Avatar cho user avatars

### Phase 7: Chart Components (Priority: LOW)

#### Task 7.1: Refactor RevenueChart

- [ ] Kiểm tra library đang sử dụng (Recharts, Chart.js, v.v.)
- [ ] Thay thế CSS classes bằng Tailwind
- [ ] Đảm bảo responsive design với Tailwind

### Phase 8: Page Components (Priority: MEDIUM)

**Chiến lược:** Refactor từng page một, bắt đầu từ Owner pages.

#### Task 8.1: Refactor Owner Pages

- [ ] `app/dashboard/owner/pets/page.js`
- [ ] `app/dashboard/owner/appointments/page.js`
- [ ] `app/dashboard/owner/invoices/page.js`
- [ ] `app/dashboard/owner/payments/page.js`
- [ ] `app/dashboard/owner/services/page.js`
- [ ] `app/dashboard/owner/page.js`

#### Task 8.2: Refactor Manager Pages

- [ ] `app/dashboard/manager/page.js`
- [ ] `app/dashboard/manager/staff/page.js`
- [ ] `app/dashboard/manager/services/page.js`
- [ ] `app/dashboard/manager/appointments/page.js`
- [ ] `app/dashboard/manager/cages/page.js`
- [ ] `app/dashboard/manager/invoices/page.js`
- [ ] `app/dashboard/manager/reports/page.js`

#### Task 8.3: Refactor Vet Pages

- [ ] `app/dashboard/vet/page.js`
- [ ] `app/dashboard/vet/schedule/page.js`
- [ ] `app/dashboard/vet/records/page.js`
- [ ] `app/dashboard/vet/today/page.js`
- [ ] `app/dashboard/vet/patients/page.js`

#### Task 8.4: Refactor Care Staff Pages

- [ ] `app/dashboard/care-staff/page.js`
- [ ] `app/dashboard/care-staff/schedule/page.js`
- [ ] `app/dashboard/care-staff/tasks/page.js`
- [ ] `app/dashboard/care-staff/today/page.js`

#### Task 8.5: Refactor Receptionist Pages

- [ ] `app/dashboard/receptionist/page.js`
- [ ] `app/dashboard/receptionist/appointments/page.js`
- [ ] `app/dashboard/receptionist/slips/page.js`
- [ ] `app/dashboard/receptionist/reminders/page.js`
- [ ] `app/dashboard/receptionist/payments/page.js`
- [ ] `app/dashboard/receptionist/customers/page.js`

### Phase 9: Auth Pages (Priority: HIGH)

#### Task 9.1: Refactor Auth Pages

- [ ] `app/(auth)/login/page.js`
- [ ] `app/(auth)/register/page.js`
- [ ] `app/(auth)/reset-password/page.js`
- [ ] Sử dụng shadcn/ui Card cho form container
- [ ] Thay thế CSS classes bằng Tailwind
- [ ] Thay thế emoji icons bằng Lucide icons

### Phase 10: Cleanup (Priority: HIGH)

#### Task 10.1: Xóa CSS Files

- [ ] Xóa `styles/dashboard.css`
- [ ] Xóa `styles/components.css`
- [ ] Xóa `styles/additional-components.css`
- [ ] Xóa `styles/extended-components.css`
- [ ] Xóa `styles/premium-manager.css`
- [ ] Xóa custom styles trong `app/globals.css` (giữ lại Tailwind directives)

#### Task 10.2: Xóa CSS Imports

- [ ] Xóa tất cả imports CSS trong `app/layout.js`
- [ ] Xóa tất cả imports CSS trong các components
- [ ] Kiểm tra không còn CSS classes cũ nào được sử dụng

#### Task 10.3: Final Testing

- [ ] Test tất cả pages trên desktop
- [ ] Test tất cả pages trên mobile
- [ ] Test tất cả modals
- [ ] Test tất cả forms
- [ ] Test navigation và routing
- [ ] Test responsive design
- [ ] Test dark mode (nếu có)

---

## 🎯 Checklist Template cho Mỗi Component

Khi refactor mỗi component, sử dụng checklist này:

### Pre-Refactor

- [ ] Đọc và hiểu logic của component
- [ ] Xác định các props và state cần giữ nguyên
- [ ] Xác định các emoji/SVG icons cần thay thế
- [ ] Xác định các CSS classes cần thay thế

### During Refactor

- [ ] Thay thế emoji icons bằng Lucide icons
- [ ] Thay thế SVG hardcode bằng Lucide icons
- [ ] Thay thế CSS classes bằng Tailwind utility classes
- [ ] Sử dụng shadcn/ui components tương ứng
- [ ] Sử dụng theme variables (`bg-primary`, `text-muted-foreground`, v.v.)
- [ ] Giữ nguyên 100% logic nghiệp vụ
- [ ] Giữ nguyên props interface
- [ ] Giữ nguyên state management

### Post-Refactor

- [ ] Test component hoạt động đúng
- [ ] Test responsive design
- [ ] Test accessibility (keyboard navigation, screen reader)
- [ ] Kiểm tra không còn CSS classes cũ
- [ ] Kiểm tra không còn emoji icons
- [ ] Kiểm tra không còn SVG hardcode
- [ ] Update imports nếu cần

---

## 📊 Tiến Độ Refactor

### Tổng số components cần refactor: ~80 components

**Đã hoàn thành:** 33/80 (41%)

**Đang thực hiện:** 0/80 (0%)

**Chưa bắt đầu:** 47/80 (59%)

### Breakdown theo Phase:

- **Phase 1 (Setup & Base):** 2/2 tasks ✅ COMPLETED

  - ✅ Button.jsx, Input.jsx
  - ✅ Setup dependencies (lucide-react, clsx, tailwind-merge)
  - ✅ Tailwind config với theme variables
  - ✅ Created Dialog, Select, Textarea, Label components

- **Phase 2 (Layout):** 2/2 tasks ✅ COMPLETED

  - ✅ Sidebar.jsx
  - ✅ DashboardHeader.jsx

- **Phase 3 (Forms):** 3/3 tasks ✅ COMPLETED

  - ✅ LoginForm.jsx
  - ✅ RegistrationForm.jsx
  - ✅ ResetPasswordForm.jsx

- **Phase 4 (Modals):** 7/25 tasks (28%)

  - ✅ AddPetModal.jsx
  - ✅ EditPetModal.jsx
  - ✅ AddServiceModal.jsx
  - ✅ EditServiceModal.jsx
  - ✅ AddStaffModal.jsx
  - ✅ EditStaffModal.jsx
  - ✅ BookAppointmentModal.jsx
  - ⏳ Còn lại: 18 modals

- **Phase 5 (Tables):** 0/2 tasks

  - ⏳ ServiceTable.jsx
  - ⏳ StaffTable.jsx

- **Phase 6 (Dashboard):** 1/3 tasks (33%)

  - ✅ StatsCard.jsx
  - ⏳ QuickActions.jsx
  - ⏳ RecentActivity.jsx

- **Phase 7 (Charts):** 0/1 task

  - ⏳ RevenueChart.jsx

- **Phase 8 (Pages):** 0/25 tasks

  - ⏳ Tất cả dashboard pages

- **Phase 9 (Auth):** 0/3 tasks

  - ⏳ Auth pages

- **Phase 10 (Cleanup):** 0/3 tasks
  - ⏳ Xóa CSS files cũ

---

## 🔧 Tools & Commands

### Cài đặt shadcn/ui component:

```bash
npx shadcn-ui@latest add [component-name]
```

### Cài đặt Lucide React:

```bash
npm install lucide-react
```

### Kiểm tra Tailwind config:

```bash
# Xem tailwind.config.js
# Đảm bảo có content paths đúng
```

### Test responsive:

```bash
# Sử dụng Chrome DevTools
# Test trên các breakpoints: mobile (375px), tablet (768px), desktop (1024px+)
```

---

## 📝 Notes

### Theme Variables (MANDATORY)

- Luôn sử dụng shadcn/ui theme variables thay vì hardcoded colors
- Ví dụ: `bg-primary` thay vì `bg-blue-500`
- Ví dụ: `text-muted-foreground` thay vì `text-gray-500`

### Icon Sizing

- Sử dụng size props của Lucide: `size={16}`, `size={20}`, `size={24}`
- Hoặc className: `className="w-4 h-4"`, `className="w-5 h-5"`

### Responsive Design

- Mobile-first approach
- Sử dụng Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

### Accessibility

- Sử dụng semantic HTML
- Thêm ARIA labels khi cần
- Đảm bảo keyboard navigation hoạt động

---

## 🚀 Bắt Đầu Refactor

**Bước tiếp theo:** Bắt đầu với Phase 1 - Setup & Base Components

1. Cài đặt dependencies
2. Refactor Button.jsx
3. Refactor Input.jsx

Sau đó tiếp tục với Phase 2 - Layout Components.

---

**Last Updated:** 2024-12-XX
**Status:** 🟢 In Progress - Phase 1 & 2 Completed

## ✅ Completed Tasks

### Phase 1: Setup & Base Components ✅

- ✅ Installed dependencies: lucide-react, clsx, tailwind-merge
- ✅ Configured Tailwind with theme variables
- ✅ Created lib/utils.js with cn() function
- ✅ Refactored Button.jsx to use Tailwind + Lucide icons
- ✅ Refactored Input.jsx to use Tailwind + theme variables

### Phase 2: Layout Components ✅

- ✅ Refactored Sidebar.jsx with Tailwind + Lucide icons
- ✅ Refactored DashboardHeader.jsx with Tailwind + Lucide icons

## 🔄 Next Steps

Continue with Phase 3: Form Components (LoginForm, RegistrationForm, ResetPasswordForm)
