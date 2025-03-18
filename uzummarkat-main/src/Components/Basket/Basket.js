import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Basket.css";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";
import "react-toastify/dist/ReactToastify.css";

export default function Basket() {
  const [data, setData] = useState([]);
  const [basketItems, setBasketItems] = useState(
    JSON.parse(localStorage.getItem("BasketItems")) || {}
  );

  useEffect(() => {
    fetch("http://localhost:3000/api/datas")
      .then((response) => response.json())
      .then((fetchedData) => setData(fetchedData))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    setBasketItems(JSON.parse(localStorage.getItem("BasketItems")) || {});
  }, [data]);

  const basketProduct = data.filter((product) =>
    basketItems.hasOwnProperty(product.id)
  );

  const updateLocalStorage = (updatedBasket) => {
    localStorage.setItem("BasketItems", JSON.stringify(updatedBasket));
    setBasketItems(updatedBasket);
  };

  const deleteItems = (id) => {
    const updatedBasket = { ...basketItems };
    delete updatedBasket[id];
    updateLocalStorage(updatedBasket);

    toast.error("Mahsulot savatdan o'chirildi", {
      position: "top-center",
      autoClose: 1500,
      theme: "colored", 
    });
  };

  const increaseQuantity = (id) => {
    setBasketItems((prev) => {
      const updatedBasket = {
        ...prev,
        [id]: { ...(prev[id] || {}), quantity: (prev[id]?.quantity ?? 1) + 1 },
      };
      updateLocalStorage(updatedBasket);
      return updatedBasket;
    });
  };

  const decreaseQuantity = (id) => {
    setBasketItems((prev) => {
      if (!prev[id] || prev[id].quantity <= 1) return prev; // 1 ga teng bo‘lsa, kamaytirmaymiz

      const updatedBasket = {
        ...prev,
        [id]: { ...prev[id], quantity: prev[id].quantity - 1 },
      };

      localStorage.setItem("BasketItems", JSON.stringify(updatedBasket));
      return updatedBasket;
    });
  };

  const totalPrice = basketProduct.reduce((sum, product) => {
    const priceNum = parseInt(product.price.replace(/\D/g, ""), 10);
    return sum + priceNum * (basketItems[product.id]?.quantity ?? 1);
  }, 0);

  const totalFakePrice = basketProduct.reduce((sum, product) => {
    const fakePriceNum = parseInt(product.fakePrice.replace(/\D/g, ""), 10);
    return sum + fakePriceNum * (basketItems[product.id]?.quantity ?? 1);
  }, 0);

  const What = () => {
    toast.warning("Kechirasiz Mahsulotni sotib olib bo'lmadydi", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      theme: "light",
    });
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
                        {basketItems[product.id]?.quantity ?? 1}
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
                          <p className="original">{product.fakePrice} so'm</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="additional-delivery-info">
                <p>Uzum Market omborida</p>
                <p className="highlight">9-martdan boshlab yetkazamiz</p>
              </div>
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

              <div className="order-savings">
                <span>Tejovingiz: {totalFakePrice - totalPrice} so'm</span>
              </div>

              <button onClick={() => What()} className="order-button">
                Rasmiylashtirishga oʻtish
              </button>
            </div>
          </div>
        ) : (
          <div className="savat">
            <img
              src="https://uzum.uz/static/img/shopocat.490a4a1.png"
              alt="cat"
            />
            <h1>Savatingiz hozircha bo‘sh</h1>
            <p>
              Bosh sahifadan boshlang — kerakli tovarni qidiruv orqali
              topishingiz yoki to‘plamlarni ko‘rishingiz mumkin
            </p>
            <Link to="/home">Bosh sahifa</Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
