import React, { useState } from "react";
import "../styles/AuthForms.css";

export default function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  required = false,
  disabled = false,
  autoComplete,
  hint,
  showPasswordToggle = false,
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const showError = Boolean(touched && error);
  const inputType =
    showPasswordToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div
      className={`form-field ${showError ? "form-field--error" : ""} ${className}`}
    >
      {label && (
        <label htmlFor={id} className="form-field__label">
          {label}
          {required && <span className="form-field__required"> *</span>}
        </label>
      )}

      <div className="form-field__input-wrap">
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={showError}
          aria-describedby={
            showError ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          className={`form-field__input ${
            showError ? "form-field__input--error" : ""
          } ${showPasswordToggle ? "form-field__input--with-toggle" : ""}`}
        />

        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            className="form-field__toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {hint && !showError && (
        <p id={`${id}-hint`} className="form-field__hint">
          {hint}
        </p>
      )}

      {showError && (
        <p id={`${id}-error`} className="form-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
