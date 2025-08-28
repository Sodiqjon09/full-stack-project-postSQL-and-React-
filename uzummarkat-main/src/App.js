import React, { useEffect } from "react";
import Login from "./Components/login/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Signup from "./Components/Signup/Signup";
import Wishes from "./Components/Wishes/Wishes";
import { LanguageProvider } from "./LanguageSelector"; // Import the LanguageProvider
import Basket from "./Components/Basket/Basket";

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/api/basket").then((response) =>
      response.json().then((data) => console.log(data))
    );
  }, []);
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/wishes" element={<Wishes />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
