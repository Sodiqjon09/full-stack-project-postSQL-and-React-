import React, { useEffect, useState } from "react";
import DivImage from "../../asset/images/div.image.png";
import { languages } from "../../data/data";
import { Link } from "react-scroll";
import { useLanguage } from "../../LanguageSelector";

function Bottombar() {
  const [categories, setCategories] = useState([]);

  const { language } = useLanguage();
  const currentLanguage = languages[language || "uzb"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [datasResponse, categoriesResponse] = await Promise.all([
          fetch("http://localhost:3000/api/datas"),
          fetch("http://localhost:3000/api/category"),
        ]);

        const datas = await datasResponse.json();
        const categoryList = await categoriesResponse.json();

        // category obyektini id bo'yicha xaritada saqlaymiz
        const categoryMap = {};
        categoryList.forEach((cat) => {
          categoryMap[cat.id] = cat.categoryName;
        });

        // `datas` dan unikal kategoriyalarni olish
        const uniqueCategories = {};
        datas.forEach((item) => {
          const categoryName = categoryMap[item.category] || "Noma'lum";
          if (!uniqueCategories[item.category]) {
            uniqueCategories[item.category] = {
              id: item.category,
              name: categoryName,
            };
          }
        });

        setCategories(Object.values(uniqueCategories));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="Bottombar">
      <div className="types">
        <Link to="section9" smooth={true} duration={500}>
          <span>
            <img src={DivImage} alt="Div Logo" />
            {currentLanguage.InstallmentPayment}
          </span>
        </Link>

        {categories.map((category) => (
          <Link
            key={category.id}
            to={`category-${category.id}`}
            smooth={true}
            duration={500}
          >
            {category.name}
          </Link>
        ))}
      </div>
      <select>
        <option>{currentLanguage.again}</option>
      </select>
    </div>
  );
}

export default Bottombar;
