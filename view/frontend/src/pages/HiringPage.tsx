import { useState, type FormEvent } from "react";
import { useAuth } from "../auth/AuthContext";
import { api } from "../api";

const PERKS = [
  {
    icon: "✦",
    title: "رشد حرفه‌ای",
    text: "دوره‌های آموزشی، منتورینگ و مسیر شغلی شفاف برای هر همکار.",
  },
  {
    icon: "⚖",
    title: "تعادل کار و زندگی",
    text: "ساعت کاری منعطف، دورکاری هیبریدی و مرخصی واقعی.",
  },
  {
    icon: "◎",
    title: "تیم متعهد و دوستانه",
    text: "کاری که انجامش را دوست داریم، با آدم‌هایی که دوستشان داریم.",
  },
];

export default function HiringPage() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    age: "",
    city: "",
    skill: "",
    resume: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const data = await api<{ message: string }>("/hiring/apply", {
        method: "POST",
        body: form,
      });
      setSuccess(data.message);
      setForm((f) => ({ ...f, age: "", skill: "", resume: "" }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ثبت درخواست");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section">
      <div className="page-head">
        <span className="eyebrow">فرصت‌های همکاری</span>
        <h1>به تیم دانا بپیوندید</h1>
        <p>
          اگر به ساختن چیزهای تازه باور دارید، جای شما در تیم ما خالی است.
          فرم زیر را کامل کنید؛ همکاران ما خیلی زود با شما تماس می‌گیرند.
        </p>
      </div>

      <div className="hiring-layout">
        <aside>
          <h2 style={{ color: "var(--lapis)", fontSize: "var(--text-xl)" }}>
            چرا دانا؟
          </h2>
          <ul className="perk-list">
            {PERKS.map((p) => (
              <li key={p.title}>
                <span className="perk-icon">{p.icon}</span>
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <div className="form-panel">
          {success && <div className="alert alert--success">{success}</div>}
          {error && <div className="alert alert--error">{error}</div>}
          <form onSubmit={submit} style={{ marginTop: success || error ? "1.2rem" : 0 }}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="h-name">نام و نام خانوادگی</label>
                <input id="h-name" value={form.name} onChange={set("name")} required />
              </div>
              <div className="field">
                <label htmlFor="h-email">ایمیل</label>
                <input
                  id="h-email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="h-age">سن</label>
                <input
                  id="h-age"
                  type="number"
                  min={16}
                  max={90}
                  value={form.age}
                  onChange={set("age")}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="h-city">شهر</label>
                <input
                  id="h-city"
                  value={form.city}
                  onChange={set("city")}
                  placeholder="تهران"
                  required
                />
              </div>
              <div className="field field--full">
                <label htmlFor="h-skill">تخصص / حوزه کاری</label>
                <input
                  id="h-skill"
                  value={form.skill}
                  onChange={set("skill")}
                  placeholder="مثلاً: برنامه‌نویس فرانت‌اند، طراح محصول، …"
                  required
                />
              </div>
              <div className="field field--full">
                <label htmlFor="h-resume">معرفی کوتاه خودتان</label>
                <textarea
                  id="h-resume"
                  value={form.resume}
                  onChange={set("resume")}
                  placeholder="سابقه کار، مهارت‌ها و آنچه دوست دارید بسازید…"
                  required
                />
              </div>
            </div>
            <button className="btn btn--primary" type="submit" disabled={loading}>
              {loading ? "در حال ارسال…" : "ارسال درخواست ✦"}
            </button>
            {!user && (
              <p className="form-panel__footnote">
                ثبت‌نام لازم نیست؛ اما اگر عضو سایت باشید درخواست شما به حساب
                کاربری‌تان متصل می‌شود.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
