import React from "react";
import "./styles/retro/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/retro/Home/Home";
import PressEnter from "./components/retro/PressEnter/PressEnter";
import AboutMe from "./components/retro/AboutMe/AboutMe";
import Contacts from "./components/retro/Contacts/Contacts";
import useDeviceDetection from "./components/retro/common/UseDeviceDetection";
import useReactiveBackground from "./components/retro/common/UseReactiveBackground";
import ReactiveOscilloscope from "./components/retro/common/ReactiveOscilloscope";
import AboutProject from "./components/retro/AboutProject/AboutProject";
import RetroTrivia from "./components/retro/Modal/RetroTrivia";
import ClassicHome from "./components/modern/ClassicHome";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import RetroParticles from "./components/retro/common/RetroParticles";

const AppRoutes = () => {

  const theme = useSelector((state: RootState) => state.theme.currentTheme);

  useDeviceDetection();
  useReactiveBackground();

  if (theme === "classic") {
    return <ClassicHome />;
  }

  return (
    <div className="global-background">
      <ReactiveOscilloscope />
      <RetroParticles />
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
