// lib/models/Account.js
import { UserRole } from '../utils/constants';

/**
 * Entity Class: Account
 * Represents user login credentials and role
 * Maps to Account entity in Class Diagram (Section 1.5.1.1)
 */
export class Account {
  constructor(data = {}) {
    this.accountID = data.accountID || null;
    this.email = data.email || '';
    this.passwordHash = data.passwordHash || '';
    this.role = data.role || UserRole.PET_OWNER;
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.createdAt = data.createdAt || new Date();
  }

  /**
   * Validate credentials (implements login logic from UC-05)
   * @param {string} email 
   * @param {string} password 
   * @returns {boolean}
   */
  validateCredentials(email, password) {
    // In production, this would hash password and compare
    return this.email === email && this.passwordHash === password;
  }

  /**
   * Check if account is active
   * @returns {boolean}
   */
  isAccountActive() {
    return this.isActive;
  }

  /**
   * Get dashboard route based on role
   * @returns {string}
   */
  getDashboardRoute() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { RoleDashboards } = require('../utils/constants');
    return RoleDashboards[this.role] || '/dashboard/owner';
  }

  /**
   * Serialize for API response
   * @returns {Object}
   */
  toJSON() {
    return {
      accountID: this.accountID,
      email: this.email,
      role: this.role,
      isActive: this.isActive,
      createdAt: this.createdAt
    };
  }
}