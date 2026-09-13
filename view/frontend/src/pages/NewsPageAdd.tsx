import { useState } from "react";

function NewsPageAdd() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [event, setEvent] = useState("");
  const [creator, setCreator] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleAdd = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("event", title);
    formData.append("creator", creator);
    if (image) formData.append("image", image);
    try {
      const response = await fetch("http://localhost:4000/news/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "فرآیند ثبت خبر با خطا مواجه شد");
      } else {
        setSuccess("خبر جدید ثبت شد");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || "خطا در  ورود");
    }
  };

  return (
    <div className="news-add-page">
      {success && <div className="success-message">{success}</div>}

      {error && <div className="error-message">{error}</div>}
      <p className="title">خبر جدید</p>

      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="موضوع"
        />
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files?.[0] || null);
          }}
          placeholder="تصویر"
        />
        <input
          type="text"
          value={event}
          placeholder="خبر"
          onChange={(e) => {
            setEvent(e.target.value);
          }}
        />
        <input
          type="text"
          value={creator}
          placeholder="نویسنده"
          onChange={(e) => {
            setCreator(e.target.value);
          }}
        />
        <button disabled={loading}> {loading ? "درحال ثبت" : "ثبت"}</button>
      </form>
    </div>
  );
}

export default NewsPageAdd;
