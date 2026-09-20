import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function NewsAddPage() {
  const [title, setTitle] = useState("");
  const [event, setEvent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onFile = (e: ChangeEvent<HTMLInputElement>) =>
    setImage(e.target.files?.[0] ?? null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !event.trim()) {
      setError("عنوان و متن خبر الزامی است");
      return;
    }
    setLoading(true);
    try {
      const body = new FormData();
      body.append("title", title);
      body.append("event", event);
      if (image) body.append("image", image);
      await api("/news", { method: "POST", body });
      navigate("/news");
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ثبت خبر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section">
      <div className="page-head">
        <span className="eyebrow">اتاق خبر</span>
        <h1>ثبت خبر جدید</h1>
      </div>

      <div className="form-panel">
        <p className="text-muted">
          خبر بلافاصله پس از ثبت، در صفحه اخبار منتشر می‌شود.
        </p>
        {error && <div className="alert alert--error" style={{ marginTop: "1rem" }}>{error}</div>}
        <form onSubmit={submit}>
          <div className="field field--full">
            <label htmlFor="news-title">عنوان خبر</label>
            <input
              id="news-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلاً: رونمایی از نسخه جدید محصول دانا"
              required
            />
          </div>
          <div className="field field--full">
            <label htmlFor="news-event">متن خبر</label>
            <textarea
              id="news-event"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              placeholder="متن کامل خبر را اینجا بنویسید…"
              required
            />
          </div>
          <div className="field field--full">
            <label htmlFor="news-image">تصویر خبر (اختیاری)</label>
            <input
              id="news-image"
              type="file"
              accept="image/*"
              onChange={onFile}
            />
            <p className="form-panel__footnote">
              فرمت‌های مجاز: JPG / PNG / WEBP / GIF — حداکثر ۵ مگابایت
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? "در حال انتشار…" : "انتشار خبر"}
            </button>
            <Link to="/news" className="btn btn--ghost">انصراف</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
