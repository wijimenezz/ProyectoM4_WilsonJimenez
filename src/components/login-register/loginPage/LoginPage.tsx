// src/features/auth/loginPage/LoginPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../shared/Logo";
import { EmailIcon } from "../../shared/icons";
import { PasswordInput } from "../PasswordInput";
import { AuthDivider } from "../AuthDivider";
import { OAuthGroup } from "../OAuthGroup";
import { loginUser, loginWithGoogle } from "../../../features/auth/AuthService";
import { getAuthErrorMessage } from "../../../features/auth/AuthErrors";
import type { FormEvent } from "react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser(email, password);
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
    <main className="auth-page" aria-label="Login Page">
      <div
        className="auth-page__bg-blob auth-page__bg-blob--1"
        aria-hidden="true"
      />
      <div
        className="auth-page__bg-blob auth-page__bg-blob--2"
        aria-hidden="true"
      />
      <article className="auth-card" aria-labelledby="login-title">
        <header className="auth-card__header">
          <Logo />
          <h1 className="auth-card__app-name" id="login-title">
            Task Manager
          </h1>
          <p className="auth-card__tagline">Ingresa a tu Lugar de Trabajo</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
              Correo Electrónico
            </label>
            <div className="input-wrapper">
              <span className="input-wrapper__icon" aria-hidden="true">
                <EmailIcon />
              </span>
              <input
                className="form-input"
                type="email"
                id="login-email"
                name="email"
                placeholder="you@company.com"
                autoComplete="email"
                aria-required="true"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label className="form-label" htmlFor="login-password">
                Contraseña
              </label>
              <Link
                className="form-label-row__link"
                to="/forgot-password"
              >
                Olvidaste tu Contraseña?
              </Link>
            </div>
            <PasswordInput
              id="login-password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group form-group--checkbox">
            <label className="checkbox-label" htmlFor="login-remember">
              <input
                className="checkbox-input"
                type="checkbox"
                id="login-remember"
                name="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="checkbox-custom" aria-hidden="true" />
              <span className="checkbox-text">Recuerdame por 30 Días</span>
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
            {loading ? "Signing in..." : "Sign in to SynTask"}
          </button>
        </form>

        <AuthDivider />
        <OAuthGroup label="Sign in" onGoogleClick={handleGoogle} />

        <footer className="auth-card__footer">
          <p className="auth-card__footer-text">
            No tienes una Cuenta?{" "}
            <Link className="auth-card__footer-link" to="/register">
              Crea una Cuenta
            </Link>
          </p>
        </footer>
      </article>
    </main>
  );
};
