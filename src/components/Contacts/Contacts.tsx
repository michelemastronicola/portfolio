import React, { useEffect, useState } from "react";
import TypingText from "../common/TypingText";
import "../../styles/Home.css";
import { Button, Col, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

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
              "Here my contacts:",
              "linkedin: https://www.linkedin.com/in/michele-mastronicola/",
              "github: https://www.linkedin.com/in/michele-mastronicola/",
              "email: asdf@fv.com",
              "",]}
            delay={30}
            onComplete={() => setShowBackButton(true)}
          />
        </div>
        {showBackButton && (
          <div className="button-wrapper">
            <Row className="text-center w-100 m-0 justify-content-center">
              <MotionCol
                xs="6"
                md="3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button color="dark" className="p-0 border-0 bg-transparent"
                  onClick={() => {
                    const audio = new Audio("/sounds/back.mp3");
                    audio.volume = 0.3;
                    if (!muted) {
                      audio.play().catch(() => { });
                    }
                    setTimeout(() => {
                      navigate("/home");
                    }, 600)
                  }}>
                  <img
                    src={"/images/leftarrow.gif"}
                    alt={"backgif"}
                    style={{
                      width: "150px",
                      height: "150px",
                    }}
                  />
                </Button>
                <div
                  style={{
                    color: "white",
                    fontFamily: "monospace",
                    fontSize: "1.3rem",
                  }}
                >
                  go back
                </div>
              </MotionCol>
            </Row>
          </div>
        )}
      </div>
    </>

  );
};

export default Contacts;
