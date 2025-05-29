import React, { useEffect, useState } from "react";
import "../../styles/AboutMe.css";
import { Button, Col, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TypingText from "../common/TypingText";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const AboutProject = () => {
  const [showBackButton, setShowBackButton] = useState(false);

  const navigate = useNavigate();
  const MotionCol = motion(Col);

  const muted = useSelector((state: RootState) => state.audio.muted);

  return (
    <>
      <div className="aboutme-container">
        <h1 className="retro-title">
          About this project
        </h1>
        <div className="animated-text-area">
          <TypingText
            firstlines={[
              "I'm a front-end developer with a strong focus on UI and interaction.",
              "I believe good interfaces are not just usable — they're memorable.",
              "Clean code, thoughtful design, consistent experience.",
              "That's the baseline I work with.",
            ]}
            secondLines={[
              "I work primarily with React — it's where I feel at home.",
              "But the front-end world moves fast, and so do I.",
              "I constantly study new tools, frameworks, and patterns.",
              "Not to chase trends, but to sharpen the way I build.",
              "Stagnation isn’t an option in this field — I evolve with it.",
            ]}
            thirdLines={[
              "I care about what I build, not just how I build it.",
              "I enjoy working on projects that have a clear purpose and identity.",
              "My goal is to grow as a developer without losing the human part.",
              "Feedback, transparency, curiosity: I value all of them.",
              "And if I can learn something new — even better.",
            ]}
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

export default AboutProject;
