import React, { useEffect, useState, useCallback } from "react";
import "./Extandle.css";
import { FaAngleRight, FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { Element } from "react-scroll";
import { TbBasketPlus } from "react-icons/tb";

function Extandle() {
  const [likes, setLikes] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedItems")) || {};
    setLikes(storedLikes);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/datas")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (Object.keys(likes).length > 0) {
      localStorage.setItem("likedItems", JSON.stringify(likes));
    }
  }, [likes]);

  const toggleLike = useCallback((id) => {
    setLikes((prevLikes) => {
      const updatedLikes = { ...prevLikes, [id]: !prevLikes[id] };
      localStorage.setItem("likedItems", JSON.stringify(updatedLikes)); // Save immediately
      return updatedLikes;
    });
  }, []);

  const categories = data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  console.log(categories);

  const numbers = [1, 2, 3];
  const sum = numbers.reduce((a, num) => {
    return num > a ? num : a;
  }, 0);

  console.log(sum);

  return (
    <div className="Extandle">
      {Object.entries(categories).map(([key, items]) => (
        <CategorySection
          key={key}
          title={key.replace(/([A-Z])/g, " $1")}
          items={items}
          likes={likes}
          toggleLike={toggleLike}
        />
      ))}
      <div className="btn">
        <button>Yana ko'rsatish 20</button>
      </div>
    </div>
  );
}

const CategorySection = ({ title, items, likes, toggleLike }) => (
  <div className="CategorySection">
    <Element name={title}>
      <span>
        {title} <FaAngleRight size={18} />
      </span>
      <div className="LowPrices">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            isLiked={likes[item.id] || false}
            toggleLike={toggleLike}
          />
        ))}
      </div>
    </Element>
  </div>
);

// Reusable Product Card Component
const ProductCard = ({ product, isLiked, toggleLike }) => (
  <div className="goods">
    <img className="image" src={product.image} alt={product.title} />
    <div className="like">
      {!isLiked ? (
        <CiHeart onClick={() => toggleLike(product.id)} />
      ) : (
        <FaHeart color="7f4dff" onClick={() => toggleLike(product.id)} />
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
        <TbBasketPlus size={22} color="#000" />
      </div>
    </div>
  </div>
);

export default Extandle;
