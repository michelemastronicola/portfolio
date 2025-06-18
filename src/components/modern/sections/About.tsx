import React from "react";
import "../../../styles/modern/ClassicSection.css";
import LazySection from "../common/LazySection";

const About = () => {
  return (
    <div className="classic-section about">
      <LazySection>
        <div className="about-content">
          <div className="about-text">
            <h2>About <span className="highlight">Me.</span></h2>
            <p>
              Experienced front-end developer focused on crafting responsive, accessible, and visually engaging interfaces. For this project, I relied heavily on React, Redux Toolkit, and React Router to structure the application, combined with Framer Motion and GSAP to deliver smooth animations and transitions. Styling was handled through modular SCSS and theme-based CSS for full control over the visual identity. I prioritize performance, interactivity, and a strong sense of design in everything I build.
            </p>
          </div>
          <div className="about-image">
            <img src="/images/react.png" alt="reactlogo" />
          </div>
        </div>
      </LazySection>
    </div>
  );
};

export default About;