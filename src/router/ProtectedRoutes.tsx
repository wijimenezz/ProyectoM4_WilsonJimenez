import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/Authenticator";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};
