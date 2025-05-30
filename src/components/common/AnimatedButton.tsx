import React from "react";
import { motion } from "framer-motion";
import { Button, Col } from "reactstrap";
import "../../styles/AnimatedButton.css";

type Props = {
  label: string;
  gifSrc: string;
  onClick: () => void;
  index: number;
  size?: number;
  atTheBottom?: boolean;
};

const MotionCol = motion(Col);

const AnimatedButton: React.FC<Props> = ({ label, gifSrc, onClick, index, size, atTheBottom }) => (
  <MotionCol
    xs="6"
    md="3"
    className="d-flex flex-column align-items-center p-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.3, duration: 2 }}
    style={ atTheBottom ? {
      position: "fixed",
      left: 0,
      bottom: 20,
      width: "100%",
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
    } : undefined}
  >
    <Button color="dark" className="animated-button p-0 border-0 bg-transparent" onClick={onClick}>
      <img
        src={gifSrc}
        alt={`gif-${label}`}
        style={{
          width: "100%",
          maxWidth: size ? `${size}px` : "100px",
          height: size ? `${size}px` : "100px",
          objectFit: "contain",
        }}
      />
      <div className="crt-label">{label}</div>
    </Button>
  </MotionCol>
);

export default AnimatedButton;
