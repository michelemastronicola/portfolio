import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/retro/Home/Home";
import PressEnter from "./components/retro/PressEnter/PressEnter";
import AboutMe from "./components/retro/AboutMe/AboutMe";
import Contacts from "./components/retro/Contacts/Contacts";
import useDeviceDetection from "./components/retro/common/UseDeviceDetection";
import useReactiveBackground from "./components/retro/common/UseReactiveBackground";
import "./styles/retro/App.css";
import ReactiveOscilloscope from "./components/retro/common/ReactiveOscilloscope";
import AboutProject from "./components/retro/AboutProject/AboutProject";
import RetroTrivia from "./components/retro/Modal/RetroTrivia";

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
        <Route path="/aboutProject" element={<AboutProject />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/retroTrivia" element={<RetroTrivia />} />
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
