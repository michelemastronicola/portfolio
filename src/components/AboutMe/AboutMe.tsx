import React, { useEffect, useState } from "react";
import "../../styles/AboutMe.css";
import { Button, Col, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TypingText from "../common/TypingText";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const AboutMe = () => {
  const [showBackButton, setShowBackButton] = useState(false);

  const navigate = useNavigate();
  const MotionCol = motion(Col);

  const muted = useSelector((state: RootState) => state.audio.muted);

  return (
    <>
      <div className="aboutme-container">
        <pre className="ascii-title">
          {String.raw`
           ____   ____  _    _ _______   __  __ ______ 
     /\   |  _ \ / __ \| |  | |__   __| |  \/  |  ____|
    /  \  | |_) | |  | | |  | |  | |    | \  / | |__   
   / /\ \ |  _ <| |  | | |  | |  | |    | |\/| |  __|  
  / ____ \| |_) | |__| | |__| |  | |    | |  | | |____ 
 /_/    \_\____/ \____/ \____/   |_|    |_|  |_|______|                                                    
                                                                                                   
      `}
        </pre>

        <div className="animated-text-area">
          <TypingText
            firstlines={[
              "mock11",
              "wdfwdefrewefrgfewfr",
              "wdefrewewdefrewe",
              "wdefrewewdefrewewdefrewewdefrewewdefrewewdefrewe",
              "wdefrewewdefrewewdefrewewdefrewewdefrewewdefrewe",]}
            secondLines={[
              "Fmock22ooooooooooooo",
              "wdfwdefrewefrgfewfr",
              "wdefrewewdefrewe",
              "wdefrewewdefrewewdefrewewdefrewewdefrewewdefrewe",
              "wdefrewewdefrewewdefrewewdefrewewdefrewewdefrewe",]}
            thirdLines={[
              "Famoc33ooooooooooo",
              "wdfwdefrewefrgfewfr",
              "wdefrewewdefrewe",
              "wdefrewewdefrewewdefrewewdefrewewdefrewewdefrewe",
              "wdefrewewdefrewewdefrewewdefrewewdefrewewdefrewe",]}
            delay={19}
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

export default AboutMe;
