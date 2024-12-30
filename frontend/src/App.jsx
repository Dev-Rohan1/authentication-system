import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import EmailVerification from "./pages/EmailVerification";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <>
      <Navbar />{" "}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
