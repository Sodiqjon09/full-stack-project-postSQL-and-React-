import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./MainContent.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import img1 from "./ct8qhmei4n3ehka2dvd0.jpg";
import img2 from "./ctemhb45j42dmkoiqbt0.jpg";
import img3 from "./ctfthb5pb7faledbld20.jpg";
import img4 from "./ctgj0fb4nkds9ma177hg.jpg";
import { useState, useEffect } from "react";

export default function MainContent() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/slide")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {data.map((slide) => {
        return (
          <SwiperSlide key={slide.id}>
            <Link to="/">
              <img src={slide.image} alt="uzum" />
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
