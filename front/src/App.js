import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.js";
import Cookie from "universal-cookie";
import Auth from "./pages/auth.js";
import axios from "axios";
import UpdateProfile from "./pages/updateProfile.js";

export const UserContext = createContext();
const cookie = new Cookie();

axios.defaults.baseURL = "http://localhost:3000/AuthApp";
axios.defaults.withCredentials = true;

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <UserContext.Provider value={{ isMobile }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
