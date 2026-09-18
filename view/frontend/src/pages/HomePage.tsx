import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

function App() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const LatestNews = async () => {
      try {
        const response = await fetch("http://localhost:4000/news/latest", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const news = await response.json();
        setData(news);

        if (!response.ok) {
          throw new Error("خطا در نمایش آخرین اخبار");
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    LatestNews();
  }, []);

  return (
    <div className="panel">
      <h1 className="title">به سایت دانا خوش آمدید</h1>

      <div className="form-wrapper">
        <p className="title-form">ثبت نام / ورود</p>
        <div className="two-forms">
          <form className="form-login" onSubmit={(e) => e.preventDefault()}>
            <button
              type="button"
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              ورود
            </button>
          </form>
          <form className="form-register" onSubmit={(e) => e.preventDefault()}>
            <button
              type="button"
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              ثبت نام
            </button>
          </form>
        </div>
      </div>

      <div className="services-wrapper">
        <div className="service-item">
          <p className="service-title">استخدام</p>
          <button
            className="service-btn hiring-btn"
            onClick={() => navigate("/hiring")}
          >
            استخدام
          </button>
        </div>
        <div className="service-item">
          <p className="service-title">محصولات</p>
          <button
            className="service-btn products-btn"
            onClick={() => navigate("/services")}
          >
            محصولات
          </button>
        </div>
      </div>

      <footer className="footer">
        <Link to="/contactUs" className="about-link">
          ارتباط با ما
        </Link>
        <p className="rules">تمامی حقوق محفوظ است</p>
        <p className="title-news">آخرین اخبار</p>
        {error && <div className="error-message">{error}</div>}
        <div className="latest-news">
          {data.map((news) => (
            <div key={news.id} className="news-card">
              <Link to={`/news/${news.id}`}>
                <img src={news.image} alt={news.title} className="news-image" />
              </Link>

              <p className="news-title">{news.title}</p>
              <span className="image-date">
                📅 {new Date(news.created_at).toLocaleDateString("fa-IR")}
              </span>
            </div>
          ))}
          <div>
            <form className="all-news">
              <button className="button-news" onClick={() => navigate("/news")}>
                همه اخبارها
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
