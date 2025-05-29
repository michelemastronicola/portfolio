import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import PressEnter from "./components/PressEnter/PressEnter";
import AboutMe from "./components/AboutMe/AboutMe";
import Contacts from "./components/Contacts/Contacts";
import useDeviceDetection from "./components/common/UseDeviceDetection";
import useReactiveBackground from "./components/common/UseReactiveBackground";
import "./styles/App.css";
import ReactiveOscilloscope from "./components/common/ReactiveOscilloscope";

const AppRoutes = () => {

  useDeviceDetection();
  useReactiveBackground(); 

  return (
    <div className="global-background">
      <ReactiveOscilloscope />
      <Routes>
        <Route path="/" element={<PressEnter />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
