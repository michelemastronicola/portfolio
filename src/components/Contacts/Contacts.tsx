import React, { useEffect, useState } from "react";
import TypingText from "../common/TypingText";
import "../../styles/Home.css";
import { Button, Col, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import AnimatedButton from "../common/AnimatedButton";

const Contacts = () => {
  const [showBackButton, setShowBackButton] = useState(false);
  const navigate = useNavigate();
  const MotionCol = motion(Col);

  const muted = useSelector((state: RootState) => state.audio.muted);

  return (
    <>
      <div className="home-container">
        <pre className="ascii-title">
          {String.raw`
   _____ ____  _   _ _______       _____ _______ _____ 
  / ____\/ __ \| \ | |__   __|/\   / ____|__   __/ ____|
 | |   | |  | |  \| |  | |  /  \ | |       | | | (___  
 | |   | |  | | . \` |  | | / /\ \| |       | |  \___ \ 
 | |___| |__| | |\  |  | |/ ____ \ |____   | |  ____) |
  \_____\____/|_| \_|  |_/_/    \_\_____|  |_| |_____/ 
            `}
        </pre>
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
                  gifSrc={`/images/gif${index + 1}.gif`}
                  onClick={() => {
                    const audio = new Audio("/sounds/forward.wav");
                    audio.volume = 0.3;
                    if (!muted) audio.play().catch(() => { });
                    if (index === 0) window.open("https://github.com/michelemastronicola", "_blank");
                    else if (index === 1) window.open("https://linkedin.com/in/michele-mastronicola-85883324b/", "_blank");
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
                size={150}
                gifSrc={`/images/leftarrow.gif`}
                onClick={() => {
                  const audio = new Audio("/sounds/forward.wav");
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
