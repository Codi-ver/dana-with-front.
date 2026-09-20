import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import type { NewsItem } from "../types";
import SmartImage from "../components/SmartImage";
import { faDate } from "../lib/format";

export default function OneNewsPage() {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    api<NewsItem>(`/news/${id}`)
      .then(setNews)
      .catch((e) => setError(e instanceof Error ? e.message : "خبری یافت نشد"))
      .finally(() => setLoading(false));
  }, [id]);

  const remove = async () => {
    if (!confirm("این خبر حذف شود؟")) return;
    try {
      await api(`/news/${id}`, { method: "DELETE" });
      window.location.assign("/news");
    } catch (e) {
      alert(e instanceof Error ? e.message : "خطا در حذف خبر");
    }
  };

  if (loading) {
    return (
      <div className="container section">
        <div className="skeleton" style={{ height: 90, marginBottom: "1.5rem" }} />
        <div className="skeleton" style={{ height: 380 }} />
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="container section">
        <div className="state-box">
          <span>✦</span>
          {error || "خبری یافت نشد"}
          <div style={{ marginTop: "1rem" }}>
            <Link to="/news" className="btn btn--sm">بازگشت به اخبار</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container section">
      <article className="article">
        <div className="article__head">
          <span className="eyebrow">خبر دانا</span>
          <h1>{news.title}</h1>
          <div className="article__meta">
            <span>🗓 {faDate(news.created_at)}</span>
            <span>✍ {news.author_name ?? "تحریریه دانا"}</span>
            {news.status !== "published" && (
              <span className="chip">پیش‌نویس</span>
            )}
          </div>
        </div>

        <div className="article__media">
          <SmartImage src={news.image} alt={news.title} />
        </div>

        <div className="article__body">{news.event}</div>

        <div className="article__footer">
          <Link to="/news" className="btn btn--ghost btn--sm">
            → بازگشت به اخبار
          </Link>
          {isAdmin && (
            <button className="btn btn--danger btn--sm" onClick={remove}>
              حذف خبر
            </button>
          )}
        </div>
      </article>
    </div>
  );
}
