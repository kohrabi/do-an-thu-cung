// lib/utils/constants.js

/**
 * Enum cho vai trò người dùng trong hệ thống
 * Map với RoleEnum trong Class Diagram
 */
export const UserRole = {
  MANAGER: 'manager',
  VETERINARIAN: 'veterinarian',
  CARE_STAFF: 'care_staff',
  RECEPTIONIST: 'receptionist',
  PET_OWNER: 'pet_owner'
};

/**
 * Nhãn hiển thị cho các vai trò
 */
export const RoleLabels = {
  [UserRole.MANAGER]: 'Quản lý trung tâm',
  [UserRole.VETERINARIAN]: 'Bác sĩ thú y',
  [UserRole.CARE_STAFF]: 'Nhân viên chăm sóc',
  [UserRole.RECEPTIONIST]: 'Nhân viên lễ tân',
  [UserRole.PET_OWNER]: 'Chủ nuôi thú cưng'
};

/**
 * Routes sau khi đăng nhập theo vai trò
 */
export const RoleDashboards = {
  [UserRole.MANAGER]: '/dashboard/manager',
  [UserRole.VETERINARIAN]: '/dashboard/vet',
  [UserRole.CARE_STAFF]: '/dashboard/care-staff',
  [UserRole.RECEPTIONIST]: '/dashboard/receptionist',
  [UserRole.PET_OWNER]: '/dashboard/owner'
};

/**
 * Thông báo hệ thống
 */
export const Messages = {
  AUTH: {
    REGISTER_SUCCESS: '🎉 Đăng ký tài khoản thành công! Vui lòng đăng nhập.',
    LOGIN_SUCCESS: '✅ Đăng nhập thành công!',
    LOGIN_FAILED: '❌ Email hoặc mật khẩu không đúng.',
    RESET_PASSWORD_SENT: '📩 Email khôi phục mật khẩu đã được gửi!',
    RESET_PASSWORD_FAILED: '❌ Email không tồn tại trong hệ thống.'
  }
};