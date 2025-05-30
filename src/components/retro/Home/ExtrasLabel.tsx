import React from "react";
import { motion } from "framer-motion";

const MotionCol = motion.div;

const ExtrasLabel = () => (
  <MotionCol
    className="extras-glitch"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 4 * 0.3, duration: 2 }}
  >
    EXTRAS
  </MotionCol>
);

export default ExtrasLabel;