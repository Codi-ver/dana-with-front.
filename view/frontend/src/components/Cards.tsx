import { Link } from "react-router-dom";
import SmartImage from "./SmartImage";
import { faDate } from "../lib/format";
import type { NewsItem, ServiceItem } from "../types";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link to={`/news/${item.id}`} className="card news-card">
      <div className="news-card__media">
        <SmartImage src={item.image} alt={item.title} />
      </div>
      <div className="news-card__body">
        <span className="news-card__date">🗓 {faDate(item.created_at)}</span>
        <h3 className="news-card__title">{item.title}</h3>
        <p className="news-card__excerpt">{item.event}</p>
      </div>
    </Link>
  );
}

export function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <article className="card service-card">
      <div className="service-card__media">
        <SmartImage src={item.image} alt={item.name} />
      </div>
      <div className="service-card__body">
        <h3 className="service-card__name">{item.name}</h3>
        <span className="service-card__creator">✦ سازنده: {item.creator_name ?? "دانا"}</span>
        <p className="service-card__desc">{item.description}</p>
      </div>
    </article>
  );
}
