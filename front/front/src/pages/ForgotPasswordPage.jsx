import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [inputType, setInputType] = useState(null); // "email" or "phone"

  // Function to detect if input is email or phone
  const detectInputType = (value) => {
    // Email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone regex pattern (accepts various formats)
    const phoneRegex = /^[\d\s\-\+\(\)]+$|^\d{7,15}$/;

    if (emailRegex.test(value)) {
      return "email";
    } else if (phoneRegex.test(value) && value.replace(/\D/g, "").length >= 7) {
      return "phone";
    }
    return null;
  };

  const getFieldError = (value) => {
    const trimmedInput = value.trim();
    if (!trimmedInput) return "Please enter an email or phone number";
    if (!detectInputType(trimmedInput))
      return "Please enter a valid email or phone number";
    return "";
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setError("");
    setSuccessMessage("");

    if (value.trim()) {
      setInputType(detectInputType(value));
    } else {
      setInputType(null);
    }

    if (touched) {
      setFieldError(getFieldError(value));
    }
  };

  const handleInputBlur = () => {
    setTouched(true);
    setFieldError(getFieldError(input));
  };

  // Validate input
  const validateInput = () => {
    const message = getFieldError(input);
    setFieldError(message);
    setTouched(true);
    return !message;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!validateInput()) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // Prepare request body
      const requestBody =
        inputType === "email"
          ? { email: input.trim() }
          : { phone: input.trim() };

      // Call backend API (will be built later)
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message ONLY for email
        if (inputType === "email") {
          setSuccessMessage("We've sent a password reset link to your email.");
          setInput("");
          setInputType(null);
        } else {
          // For phone, show different message or just success
          setSuccessMessage("We've sent a verification code to your phone.");
          setInput("");
          setInputType(null);
        }
      } else {
        // Handle error from backend
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      // Handle network error
      console.error("Error:", err);
      setError(
        "Unable to connect. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle back to login
  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        {/* Back Button */}
        <button
          onClick={handleBackToLogin}
          className="back-button"
          title="Back to login"
        >
          ← Back to Login
        </button>

        {/* Logo & Brand */}
        <div className="logo-section">
          <div className="logo">M</div>
          <h1 className="page-title">Forgot Password</h1>
          <p className="page-subtitle">
            Enter your email or phone number to reset your password.
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="success-message">✓ {successMessage}</div>
        )}

        {/* Error Message (API / network) */}
        {error && <div className="error-message">✕ {error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="input-field" className="input-label">
              Email or Phone Number
            </label>
            <div className="input-wrapper">
              <input
                id="input-field"
                type="text"
                value={input}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder="Enter your email or phone number"
                disabled={loading}
                aria-invalid={Boolean(touched && fieldError)}
                aria-describedby={
                  touched && fieldError ? "input-field-error" : undefined
                }
                className={`input-field ${
                  touched && fieldError ? "input-error" : ""
                } ${inputType ? `input-${inputType}` : ""}`}
              />
              {inputType && (
                <span className={`input-indicator ${inputType}`}>
                  {inputType === "email" ? "📧 Email" : "📱 Phone"}
                </span>
              )}
            </div>
            {touched && fieldError && (
              <p id="input-field-error" className="field-inline-error" role="alert">
                {fieldError}
              </p>
            )}
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="continue-button"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Sending...
              </>
            ) : (
              "Continue"
            )}
          </button>
        </form>

        {/* Footer Note */}
        <p className="footer-note">
          Remember your password?{" "}
          <button
            type="button"
            onClick={handleBackToLogin}
            className="link-button"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}
