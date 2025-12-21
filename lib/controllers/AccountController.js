// lib/controllers/AccountController.js
import { authApi, registerMock, loginMock, resetPasswordMock } from '../api/auth';
import { USE_MOCK_API } from '../api/config';

// Map backend UserType to dashboard routes
const UserTypeToDashboard = {
  'PET_OWNER': '/dashboard/owner',
  'MANAGER': '/dashboard/manager',
  'VETERINARIAN': '/dashboard/vet',
  'CARE_STAFF': '/dashboard/care-staff',
  'RECEPTIONIST': '/dashboard/receptionist',
};

/**
 * Control Class: AccountController
 * Manages business logic for user accounts
 * Maps to AccountController in Class Diagram (Section 1.5.3.1)
 * 
 * Supports both MOCK and REAL API modes based on USE_MOCK_API config.
 * 
 * Responsibilities:
 * - handleLogin (UC-05)
 * - handleRegistration (UC-02)
 * - handlePasswordReset (UC-06)
 */
export const AccountController = {
  /**
   * Handle user registration (UC-02: Register Account)
   * @param {Object} registrationData - Frontend form data
   * @returns {Promise<Object>}
   */
  async handleRegistration(registrationData) {
    try {
      // Map frontend fields to backend DTO
      const apiData = {
        email: registrationData.email,
        password: registrationData.password,
        fullName: registrationData.fullName,
        phoneNumber: registrationData.phone, // Frontend uses 'phone', backend expects 'phoneNumber'
        address: registrationData.address || null,
        preferredContactMethod: registrationData.preferredContactMethod || 'Email',
      };

      // Use mock or real API based on config
      const response = USE_MOCK_API
        ? await registerMock(registrationData)
        : await authApi.register(apiData);
      return response;
    } catch (error) {
      console.error('❌ Registration error:', error);
      return {
        success: false,
        message: 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.'
      };
    }
  },

  /**
   * Handle user login (UC-05: Log In)
   * @param {Object} credentials - {email, password}
   * @returns {Promise<Object>}
   */
  async handleLogin(credentials) {
    try {
      let response;

      if (USE_MOCK_API) {
        // Mock API returns: { success, message, data: { account, redirectTo } }
        response = await loginMock(credentials);
      } else {
        // Real API returns: { success, data: { accessToken, account: { userType, ... } } }
        response = await authApi.login(credentials.email, credentials.password);

        // Normalize real API response to match expected format
        if (response.success && response.data) {
          // Backend returns { accessToken, account: { userType, ... } }
          const account = response.data.account || response.data;
          const userType = account.userType || 'PET_OWNER';

          // Map backend userType to frontend role format
          const UserTypeToRole = {
            'PET_OWNER': 'pet_owner',
            'MANAGER': 'manager',
            'VETERINARIAN': 'veterinarian',
            'CARE_STAFF': 'care_staff',
            'RECEPTIONIST': 'receptionist',
          };

          response = {
            success: true,
            message: '✅ Đăng nhập thành công!',
            data: {
              account: {
                ...account,
                role: UserTypeToRole[userType] || 'pet_owner' // Add role field for dashboard
              },
              accessToken: response.data.accessToken,
              redirectTo: UserTypeToDashboard[userType] || '/dashboard/owner'
            }
          };
        }
      }

      // Store auth token in localStorage
      if (response.success && typeof window !== 'undefined') {
        localStorage.setItem('auth_token', JSON.stringify(response.data));
      }

      return response;
    } catch (error) {
      console.error('❌ Login error:', error);
      return {
        success: false,
        message: 'Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.'
      };
    }
  },

  /**
   * Handle password reset request (UC-06: Reset Password)
   * @param {Object} emailData - {email}
   * @returns {Promise<Object>}
   */
  async handlePasswordReset(emailData) {
    try {
      // Use mock or real API based on config
      const response = USE_MOCK_API
        ? await resetPasswordMock(emailData)
        : await authApi.resetPassword(emailData.email);
      return response;
    } catch (error) {
      console.error('❌ Password reset error:', error);
      return {
        success: false,
        message: 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.'
      };
    }
  },

  /**
   * Handle user logout
   */
  async handleLogout() {
    // Use real API logout if not in mock mode
    if (!USE_MOCK_API) {
      try {
        await authApi.logout();
      } catch (error) {
        // Ignore logout API errors, still clear local state
      }
    }

    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  },

  /**
   * Get current authenticated user
   * @returns {Object|null}
   */
  getCurrentUser() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      return token ? JSON.parse(token) : null;
    }
    return null;
  }
};
