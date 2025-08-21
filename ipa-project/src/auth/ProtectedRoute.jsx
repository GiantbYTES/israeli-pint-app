import { Navigate } from "react-router";
import { useAuth } from "./AuthProvider";

function ProtectedRoute({ children }) {
  const { activeUser } = useAuth();

  if (!activeUser) return <Navigate to="/" replace />;

  return <>{children}</>;
}

export default ProtectedRoute;
