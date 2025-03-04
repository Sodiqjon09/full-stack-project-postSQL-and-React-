import React from "react";
import "./Home.css";
import MainContent from "../Main-content/MainContent";
import Extandle from "../Extandle/Extandle";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <MainContent />
      <Extandle />
      <Footer />
    </div>
  );
}

export default Home;
