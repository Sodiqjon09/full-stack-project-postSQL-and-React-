import React from "react";
import img1 from "../../asset/images/instagram.png";
import img2 from "../../asset/images/telegram.png";
import img3 from "../../asset/images/youtube.png";
import img4 from "../../asset/images/facebook.png";
import "./Footer.css";
import { TfiApple } from "react-icons/tfi";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

function Footer() {
  const data = [
    {
      id: 1,
      title: "Biz haqimizda",
      Link: "Topshirish punktlari",
      Link2: "Vakansiyalar",
    },
    {
      id: 2,
      title: "Foydalanuvchilarga",
      Link: "Biz bilan bogʻlanish",
      Link2: "Savol-Javob",
    },
    {
      id: 3,
      title: "Tadbirkorlarga",
      Link: "Uzumda soting",
      Link2: "Sotuvchi kabinetiga kirish",
    },
  ];
  return (
    <div className="Footer">
      <div className="FooterTop">
        {data.map((data) => {
          return (
            <div key={data.id} className="footer-title">
              <span>{data.title}</span>
              <ul>
                <li>
                  <Link to="/">{data.Link}</Link>
                </li>
                <li>
                  <Link to="/">{data.Link2}</Link>
                </li>
              </ul>
            </div>
          );
        })}
        <div className="ijtimoiy">
          <span>Ilovani yuklab olish</span>
          <div className="market">
            <div>
              <TfiApple size={24} />
              <p>AppStore</p>
            </div>
            <div>
              <FcGoogle size={24} />
              <p>AppStore</p>
            </div>
          </div>
          <div className="isocial-networks">
            <span>Uzum ijtimoiy tarmoqlarda</span>
            <div className="networks">
              <img src={img1} alt="image 1" />
              <img src={img2} alt="image 2" />
              <img src={img3} alt="image 3" />
              <img src={img4} alt="image 4" />
            </div>
          </div>
        </div>
      </div>
      <div className="bottomFooter">
        <div className="border"></div>
        <div className="bottom">
            <ul>
              <li>
                <Link to="/">Maxfiylik kelishuvi</Link>
              </li>
              <li>
                <Link to="/">Foydalanuvchi kelishuvi</Link>
              </li>
            </ul>
          <div className="bottom-text">
            <p>
              «2024© XK MCHJ «UZUM MARKET». STIR 309376127. Barcha huquqlar
              himoyalangan»
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
