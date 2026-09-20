import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import type { ServiceItem } from "../types";
import { ServiceCard } from "../components/Cards";
import Reveal from "../components/Reveal";

export default function ServicesPage() {
  const { isAdmin } = useAuth();
  const [items, setItems] = useState<ServiceItem[] | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setError("");
      setItems(await api<ServiceItem[]>("/services"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطا در دریافت محصولات");
      setItems([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (id: number) => {
    if (!confirm("این محصول حذف شود؟")) return;
    try {
      await api(`/services/${id}`, { method: "DELETE" });
      setItems((prev) => prev?.filter((s) => s.id !== id) ?? null);
    } catch (e) {
      alert(e instanceof Error ? e.message : "خطا در حذف محصول");
    }
  };

  return (
    <div className="container section">
      <div className="page-head">
        <span className="eyebrow">ویترین دانا</span>
        <h1>محصولات و خدمات</h1>
        <p>
          محصولاتی که با وسعت ساختیم تا کار روزمره شما روان‌تر، سریع‌تر و
          لذت‌بخش‌تر شود.
        </p>
      </div>

      {error && <div className="alert alert--error">{error}</div>}

      {isAdmin && (
        <div style={{ marginBottom: "1.6rem", display: "flex", justifyContent: "flex-end" }}>
          <Link to="/services/add" className="btn btn--primary btn--sm">
            + محصول جدید
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
          {items.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.08}>
              <div style={{ position: "relative" }}>
                <ServiceCard item={s} />
                {isAdmin && (
                  <div className="admin-table__actions" style={{ marginTop: "0.6rem" }}>
                    <button className="btn btn--danger btn--sm" onClick={() => remove(s.id)}>
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
              به‌زودی محصولات جدید معرفی می‌شوند.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
