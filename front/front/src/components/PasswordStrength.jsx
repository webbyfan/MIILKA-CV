import React from "react";
import { getPasswordStrength } from "../utils/validation";
import "../styles/AuthForms.css";

const CHECK_LABELS = [
  { key: "length", label: "At least 6 characters" },
  { key: "uppercase", label: "One uppercase letter" },
  { key: "lowercase", label: "One lowercase letter" },
  { key: "number", label: "One number" },
  { key: "special", label: "One special character" },
];

export default function PasswordStrength({ password, showChecks = true }) {
  const { score, label, color, checks } = getPasswordStrength(password);

  if (!password) return null;

  return (
    <div className="password-strength" aria-live="polite">
      <div className="password-strength__header">
        <span className="password-strength__label">Password strength</span>
        {label && (
          <span
            className="password-strength__value"
            style={{ color }}
          >
            {label}
          </span>
        )}
      </div>

      <div
        className="password-strength__bars"
        role="meter"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-label={`Password strength: ${label || "empty"}`}
      >
        {[1, 2, 3, 4].map((level) => (
          <span
            key={level}
            className={`password-strength__bar ${
              score >= level ? "password-strength__bar--active" : ""
            }`}
            style={score >= level ? { backgroundColor: color } : undefined}
          />
        ))}
      </div>

      {showChecks && (
        <ul className="password-strength__checks">
          {CHECK_LABELS.map(({ key, label: checkLabel }) => (
            <li
              key={key}
              className={`password-strength__check ${
                checks[key] ? "password-strength__check--met" : ""
              }`}
            >
              <span className="password-strength__check-icon" aria-hidden="true">
                {checks[key] ? "✓" : "○"}
              </span>
              {checkLabel}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
