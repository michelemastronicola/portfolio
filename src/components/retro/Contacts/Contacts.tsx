import React, { useEffect, useState } from "react";
import TypingText from "../common/TypingText";
import "../../../styles/retro/Home.css";
import { Button, Col, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import AnimatedButton from "../common/AnimatedButton";

const Contacts = () => {
  const [showBackButton, setShowBackButton] = useState(false);
  const navigate = useNavigate();
  const MotionCol = motion(Col);

  const muted = useSelector((state: RootState) => state.audio.muted);
  const isMobile = useSelector((state: RootState) => state.device.isMobile);

  return (
    <>
      <div className="home-container">
        <h1 className="retro-title">
          Contacts
        </h1>
        <div className="animated-text-area">
          <TypingText
            lines={[
              "Thanks for making it this far!",
              "If you'd like to reach out,",
              "you can find me just below 👇",
              "LinkedIn and GitHub for connections,",
              "or feel free to drop me a line at:",
              "mastronicolamichele@gmail.com",
              "",
            ]}

            delay={30}
            onComplete={() => setShowBackButton(true)}
          />
        </div>
        {showBackButton && (
          <div className="button-wrapper">
            <Row className="text-center w-100 m-0 justify-content-center">

              {["", "", ""].map((label, index) => (
                <AnimatedButton
                  key={label}
                  index={index}
                  label={label}
                  size={isMobile ? 80 : 120}
                  gifSrc={`/images/contacts${index + 1}.gif`}
                  onClick={() => {
                    const audio = new Audio("/sounds/forward.wav");
                    audio.volume = 0.3;
                    if (!muted) audio.play().catch(() => { });
                    if (index === 0) window.open("https://linkedin.com/in/michele-mastronicola-85883324b/", "_blank");
                    else if (index === 1) window.open( "https://github.com/michelemastronicola", "_blank");
                    else window.open("mailto:mastronicolamichele@gmail.com");
                  }}
                />
              ))}
            </Row>
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

export default Contacts;
