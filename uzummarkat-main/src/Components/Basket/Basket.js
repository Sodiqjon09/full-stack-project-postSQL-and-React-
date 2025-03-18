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

  // Mahsulotlar ro‘yxatini olish
  useEffect(() => {
    fetch("http://localhost:3000/api/datas")
      .then((response) => response.json())
      .then((fetchedData) => setData(fetchedData))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Savatdagi mahsulotlarni API orqali olish
  useEffect(() => {
    fetch("http://localhost:3000/api/basket")
      .then((response) => response.json())
      .then((basketData) => {
        setBasketItems(basketData);
      })
      .catch((error) => console.error("Error fetching basket items:", error));
  }, []);

  // Savatdagi mahsulotlar bo‘yicha filter
  const basketProduct = data.filter((product) =>
    basketItems.some((item) => item.basket_id === product.id)
  );

  // Mahsulotni savatdan o‘chirish
  const deleteItems = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/basket/${id}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error("Mahsulotni o‘chirishda xatolik yuz berdi");

      setBasketItems((prev) => prev.filter((item) => item.basket_id !== id));

      toast.error("Mahsulot savatdan o'chirildi", {
        position: "top-center",
        autoClose: 1500,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Mahsulot miqdorini oshirish
  const increaseQuantity = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/basket/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: 1 }), // 1 qo‘shiladi
      });

      if (!response.ok)
        throw new Error("Mahsulot miqdorini oshirishda xatolik");

      setBasketItems((prev) =>
        prev.map((item) =>
          item.basket_id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  // Mahsulot miqdorini kamaytirish
  const decreaseQuantity = async (id) => {
    const item = basketItems.find((item) => item.basket_id === id);
    if (!item || item.quantity <= 1) return;

    try {
      const response = await fetch(`http://localhost:3000/api/basket/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: -1 }), // 1 kamaytiriladi
      });

      if (!response.ok)
        throw new Error("Mahsulot miqdorini kamaytirishda xatolik");

      setBasketItems((prev) =>
        prev.map((item) =>
          item.basket_id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  // Jami narxni hisoblash
  const totalPrice = basketProduct.reduce((sum, product) => {
    const priceNum = parseInt(product.price.replace(/\D/g, ""), 10);
    const item = basketItems.find((item) => item.basket_id === product.id);
    return sum + priceNum * (item?.quantity ?? 1);
  }, 0);

  // Jami fake narxni hisoblash
  const totalFakePrice = basketProduct.reduce((sum, product) => {
    const fakePriceNum = parseInt(product.fakePrice.replace(/\D/g, ""), 10);
    const item = basketItems.find((item) => item.basket_id === product.id);
    return sum + fakePriceNum * (item?.quantity ?? 1);
  }, 0);

  // Xatolik toasti
  const What = () => {
    toast.warning(
      "Kechirasiz, mahsulotni sotib olish vaqtinchalik mumkin emas",
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        theme: "light",
      }
    );
  };

  return (
    <div className="bigProduct">
      <Navbar />
      <div className="product-card">
        <ToastContainer />

        {basketProduct.length > 0 ? (
          <div className="basket">
            <div>
              <div className="header">
                <div className="delivery-date">
                  Yetkazib berishning eng yaqin sanasi:{" "}
                  <span className="highlight">9 - 12-mart</span>
                </div>
              </div>
              <div className="delivery-info">
                <p>Uzum Market omborida</p>
                <p className="highlight">9-martdan boshlab yetkazamiz</p>
              </div>

              <div className="flex">
                <div>
                  {basketProduct.map((product) => (
                    <div key={product.id} className="product-details">
                      <div className="info">
                        <div className="image-container">
                          <img src={product.image} alt={product.title} />
                        </div>
                        <div>
                          <h3>{product.title}</h3>
                          <p className="seller">
                            Sotuvchi: <span>Unilever</span>
                          </p>
                        </div>

                        <div className="quantity-control">
                          <button onClick={() => decreaseQuantity(product.id)}>
                            −
                          </button>
                          <span className="quantity-display">
                            {basketItems.find(
                              (item) => item.basket_id === product.id
                            )?.quantity ?? 1}
                          </span>
                          <button onClick={() => increaseQuantity(product.id)}>
                            +
                          </button>
                        </div>

                        <div className="controls">
                          <button
                            className="delete-button"
                            onClick={() => deleteItems(product.id)}
                          >
                            <Trash2 />
                            Yo'q qilish
                          </button>

                          <div className="price-section">
                            <div className="price">
                              <p className="current">{product.price}</p>
                              <p className="original">
                                {product.fakePrice} so'm
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-card">
                  <h2 className="order-title">Buyurtmangiz</h2>

                  <div className="order-item">
                    <span>Mahsulotlar ({basketProduct.length}):</span>
                    <span className="order-price">{totalFakePrice} so'm</span>
                  </div>

                  <div className="order-item order-total">
                    <span>Jami:</span>
                    <span className="final-price">{totalPrice} so'm</span>
                  </div>

                  <button onClick={() => What()} className="order-button">
                    Rasmiylashtirishga oʻtish
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="savat">
            <h1>Savatingiz hozircha bo‘sh</h1>
            <Link to="/home">Bosh sahifa</Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
