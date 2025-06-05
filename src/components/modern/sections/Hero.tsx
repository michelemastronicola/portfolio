import React from "react";

import "../../../styles/modern/ClassicSection.css";
import TipingTextModern from "../../retro/common/TypingTextModern";
import { Button } from "reactstrap";

const Hero = () => {
  return (
    <div className="classic-section hero">
      <h1>michele_mastronicola</h1>
      <p>a_frontend_developer</p>
      <TipingTextModern staticText="I transform ideas into " dynamicPhrases={["digital experiences.", "interactive interfaces.", "bugs (then fix them).", "dark mode themed websites."]} />
      <div className="hero-buttons">
        <a href="/Michele_Mastronicola_CV.pdf" download target="_blank" rel="noopener noreferrer">
          <Button color="light" className="btn-outline-purple">
            Download CV
          </Button>
        </a>
        <Button color="primary" className="btn-purple btn-shake-infinite">Change Theme</Button>
      </div>
    </div>
  );
};

export default Hero;
