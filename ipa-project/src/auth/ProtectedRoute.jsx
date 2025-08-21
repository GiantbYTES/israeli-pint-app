import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
  if (!activeUser) return <Navigate to="/" replace />;

  return <>{children}</>;
}

export default ProtectedRoute;
