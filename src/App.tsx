import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import PressEnter from "./components/PressEnter/PressEnter";
import AboutMe from "./components/AboutMe/AboutMe";
import useDeviceDetection from "./components/common/UseDeviceDetection";
import Contacts from "./components/Contacts/Contacts";
import { Button } from "reactstrap";

function App() {

  useDeviceDetection();

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<PressEnter />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
