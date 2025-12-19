import apiClient, { handleApiError } from './client';

/**
 * @typedef {import('./types').CreatePetOwnerDto} CreatePetOwnerDto
 * @typedef {import('./types').UpdatePetOwnerDto} UpdatePetOwnerDto
 * @typedef {import('./types').PetOwnerResponse} PetOwnerResponse
 */

/**
 * Pet Owner API Functions
 * Base path: /pet-owners
 */
export const petOwnerApi = {
  /**
   * Register a new pet owner
   * POST /pet-owners/register
   * @param {CreatePetOwnerDto} ownerData - Pet owner data including name, email, phone, address, etc.
   * @returns {Promise<{success: boolean, data?: PetOwnerResponse, message?: string, error?: string}>}
   */
  register: async (ownerData) => {
    try {
      const response = await apiClient.post('/pet-owners/register', ownerData);

      return {
        success: true,
        data: response.data,
        message: 'Pet owner registered successfully',
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get all pet owners
   * GET /pet-owners
   * @param {Object} [params={}] - Query parameters for filtering
   * @returns {Promise<{success: boolean, data?: PetOwnerResponse[], error?: string}>}
   */
  getAll: async (params = {}) => {
    try {
      const response = await apiClient.get('/pet-owners', { params });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get pet owner by ID
   * GET /pet-owners/:id
   * @param {number} ownerId - Pet owner ID
   * @returns {Promise<{success: boolean, data?: PetOwnerResponse, error?: string}>}
   */
  getById: async (ownerId) => {
    try {
      const response = await apiClient.get(`/pet-owners/${ownerId}`);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get pet owner by account ID
   * GET /pet-owners/by-account/:accountId
   * @param {number} accountId - Account ID
   * @returns {Promise<{success: boolean, data?: PetOwnerResponse, error?: string}>}
   */
  getByAccountId: async (accountId) => {
    try {
      const response = await apiClient.get(`/pet-owners/by-account/${accountId}`);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get pets belonging to a pet owner
   * GET /pet-owners/:id/pets
   * @param {number} ownerId - Pet owner ID
   * @returns {Promise<{success: boolean, data?: any[], error?: string}>}
   */
  getPets: async (ownerId) => {
    try {
      const response = await apiClient.get(`/pet-owners/${ownerId}/pets`);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get appointments for a pet owner
   * GET /pet-owners/:id/appointments
   * @param {number} ownerId - Pet owner ID
   * @param {Object} [params={}] - Query parameters for filtering appointments
   * @returns {Promise<{success: boolean, data?: any[], error?: string}>}
   */
  getAppointments: async (ownerId, params = {}) => {
    try {
      const response = await apiClient.get(`/pet-owners/${ownerId}/appointments`, { params });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get invoices for a pet owner
   * GET /pet-owners/:id/invoices
   * @param {number} ownerId - Pet owner ID
   * @param {Object} [params={}] - Query parameters for filtering invoices
   * @returns {Promise<{success: boolean, data?: any[], error?: string}>}
   */
  getInvoices: async (ownerId, params = {}) => {
    try {
      const response = await apiClient.get(`/pet-owners/${ownerId}/invoices`, { params });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Update pet owner
   * PUT /pet-owners/:id
   * @param {number} ownerId - Pet owner ID
   * @param {UpdatePetOwnerDto} ownerData - Updated pet owner data
   * @returns {Promise<{success: boolean, data?: PetOwnerResponse, message?: string, error?: string}>}
   */
  update: async (ownerId, ownerData) => {
    try {
      const response = await apiClient.put(`/pet-owners/${ownerId}`, ownerData);

      return {
        success: true,
        data: response.data,
        message: 'Pet owner updated successfully',
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Delete pet owner
   * DELETE /pet-owners/:id
   * @param {number} ownerId - Pet owner ID to delete
   * @returns {Promise<{success: boolean, data?: any, message?: string, error?: string}>}
   */
  remove: async (ownerId) => {
    try {
      const response = await apiClient.delete(`/pet-owners/${ownerId}`);

      return {
        success: true,
        data: response.data,
        message: 'Pet owner deleted successfully',
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Search pet owners
   * GET /pet-owners/search
   * @param {Object} searchParams - Search parameters (keyword, email, phone, etc.)
   * @returns {Promise<{success: boolean, data?: PetOwnerResponse[], error?: string}>}
   */
  search: async (searchParams) => {
    try {
      const response = await apiClient.get('/pet-owners/search', { params: searchParams });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get pet owner statistics
   * GET /pet-owners/:id/statistics
   * @param {number} ownerId - Pet owner ID
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  getStatistics: async (ownerId) => {
    try {
      const response = await apiClient.get(`/pet-owners/${ownerId}/statistics`);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};
