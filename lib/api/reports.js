import apiClient, { handleApiError } from './client';

/**
 * @typedef {import('./types').ReportResponse} ReportResponse
 */

/**
 * Report API Functions
 * Base path: /reports
 */
export const reportApi = {
  /**
   * Get revenue report
   * GET /reports/revenue
   * @param {Object} [queryParams={}] - Query parameters including dateRange, groupBy (day/week/month), etc.
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  getRevenue: async (queryParams = {}) => {
    try {
      const response = await apiClient.get('/reports/revenue', { params: queryParams });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get appointment statistics
   * GET /reports/appointments/statistics
   * @param {Object} [queryParams={}] - Query parameters including dateRange, status filters, etc.
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  getAppointmentStats: async (queryParams = {}) => {
    try {
      const response = await apiClient.get('/reports/appointments/statistics', { params: queryParams });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get service statistics
   * GET /reports/services/statistics
   * @param {Object} [queryParams={}] - Query parameters including dateRange, categoryId, etc.
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  getServiceStats: async (queryParams = {}) => {
    try {
      const response = await apiClient.get('/reports/services/statistics', { params: queryParams });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get pet statistics
   * GET /reports/pets/statistics
   * @param {Object} [queryParams={}] - Query parameters including species, breed filters, etc.
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  getPetStats: async (queryParams = {}) => {
    try {
      const response = await apiClient.get('/reports/pets/statistics', { params: queryParams });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get employee performance report
   * GET /reports/employees/performance
   * @param {Object} [queryParams={}] - Query parameters including dateRange, employeeId, role, etc.
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  getEmployeePerformance: async (queryParams = {}) => {
    try {
      const response = await apiClient.get('/reports/employees/performance', { params: queryParams });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get customer statistics
   * GET /reports/customers/statistics
   * @param {Object} [queryParams={}] - Query parameters including dateRange, registration stats, etc.
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  getCustomerStats: async (queryParams = {}) => {
    try {
      const response = await apiClient.get('/reports/customers/statistics', { params: queryParams });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get payment statistics
   * GET /reports/payments/statistics
   * @param {Object} [queryParams={}] - Query parameters including dateRange, payment method, status, etc.
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  getPaymentStats: async (queryParams = {}) => {
    try {
      const response = await apiClient.get('/reports/payments/statistics', { params: queryParams });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get dashboard overview statistics
   * GET /reports/dashboard/overview
   * @param {Object} [queryParams={}] - Query parameters including dateRange for stats calculation
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  getDashboardOverview: async (queryParams = {}) => {
    try {
      const response = await apiClient.get('/reports/dashboard/overview', { params: queryParams });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get monthly summary report
   * GET /reports/monthly-summary
   * @param {number} year - Year (e.g., 2024)
   * @param {number} month - Month (1-12)
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  getMonthlySummary: async (year, month) => {
    try {
      const response = await apiClient.get('/reports/monthly-summary', {
        params: { year, month },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get yearly summary report
   * GET /reports/yearly-summary
   * @param {number} year - Year (e.g., 2024)
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  getYearlySummary: async (year) => {
    try {
      const response = await apiClient.get('/reports/yearly-summary', {
        params: { year },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get revenue by service category
   * GET /reports/revenue/by-category
   * @param {Object} [queryParams={}] - Query parameters including dateRange, category filters, etc.
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  getRevenueByCategory: async (queryParams = {}) => {
    try {
      const response = await apiClient.get('/reports/revenue/by-category', { params: queryParams });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get top performing services
   * GET /reports/services/top-performing
   * @param {number} [limit=10] - Number of top services to return
   * @param {Object} [queryParams={}] - Additional query parameters including dateRange, etc.
   * @returns {Promise<{success: boolean, data?: any[], error?: string}>}
   */
  getTopPerformingServices: async (limit = 10, queryParams = {}) => {
    try {
      const response = await apiClient.get('/reports/services/top-performing', {
        params: { limit, ...queryParams },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get cage utilization report
   * GET /reports/cages/utilization
   * @param {Object} [queryParams={}] - Query parameters including dateRange, size filters, etc.
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  getCageUtilization: async (queryParams = {}) => {
    try {
      const response = await apiClient.get('/reports/cages/utilization', { params: queryParams });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get custom report
   * POST /reports/custom
   * @param {Object} reportConfig - Custom report configuration including metrics, filters, grouping, etc.
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  getCustomReport: async (reportConfig) => {
    try {
      const response = await apiClient.post('/reports/custom', reportConfig);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Export report to PDF
   * GET /reports/:reportType/export-pdf
   * @param {string} reportType - Report type (revenue, appointments, services, etc.)
   * @param {Object} [queryParams={}] - Query parameters for report generation
   * @returns {Promise<{success: boolean, data?: Blob, error?: string}>}
   */
  exportPdf: async (reportType, queryParams = {}) => {
    try {
      const response = await apiClient.get(`/reports/${reportType}/export-pdf`, {
        params: queryParams,
        responseType: 'blob',
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Export report to Excel
   * GET /reports/:reportType/export-excel
   * @param {string} reportType - Report type (revenue, appointments, services, etc.)
   * @param {Object} [queryParams={}] - Query parameters for report generation
   * @returns {Promise<{success: boolean, data?: Blob, error?: string}>}
   */
  exportExcel: async (reportType, queryParams = {}) => {
    try {
      const response = await apiClient.get(`/reports/${reportType}/export-excel`, {
        params: queryParams,
        responseType: 'blob',
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};
