import React, { useEffect, useState, useCallback } from "react";
import "./Extandle.css";
import "react-toastify/dist/ReactToastify.css";
import CategorySection from "../CategorySection/CategorySection";

function Extandle() {
  const [likes, setLikes] = useState(new Set());
  const [data, setData] = useState([]);

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
        const likedSet = new Set(likedData.map((item) => item.data_id));
        setLikes(likedSet);
      })
      .catch((error) => console.error("Error fetching liked items:", error));
  }, []);

  const toggleLike = async (id) => {
    const updatedLikes = new Set(likes);

    if (likes.has(id)) {
      try {
        const response = await fetch(`http://localhost:3000/api/liked/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Server bilan bog‘lanishda xatolik yuz berdi.");
        }

        updatedLikes.delete(id);
      } catch (error) {
        console.error("Error deleting item:", error);
        return;
      }
    } else {
      try {
        const response = await fetch(`http://localhost:3000/api/liked`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data_id: id }),
        });

        if (!response.ok) {
          throw new Error("Server bilan bog‘lanishda xatolik yuz berdi.");
        }

        updatedLikes.add(id);
      } catch (error) {
        console.error("Error liking item:", error);
        return;
      }
    }

    setLikes(updatedLikes);
  };

  // Yangi funksiya: Savatga mahsulot qo‘shish
  const toggleBasket = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/basket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ basket_id: id }),
      });

      if (!response.ok) {
        throw new Error("Savatga qo‘shishda xatolik yuz berdi.");
      }

      console.log(`Mahsulot ${id} savatga qo‘shildi.`);
    } catch (error) {
      console.error("Error adding item to basket:", error);
    }
  };

  const categories = data.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="Extandle">
      {Object.entries(categories).map(([key, items]) => (
        <CategorySection
          key={key}
          title={key.replace(/([A-Z])/g, " $1")}
          items={items}
          likes={likes}
          toggleLike={toggleLike}
          toggleBasket={toggleBasket}
        />
      ))}
    </div>
  );
}

export default Extandle;
