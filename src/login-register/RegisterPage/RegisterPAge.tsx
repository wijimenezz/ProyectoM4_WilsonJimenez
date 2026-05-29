import { useState } from "react";
import { Logo } from "../../components/shared/Logo";
import { EmailIcon } from "../../components/shared/icons";
import { PasswordInput } from "../PasswordInput";
import { AuthDivider } from "../AuthDivider";
import { OAuthGroup } from "../OAuthGroup";

export const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
        <form
          className="auth-form"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
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
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-confirm-password">
              Confirm password
            </label>
            <PasswordInput
              id="reg-confirm-password"
              name="confirm_password"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              ariaLabel="Toggle confirm password visibility"
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
          <button className="btn btn--primary btn--full" type="submit">
            Create Account
          </button>
        </form>
        <AuthDivider />
        <OAuthGroup label="Sign up" />
        <footer className="auth-card__footer">
          <p className="auth-card__footer-text">
            Already have an account?{" "}
            <a className="auth-card__footer-link" href="#preview-login">
              Sign in
            </a>
          </p>
        </footer>
      </article>
    </main>
  );
};
