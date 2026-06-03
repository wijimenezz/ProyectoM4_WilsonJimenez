import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Logo } from "../../shared/Logo";
import { PasswordInput } from "../PasswordInput";
import {
  verifyResetCode,
  resetPasswordWithCode,
} from "../../../features/auth/AuthService";
import { getAuthErrorMessage } from "../../../features/auth/AuthErrors";

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("oobCode");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validatingCode, setValidatingCode] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!code) {
      setError("Código de recuperación inválido o expirado");
      setValidatingCode(false);
      return;
    }

    const validateCode = async () => {
      try {
        const userEmail = await verifyResetCode(code);
        setEmail(userEmail);
        setValidatingCode(false);
      } catch (err) {
        setError(
          "Este enlace de recuperación es inválido o ha expirado. Intenta nuevamente."
        );
        setValidatingCode(false);
      }
    };

    validateCode();
  }, [code]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!code) {
      setError("Código de recuperación inválido");
      return;
    }

    setLoading(true);

    try {
      await resetPasswordWithCode(code, password);
      setSuccess(true);
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (validatingCode) {
    return (
      <main className="auth-page" aria-label="Reset Password Page">
        <div
          className="auth-page__bg-blob auth-page__bg-blob--1"
          aria-hidden="true"
        />
        <div
          className="auth-page__bg-blob auth-page__bg-blob--2"
          aria-hidden="true"
        />
        <article className="auth-card" aria-labelledby="reset-title">
          <header className="auth-card__header">
            <Logo />
            <h1 className="auth-card__app-name" id="reset-title">
              Task Manager
            </h1>
          </header>
          <p
            style={{
              textAlign: "center",
              color: "var(--color-text-muted)",
              padding: "var(--space-6) 0",
            }}
          >
            Verificando enlace...
          </p>
        </article>
      </main>
    );
  }

  if (error && !email) {
    return (
      <main className="auth-page" aria-label="Reset Password Page">
        <div
          className="auth-page__bg-blob auth-page__bg-blob--1"
          aria-hidden="true"
        />
        <div
          className="auth-page__bg-blob auth-page__bg-blob--2"
          aria-hidden="true"
        />
        <article className="auth-card" aria-labelledby="reset-title">
          <header className="auth-card__header">
            <Logo />
            <h1 className="auth-card__app-name" id="reset-title">
              Task Manager
            </h1>
            <p className="auth-card__tagline">Error en la Recuperación</p>
          </header>

          <div
            style={{
              padding: "var(--space-4)",
              backgroundColor: "var(--color-danger-light)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-danger)",
              marginBottom: "var(--space-4)",
            }}
          >
            <p style={{ color: "var(--color-danger)", marginBottom: "var(--space-3)" }}>
              {error}
            </p>
            <Link
              to="/forgot-password"
              className="btn btn--primary btn--full"
              style={{ textDecoration: "none", display: "block" }}
            >
              Intentar Nuevamente
            </Link>
          </div>

          <footer className="auth-card__footer">
            <p className="auth-card__footer-text">
              <Link className="auth-card__footer-link" to="/login">
                Volver al Login
              </Link>
            </p>
          </footer>
        </article>
      </main>
    );
  }

  return (
    <main className="auth-page" aria-label="Reset Password Page">
      <div
        className="auth-page__bg-blob auth-page__bg-blob--1"
        aria-hidden="true"
      />
      <div
        className="auth-page__bg-blob auth-page__bg-blob--2"
        aria-hidden="true"
      />
      <article className="auth-card" aria-labelledby="reset-title">
        <header className="auth-card__header">
          <Logo />
          <h1 className="auth-card__app-name" id="reset-title">
            Task Manager
          </h1>
          <p className="auth-card__tagline">Nueva Contraseña</p>
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
                Ingresa una nueva contraseña para tu cuenta.
              </p>

              <div className="form-group">
                <label className="form-label" htmlFor="new-password">
                  Nueva Contraseña
                </label>
                <PasswordInput
                  id="new-password"
                  name="password"
                  placeholder="Min. 8 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirm-password">
                  Confirmar Contraseña
                </label>
                <PasswordInput
                  id="confirm-password"
                  name="confirmPassword"
                  placeholder="Repite tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
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
                {loading ? "Actualizando..." : "Actualizar Contraseña"}
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
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "var(--color-success)",
                  fontWeight: "500",
                  marginBottom: "var(--space-2)",
                  fontSize: "18px",
                }}
              >
                ✓ Contraseña Actualizada
              </p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)" }}>
                Redirigiendo al login...
              </p>
            </div>
          )}
        </form>

        {!success && (
          <footer className="auth-card__footer">
            <p className="auth-card__footer-text">
              <Link className="auth-card__footer-link" to="/login">
                Volver al Login
              </Link>
            </p>
          </footer>
        )}
      </article>
    </main>
  );
};
