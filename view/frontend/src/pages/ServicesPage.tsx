import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ServicesPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/services/", {
          method: "GET",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data || "خطا در نمایش محصولات  ");
        } else {
          setProducts(data);
          setSuccess("درخواست شما برای استخدام با موفقیت ثبت شد");
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="services-page">
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="services-container">
        <h1 className="title-serv"> محصولات سایت دانا</h1>
        <div className="products-container"></div>

        {products.map((product) => (
          <div key={product.id} className="product-card">
            {/* ===== نمایش عکس ===== */}
            <img
              src={`http://localhost:4000${product.picture}`}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p className="creator">🧑‍💻 سازنده: {product.creator}</p>
            <p className="description">{product.description}</p>
          </div>
        ))}
        <form className="add-form">
          <h3>
            <Link to={"/servicesAdd"}>اضافه کردن محصول</Link>
          </h3>
        </form>
      </div>
    </div>
  );
}

export default ServicesPage;
