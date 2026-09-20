import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function ServiceAddPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onFile = (e: ChangeEvent<HTMLInputElement>) =>
    setImage(e.target.files?.[0] ?? null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !description.trim()) {
      setError("نام و توضیحات محصول الزامی است");
      return;
    }
    setLoading(true);
    try {
      const body = new FormData();
      body.append("name", name);
      body.append("description", description);
      if (image) body.append("image", image);
      await api("/services", { method: "POST", body });
      navigate("/services");
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ثبت محصول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section">
      <div className="page-head">
        <span className="eyebrow">ویترین دانا</span>
        <h1>ثبت محصول جدید</h1>
      </div>

      <div className="form-panel">
        {error && <div className="alert alert--error">{error}</div>}
        <form onSubmit={submit}>
          <div className="field field--full">
            <label htmlFor="svc-name">نام محصول</label>
            <input
              id="svc-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثلاً: سامانه هوشمند مدیریت انبار"
              required
            />
          </div>
          <div className="field field--full">
            <label htmlFor="svc-desc">توضیحات</label>
            <textarea
              id="svc-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="معرفی کوتاه محصول، امکانات و کاربردها…"
              required
            />
          </div>
          <div className="field field--full">
            <label htmlFor="svc-image">تصویر محصول (اختیاری)</label>
            <input id="svc-image" type="file" accept="image/*" onChange={onFile} />
            <p className="form-panel__footnote">
              در صورت عدم بارگذاری تصویر، نشانگر پیش‌فرض نمایش داده می‌شود.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? "در حال ثبت…" : "ثبت محصول"}
            </button>
            <Link to="/services" className="btn btn--ghost">انصراف</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
