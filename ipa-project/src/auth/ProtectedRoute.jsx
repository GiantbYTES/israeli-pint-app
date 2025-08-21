import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
  if (!activeUser) return <Navigate to="/Home" replace />;

  return <>{children}</>;
}

export default ProtectedRoute;
