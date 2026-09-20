import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Star from "../components/Star";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(location.state?.from ?? "/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ورود");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <aside className="auth-layout__aside">
        <Star className="big-star" main="#f0d38a" accent="#0e1a40" />
        <span className="eyebrow" style={{ color: "var(--saffron-soft)" }}>
          خوش آمدید
        </span>
        <h2>دوباره به خانه دانا خوش آمدید</h2>
        <p>
          با ورود به حساب کاربری، به میزکار شخصی، تاریخچه فعالیت‌ها و — اگر
          مدیر هستید — پنل مدیریت سایت دسترسی خواهید داشت.
        </p>
      </aside>

      <div className="auth-layout__main">
        <div className="auth-panel">
          <span className="eyebrow">ورود</span>
          <h1>ورود به حساب کاربری</h1>
          <p className="subtitle">ایمیل و رمز عبور خود را وارد کنید.</p>

          {error && <div className="alert alert--error" style={{ marginBottom: "1rem" }}>{error}</div>}

          <form onSubmit={submit}>
            <div className="field">
              <label htmlFor="login-email">ایمیل</label>
              <input
                id="login-email"
                type="email"
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label htmlFor="login-password">رمز عبور</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? "در حال ورود…" : "ورود"}
            </button>
          </form>

          <p className="auth-panel__foot">
            حساب کاربری ندارید؟ <Link to="/register">ثبت‌نام کنید</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
