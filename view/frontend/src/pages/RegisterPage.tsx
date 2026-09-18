// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    city: "",
    skill: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("رمز عبور و تکرار آن مطابقت ندارند");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { confirmPassword, ...userData } = formData;

      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data || "خطا در ثبت نام");
      } else {
        setSuccess(
          "✅ ثبت نام با موفقیت انجام شد! به صفحه ورود هدایت میشوید...",
        );
      }

      navigate("/login", {
        state: { message: "✅ ثبت نام با موفقیت انجام شد. لطفاً وارد شوید." },
      });
    } catch (err: any) {
      setError(err.message || "خطا در ثبت نام");
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>ثبت نام در سایت دانا</h1>
        <p className="subtitle">برای ثبت نام اطلاعات زیر را وارد کنید</p>

        {success && <div className="success-message">{success}</div>}

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>نام و نام خانوادگی</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="علی رضایی"
              required
            />
          </div>
          <div className="form-group">
            <label>ایمیل</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label>رمز عبور</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="حداقل ۶ کاراکتر"
              required
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label>تکرار رمز عبور</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="تکرار رمز عبور"
              required
            />
          </div>
          <div className="form-group">
            <label>سن</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>شهر</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder=""
              required
            />
          </div>
          <div className="form-group">
            <label>حرفه</label>
            <input
              type="text"
              name="skill"
              value={formData.skill}
              onChange={handleChange}
              placeholder="backend"
              required
            />
          </div>
          <div className="form-group">
            <label>تلفن</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              min={11}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "در حال ثبت نام..." : "ثبت نام"}
          </button>
        </form>

        <p className="auth-link">
          قبلاً ثبت نام کرده‌اید؟ <Link to="/login">وارد شوید</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
