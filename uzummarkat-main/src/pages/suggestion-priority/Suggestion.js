import { useState, useEffect } from "react";
import { ReactComponent as Logo } from "../../asset/svg/Logo.svg";
import { ReactComponent as Directy } from "../../asset/svg/directy.svg";
import { GoSearch } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { CiShoppingBasket } from "react-icons/ci";
import { useLanguage } from "../../LanguageSelector";
import { languages } from "../../data/data";

function Suggestion() {
  const [basketItems, setBasketItems] = useState(
    JSON.parse(localStorage.getItem("BasketItems")) || {}
  );
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const currentLanguage = languages[language] || languages["uzb"];
  const basketProduct = Object.values(basketItems);

  // 🔹 Foydalanuvchi ma'lumotlarini olish
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // 🔹 Logout funksiyasi
  const handleLogout = () => {
    localStorage.removeItem("user"); // LocalStorage dan o'chirish
    setUser(null); // State ni yangilash
    setDropdownOpen(false); // Dropdownni yopish
    navigate("/home"); // Login sahifasiga yo‘naltirish
  };

  return (
    <div className="Suggestion">
      <div className="logo">
        <Link to="/home">
          <Logo />
        </Link>
      </div>
      <div className="search">
        <div className="directy">
          <Directy />
          <span>{currentLanguage.directory}</span>
        </div>
        <div className="input">
          <input type="text" placeholder={currentLanguage.SuggestionInput} />
          <div>
            <GoSearch />
          </div>
        </div>
      </div>
      <div className="sign">
        {user ? (
          <div className="user-menu">
            <button
              className="user-name"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.name || "User"}
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>{currentLanguage.logout}</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <IoPersonOutline />
            <span>{currentLanguage.sign}</span>
          </Link>
        )}
        <Link to="/wishes">
          <FaRegHeart />
          <span>{currentLanguage.qualifiers}</span>
        </Link>
        <Link to="/basket">
          <CiShoppingBasket />
          <span>
            {currentLanguage.basket}{" "}
            {basketProduct.length >= 2 ? basketProduct.length - 1 : ""}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Suggestion;
