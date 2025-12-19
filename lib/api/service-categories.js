import apiClient, { handleApiError } from './client';

/**
 * @typedef {import('./types').CreateServiceCategoryDto} CreateServiceCategoryDto
 * @typedef {import('./types').UpdateServiceCategoryDto} UpdateServiceCategoryDto
 * @typedef {import('./types').ServiceCategoryResponse} ServiceCategoryResponse
 */

/**
 * Service Category API Functions
 * Base path: /service-categories
 */
export const serviceCategoryApi = {
  /**
   * Get all service categories
   * GET /service-categories
   * @param {Object} [params={}] - Query parameters for filtering
   * @returns {Promise<{success: boolean, data?: ServiceCategoryResponse[], error?: string}>}
   */
  getAll: async (params = {}) => {
    try {
      const response = await apiClient.get('/service-categories', { params });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get service category by ID
   * GET /service-categories/:id
   * @param {number} categoryId - Service category ID
   * @returns {Promise<{success: boolean, data?: ServiceCategoryResponse, error?: string}>}
   */
  getById: async (categoryId) => {
    try {
      const response = await apiClient.get(`/service-categories/${categoryId}`);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get active service categories
   * GET /service-categories/active
   * @returns {Promise<{success: boolean, data?: ServiceCategoryResponse[], error?: string}>}
   */
  getActive: async () => {
    try {
      const response = await apiClient.get('/service-categories/active');

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Create a new service category (Admin/Manager only)
   * POST /service-categories
   * @param {CreateServiceCategoryDto} categoryData - Category data including name and description
   * @returns {Promise<{success: boolean, data?: ServiceCategoryResponse, message?: string, error?: string}>}
   */
  create: async (categoryData) => {
    try {
      const response = await apiClient.post('/service-categories', categoryData);

      return {
        success: true,
        data: response.data,
        message: 'Service category created successfully',
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Update service category
   * PUT /service-categories/:id
   * @param {number} categoryId - Service category ID
   * @param {UpdateServiceCategoryDto} categoryData - Updated category data
   * @returns {Promise<{success: boolean, data?: ServiceCategoryResponse, message?: string, error?: string}>}
   */
  update: async (categoryId, categoryData) => {
    try {
      const response = await apiClient.put(`/service-categories/${categoryId}`, categoryData);

      return {
        success: true,
        data: response.data,
        message: 'Service category updated successfully',
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Delete service category
   * DELETE /service-categories/:id
   * @param {number} categoryId - Service category ID to delete
   * @returns {Promise<{success: boolean, data?: any, message?: string, error?: string}>}
   */
  delete: async (categoryId) => {
    try {
      const response = await apiClient.delete(`/service-categories/${categoryId}`);

      return {
        success: true,
        data: response.data,
        message: 'Service category deleted successfully',
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Toggle service category status
   * PUT /service-categories/:id/toggle-status
   * @param {number} categoryId - Service category ID
   * @returns {Promise<{success: boolean, data?: ServiceCategoryResponse, message?: string, error?: string}>}
   */
  toggleStatus: async (categoryId) => {
    try {
      const response = await apiClient.put(`/service-categories/${categoryId}/toggle-status`);

      return {
        success: true,
        data: response.data,
        message: 'Service category status updated',
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};
