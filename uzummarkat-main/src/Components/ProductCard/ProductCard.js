import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { TbBasketPlus } from "react-icons/tb";

const ProductCard = ({ product, isLiked, toggleLike, toggleBasket }) => {
  const handleAddToBasket = () => {
    toggleBasket(product.id);
  };

  return (
    <div className="goods">
      <img className="image" src={product.image} alt={product.title} />
      <div className="like">
        {!isLiked ? (
          <CiHeart onClick={() => toggleLike(product.id)} />
        ) : (
          <FaHeart color="#7F4DFF" onClick={() => toggleLike(product.id)} />
        )}
      </div>
      <span id="title">{product.title}</span>
      <span id="credit">{product.credit}</span>
      <div className="product">
        <div className="price">
          <span id="fake-price">{product.fakePrice}</span>
          <span id="actual-price">{product.price}</span>
        </div>
        <div className="image">
          <TbBasketPlus onClick={handleAddToBasket} size={22} color="#000" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
