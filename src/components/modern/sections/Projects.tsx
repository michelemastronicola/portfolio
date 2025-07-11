import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import LazySection from "../common/LazySection";
import "../../../styles/modern/Projects.css";

interface Project {
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  color: string;
  icon?: string;
}

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1]);

  const projects: Project[] = [
    {
      title: "PORTFOLIO",
      description: "A dual-theme portfolio showcasing modern web development skills with smooth transitions.",
      tech: ["React", "TypeScript", "Redux", "Framer Motion"],
      githubUrl: "https://github.com/michelemastronicola/portfolio",
      color: "#7c3aed",
    },
    {
      title: "QUIZCADE",
      description: "A retro-styled trivia game, you can try it on retro theme!",
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      color: "#ec4899",
    },
    {
      title: "GAME SEARCH ENGINE",
      description: "React Native app for discovering games with advanced filters and wishlist features.",
      tech: ["React Native", "Expo", "Redux", "RAWG API"],
      githubUrl: "https://github.com/michelemastronicola/game-explorer-native",
      color: "#3b82f6",
    },
    {
      title: "LOGIN PAGE",
      description: "Secure authentication system with JWT tokens and modern security practices.",
      tech: ["Next.js", "Express", "JWT", "PostgreSQL"],
      githubUrl: "https://github.com/michelemastronicola/full-stack-nodejs",
      color: "#10b981",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  return (
    <div className="projects-section">
      <LazySection>
        <motion.div 
          className="projects-container" 
          style={{ scale, opacity }}
        >
          {/* Header */}
          <motion.div 
            className="projects-header"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">
              My <span className="gradient-text">Projects</span>
            </h2>
            <p className="section-subtitle">
              This section is mostly a training ground to learn new stacks and sharpen my skills. Everything is a WIP.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="project-wrapper"
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="project-card"
                  animate={{
                    rotateY: hoveredIndex === index ? 8 : 0,
                    rotateX: hoveredIndex === index ? -8 : 0,
                    scale: hoveredIndex === index ? 1.05 : 1,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200,
                    damping: 20 
                  }}
                >
                  <motion.div 
                    className="card-glow"
                    style={{ background: project.color }}
                    animate={{
                      opacity: hoveredIndex === index ? 0.3 : 0
                    }}
                  />
                  
                  <motion.div 
                    className="card-gradient"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}15 0%, transparent 60%)`,
                    }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0.3
                    }}
                  />
                  
                  {/* Card content */}
                  <Card className="project-inner">
                    <CardBody>
                      <div className="card-header">
                        <motion.span 
                          className="project-icon"
                          animate={{
                            scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                            rotate: hoveredIndex === index ? [0, 10, -10, 0] : 0
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          {project.icon}
                        </motion.span>
                        <CardTitle tag="h3">
                          <motion.span
                            animate={{
                              color: hoveredIndex === index ? project.color : "#fff"
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {project.title}
                          </motion.span>
                        </CardTitle>
                      </div>
                      
                      <CardText className="project-description">{project.description}</CardText>
                      
                      {/* Tech stack */}
                      <div className="tech-stack">
                        {project.tech.map((tech, i) => (
                          <motion.span
                            key={tech}
                            className="tech-tag"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1,
                              y: hoveredIndex === index ? -2 : 0
                            }}
                            transition={{ 
                              delay: hoveredIndex === index ? i * 0.05 : 0,
                              duration: 0.3
                            }}
                            style={{
                              borderColor: hoveredIndex === index ? project.color : "rgba(255,255,255,0.2)",
                              color: hoveredIndex === index ? project.color : "rgba(255,255,255,0.7)"
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      
                      <div className="card-actions">
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-button github-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            Code
                          </motion.a>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </LazySection>
    </div>
  );
};

export default Projects;