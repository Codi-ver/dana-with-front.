import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const NewsPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<any>("");
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const allNews = async () => {
      try {
        const response = await fetch("http://localhost:4000/news/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const news = await response.json();
        setData(news);
        console.log(news);
        if (!response.ok) {
          throw new Error("خطا در نمایش آخرین اخبار");
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    allNews();
  }, []);
  return (
    <div className="news-page">
      <h1 className="title-news">اخبار</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="all-news">
        {data?.map((item) => (
          <div className="news-card" key={item.id}>
            <Link to={`/news/${item.id}`}>
              <img src={item.image} alt={item.title} className="news-image" />
            </Link>

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
