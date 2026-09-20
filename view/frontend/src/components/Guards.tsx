import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Star from "./Star";

function Gate({ children, admin }: { children: ReactNode; admin?: boolean }) {
  const { user, initializing, isAdmin } = useAuth();
  const location = useLocation();

  if (initializing) {
    return (
      <div className="section" style={{ textAlign: "center" }}>
        <Star className="brand__star" style={{ margin: "0 auto" }} />
        <p className="text-muted">در حال بررسی نشست…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  if (admin && !isAdmin) {
    return (
      <div className="container section">
        <div className="state-box">
          <span>⛔</span>
          این بخش فقط برای مدیران سایت قابل دسترسی است.
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

export function RequireAuth({ children }: { children: ReactNode }) {
  return <Gate>{children}</Gate>;
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  return <Gate admin>{children}</Gate>;
}
