import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Star from "../components/Star";

const EMPTY = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  city: "",
  age: "",
  phone: "",
  skill: "",
};

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const set = (key: keyof typeof EMPTY) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("رمز عبور و تکرار آن یکسان نیستند");
      return;
    }
    setLoading(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        city: form.city,
        age: form.age,
        phone: form.phone,
        skill: form.skill,
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ثبت‌نام");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <aside className="auth-layout__aside">
        <Star className="big-star" main="#f0d38a" accent="#0e1a40" />
        <span className="eyebrow" style={{ color: "var(--saffron-soft)" }}>
          عضویت
        </span>
        <h2>با چند دقیقه، عضو خانواده دانا شوید</h2>
        <p>
          با ساختن حساب کاربری می‌توانید در فرصت‌های همکاری شرکت کنید،
          نظرات‌تان را ثبت کنید و از خبرهای جدید زودتر باخبر شوید.
        </p>
      </aside>

      <div className="auth-layout__main" style={{ alignItems: "flex-start", paddingTop: "3rem" }}>
        <div className="auth-panel">
          <span className="eyebrow">ثبت‌نام</span>
          <h1>ساخت حساب کاربری</h1>
          <p className="subtitle">اطلاعات زیر را کامل کنید.</p>

          {error && <div className="alert alert--error" style={{ marginBottom: "1rem" }}>{error}</div>}

          <form onSubmit={submit}>
            <div className="form-grid">
              <div className="field field--full">
                <label htmlFor="reg-name">نام و نام خانوادگی</label>
                <input id="reg-name" value={form.name} onChange={set("name")} required />
              </div>
              <div className="field">
                <label htmlFor="reg-email">ایمیل</label>
                <input id="reg-email" type="email" dir="ltr" value={form.email} onChange={set("email")} required />
              </div>
              <div className="field">
                <label htmlFor="reg-phone">شماره تماس</label>
                <input
                  id="reg-phone"
                  dir="ltr"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="09xxxxxxxxx"
                  pattern="0\d{10}"
                  title="شماره تماس ۱۱ رقمی که با ۰ شروع می‌شود"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="reg-password">رمز عبور</label>
                <input
                  id="reg-password"
                  type="password"
                  value={form.password}
                  onChange={set("password")}
                  placeholder="حداقل ۶ کاراکتر"
                  minLength={6}
                  required
                  autoComplete="new-password"
                />
              </div>
              <div className="field">
                <label htmlFor="reg-confirm">تکرار رمز عبور</label>
                <input
                  id="reg-confirm"
                  type="password"
                  value={form.confirmPassword}
                  onChange={set("confirmPassword")}
                  minLength={6}
                  required
                  autoComplete="new-password"
                />
              </div>
              <div className="field">
                <label htmlFor="reg-city">شهر</label>
                <input id="reg-city" value={form.city} onChange={set("city")} placeholder="تهران" required />
              </div>
              <div className="field">
                <label htmlFor="reg-age">سن</label>
                <input id="reg-age" type="number" min={10} max={100} value={form.age} onChange={set("age")} required />
              </div>
              <div className="field field--full">
                <label htmlFor="reg-skill">شغل / تخصص</label>
                <input
                  id="reg-skill"
                  value={form.skill}
                  onChange={set("skill")}
                  placeholder="مثلاً: طراح رابط کاربری، دبیر ریاضی، دانشجو، …"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? "در حال ثبت‌نام…" : "ثبت‌نام"}
            </button>
          </form>

          <p className="auth-panel__foot">
            قبلاً ثبت‌نام کرده‌اید؟ <Link to="/login">وارد شوید</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
