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
              "placeholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholder",
              "placeholderplaceholderplaceholderplaceholder",
              "placeholderplaceholderplaceholderplaceholder",
              "placeholderplaceholderplaceholder",
            ]}
            secondLines={[
              "placeholderplaceholderplaceholderplaceholder",
              "placeholderplaceholderplaceholderplaceholder",
              "placeholderplaceholderplaceholderplaceholderplaceholder.",
              "placeholderplaceholderplaceholderplaceholderplaceholder.",
              "placeholderplaceholderplaceholderplaceholderplaceholder",
            ]}
            thirdLines={[
              "placeholderplaceholderplaceholderplaceholder",
              "placeholderplaceholderplaceholderplaceholderplaceholderplaceholder",
              "placeholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholder",
              "placeholderplaceholderplaceholderplaceholderplaceholder",
              "placeholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholder",
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
