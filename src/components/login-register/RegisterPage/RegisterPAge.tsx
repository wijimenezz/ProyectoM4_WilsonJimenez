// src/features/auth/RegisterPage/RegisterPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../shared/Logo";
import { EmailIcon } from "../../shared/icons";
import { PasswordInput } from "../PasswordInput";
import { AuthDivider } from "../AuthDivider";
import { OAuthGroup } from "../OAuthGroup";
import {
  loginWithGoogle,
  registerUser,
} from "../../../features/auth/AuthService";
import { getAuthErrorMessage } from "../../../features/auth/AuthErrors";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!form.terms) {
      setError("Debes aceptar los términos para continuar.");
      return;
    }

    setLoading(true);
    try {
      await registerUser(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    }
  };

  return (
    <main className="auth-page" aria-label="Register Page">
      <div
        className="auth-page__bg-blob auth-page__bg-blob--1"
        aria-hidden="true"
      />
      <div
        className="auth-page__bg-blob auth-page__bg-blob--2"
        aria-hidden="true"
      />
      <article
        className="auth-card auth-card--register"
        aria-labelledby="register-title"
      >
        <header className="auth-card__header">
          <Logo />
          <h1 className="auth-card__app-name" id="register-title">
            SynTask
          </h1>
          <p className="auth-card__tagline">Create your free account</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row form-row--two-col">
            <div className="form-group">
              <label className="form-label" htmlFor="reg-first-name">
                First name
              </label>
              <input
                className="form-input"
                type="text"
                id="reg-first-name"
                name="firstName"
                placeholder="Jane"
                autoComplete="given-name"
                aria-required="true"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-last-name">
                Last name
              </label>
              <input
                className="form-input"
                type="text"
                id="reg-last-name"
                name="lastName"
                placeholder="Smith"
                autoComplete="family-name"
                aria-required="true"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">
              Work email
            </label>
            <div className="input-wrapper">
              <span className="input-wrapper__icon" aria-hidden="true">
                <EmailIcon />
              </span>
              <input
                className="form-input"
                type="email"
                id="reg-email"
                name="email"
                placeholder="jane@company.com"
                autoComplete="email"
                aria-required="true"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">
              Password
            </label>
            <PasswordInput
              id="reg-password"
              name="password"
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-confirm-password">
              Confirm password
            </label>
            <PasswordInput
              id="reg-confirm-password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              ariaLabel="Toggle confirm password visibility"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="form-group form-group--checkbox">
            <label className="checkbox-label" htmlFor="reg-terms">
              <input
                className="checkbox-input"
                type="checkbox"
                id="reg-terms"
                name="terms"
                aria-required="true"
                checked={form.terms}
                onChange={handleChange}
              />
              <span className="checkbox-custom" aria-hidden="true" />
              <span className="checkbox-text">
                I agree to the{" "}
                <a href="#terms" className="form-inline-link">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#privacy" className="form-inline-link">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          {error && (
            <p role="alert" className="auth-error">
              {error}
            </p>
          )}

          <button
            className="btn btn--primary btn--full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <AuthDivider />
        <OAuthGroup label="Sign up" onGoogleClick={handleGoogle} />

        <footer className="auth-card__footer">
          <p className="auth-card__footer-text">
            Already have an account?{" "}
            <Link className="auth-card__footer-link" to="/login">
              Sign in
            </Link>
          </p>
        </footer>
      </article>
    </main>
  );
};
