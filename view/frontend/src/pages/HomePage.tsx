import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import type { NewsItem, ServiceItem } from "../types";
import { NewsCard, ServiceCard } from "../components/Cards";
import SmartImage from "../components/SmartImage";
import Reveal from "../components/Reveal";
import Star from "../components/Star";

/** staggered-entrance style for hero elements */
const rise = (d: string) => ({ "--d": d }) as CSSProperties;

function Ticker({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null;
  const loop = [...items, ...items]; // doubled for a seamless marquee
  return (
    <div className="ticker" aria-label="آخرین اخبار">
      <span className="ticker__label">✦ تازه‌ترین خبرها</span>
      <div className="ticker__viewport">
        <div className="ticker__track">
          {loop.map((n, i) => (
            <Link key={`${n.id}-${i}`} to={`/news/${n.id}`}>
              {n.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    api<NewsItem[]>("/news/latest").then(setNews).catch(() => setNews([]));
    api<ServiceItem[]>("/services").then(setServices).catch(() => setServices([]));
  }, []);

  const heroNews = news.slice(0, 2);

  return (
    <>
      <Ticker items={news} />

      {/* ---------- hero ---------- */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <span className="eyebrow" data-rise style={rise("0.05s")}>
              وب‌سایت رسمی شرکت دانا
            </span>
            <h1 className="hero__title" data-rise style={rise("0.15s")}>
              همراه شما،
              <br />
              از ایده تا <em>اجرا</em>
            </h1>
            <p className="hero__lead" data-rise style={rise("0.3s")}>
              دانا با تکیه بر تجربه و خلاقیت، محصولاتی می‌سازد که کار را ساده‌تر و
              زندگی را هوشمندتر می‌کند. با ما همراه باشید.
            </p>
            <div className="hero__cta" data-rise style={rise("0.45s")}>
              <Link to="/services" className="btn btn--primary">
                مشاهده محصولات
              </Link>
              <Link to="/hiring" className="btn btn--gold">
                به ما بپیوندید ✦
              </Link>
            </div>
          </div>

          <div className="hero__visual" data-rise style={rise("0.35s")}>
            <Star className="hero__seal" main="#d9971e" accent="#1c2f6e" />
            <div className="hero__arch hero__arch--main">
              <SmartImage
                src={heroNews[0]?.image ?? null}
                alt={heroNews[0]?.title ?? "خبر"}
              />
            </div>
            <div className="hero__arch hero__arch--side">
              <SmartImage
                src={heroNews[1]?.image ?? null}
                alt={heroNews[1]?.title ?? "خبر"}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- stats ---------- */}
      <section className="stats-band">
        <div className="container stats-band__inner">
          <div className="stat">
            <div className="stat__value">+۱۲۰</div>
            <div className="stat__label">پروژه تحویل‌شده</div>
          </div>
          <div className="stat">
            <div className="stat__value">+۸۵</div>
            <div className="stat__label">مشتری فعال</div>
          </div>
          <div className="stat">
            <div className="stat__value">۱۰ سال</div>
            <div className="stat__label">سابقه فعالیت</div>
          </div>
          <div className="stat">
            <div className="stat__value">۲۴/۷</div>
            <div className="stat__label">پشتیبانی</div>
          </div>
        </div>
      </section>

      {/* ---------- services preview ---------- */}
      <section className="section">
        <div className="container">
          <div className="rule-header" data-reveal>
            <h2>محصولات ما</h2>
            <Link to="/services" className="more-link">
              همه محصولات ←
            </Link>
          </div>
          <div className="card-grid">
            {services.slice(0, 3).map((s, i) => (
              <Reveal key={s.id} delay={i * 0.08}>
                <ServiceCard item={s} />
              </Reveal>
            ))}
            {services.length === 0 && (
              <div className="state-box" style={{ gridColumn: "1 / -1" }}>
                <span>✦</span>
                به‌زودی محصولات جدید معرفی می‌شوند.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- latest news ---------- */}
      <section className="section section--alt">
        <div className="container">
          <div className="rule-header" data-reveal>
            <h2>آخرین اخبار</h2>
            <Link to="/news" className="more-link">
              همه اخبار ←
            </Link>
          </div>
          <div className="card-grid">
            {news.map((n, i) => (
              <Reveal key={n.id} delay={i * 0.08}>
                <NewsCard item={n} />
              </Reveal>
            ))}
            {news.length === 0 && (
              <div className="state-box" style={{ gridColumn: "1 / -1" }}>
                <span>✦</span>
                فعلاً خبری برای نمایش وجود ندارد.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="cta-band">
        <div className="container cta-band__inner">
          <div>
            <h2>استعدادی برای کار دارید؟</h2>
            <p>فرصت‌های همکاری در تیم دانا منتظر شماست.</p>
          </div>
          <Link to="/hiring" className="btn">
            ارسال درخواست همکاری
          </Link>
        </div>
      </section>
    </>
  );
}
