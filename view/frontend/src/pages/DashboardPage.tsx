import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import type { HiringItem, NewsItem, ServiceItem, User } from "../types";
import { faDate, faNum, initial } from "../lib/format";

export default function DashboardPage() {
  const { user, isAdmin, logout } = useAuth();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [applications, setApplications] = useState<HiringItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const loadAll = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const [n, s, h, u] = await Promise.all([
        api<NewsItem[]>("/news?all=1"),
        api<ServiceItem[]>("/services"),
        api<HiringItem[]>("/hiring"),
        api<User[]>("/users"),
      ]);
      setNews(n);
      setServices(s);
      setApplications(h);
      setUsers(u);
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطا در بارگذاری داده‌ها");
    }
  }, [isAdmin]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const removeNews = async (id: number) => {
    if (!confirm("این خبر حذف شود؟")) return;
    await api(`/news/${id}`, { method: "DELETE" }).catch(() => null);
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  const publishNews = async (id: number) => {
    await api(`/news/${id}/publish`, { method: "PUT" }).catch(() => null);
    setNews((prev) => prev.map((n) => (n.id === id ? { ...n, status: "published" } : n)));
  };

  const removeService = async (id: number) => {
    if (!confirm("این محصول حذف شود؟")) return;
    await api(`/services/${id}`, { method: "DELETE" }).catch(() => null);
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const removeUser = async (id: number) => {
    if (id === user?.id) {
      alert("حساب خودتان را از این بخش نمی‌توانید حذف کنید.");
      return;
    }
    if (!confirm("این کاربر حذف شود؟")) return;
    await api(`/users/${id}`, { method: "DELETE" }).catch(() => null);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="container section">
      <div className="page-head">
        <span className="eyebrow">میزکار</span>
        <h1>سلام {user?.name} 👋</h1>
        <p>
          {isAdmin
            ? "از پنل مدیریت برای مدیریت اخبار، محصولات، درخواست‌های همکاری و کاربران استفاده کنید."
            : "از این بخش می‌توانید اطلاعات حساب خود را ببینید و برای فرصت‌های همکاری اقدام کنید."}
        </p>
      </div>

      {error && <div className="alert alert--error" style={{ marginBottom: "1.5rem" }}>{error}</div>}

      <div className="dash-layout">
        {/* ---------- profile ---------- */}
        <aside className="profile-card">
          <div className="profile-card__avatar">{initial(user?.name)}</div>
          <h3>{user?.name}</h3>
          <p className="profile-card__email">{user?.email}</p>
          <div className="profile-card__rows">
            <div>
              <dt>نقش</dt>
              <dd>{user?.role === "ADMIN" ? "مدیر سایت" : user?.role === "EMPLOYEE" ? "همکار" : "کاربر"}</dd>
            </div>
            {user?.city && (
              <div>
                <dt>شهر</dt>
                <dd>{user.city}</dd>
              </div>
            )}
            {user?.skill && (
              <div>
                <dt>تخصص</dt>
                <dd>{user.skill}</dd>
              </div>
            )}
            {user?.age != null && (
              <div>
                <dt>سن</dt>
                <dd>{faNum(user.age)} سال</dd>
              </div>
            )}
            {user?.created_at && (
              <div>
                <dt>عضویت از</dt>
                <dd>{faDate(user.created_at)}</dd>
              </div>
            )}
          </div>
          <button
            className="btn btn--gold btn--sm"
            style={{ marginTop: "1.6rem", width: "100%" }}
            onClick={() => logout()}
          >
            خروج از حساب
          </button>
        </aside>

        {/* ---------- content ---------- */}
        <div>
          {!isAdmin && (
            <div className="cta-band" style={{ borderRadius: "var(--radius-m)", border: "2px solid var(--ink)" }}>
              <div className="cta-band__inner">
                <div>
                  <h2>برای عضویت در تیم دانا آماده‌اید؟</h2>
                  <p>فرم درخواست همکاری را پر کنید تا همکاران ما بررسی کنند.</p>
                </div>
                <Link to="/hiring" className="btn">ارسال درخواست</Link>
              </div>
            </div>
          )}

          {isAdmin && (
            <>
              <section className="dash-section">
                <h2>
                  اخبار
                  <Link to="/news/add" className="btn btn--primary btn--sm">+ خبر جدید</Link>
                </h2>
                <div className="table-scroll">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>عنوان</th>
                        <th>نویسنده</th>
                        <th>تاریخ</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {news.map((n) => (
                        <tr key={n.id}>
                          <td>
                            <Link to={`/news/${n.id}`}>{n.title}</Link>
                          </td>
                          <td>{n.author_name ?? "—"}</td>
                          <td>{faDate(n.created_at)}</td>
                          <td>
                            <span className={`status-chip status-chip--${n.status}`}>
                              {n.status === "published" ? "منتشرشده" : "پیش‌نویس"}
                            </span>
                          </td>
                          <td>
                            <div className="admin-table__actions">
                              {n.status !== "published" && (
                                <button className="btn btn--sm" onClick={() => publishNews(n.id)}>
                                  انتشار
                                </button>
                              )}
                              <button className="btn btn--danger btn--sm" onClick={() => removeNews(n.id)}>
                                حذف
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {news.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-muted" style={{ textAlign: "center", padding: "1.4rem" }}>
                            خبری ثبت نشده است.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="dash-section">
                <h2>
                  محصولات
                  <Link to="/services/add" className="btn btn--primary btn--sm">+ محصول جدید</Link>
                </h2>
                <div className="table-scroll">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>نام</th>
                        <th>سازنده</th>
                        <th>تاریخ</th>
                        <th>عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((s) => (
                        <tr key={s.id}>
                          <td>{s.name}</td>
                          <td>{s.creator_name ?? "—"}</td>
                          <td>{faDate(s.created_at)}</td>
                          <td>
                            <button className="btn btn--danger btn--sm" onClick={() => removeService(s.id)}>
                              حذف
                            </button>
                          </td>
                        </tr>
                      ))}
                      {services.length === 0 && (
                        <tr>
                          <td colSpan={4} className="text-muted" style={{ textAlign: "center", padding: "1.4rem" }}>
                            محصولی ثبت نشده است.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="dash-section">
                <h2>درخواست‌های همکاری</h2>
                <div className="table-scroll">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>نام</th>
                        <th>ایمیل</th>
                        <th>تخصص</th>
                        <th>شهر</th>
                        <th>سن</th>
                        <th>معرفی</th>
                        <th>تاریخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((a) => (
                        <tr key={a.id}>
                          <td>{a.name}</td>
                          <td dir="ltr" style={{ textAlign: "right" }}>{a.email}</td>
                          <td>{a.skill}</td>
                          <td>{a.city}</td>
                          <td>{faNum(a.age)}</td>
                          <td style={{ maxWidth: 220 }}>
                            <span title={a.resume}>
                              {a.resume.length > 60 ? a.resume.slice(0, 60) + "…" : a.resume}
                            </span>
                          </td>
                          <td>{faDate(a.created_at)}</td>
                        </tr>
                      ))}
                      {applications.length === 0 && (
                        <tr>
                          <td colSpan={7} className="text-muted" style={{ textAlign: "center", padding: "1.4rem" }}>
                            درخواستی ثبت نشده است.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="dash-section">
                <h2>کاربران</h2>
                <div className="table-scroll">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>نام</th>
                        <th>ایمیل</th>
                        <th>نقش</th>
                        <th>عضویت</th>
                        <th>عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id}>
                          <td>{faNum(u.id)}</td>
                          <td>{u.name}</td>
                          <td dir="ltr" style={{ textAlign: "right" }}>{u.email}</td>
                          <td>
                            <span className={`role-chip role-chip--${u.role}`}>{u.role}</span>
                          </td>
                          <td>{faDate(u.created_at)}</td>
                          <td>
                            {u.id !== user?.id && (
                              <button className="btn btn--danger btn--sm" onClick={() => removeUser(u.id)}>
                                حذف
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
