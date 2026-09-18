import { useState } from "react";
function HiringPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    city: "",
    skill: "",
    resume: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = async (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/hiring/fill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || "خطا در فرآیند استخدام ");
      } else {
        setSuccess("درخواست شما برای استخدام با موفقیت ثبت شد");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || "خطا در فرآیند استخدام");
      setLoading(false);
    }
  };

  return (
    <div className="hiring-page">
      <div className="hiring-container">
        <h1> استخدام در سایت دانا</h1>
        <p className="subtitle">برای استخدام اطلاعات زیر را وارد کنید</p>{" "}
        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="hiring-form">
          <div className="form-group">
            <label>اسم</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="علی اصغری"
              required
            />
          </div>
          <div className="form-group">
            <label>ایمیل</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="gmail.com@"
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
              placeholder="20"
              required
            />
          </div>
          <div className="form-group">
            <label>مهارت</label>
            <input
              type="text"
              name="skill"
              value={formData.skill}
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
              placeholder="تهران"
              required
            />
          </div>
          <div className="form-group">
            <label>رمز</label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
              required
            />
          </div>
          <div className="form-group">
            <label>رزومه</label>
            <input
              type="text"
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "در حال استخدام..." : "استخدام "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default HiringPage;
