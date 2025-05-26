import React, { useEffect, useState } from "react";
import "../../styles/AboutMe.css";
import { Button, Col, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TypingText from "../common/TypingText";

const AboutMe = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [delay, setDelay] = useState(60);
  const [showBackButton, setShowBackButton] = useState(false);

  const navigate = useNavigate();

  const MotionCol = motion(Col);

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
            delay={delay}
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
                    <Button
                    color="primary"
                    onClick={() => navigate("/home")}
                    className="w-100"
                    >
                    Back to Home
                    </Button>
                </MotionCol>
                </Row>
            </div>
        )}
      </div>
    </>
  );
};

export default AboutMe;
