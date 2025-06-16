import React from "react";

import "../../../styles/modern/ClassicSection.css";
import TipingTextModern from "../../retro/common/TypingTextModern";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, setThemeLoading } from "../../../store/themeSlice";
import { RootState } from "../../../store/store";
import { toggleMute } from "../../../store/audioSlice";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const dispatch = useDispatch();
  const isMobile = useSelector((state: RootState) => state.device.isMobile);
  const loading = useSelector((state: RootState) => state.theme.loading);
  const muted = useSelector((state: RootState) => state.audio.muted);
  const navigate = useNavigate();
  return (
    <div className="classic-section hero">
      {loading && (
        <div className="theme-loader-overlay">
          <p className="theme-loader-text">Loading new theme...</p>
        </div>
      )}
      <h1>michele_mastronicola</h1>
      <p>a_frontend_developer</p>
      <TipingTextModern staticText="I transform ideas into " dynamicPhrases={["digital experiences.", "interactive interfaces.", "bugs (then fix them).", "dark mode themed websites."]} />
      <div className="hero-buttons">
        <a href="/Michele_Mastronicola_CV.pdf" download target="_blank" rel="noopener noreferrer">
          <Button color="light" className="btn-outline-purple">
            Download CV
          </Button>
        </a>
        <Button onClick={() => {
          if (muted)
            dispatch(toggleMute());
          dispatch(setThemeLoading(true));
          setTimeout(() => {
            navigate("/");
            dispatch(setTheme("retro"));
            dispatch(setThemeLoading(false));
          }, 2000);
        }}
          color="primary"
          className="btn-purple btn-shake-infinite">
          Change Theme
        </Button>
      </div>
      <div className="scroll-indicator">
        <span>scroll</span>
        <a href="#about" className="arrow-down">
          <svg width="24" height="24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16l-6-6h12l-6 6z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Hero;
