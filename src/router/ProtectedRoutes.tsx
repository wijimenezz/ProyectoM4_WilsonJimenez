// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/Authenticator";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg)",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "3px solid var(--color-border)",
            borderTop: "3px solid var(--color-indigo)",
            borderRadius: "50%",
            animation: "spin 0.7s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};
