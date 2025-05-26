import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import PressEnter from "./components/PressEnter/PressEnter";
import AboutMe from "./components/AboutMe/AboutMe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<PressEnter />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aboutme" element={<AboutMe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
