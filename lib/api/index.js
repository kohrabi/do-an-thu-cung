/**
 * API Client Index
 * Centralized exports for all API functions
 * 
 * Usage Examples:
 * import { login, register, getAccount } from '@/lib/api';
 * import { getAllPets, createPet } from '@/lib/api';
 * import { createAppointment, getAppointmentsByStatus } from '@/lib/api';
 */

// Export axios client and utilities
export { default as apiClient, getToken, setToken, removeToken, handleApiError } from './client';

// Export TypeScript types (for TypeScript projects)
export * from './types';

// ============================================================================
// Authentication & Account Management
// ============================================================================
export { authApi } from './auth';

// For backward compatibility, also export mock functions
export {
  registerMock as register,
  loginMock as login,
  resetPasswordMock as resetPassword,
  getMockAccounts,
} from './auth';

// ============================================================================
// Pet Management
// ============================================================================
export { petApi } from './pets';

// ============================================================================
// Appointment Management
// ============================================================================
export { appointmentApi } from './appointments';

// ============================================================================
// Service Catalog
// ============================================================================
export { serviceApi } from './services';

// ============================================================================
// Service Categories
// ============================================================================
export { serviceCategoryApi } from './service-categories';

// ============================================================================
// Payment Processing
// ============================================================================
export { paymentApi } from './payments';

// ============================================================================
// Invoice Management
// ============================================================================
export { invoiceApi } from './invoices';

// ============================================================================
// Employee Management
// ============================================================================
export { employeeApi } from './employees';

// ============================================================================
// Pet Owner Management
// ============================================================================
export { petOwnerApi } from './pet-owners';

// ============================================================================
// Medical Records & Vaccinations
// ============================================================================
export { medicalRecordApi } from './medical-records';

// ============================================================================
// Work Schedule Management
// ============================================================================
export { scheduleApi } from './schedules';

// ============================================================================
// Cage & Boarding Management
// ============================================================================
export { cageApi } from './cages';

// ============================================================================
// Reports & Analytics
// ============================================================================
export { reportApi } from './reports';
