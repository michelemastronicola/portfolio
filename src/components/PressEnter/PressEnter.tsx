import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PressEnter.css"; 

const PressEnter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
      const audio = new Audio("/sounds/coin.mp3");
      audio.volume = 0.1;
      audio.play().catch(() => {});
        navigate("/home");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  return (
    <div className="press-enter-container">
      <div className="blinking" onClick={() => {
      const audio = new Audio("/sounds/coin.mp3");
      audio.volume = 0.1;
      audio.play().catch(() => {});
      navigate("/home");
      }}>
        Press ENTER to continue
      </div>
    </div>
  );
};

export default PressEnter;
