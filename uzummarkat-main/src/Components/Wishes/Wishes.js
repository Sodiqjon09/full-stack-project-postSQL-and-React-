import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import "./Wishes.css";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";
import { TbBasketPlus } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
function Wishes() {
  const [data, setData] = useState([]);
  const [likedItems, setLikedItems] = useState(
    JSON.parse(localStorage.getItem("likedItems")) || {}
  );

  useEffect(() => {
    fetch("http://localhost:3000/api/datas")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/liked")
      .then((response) => response.json())
      .then((likedData) => {
        const likedMap = {};
        likedData.forEach((item) => {
          likedMap[item.data_id] = true;
        });
        setLikedItems(likedMap);
        localStorage.setItem("likedItems", JSON.stringify(likedMap));
      })
      .catch((error) => console.error("Error fetching liked data:", error));
  }, []);

  const likedProducts = data.filter((product) => likedItems[product.id]);

  const toggleLike = async (id) => {
    const updatedLikedItems = { ...likedItems };

    if (updatedLikedItems[id]) {
      try {
        const response = await fetch(`http://localhost:3000/api/liked/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Server bilan bog‘lanishda xatolik yuz berdi.");
        }

        delete updatedLikedItems[id];
      } catch (error) {
        console.error("Error deleting item:", error);
        return;
      }
    } else {
      try {
        const response = await fetch("http://localhost:3000/api/liked", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data_id: id }),
        });

        if (!response.ok) {
          throw new Error("Server bilan bog‘lanishda xatolik yuz berdi.");
        }

        updatedLikedItems[id] = true;
      } catch (error) {
        console.error("Error liking item:", error);
        return;
      }
    }

    setLikedItems(updatedLikedItems);
    localStorage.setItem("likedItems", JSON.stringify(updatedLikedItems));
  };

  const toggleBasket = (id) => {
    const storedBasket = JSON.parse(localStorage.getItem("BasketItems")) || {};
    storedBasket[id] = true;
    localStorage.setItem("BasketItems", JSON.stringify(storedBasket));
    toast.success("Mahsulot savatga qoʻshildi", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      theme: "light",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="wishes">
        {likedProducts.length > 0 ? (
          likedProducts.map((product) => (
            <div className="goods" key={product.id}>
              <img className="image" src={product.image} alt={product.title} />
              <div className="like">
                {likedItems[product.id] ? (
                  <FaHeart
                    color="#7F4DFF"
                    onClick={() => toggleLike(product.id)}
                  />
                ) : (
                  <CiHeart onClick={() => toggleLike(product.id)} />
                )}
              </div>
              <span id="title">{product.title}</span>
              <span id="star">
                {product.starIcon} {product.starText}
              </span>
              <span id="credit">{product.credit}</span>
              <div className="product">
                <div className="price">
                  <span id="fake-price">{product.fakePrice}</span>
                  <span id="actual-price">{product.price}</span>
                </div>
                <div className="image">
                  <TbBasketPlus
                    onClick={() => toggleBasket(product.id)}
                    size={22}
                    color="#000"
                  />
                  <ToastContainer />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="savat">
            <img
              src="https://uzum.uz/static/img/hearts.cf414be.png"
              alt="flowers"
            />
            <h1>Sizga yoqqanini qoʻshing</h1>
            <p>
              Mahsulotdagi ♡ belgisini bosing. Akkauntga kiring va barcha
              saralanganlar saqlanib qoladi
            </p>
            <Link style={{ background: "#7f4dff", color: "#fff" }} to="/login">
              Akkauntga kirish
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Wishes;
