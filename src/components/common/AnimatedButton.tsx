import React from "react";
import { motion } from "framer-motion";
import { Button, Col } from "reactstrap";

type Props = {
  label: string;
  gifSrc: string;
  onClick: () => void;
  index: number;
  size?: number;
};

const MotionCol = motion(Col);

const AnimatedButton: React.FC<Props> = ({ label, gifSrc, onClick, index, size }) => (
  <MotionCol
    xs="6"
    md="3"
    className="d-flex flex-column align-items-center p-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.3, duration: 2 }}
  >
    <Button color="dark" className="p-0 border-0 bg-transparent" onClick={onClick}>
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
    </Button>
    <div style={{ color: "white", marginTop: "0.5rem", fontFamily: "monospace" }}>{label}</div>
  </MotionCol>
);

export default AnimatedButton;
