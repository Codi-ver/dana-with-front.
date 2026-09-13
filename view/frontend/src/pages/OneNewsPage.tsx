import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface News {
  id: number;
  title: string;
  image: string;
  event: string;
  creator: string;
  created_at: string;
}

const OneNewsPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`http://localhost:4000/news/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("خطا در دریافت اطلاعات");
        }

        const data = await response.json();
        setNews(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (error) {
    return <div>خطا: {error}</div>;
  }

  if (!news) {
    return <div>خبری یافت نشد</div>;
  }

  return (
    <div className="One-news-page">
      <h1>{news.title}</h1>
      <img src={news.image || "/default-image.jpg"} alt={news.title} />
      <p>{news.event}</p>
      <span className="image-date">
        📅 {new Date(news.created_at).toLocaleDateString("fa-IR")}
        <p>{news.creator}</p>
      </span>
    </div>
  );
};

export default OneNewsPage;
