import apiClient, { handleApiError } from './client';

/**
 * @typedef {import('./types').CreateEmployeeDto} CreateEmployeeDto
 * @typedef {import('./types').UpdateEmployeeDto} UpdateEmployeeDto
 * @typedef {import('./types').EmployeeResponse} EmployeeResponse
 */

/**
 * Employee API Functions
 * Base path: /employees
 */
export const employeeApi = {
  /**
   * Create a new employee
   * POST /employees
   * @param {CreateEmployeeDto} employeeData - Employee data including name, role, contact info, etc.
   * @returns {Promise<{success: boolean, data?: EmployeeResponse, message?: string, error?: string}>}
   */
  create: async (employeeData) => {
    try {
      const response = await apiClient.post('/employees', employeeData);

      return {
        success: true,
        data: response.data,
        message: 'Employee created successfully',
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get all employees
   * GET /employees
   * @param {Object} [params={}] - Query parameters for filtering
   * @returns {Promise<{success: boolean, data?: EmployeeResponse[], error?: string}>}
   */
  getAll: async (params = {}) => {
    try {
      const response = await apiClient.get('/employees', { params });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get employee by ID
   * GET /employees/:id
   * @param {number} employeeId - Employee ID
   * @returns {Promise<{success: boolean, data?: EmployeeResponse, error?: string}>}
   */
  getById: async (employeeId) => {
    try {
      const response = await apiClient.get(`/employees/${employeeId}`);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get employees by role/user type
   * GET /employees/by-role/:role
   * @param {string} role - Employee role (VETERINARIAN, CARE_STAFF, RECEPTIONIST, MANAGER)
   * @returns {Promise<{success: boolean, data?: EmployeeResponse[], error?: string}>}
   */
  getByRole: async (role) => {
    try {
      const response = await apiClient.get(`/employees/by-role/${role}`);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get available employees
   * GET /employees/available
   * @param {Object} [params={}] - Query parameters for filtering (date, time, role, etc.)
   * @returns {Promise<{success: boolean, data?: EmployeeResponse[], error?: string}>}
   */
  getAvailable: async (params = {}) => {
    try {
      const response = await apiClient.get('/employees/available', { params });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get all veterinarians
   * GET /employees/veterinarians
   * @returns {Promise<{success: boolean, data?: EmployeeResponse[], error?: string}>}
   */
  getAllVeterinarians: async () => {
    try {
      const response = await apiClient.get('/employees/veterinarians');

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get all care staff
   * GET /employees/care-staff
   * @returns {Promise<{success: boolean, data?: EmployeeResponse[], error?: string}>}
   */
  getAllCareStaff: async () => {
    try {
      const response = await apiClient.get('/employees/care-staff');

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Update employee
   * PUT /employees/:id
   * @param {number} employeeId - Employee ID
   * @param {UpdateEmployeeDto} employeeData - Updated employee data
   * @returns {Promise<{success: boolean, data?: EmployeeResponse, message?: string, error?: string}>}
   */
  update: async (employeeId, employeeData) => {
    try {
      const response = await apiClient.put(`/employees/${employeeId}`, employeeData);

      return {
        success: true,
        data: response.data,
        message: 'Employee updated successfully',
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Toggle employee availability
   * PUT /employees/:id/toggle-availability
   * @param {number} employeeId - Employee ID
   * @returns {Promise<{success: boolean, data?: EmployeeResponse, message?: string, error?: string}>}
   */
  toggleAvailability: async (employeeId) => {
    try {
      const response = await apiClient.put(`/employees/${employeeId}/toggle-availability`);

      return {
        success: true,
        data: response.data,
        message: 'Employee availability updated',
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Delete employee
   * DELETE /employees/:id
   * @param {number} employeeId - Employee ID to delete
   * @returns {Promise<{success: boolean, data?: any, message?: string, error?: string}>}
   */
  delete: async (employeeId) => {
    try {
      const response = await apiClient.delete(`/employees/${employeeId}`);

      return {
        success: true,
        data: response.data,
        message: 'Employee deleted successfully',
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get employee work schedule
   * GET /employees/:id/schedule
   * @param {number} employeeId - Employee ID
   * @param {Object} [params={}] - Query parameters for date range filtering
   * @returns {Promise<{success: boolean, data?: any[], error?: string}>}
   */
  getSchedule: async (employeeId, params = {}) => {
    try {
      const response = await apiClient.get(`/employees/${employeeId}/schedule`, { params });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get employee appointments
   * GET /employees/:id/appointments
   * @param {number} employeeId - Employee ID
   * @param {Object} [params={}] - Query parameters for filtering appointments
   * @returns {Promise<{success: boolean, data?: any[], error?: string}>}
   */
  getAppointments: async (employeeId, params = {}) => {
    try {
      const response = await apiClient.get(`/employees/${employeeId}/appointments`, { params });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get employee performance stats
   * GET /employees/:id/performance
   * @param {number} employeeId - Employee ID
   * @param {Object} [params={}] - Query parameters for date range filtering
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  getPerformance: async (employeeId, params = {}) => {
    try {
      const response = await apiClient.get(`/employees/${employeeId}/performance`, { params });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Search employees
   * GET /employees/search
   * @param {Object} searchParams - Search parameters (keyword, role, availability, etc.)
   * @returns {Promise<{success: boolean, data?: EmployeeResponse[], error?: string}>}
   */
  search: async (searchParams) => {
    try {
      const response = await apiClient.get('/employees/search', { params: searchParams });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};
