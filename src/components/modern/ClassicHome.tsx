import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ClassicNavbar from "./ClassicNavbar";
import "../../styles/modern/ClassicLayout.css";

const Hero = lazy(() => import("./sections/Hero"));
const About = lazy(() => import("./sections/Hero"));
const Projects = lazy(() => import("./sections/Hero"));
const Contacts = lazy(() => import("./sections/Hero"));

const ClassicHome = () => {
  const isMobile = useSelector((state: RootState) => state.device.isMobile);

  return (
    <div key={isMobile ? "mobile-layout" : "desktop-layout"} className="classic-layout">
      <ClassicNavbar />
      <Suspense fallback={<div className="loading-text">Loading...</div>}>
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        <section id="projects"><Projects /></section>
        <section id="contacts"><Contacts /></section>
      </Suspense>
    </div>
  );
};

export default ClassicHome;
