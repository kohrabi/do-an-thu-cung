// lib/controllers/AccountController.js
import * as AuthAPI from '../api/auth';

/**
 * Control Class: AccountController
 * Manages business logic for user accounts
 * Maps to AccountController in Class Diagram (Section 1.5.3.1)
 * 
 * Responsibilities:
 * - handleLogin (UC-05)
 * - handleRegistration (UC-02)
 * - handlePasswordReset (UC-06)
 */
export const AccountController = {
  /**
   * Handle user registration (UC-02: Register Account)
   * @param {Object} registrationData
   * @returns {Promise<Object>}
   */
  async handleRegistration(registrationData) {
    try {
      const response = await AuthAPI.register(registrationData);
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
      const response = await AuthAPI.login(credentials);
      
      if (response.success) {
        // In production: Store auth token in localStorage/cookies
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', JSON.stringify(response.data));
        }
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
      const response = await AuthAPI.resetPassword(emailData);
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
  handleLogout() {
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