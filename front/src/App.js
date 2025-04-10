import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.js";
import Cookie from "universal-cookie";
import Auth from "./pages/auth.js";
import axios from "axios";
import UpdateProfile from "./pages/updateProfile.js";

export const UserContext = createContext();
const cookies = new Cookie();

//axios.defaults.baseURL = "http://localhost:3001/AuthApp";
axios.defaults.baseURL = "https://auth-app-back.vercel.app/AuthApp";
axios.defaults.withCredentials = true;

const authToken = cookies.get("token");

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = cookies.get("userId");
    if (userId) {
      setUser(userId);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!authToken) {
    return <Auth />;
  }
  return (
    <>
      <UserContext.Provider value={{ isMobile, user }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
