import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PressEnter.css";

const PressEnter = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setClicked(true);
        const audio = new Audio("/sounds/coin.mp3");
        audio.volume = 0.3;
        audio.play().catch(() => { });
        setTimeout(() => {
          navigate("/home");
        }, 600);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  return (
    <div className="press-enter-container">
      <div className={clicked ? "press-enter-text" : "blinking"} onClick={() => {
        setClicked(true);
        const audio = new Audio("/sounds/coin.mp3");
        audio.volume = 0.1;
        audio.play().catch(() => { });
        setTimeout(() => {
          navigate("/home");
        }, 600);
      }}>
        Press ENTER to continue
      </div>
    </div>
  );
};

export default PressEnter;
