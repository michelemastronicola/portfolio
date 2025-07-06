import React, { useEffect, useState } from "react";
import "../../../styles/retro/AboutMe.css";
import { Button, Col, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TypingText from "../common/TypingText";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import AnimatedButton from "../common/AnimatedButton";

const AboutMe = () => {
  const [showBackButton, setShowBackButton] = useState(false);

  const navigate = useNavigate();
  const MotionCol = motion(Col);

  const muted = useSelector((state: RootState) => state.audio.muted);
  const isMobile = useSelector((state: RootState) => state.device.isMobile);

  return (
    <>
      <div className="aboutme-container">
        <h1 className="retro-title">
          About me
        </h1>
        <div className="animated-text-area">
          <TypingText
            firstlines={[
              "My name is Michele Mastronicola and I am a front-end developer.",
              "I live in Trani, in southern Italy",
              "I have a degree in Electronic and Telecommunications Engineering",
              "but at the end of my studies I jumped into web development",
            ]}
            secondLines={[
              "I am focused on React and modern JS,",
              "I build clean, functional UI with attention to detail.",
              "Always been into tech, breaking and building stuff",
              "and I’ve turned it into my full-time job."
            ]}
            thirdLines={[
              "I use React, Next.js, TypeScript and Git every day",
              "and I mess around with new libraries and tools all the time.",
              "I care a lot about accessibility and code scalability.",
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

export default AboutMe;
