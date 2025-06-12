import React from "react";

import "../../../styles/modern/ClassicSection.css";
import TipingTextModern from "../../retro/common/TypingTextModern";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, setThemeLoading } from "../../../store/themeSlice";
import { RootState } from "../../../store/store";
import { toggleMute } from "../../../store/audioSlice";

const Hero = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.currentTheme);
  const loading = useSelector((state: RootState) => state.theme.loading);
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
          dispatch(toggleMute());
          dispatch(setThemeLoading(true));
          setTimeout(() => {
            dispatch(setTheme(theme === "retro" ? "classic" : "retro"));
            dispatch(setThemeLoading(false));
          }, 2000);
        }}
          color="primary"
          className="btn-purple btn-shake-infinite">
          Change Theme
        </Button>
      </div>
    </div>
  );
};

export default Hero;
