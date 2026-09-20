import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { initial } from "../lib/format";
import Star from "./Star";

const LINKS = [
  { to: "/", label: "خانه" },
  { to: "/news", label: "اخبار" },
  { to: "/services", label: "محصولات" },
  { to: "/hiring", label: "فرصت‌های همکاری" },
  { to: "/contact", label: "تماس با ما" },
];

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="brand" aria-label="دانا — صفحه اصلی">
          <Star className="brand__star" />
          <span className="brand__word">
            دانا
            <small>DANA CO.</small>
          </span>
        </Link>

        <nav aria-label="ناوبری اصلی">
          <ul className={`nav-links ${open ? "open" : ""}`}>
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            {isAdmin && (
              <li>
                <NavLink
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  پنل مدیریت
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="navbar__actions">
          {user ? (
            <>
              <Link to="/dashboard" className="user-chip" title="میزکار">
                <span className="user-chip__avatar">{initial(user.name)}</span>
                <span className="user-chip__name">{user.name}</span>
                {isAdmin && <span className="role-badge">مدیر</span>}
              </Link>
              <button className="btn btn--ghost btn--sm" onClick={handleLogout}>
                خروج
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost btn--sm">
                ورود
              </Link>
              <Link to="/register" className="btn btn--primary btn--sm">
                ثبت‌نام
              </Link>
            </>
          )}
          <button
            className="nav-toggle"
            aria-label="باز و بسته کردن منو"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
