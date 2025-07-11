import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { setTheme, setThemeLoading } from "../../../store/themeSlice";
import { RootState } from "../../../store/store";
import { toggleMute } from "../../../store/audioSlice";
import { useNavigate } from "react-router-dom";
import TipingTextModern from "../../retro/common/TypingTextModern";
import LazySection from "../common/LazySection";
import CaptchaModal from "../common/CaptchaModal";
import ParticleField from "../common/ParticleField";
import "../../../styles/modern/Hero.css";

const Hero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const loading = useSelector((state: RootState) => state.theme.loading);
  const muted = useSelector((state: RootState) => state.audio.muted);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleCvDownload = () => {
    const link = document.createElement('a');
    link.href = '/Michele_Mastronicola_CV.pdf';
    link.download = 'Michele_Mastronicola_CV.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleThemeChange = () => {
    if (muted) dispatch(toggleMute());
    dispatch(setThemeLoading(true));

    setTimeout(() => {
      navigate("/");
      dispatch(setTheme("retro"));
      dispatch(setThemeLoading(false));
    }, 2000);
  };

  return (
    <motion.div
      ref={heroRef}
      className="classic-section hero"
    >
      <div className="hero-gradient-bg" />

      <ParticleField />

      {/* Floating orbs */}
      <motion.div
        className="floating-orb orb-1"
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="floating-orb orb-2"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <LazySection className="hero-content">
        {loading && (
          <motion.div
            className="theme-loader-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="loader-container">
              <div className="loader-ring" />
              <p className="theme-loader-text">Initializing new theme...</p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="title-gradient"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            michele_mastronicola
          </motion.h1>

          <motion.p
            className="subtitle-highlight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            a_frontend_developer
          </motion.p>

          <motion.div
            className="typing-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <TipingTextModern
              staticText="I transform ideas into "
              dynamicPhrases={[
                "digital experiences.",
                "interactive interfaces.",
                "pixel-perfect designs.",
                "memorable journeys."
              ]}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              color="light"
              className="btn-hero btn-outline-glow"
              onClick={() => setShowCaptcha(true)}
            >
              <span className="btn-text">Download CV</span>
              <span className="btn-icon">↓</span>
              <span className="btn-glow-effect" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleThemeChange}
              color="primary"
              className="btn-hero btn-primary-animated"
            >
              <span className="btn-text">Change Theme</span>
              <span className="btn-shimmer" />
            </Button>
          </motion.div>
        </motion.div>


      </LazySection>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="scroll-indicator"
      >
        <span>scroll</span>
        <a className="arrow-down">
          <svg width="24" height="24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16l-6-6h12l-6 6z" />
          </svg>
        </a>
      </motion.div>

      <CaptchaModal
        isOpen={showCaptcha}
        toggle={() => setShowCaptcha(false)}
        onSuccess={handleCvDownload}
      />
    </motion.div>
  );
};

export default Hero;