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

export default function MainContent() {
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
      <SwiperSlide>
        <Link to="/">
          <img src={img1} alt="uzum" />
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to="/">
          <img src={img2} alt="uzum" />
        </Link>
      </SwiperSlide>{" "}
      <SwiperSlide>
        <Link to="/">
          <img src={img3} alt="uzum" />
        </Link>
      </SwiperSlide>{" "}
      <SwiperSlide>
        <Link to="/">
          <img src={img4} alt="uzum" />
        </Link>
      </SwiperSlide>
    </Swiper>
  );
}
