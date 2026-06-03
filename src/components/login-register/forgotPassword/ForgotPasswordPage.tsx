import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../shared/Logo";
import { EmailIcon } from "../../shared/icons";
import { sendPasswordReset } from "../../../features/auth/AuthService";
import { getAuthErrorMessage } from "../../../features/auth/AuthErrors";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    if (!email.trim()) {
      setError("Por favor ingresa tu correo electrónico");
      setLoading(false);
      return;
    }

    try {
      await sendPasswordReset(email);
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page" aria-label="Forgot Password Page">
      <div
        className="auth-page__bg-blob auth-page__bg-blob--1"
        aria-hidden="true"
      />
      <div
        className="auth-page__bg-blob auth-page__bg-blob--2"
        aria-hidden="true"
      />
      <article className="auth-card" aria-labelledby="forgot-title">
        <header className="auth-card__header">
          <Logo />
          <h1 className="auth-card__app-name" id="forgot-title">
            Task Manager
          </h1>
          <p className="auth-card__tagline">Recupera tu Contraseña</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {!success ? (
            <>
              <p
                style={{
                  fontSize: "var(--font-size-sm)",
                  color: "var(--color-text-muted)",
                  marginBottom: "var(--space-4)",
                }}
              >
                Ingresa el correo asociado a tu cuenta y te enviaremos un enlace
                para recuperar tu contraseña.
              </p>

              <div className="form-group">
                <label className="form-label" htmlFor="forgot-email">
                  Correo Electrónico
                </label>
                <div className="input-wrapper">
                  <span className="input-wrapper__icon" aria-hidden="true">
                    <EmailIcon />
                  </span>
                  <input
                    className="form-input"
                    type="email"
                    id="forgot-email"
                    name="email"
                    placeholder="tu@empresa.com"
                    autoComplete="email"
                    aria-required="true"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
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
                {loading ? "Enviando..." : "Enviar Enlace de Recuperación"}
              </button>
            </>
          ) : (
            <div
              style={{
                padding: "var(--space-4)",
                backgroundColor: "var(--color-success-light)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-success)",
                marginBottom: "var(--space-4)",
              }}
            >
              <p
                style={{
                  color: "var(--color-success)",
                  fontWeight: "500",
                  marginBottom: "var(--space-2)",
                }}
              >
                ✓ Correo Enviado
              </p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)" }}>
                Revisa tu bandeja de entrada. Encontrarás un enlace para
                recuperar tu contraseña.
              </p>
            </div>
          )}
        </form>

        <footer className="auth-card__footer">
          <p className="auth-card__footer-text">
            ¿Ya recordaste tu contraseña?{" "}
            <Link className="auth-card__footer-link" to="/login">
              Volver al Login
            </Link>
          </p>
        </footer>
      </article>
    </main>
  );
};
