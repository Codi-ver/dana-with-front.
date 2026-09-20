import { Link } from "react-router-dom";
import Star from "./Star";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <Star className="brand__star" main="#f0d38a" accent="#0e1a40" />
            <div className="footer__brand-word">دانا</div>
            <p className="text-muted" style={{ opacity: 0.75, marginTop: "0.6rem" }}>
              همراه شما در مسیر رشد؛ از ایده تا اجرا.
            </p>
          </div>
          <div>
            <h4>دسترسی سریع</h4>
            <ul>
              <li><Link to="/news">اخبار</Link></li>
              <li><Link to="/services">محصولات</Link></li>
              <li><Link to="/hiring">فرصت‌های همکاری</Link></li>
              <li><Link to="/contact">تماس با ما</Link></li>
            </ul>
          </div>
          <div>
            <h4>حساب کاربری</h4>
            <ul>
              <li><Link to="/login">ورود</Link></li>
              <li><Link to="/register">ثبت‌نام</Link></li>
              <li><Link to="/dashboard">میزکار</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__baseline">
          <span>© تمامی حقوق برای شرکت دانا محفوظ است.</span>
          <span>طراحی‌شده با ❤ در ایران</span>
        </div>
      </div>
    </footer>
  );
}
