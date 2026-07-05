const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return EMAIL_REGEX.test(String(email).trim());
}

export function getPasswordChecks(password) {
  return {
    length: password.length >= 6,
    lengthStrong: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

export function getPasswordStrength(password) {
  if (!password) {
    return {
      score: 0,
      label: "",
      color: "#e5e7eb",
      checks: getPasswordChecks(""),
    };
  }

  const checks = getPasswordChecks(password);
  let score = 0;

  if (checks.length) score += 1;
  if (checks.uppercase && checks.lowercase) score += 1;
  if (checks.number) score += 1;
  if (checks.special || password.length >= 10) score += 1;

  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["#e5e7eb", "#ef4444", "#f59e0b", "#22c55e", "#078930"];

  return {
    score,
    label: labels[score],
    color: colors[score],
    checks,
  };
}

export function validateEmail(value) {
  const trimmed = String(value).trim();
  if (!trimmed) return "Email is required";
  if (!isValidEmail(trimmed)) return "Enter a valid email address";
  return "";
}

export function validatePassword(value, { minLength = 6 } = {}) {
  if (!value) return "Password is required";
  if (value.length < minLength)
    return `Password must be at least ${minLength} characters`;
  return "";
}

export function validateConfirmPassword(password, confirm) {
  if (!confirm) return "Please confirm your password";
  if (password !== confirm) return "Passwords do not match";
  return "";
}

export function validateLoginForm({ email, password }) {
  const errors = {};
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return errors;
}

export function validateRegisterForm({
  email,
  password,
  confirm,
  firstName,
  lastName,
}) {
  const errors = {};

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  const confirmError = validateConfirmPassword(password, confirm);
  if (confirmError) errors.confirm = confirmError;

  if (firstName && firstName.trim().length > 128) {
    errors.firstName = "First name is too long";
  }
  if (lastName && lastName.trim().length > 128) {
    errors.lastName = "Last name is too long";
  }

  return errors;
}

export function validateChangePasswordForm({
  currentPassword,
  newPassword,
  confirmPassword,
}) {
  const errors = {};

  if (!currentPassword) errors.currentPassword = "Current password is required";

  const newPasswordError = validatePassword(newPassword);
  if (newPasswordError) errors.newPassword = newPasswordError;

  const confirmError = validateConfirmPassword(newPassword, confirmPassword);
  if (confirmError) errors.confirmPassword = confirmError;

  if (
    currentPassword &&
    newPassword &&
    currentPassword === newPassword
  ) {
    errors.newPassword = "New password must be different from current password";
  }

  return errors;
}
