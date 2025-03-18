import { FaAngleRight } from "react-icons/fa6";
import { Element } from "react-scroll";
import ProductCard from "../ProductCard/ProductCard";

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
            isLiked={likes.has(item.id)}
            toggleLike={toggleLike}
          />
        ))}
      </div>
    </Element>
  </div>
);

export default CategorySection;
