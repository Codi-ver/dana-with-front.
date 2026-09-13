import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddServicesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    picture: "",
    creator: "",
  });

  const handleAdd = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/services/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || "خطا در فرآیند ثبت");
      } else {
        setSuccess("محصول با موفقیت ثبت شد");
        navigate("/services");
      }
    } catch (err: any) {
      setError(err.message || "خطا در فرآیند ثبت");
    }
  };

  return (
    <div className="services-add-page">
      <div className="add-container">
        <h1 className="">اضافه کردن محصول جدید</h1>
        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
        <form className="form-services" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>نام محصول </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleAdd}
              required
            />
          </div>
          <div className="form-group">
            <label>توضیحات</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleAdd}
              placeholder="....."
              required
            />
          </div>
          <div className="form-group">
            <label> محصول</label>
            <input
              type="file"
              name="picture"
              value={formData.picture}
              onChange={handleAdd}
              required
            />
          </div>
          <div className="form-group">
            <label> سازنده</label>
            <input
              type="text"
              name="creator"
              value={formData.creator}
              onChange={handleAdd}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "در حال ثبت محصول..." : " ثبت محصول "}
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddServicesPage;
