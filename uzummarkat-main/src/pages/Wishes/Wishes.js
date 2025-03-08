import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import "./Wishes.css";

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

  const likedProducts = data.filter((product) => likedItems[product.id]);

  const toggleLike = (id) => {
    const updatedLikedItems = { ...likedItems };

    if (updatedLikedItems[id]) {
      delete updatedLikedItems[id];
    } else {
      updatedLikedItems[id] = true;
    }

    setLikedItems(updatedLikedItems);
    localStorage.setItem("likedItems", JSON.stringify(updatedLikedItems));
  };

  return (
    <div className="wishes">
      {likedProducts.length > 0 ? (
        likedProducts.map((product) => (
          <div className="goods" key={product.id}>
            <img className="image" src={product.image} alt={product.title} />
            <div className="like">
              <FaHeart color="7f4dff" onClick={() => toggleLike(product.id)} />
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
                <img src={product.divSlot} alt="Product image" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Yoqtirgan mahsulotlar yo‘q.</p>
      )}
    </div>
  );
}

export default Wishes;
