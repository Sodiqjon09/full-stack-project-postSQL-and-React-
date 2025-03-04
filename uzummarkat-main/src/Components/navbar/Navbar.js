import React, { useState, useEffect } from "react";
import Topbar from "../../pages/Topbar/Topbar";
import "./Navbar.css";
import Suggestion from "../../pages/suggestion-priority/Suggestion";
import Bottombar from "../../pages/Bottombar/Bottombar";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="Navbar">
      <div className="mobile-bar">
        <div className="uzum-dowland">
          <div className="uzum-logo">
            <img
              src="https://optim.tildacdn.one/tild6663-3835-4436-a532-613661326432/-/resize/304x/-/format/webp/image.png"
              alt="uzum"
            />
            <div className="uzum-text">
              <span>Uzum Market</span>
              <p>ilovani yuklab olish</p>
            </div>
          </div>
          <Link to="/">Yuklab olish</Link>
        </div>
        <div className="input">
          <input type="text" placeholder="Mahsulotlar va turkumlarni izlash" />
        </div>
      </div>
      <div className="ps-bar">
        <Topbar />
        <Suggestion />
        <Bottombar />
      </div>
    </div>
  );
}

export default Navbar;
