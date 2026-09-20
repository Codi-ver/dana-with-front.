import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import type { NewsItem } from "../types";
import { NewsCard } from "../components/Cards";
import Reveal from "../components/Reveal";

export default function NewsPage() {
  const { isAdmin } = useAuth();
  const [items, setItems] = useState<NewsItem[] | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setError("");
      // admins also see drafts
      const query = isAdmin ? "?all=1" : "";
      setItems(await api<NewsItem[]>(`/news${query}`));
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطا در دریافت اخبار");
      setItems([]);
    }
  }, [isAdmin]);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (id: number) => {
    if (!confirm("این خبر حذف شود؟")) return;
    try {
      await api(`/news/${id}`, { method: "DELETE" });
      setItems((prev) => prev?.filter((n) => n.id !== id) ?? null);
    } catch (e) {
      alert(e instanceof Error ? e.message : "خطا در حذف خبر");
    }
  };

  const publish = async (id: number) => {
    try {
      await api(`/news/${id}/publish`, { method: "PUT" });
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "خطا در انتشار خبر");
    }
  };

  return (
    <div className="container section">
      <div className="page-head">
        <span className="eyebrow">اتاق خبر دانا</span>
        <h1>اخبار و رویدادها</h1>
        <p>آخرین خبرها، معرفی محصولات و گزارش رویدادهای شرکت را اینجا دنبال کنید.</p>
      </div>

      {error && <div className="alert alert--error">{error}</div>}

      {isAdmin && (
        <div style={{ marginBottom: "1.6rem", display: "flex", justifyContent: "flex-end" }}>
          <Link to="/news/add" className="btn btn--primary btn--sm">
            + خبر جدید
          </Link>
        </div>
      )}

      {items === null ? (
        <div className="card-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton" style={{ height: 320 }} />
          ))}
        </div>
      ) : (
        <div className="card-grid">
          {items.map((n, i) => (
            <Reveal key={n.id} delay={(i % 3) * 0.08}>
              <div style={{ position: "relative" }}>
                <NewsCard item={n} />
                {isAdmin && (
                  <div className="admin-table__actions" style={{ marginTop: "0.6rem" }}>
                    {n.status !== "published" && (
                      <button className="btn btn--sm" onClick={() => publish(n.id)}>
                        انتشار
                      </button>
                    )}
                    <button className="btn btn--danger btn--sm" onClick={() => remove(n.id)}>
                      حذف
                    </button>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
          {items.length === 0 && (
            <div className="state-box" style={{ gridColumn: "1 / -1" }}>
              <span>✦</span>
              فعلاً خبری برای نمایش وجود ندارد.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
