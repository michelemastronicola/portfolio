import React, { useRef } from "react";
import { motion, useInView, HTMLMotionProps } from "framer-motion";

interface LazySectionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

const LazySection: React.FC<LazySectionProps> = ({ children, className, ...rest }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default LazySection;