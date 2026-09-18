import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ServicesPage() {
  const [error, setError] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/services/", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          throw new Error("خطا در نمایش محصولات");
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="services-page">
      {error && <div className="error-message">{error}</div>}

      <div className="services-container">
        <h1 className="title-serv"> محصولات سایت دانا</h1>
        <div className="products-container"></div>
        <div className="products-container">
          {products?.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p className="creator">🧑‍💻 سازنده: {product.creator}</p>
              <p className="description">{product.description}</p>
            </div>
          ))}
        </div>

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
