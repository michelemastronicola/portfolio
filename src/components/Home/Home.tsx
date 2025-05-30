import React, { useEffect, useState } from "react";
import TypingText from "../common/TypingText";
import "../../styles/Home.css";
import { Button, Col, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toggleMute } from "../../store/audioSlice";
import AnimatedButton from "../common/AnimatedButton";
import ExtrasLabel from "./ExtrasLabel";
import RetroModal from "../Modal/RetroModal";

const Home = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
        {showModal && (
          <RetroModal
            onClose={() => setShowModal(false)}
            onSelect={(path) => {
              setShowModal(false);
              setTimeout(() => navigate(path), 300);
            }}
          />
        )}

        {/* <div className="ascii-title">
          {String.raw`
__          ________ _      _____ ____  __  __ ______ 
\ \        / /  ____| |    / ____/ __ \|  \/  |  ____|
  \ \  /\  / /| |__  | |   | |   | |  | | \  / | |__   
  \ \/  \/ / |  __| | |   | |   | |  | | |\/| |  __|  
    \  /\  /  | |____| |___| |___| |__| | |  | | |____ 
    \/  \/   |______|______\_____\____/|_|  |_|______|                                              
      `}
        </div> */}
        <h1 className="retro-title">
          Welcome
        </h1>
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
              {["about me", "about this project", "contacts", "other projects"].map((label, index) => (
                <AnimatedButton
                  key={label}
                  index={index}
                  label={label}
                  gifSrc={`/images/gif${index + 1}.gif`}
                  onClick={() => {
                    const audio = new Audio("/sounds/forward.wav");
                    audio.volume = 0.3;
                    if (!muted) audio.play().catch(() => { });
                    if (index === 0) setTimeout(() => navigate("/aboutMe"), 600);
                    else if (index === 1) setTimeout(() => navigate("/aboutProject"), 600);
                    else if (index === 2) setTimeout(() => navigate("/contacts"), 600);
                    else if (index === 3) setShowModal(true);
                  }}
                />
              ))}

            </Row>

            <ExtrasLabel />

            <Row className="text-center w-100 m-0 justify-content-center" >
              {["change theme", muted ? "unmute" : "mute"].map((label, index) => (

                <AnimatedButton
                  key={label}
                  index={index}
                  label={label}
                  gifSrc={index === 0 ? "/images/gif4.gif" : index === 1 && muted ? "/images/gif5.gif" : "/images/gif6.gif"}
                  onClick={() => {
                    const audio = new Audio("/sounds/forward.wav");
                    audio.volume = 0.3;
                    if (!muted) audio.play().catch(() => { });
                    if (index === 0) console.log("Change theme clicked");
                    else if (index === 1) dispatch(toggleMute());
                  }}
                />

              ))}
            </Row>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
