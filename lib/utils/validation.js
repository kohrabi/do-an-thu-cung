// lib/utils/validation.js

/**
 * Regex patterns cho validation
 * Tuân thủ data dictionary trong SRS
 */
export const ValidationRegex = {
  // Họ tên tiếng Việt có dấu
  fullName: /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)+$/,
  
  // Email format chuẩn
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Số điện thoại Việt Nam (10-11 chữ số, bắt đầu bằng 0)
  phone: /^0[0-9]{9,10}$/,
  
  // Mật khẩu: ít nhất 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

/**
 * Thông báo lỗi validation
 */
export const ValidationMessages = {
  fullName: {
    required: 'Vui lòng nhập họ và tên',
    invalid: 'Họ tên không hợp lệ. Vui lòng viết hoa chữ cái đầu mỗi từ.'
  },
  email: {
    required: 'Vui lòng nhập email',
    invalid: 'Email không đúng định dạng (ví dụ: user@domain.com)'
  },
  phone: {
    required: 'Vui lòng nhập số điện thoại',
    invalid: 'Số điện thoại phải là 10-11 chữ số và bắt đầu bằng số 0'
  },
  password: {
    required: 'Vui lòng nhập mật khẩu',
    invalid: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt (@$!%*?&)'
  },
  confirmPassword: {
    required: 'Vui lòng xác nhận mật khẩu',
    notMatch: 'Mật khẩu xác nhận không khớp'
  }
};

/**
 * Validate form đăng ký (UC-02: Register Account)
 * @param {Object} form - Dữ liệu form đăng ký
 * @returns {Object} - Object chứa các lỗi validation
 */
export function validateRegister(form) {
  const errors = {};

  // Validate họ tên
  if (!form.fullName?.trim()) {
    errors.fullName = ValidationMessages.fullName.required;
  } else if (!ValidationRegex.fullName.test(form.fullName.trim())) {
    errors.fullName = ValidationMessages.fullName.invalid;
  }

  // Validate email
  if (!form.email?.trim()) {
    errors.email = ValidationMessages.email.required;
  } else if (!ValidationRegex.email.test(form.email.trim())) {
    errors.email = ValidationMessages.email.invalid;
  }

  // Validate số điện thoại
  if (!form.phone?.trim()) {
    errors.phone = ValidationMessages.phone.required;
  } else if (!ValidationRegex.phone.test(form.phone.trim())) {
    errors.phone = ValidationMessages.phone.invalid;
  }

  // Validate mật khẩu
  if (!form.password) {
    errors.password = ValidationMessages.password.required;
  } else if (!ValidationRegex.password.test(form.password)) {
    errors.password = ValidationMessages.password.invalid;
  }

  // Validate xác nhận mật khẩu
  if (!form.confirmPassword) {
    errors.confirmPassword = ValidationMessages.confirmPassword.required;
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = ValidationMessages.confirmPassword.notMatch;
  }

  return errors;
}

/**
 * Validate form đăng nhập (UC-05: Log In)
 * @param {Object} form - Dữ liệu form đăng nhập
 * @returns {Object} - Object chứa các lỗi validation
 */
export function validateLogin(form) {
  const errors = {};

  if (!form.email?.trim()) {
    errors.email = ValidationMessages.email.required;
  } else if (!ValidationRegex.email.test(form.email.trim())) {
    errors.email = ValidationMessages.email.invalid;
  }

  if (!form.password) {
    errors.password = ValidationMessages.password.required;
  }

  return errors;
}

/**
 * Validate form quên mật khẩu (UC-06: Reset Password)
 * @param {Object} form - Dữ liệu form reset password
 * @returns {Object} - Object chứa các lỗi validation
 */
export function validateResetPassword(form) {
  const errors = {};

  if (!form.email?.trim()) {
    errors.email = ValidationMessages.email.required;
  } else if (!ValidationRegex.email.test(form.email.trim())) {
    errors.email = ValidationMessages.email.invalid;
  }

  return errors;
}