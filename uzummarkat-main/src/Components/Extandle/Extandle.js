import React, { useState } from "react";
import "./Extandle.css";
import { FaAngleRight } from "react-icons/fa6";
import { LowPrices, hotTechnique } from "../../data/data";
import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import wrapperImage from "../../asset//images/div.image-wrapper.png";
import { Element } from "react-scroll";
import mainPageButton from "../../asset/images/main_page_banner.jpg.png";

function Extandle() {
  const [likes, setLikes] = useState({});

  const toggleLike = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: !prevLikes[id],
    }));
  };

  const LowPricesTitle = LowPrices.filter(
    (item) => item.id >= 1 && item.id <= 20
  );
  const Electronics = LowPrices.filter(
    (item) => item.id >= 21 && item.id <= 25
  );
  const kitchen = LowPrices.filter((item) => item.id >= 26 && item.id <= 30);
  const InstallmentPaymet = LowPrices.filter(
    (item) => item.id >= 31 && item.id <= 35
  );
  const HeatTechnique = LowPrices.filter(
    (item) => item.id >= 36 && item.id <= 30
  );

  return (
    <div className="Extandle">
      <span>
        Arzon narxlar <FaAngleRight size={18} />
      </span>
      <div className="LowPrices">
        {LowPricesTitle.map((e) => {
          const isLiked = likes[e.id];
          return (
            <div key={e.id} className="goods">
              <img className="image" src={e.img} alt={e.title} />
              <div className="like">
                {!isLiked && <CiHeart onClick={() => toggleLike(e.id)} />}
                {isLiked && (
                  <FaHeart color="7f4dff" onClick={() => toggleLike(e.id)} />
                )}
              </div>
              <span id="title">{e.title}</span>
              <span id="star">
                {e.starIcon} {e.starText}
              </span>
              <span id="credit">{e.credit}</span>
              <div className="product">
                <div className="price">
                  <span id="fake-price">{e.fakePrice}</span>
                  <span id="actual-price">{e.price}</span>
                </div>
                <div className="image">
                  <img src={e.divSlot} alt="Product image" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="btn">
        <button>Yana ko'rsatish 20</button>
      </div>
      <div className="Electronics">
        <Element name="section1" className="section1">
          {" "}
          <span>
            Elektronika <FaAngleRight size={18} />
          </span>
          <div className="LowPrices">
            {Electronics.map((e) => {
              const isLiked = likes[e.id];
              return (
                <div key={e.id} className="goods">
                  <img className="image" src={e.img} alt={e.title} />
                  <div className="like">
                    {!isLiked && <CiHeart onClick={() => toggleLike(e.id)} />}
                    {isLiked && (
                      <FaHeart
                        color="7f4dff"
                        onClick={() => toggleLike(e.id)}
                      />
                    )}
                  </div>
                  <span id="title">{e.title}</span>
                  <span id="star">
                    {e.starIcon} {e.starText}
                  </span>
                  <span id="credit">{e.credit}</span>
                  <div className="product">
                    <div className="price">
                      <span id="fake-price">{e.fakePrice}</span>
                      <span id="actual-price">{e.price}</span>
                    </div>
                    <div className="image">
                      <img src={e.divSlot} alt="Product image" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Element>
      </div>
      <div className="Electronics">
        <Element name="section2">
          {" "}
          <span>
            Oshxona uchun texnika <FaAngleRight size={18} />
          </span>
          <div className="LowPrices">
            {kitchen.map((e) => {
              const isLiked = likes[e.id];
              return (
                <div key={e.id} className="goods">
                  <img className="image" src={e.img} alt={e.title} />
                  <div className="like">
                    {!isLiked && <CiHeart onClick={() => toggleLike(e.id)} />}
                    {isLiked && (
                      <FaHeart
                        color="7f4dff"
                        onClick={() => toggleLike(e.id)}
                      />
                    )}
                  </div>
                  <span id="title">{e.title}</span>
                  <span id="star">
                    {e.starIcon} {e.starText}
                  </span>
                  <span id="credit">{e.credit}</span>
                  <div className="product">
                    <div className="price">
                      <span id="fake-price">{e.fakePrice}</span>
                      <span id="actual-price">{e.price}</span>
                    </div>
                    <div className="image">
                      <img src={e.divSlot} alt="Product image" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Element>
      </div>
      <div className="wrapper-image">
        <img src={wrapperImage} alt="wrapper image" />
      </div>
      <div className="Electronics">
        <Element name="section9">
          {" "}
          <span>
            Muddatli to'lov <FaAngleRight size={18} />
          </span>
          <div className="LowPrices">
            {InstallmentPaymet.map((e) => {
              const isLiked = likes[e.id];
              return (
                <div key={e.id} className="goods">
                  <img className="image" src={e.img} alt={e.title} />
                  <div className="like">
                    {!isLiked && <CiHeart onClick={() => toggleLike(e.id)} />}
                    {isLiked && (
                      <FaHeart
                        color="7f4dff"
                        onClick={() => toggleLike(e.id)}
                      />
                    )}
                  </div>
                  <span id="title">{e.title}</span>
                  <span id="star">
                    {e.starIcon} {e.starText}
                  </span>
                  <span id="credit">{e.credit}</span>
                  <div className="product">
                    <div className="price">
                      <span id="fake-price">{e.fakePrice}</span>
                      <span id="actual-price">{e.price}</span>
                    </div>
                    <div className="image">
                      <img src={e.divSlot} alt="Product image" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Element>
      </div>
      <div className="wrapper-image">
        <img src={mainPageButton} alt="wrapper image" />
      </div>
      <div className="btn">
        <button>Yana ko'rsatish 20</button>
      </div>
    </div>
  );
}

export default Extandle;

// const categories = {
//   LowPricesTitle: LowPrices.slice(0, 20),
//   Electronics: LowPrices.slice(20, 25),
//   kitchen: LowPrices.slice(25, 30),
//   InstallmentPaymet: LowPrices.slice(30, 35),
//   HeatTechnique: LowPrices.slice(35, 40),
// };
