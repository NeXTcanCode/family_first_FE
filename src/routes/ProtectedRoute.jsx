import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Reads static auth state from Redux; spinner while /me in flight; redirect if no user.
export default function ProtectedRoute() {
  const loading = useSelector((s) => s.auth.loading);
  const user = useSelector((s) => s.auth.user);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading…</span>
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}