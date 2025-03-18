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
        const response = await fetch("http://localhost:3000/api/datas");
        const result = await response.json();

        // Har bir kategoriya bo‘yicha faqat bitta mahsulotni olish
        const uniqueCategories = {};
        result.forEach((item) => {
          if (!uniqueCategories[item.category]) {
            uniqueCategories[item.category] = item;
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
            to={category.category}
            smooth={true}
            duration={500}
          >
            {category.category}
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
