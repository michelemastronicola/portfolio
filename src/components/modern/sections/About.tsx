import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import LazySection from "../common/LazySection";
import "../../../styles/modern/About.css";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageHovered, setImageHovered] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const text = "Experienced front-end developer focused on crafting responsive, accessible, and visually engaging interfaces. For this project, I relied heavily on React, Redux Toolkit, and React Router to structure the application, combined with Framer Motion to deliver smooth animations and transitions. Styling was handled through modular SCSS and theme-based CSS for full control over the visual identity. I prioritize performance, interactivity, and a strong sense of design in everything I build.";
  
  const words = text.split(" ");
  
  const skills = [
    { name: "React", level: 90, color: "#61DAFB" },
    { name: "TypeScript", level: 90, color: "#3178C6" },
    { name: "CSS/SCSS", level: 85, color: "#CC6699" },
    { name: "UI/UX", level: 80, color: "#ec4899" },
    { name: "Animation", level: 75, color: "#7c3aed" },
  ];

  return (
    <div className="classic-section about" ref={sectionRef}>
      {/* Background decoration */}
      <div className="about-bg-decoration">
        <div className="bg-grid"></div>
        <div className="bg-gradient-orb"></div>
      </div>
      
      <LazySection>
        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="about-title"
            >
              About <span className="highlight">Me</span>
              <span className="title-dot">.</span>
            </motion.h2>
            
            <motion.p
              className="about-description"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ staggerChildren: 0.008 }}
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  className="word"
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
            
            {/* Skills section */}
            <motion.div 
              className="skills-container"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.h3 
                className="skills-title"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                Core Skills
              </motion.h3>
              
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-item"
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  onHoverStart={() => setHoveredSkill(index)}
                  onHoverEnd={() => setHoveredSkill(null)}
                >
                  <div className="skill-header">
                    <div className="skill-name">
                      <span>{skill.name}</span>
                    </div>
                    <motion.span
                      className="skill-percentage"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  
                  <div className="skill-bar-wrapper">
                    <div className="skill-bar-bg">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1.2,
                          delay: 0.8 + index * 0.1,
                          ease: "easeOut"
                        }}
                        style={{
                          background: `linear-gradient(90deg, ${skill.color} 0%, ${skill.color}dd 100%)`,
                          boxShadow: hoveredSkill === index 
                            ? `0 0 20px ${skill.color}88` 
                            : `0 0 10px ${skill.color}44`
                        }}
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          className="skill-bar-shimmer"
                          animate={{
                            x: ["-100%", "200%"]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            ref={imageRef}
            className="about-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onHoverStart={() => setImageHovered(true)}
            onHoverEnd={() => setImageHovered(false)}
          >
            <motion.div
              className="visual-container"
              animate={{
                rotateY: imageHovered ? 10 : 0,
                rotateX: imageHovered ? -5 : 0,
              }}
              transition={{ type: "spring", stiffness: 100 }}
            >   
              <div className="visual-backdrop"></div>
              <motion.img 
                src="/images/react.png" 
                alt="React logo"
                className="visual-image"
                animate={{
                  scale: imageHovered ? 1.05 : 1,
                  rotate: imageHovered ? 5 : 0,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              
              {/* Floating particles */}
              <div className="particles">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="particle"
                    animate={{
                      y: [0, -20, 0],
                      x: [0, i % 2 === 0 ? 10 : -10, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${20 + (i % 3) * 25}%`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </LazySection>
    </div>
  );
};

export default About;