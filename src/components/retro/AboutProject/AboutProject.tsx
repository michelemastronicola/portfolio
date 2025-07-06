import React, { useEffect, useState } from "react";
import "../../../styles/retro/AboutMe.css";
import { Button, Col, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TypingText from "../common/TypingText";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import AnimatedButton from "../common/AnimatedButton";

const AboutProject = () => {
  const [showBackButton, setShowBackButton] = useState(false);

  const navigate = useNavigate();
  const MotionCol = motion(Col);

  const muted = useSelector((state: RootState) => state.audio.muted);
  const isMobile = useSelector((state: RootState) => state.device.isMobile);

  return (
    <>
      <div className="aboutme-container">
        <h1 className="retro-title">
          About this project
        </h1>
        <div className="animated-text-area">
          <TypingText
            firstlines={[
              "This project was born from the idea of putting some of my skills to the test.",
              "The plan was to create a portfolio split into two themes:",
              "the first theme is a single page with anchor-based navigation",
              "The second one is a retro-style SPA with proper routing."
            ]}
            secondLines={[
              "There's also a 'play' section with a mini-game (more coming soon!).",
              "In the classic theme, you can find the repos of some of my side projects,",
              "they’re all practice grounds where I test and improve my skills"
            ]}
            thirdLines={[
              "The project is at version 1.0 — it took some time.",
              "I worked on it here and there, whenever I could,",
              "it will be constantly updated, so stay tuned"
            ]}
            delay={19}
            onComplete={() => setShowBackButton(true)}
          />
        </div>

        {showBackButton && (
          <div className="button-wrapper">
            <Row className="text-center w-100 m-0 justify-content-center">
              <AnimatedButton
                key={"back"}
                index={0}
                label={"go back"}
                size={isMobile ? 80 : 120}
                gifSrc={`/images/leftarrow.gif`}
                onClick={() => {
                  const audio = new Audio("/sounds/back.mp3");
                  audio.volume = 0.3;
                  if (!muted) audio.play().catch(() => { });
                  setTimeout(() => navigate("/home"), 600);

                }}
              />
            </Row>
          </div>
        )}
      </div>
    </>
  );
};

export default AboutProject;
