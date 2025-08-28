import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Basket.css";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Basket() {
  const [data, setData] = useState([]);
  const [basketItems, setBasketItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    fetch("http://localhost:3000/api/datas")
      .then((response) => response.json())
      .then((fetchedData) => setData(fetchedData))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (!userId) return;

    fetch("http://localhost:3000/api/basket")
      .then((response) => response.json())
      .then((basketData) => {
        setBasketItems(basketData.filter((item) => item.user_id === userId));
      })
      .catch((error) => console.error("Error fetching basket items:", error));
  }, [userId]);

  const basketProduct = data.filter((product) =>
    basketItems.some((item) => item.data_id === product.id)
  );

  const removeFromBasket = (productId) => {
    const basketItem = basketItems.find((item) => item.data_id === productId);
    if (!basketItem) {
      toast.error("Mahsulot topilmadi!");
      return;
    }

    fetch(`http://localhost:3000/api/basket/${basketItem.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setBasketItems(
            basketItems.filter((item) => item.id !== basketItem.id)
          );
          toast.success("Mahsulot savatdan olib tashlandi");
        } else {
          toast.error("Mahsulotni olib tashlashda xatolik yuz berdi");
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error("Tarmoq xatosi! Mahsulotni olib tashlab bo‘lmadi");
      });
  };

  // Narxlarni son qilib olish
  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseInt(priceString.replace(/\D/g, ""), 10) || 0;
  };

  // Jami hisoblash
  const totalPrice = basketProduct.reduce(
    (sum, p) => sum + parsePrice(p.fakePrice || p.price),
    0
  );

  return (
    <div className="basket-container">
      <Navbar />
      <div className="basket-content">
        <div className="basket-left">
          <h2 className="basket-title">Savat</h2>
          {basketProduct.length > 0 ? (
            <div className="basket-items">
              {basketProduct.map((product) => (
                <div key={product.id} className="basket-item">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3>{product.title}</h3>
                    <p className="seller">
                      Sotuvchi: <span>FreshFinds</span>
                    </p>
                    <div className="price-section">
                      <span className="current">{product.fakePrice}</span>
                      <span className="original">{product.price}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromBasket(product.id)}
                    className="delete-button"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-basket">
              <h1 className="empty-basket-message">
                Savatingiz hozircha bo‘sh
              </h1>
              <Link to="/home" className="back-to-home">
                Bosh sahifa
              </Link>
            </div>
          )}
        </div>

        {/* O‘ng tomondagi jami hisob */}
        {basketProduct.length > 0 && (
          <div className="basket-summary">
            <h3>Buyurtmangiz</h3>
            <p>Mahsulotlar soni: {basketProduct.length} ta</p>
            <p>
              Jami:{" "}
              <span className="summary-total">
                {totalPrice.toLocaleString()} so'm
              </span>
            </p>
            <button className="checkout-button">
              Rasmiylashtirishga o‘tish
            </button>
          </div>
        )}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
