import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { TbBasketPlus } from "react-icons/tb";

const ProductCard = ({ product, isLiked, toggleLike }) => (
  <div className="goods">
    <img className="image" src={product.image} alt={product.title} />
    <div className="like">
      {!isLiked ? (
        <CiHeart onClick={() => toggleLike(product.id)} />
      ) : (
        <FaHeart color="red" onClick={() => toggleLike(product.id)} />
      )}
    </div>
    <span id="title">{product.title}</span>
    <span id="credit">{product.credit}</span>
    <div className="product">
      <div className="price">
        <span id="fake-price">{product.fakePrice}</span>
        <span id="actual-price">{product.price}</span>
      </div>
      <TbBasketPlus />
    </div>
  </div>
);

export default ProductCard;
