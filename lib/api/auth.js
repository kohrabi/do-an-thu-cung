// lib/api/auth.js
import { UserRole, Messages } from '../utils/constants';
import { Account } from '../models/Account';

/**
 * Mock database - In production, this would be replaced with actual API calls
 */
const mockDatabase = {
  accounts: [
    new Account({
      accountID: 'ACC001',
      email: 'manager@pawlovers.com',
      passwordHash: 'Manager@123',
      role: UserRole.MANAGER
    }),
    new Account({
      accountID: 'ACC002',
      email: 'vet@pawlovers.com',
      passwordHash: 'Vet@123',
      role: UserRole.VETERINARIAN
    }),
    new Account({
      accountID: 'ACC003',
      email: 'staff@pawlovers.com',
      passwordHash: 'Staff@123',
      role: UserRole.CARE_STAFF
    }),
    new Account({
      accountID: 'ACC004',
      email: 'receptionist@pawlovers.com',
      passwordHash: 'Reception@123',
      role: UserRole.RECEPTIONIST
    })
  ],
  petOwners: []
};

/**
 * API: Register new pet owner account (UC-02)
 * @param {Object} data - Registration data
 * @returns {Promise<Object>}
 */
export async function register(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if email already exists
      const existingAccount = mockDatabase.accounts.find(
        acc => acc.email.toLowerCase() === data.email.toLowerCase()
      );

      if (existingAccount) {
        resolve({
          success: false,
          message: '❌ Email này đã được đăng ký. Vui lòng sử dụng email khác.'
        });
        return;
      }

      // Create new account
      const newAccount = new Account({
        accountID: `ACC${String(mockDatabase.accounts.length + 1).padStart(3, '0')}`,
        email: data.email,
        passwordHash: data.password, // In production: hash password
        role: UserRole.PET_OWNER,
        isActive: true
      });

      mockDatabase.accounts.push(newAccount);
      
      // Create associated PetOwner record
      mockDatabase.petOwners.push({
        ownerID: `OWN${String(mockDatabase.petOwners.length + 1).padStart(7, '0')}`,
        name: data.fullName,
        phone: data.phone,
        account: newAccount,
        pets: []
      });

      console.log('✅ Đăng ký thành công:', {
        account: newAccount.toJSON(),
        fullName: data.fullName,
        phone: data.phone
      });

      resolve({
        success: true,
        message: Messages.AUTH.REGISTER_SUCCESS,
        data: newAccount.toJSON()
      });
    }, 800); // Simulate network delay
  });
}

/**
 * API: Login to system (UC-05)
 * @param {Object} credentials - Login credentials {email, password}
 * @returns {Promise<Object>}
 */
export async function login(credentials) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const account = mockDatabase.accounts.find(
        acc => acc.email.toLowerCase() === credentials.email.toLowerCase()
      );

      if (!account) {
        resolve({
          success: false,
          message: Messages.AUTH.LOGIN_FAILED
        });
        return;
      }

      if (!account.validateCredentials(credentials.email, credentials.password)) {
        resolve({
          success: false,
          message: Messages.AUTH.LOGIN_FAILED
        });
        return;
      }

      if (!account.isAccountActive()) {
        resolve({
          success: false,
          message: '❌ Tài khoản đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên.'
        });
        return;
      }

      console.log('✅ Đăng nhập thành công:', account.toJSON());

      resolve({
        success: true,
        message: Messages.AUTH.LOGIN_SUCCESS,
        data: {
          account: account.toJSON(),
          redirectTo: account.getDashboardRoute()
        }
      });
    }, 600);
  });
}

/**
 * API: Request password reset (UC-06)
 * @param {Object} data - Email data
 * @returns {Promise<Object>}
 */
export async function resetPassword(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const account = mockDatabase.accounts.find(
        acc => acc.email.toLowerCase() === data.email.toLowerCase()
      );

      if (!account) {
        resolve({
          success: false,
          message: Messages.AUTH.RESET_PASSWORD_FAILED
        });
        return;
      }

      console.log('📧 Email khôi phục mật khẩu được gửi đến:', data.email);

      resolve({
        success: true,
        message: Messages.AUTH.RESET_PASSWORD_SENT
      });
    }, 700);
  });
}

/**
 * Helper: Get all mock accounts (for testing)
 */
export function getMockAccounts() {
  return mockDatabase.accounts.map(acc => ({
    email: acc.email,
    password: acc.passwordHash,
    role: acc.role
  }));
}