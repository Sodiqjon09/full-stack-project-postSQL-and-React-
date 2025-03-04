import React from "react";
import DivImage from "../../asset/images/div.image.png";
import { languages } from "../../data/data";
import { Link } from "react-scroll";
import { useLanguage } from "../../LanguageSelector";

function Bottombar() {
  const { language } = useLanguage();
  const currentLanguage = languages[language || "uzb"];

  const types = [
    { title: currentLanguage.types.electronics, link: "section1" },
    { title: currentLanguage.types.appliances, link: "section2" },
    { title: currentLanguage.types.clothing, link: "section3" },
    { title: currentLanguage.types.footwear, link: "section4" },
    { title: currentLanguage.types.accessories, link: "section5" },
    { title: currentLanguage.types.beauty, link: "section6" },
    { title: currentLanguage.types.health, link: "section7" },
    { title: currentLanguage.types.home, link: "section8" },
    { title: currentLanguage.types.construction, link: "section9" },
  ];

  return (
    <div className="Bottombar">
      <div className="types">
        <Link to="section9" smooth={true} duration={500}>
          <span>
            <img src={DivImage} alt="Div Logo" />
            {currentLanguage.InstallmentPayment}
          </span>
        </Link>
        {types.map((e, index) => (
          <Link key={index} smooth={true} duration={500} to={e.link}>
            {e.title}
          </Link>
        ))}
      </div>
      <select name="" id="">
        <option>{currentLanguage.again}</option>
      </select>
    </div>
  );
}

export default Bottombar;
