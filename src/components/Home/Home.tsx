import React, { useEffect, useState } from "react";
import TypingText from "../common/TypingText";
import "../../styles/Home.css";
import { Button, Col, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toggleMute } from "../../store/audioSlice";

const Home = () => {
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();
  const MotionCol = motion(Col);

  const muted = useSelector((state: RootState) => state.audio.muted);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("showButtons:", showButtons);
  }, [showButtons]);

  return (
    <>
      <div className="home-container">
        <div className="ascii-title">
          {String.raw`
__          ________ _      _____ ____  __  __ ______ 
\ \        / /  ____| |    / ____/ __ \|  \/  |  ____|
  \ \  /\  / /| |__  | |   | |   | |  | | \  / | |__   
  \ \/  \/ / |  __| | |   | |   | |  | | |\/| |  __|  
    \  /\  /  | |____| |___| |___| |__| | |  | | |____ 
    \/  \/   |______|______\_____\____/|_|  |_|______|                                              
      `}
        </div>
        <div className="animated-text-area">
          <TypingText
            lines={[
              "Hello :)",
              "My name is Michele Mastronicola",
              "I'm a front-end developer",
              "and this is my personal website.",
              "",
              "Feel free to explore!",]}
            delay={60}
            onComplete={() => setShowButtons(true)}
          />
        </div>
        {showButtons && (
          <div className="button-wrapper">
            <Row className="text-center w-100 m-0 justify-content-center">
              {["about me", "about this project", "contacts", " wip"].map((label, index) => (
                <MotionCol
                  key={index}
                  xs="6"
                  md="3"
                  className="d-flex flex-column align-items-center p-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3, duration: 2 }}
                >
                  <Button color="dark" className="p-0 border-0 bg-transparent"
                    onClick={() => {
                      const audio = new Audio("/sounds/forward.wav");
                      audio.volume = 0.3;
                      if (!muted) {
                        audio.play().catch(() => { });
                      }
                      if (index === 0) {
                        setTimeout(() => {
                          navigate("/aboutMe");
                        }, 600)
                      }
                      else if (index === 2) {
                        setTimeout(() => {
                          navigate("/contacts");
                        }, 600)
                      }
                    }}
                  >
                    <img
                      src={`/images/gif${index + 1}.gif`}
                      alt={`gif-${label}`}
                      style={{
                        width: "100%",
                        maxWidth: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                    />
                  </Button>
                  <div
                    style={{
                      color: "white",
                      marginTop: "0.5rem",
                      fontFamily: "monospace",
                    }}
                  >
                    {label}
                  </div>
                </MotionCol>
              ))}

            </Row>

            <MotionCol
              className="extras-glitch"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4 * 0.3, duration: 2 }}
            >
              EXTRAS
            </MotionCol>

            <Row className="text-center w-100 m-0 justify-content-center" >
              {["change theme", muted ? "unmute" : "mute"].map((label, index) => (
                <MotionCol
                  key={index + 4}
                  xs="6"
                  md="2"
                  className="d-flex flex-column align-items-center p-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3, duration: 2 }}
                >
                  <Button color="dark" className="p-0 border-0 bg-transparent"
                    onClick={() => {
                      const audio = new Audio("/sounds/forward.wav");
                      audio.volume = 0.3;
                      if (!muted && index !== 1) {
                        audio.play().catch(() => { });
                      }
                      if (index === 0) {
                        setTimeout(() => {
                          navigate("/aboutMe");
                        }, 600)
                      }
                      else {
                        dispatch(toggleMute())
                      }
                    }}
                  >
                    <img
                      src={
                        index === 0
                          ? "/images/gif4.gif"
                          : muted
                            ? "/images/gif5.gif"
                            : "/images/gif6.gif"
                      }
                      alt={`gif-${label}`}
                      style={{
                        width: "100%",
                        maxWidth: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                    />
                  </Button>
                  <div
                    style={{
                      color: "white",
                      marginTop: "0.5rem",
                      fontFamily: "monospace",
                    }}
                  >
                    {label}
                  </div>
                </MotionCol>
              ))}
            </Row>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
