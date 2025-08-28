import React, { useEffect, useState } from "react";
import "./Extandle.css";
import "react-toastify/dist/ReactToastify.css";
import CategorySection from "../CategorySection/CategorySection";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Extandle() {
  const [likes, setLikes] = useState(new Set());
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [datasResponse, categoriesResponse] = await Promise.all([
          fetch("http://localhost:3000/api/datas"),
          fetch("http://localhost:3000/api/category"),
        ]);

        const datas = await datasResponse.json();
        const categoryList = await categoriesResponse.json();

        const categoryMap = {};
        categoryList.forEach((cat) => {
          categoryMap[cat.id] = cat.categoryName;
        });

        const groupedData = datas.reduce((acc, item) => {
          const categoryName = categoryMap[item.category] || "Noma'lum";
          if (!acc[categoryName]) acc[categoryName] = [];
          acc[categoryName].push(item);
          return acc;
        }, {});

        setData(groupedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) return;

    fetch(`http://localhost:3000/api/liked?user_id=${user.id}`)
      .then((response) => response.json())
      .then((likedData) => {
        const likedSet = new Set(
          likedData
            .filter((item) => item.user_id === user.id)
            .map((item) => item.data_id)
        );
        setLikes(likedSet);
      })
      .catch((error) => console.error("Error fetching liked items:", error));
  }, []);

  const toggleLike = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      console.error("User not found in localStorage");
      alert("avval ro'yxatdan o'ting");
      return;
    }

    const userId = user.id;
    const updatedLikes = new Set(likes);

    if (likes.has(id)) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/liked/${id}?user_id=${userId}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );

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
        const response = await fetch("http://localhost:3000/api/liked", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data_id: id, user_id: userId }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          if (response.status === 400) {
            toast.warn("Bu element allaqachon yoqtirilgan!");
          } else {
            throw new Error("Server bilan bog‘lanishda xatolik yuz berdi.");
          }
          return;
        }

        updatedLikes.add(id);
      } catch (error) {
        console.error("Error liking item:", error);
        return;
      }
    }

    setLikes(updatedLikes);
  };

  const toggleBasket = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      alert("Iltimos, avval ro'yxatdan o'ting");
      return;
    }

    const requestBody = { data_id: id, user_id: user.id }; // 🔄 `basket_id` -> `data_id`

    try {
      const response = await fetch("http://localhost:3000/api/basket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Xatolik tafsilotlari:", responseData);
        toast.error(
          responseData.error || "Savatga qo‘shishda xatolik yuz berdi."
        );
        return;
      }

      toast.success("Mahsulot savatga qo‘shildi!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error adding item to basket:", error);
      toast.error("Server bilan bog‘lanishda xatolik yuz berdi.");
    }
  };

  return (
    <div className="Extandle">
      <ToastContainer />
      {Object.entries(data).map(([categoryName, items]) => (
        <CategorySection
          key={categoryName}
          title={categoryName}
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
