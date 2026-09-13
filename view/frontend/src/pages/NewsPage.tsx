import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const NewsPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<any>("");
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("http://localhost:4000/news", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setNews(data);
      } catch (err: any) {
        setError(err ? err.message : "خطا در بازگذاری اخبار");
      }
    };
    load();
  }, []);

  return (
    <div className="news-page">
      <h1 className="title-news">اخبار</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="all-news">
        {news.map((item) => (
          <div className="news-card">
            {item.image && (
              <Link to={`/news/${item.id}`}>
                <img src={item.image} alt={item.title} className="news-image" />
              </Link>
            )}
            <p className="news-title">{item.title}</p>
            <span className="image-date">
              📅 {new Date(item.created_at).toLocaleDateString("fa-IR")}
            </span>
          </div>
        ))}
      </div>
      <button className="button-add-news" onClick={() => navigate("/news/add")}>
        اضافه کردن خبر
      </button>
    </div>
  );
};

export default NewsPage;
