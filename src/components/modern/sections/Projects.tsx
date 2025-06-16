import React from "react";
import "../../../styles/modern/ClassicSection.css";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const Projects = () => {
  const projects = [
    {
      title: "PORTFOLIO",
      description: "A website with two themes: one single page with anchor links and one SPA. ",
    },
    {
      title: "QUIZCADE",
      description: "A retro trivia game built with React and Node. You can play it on retro theme!",
    },
    {
      title: "???",
      description: "Coming soon...",
    },
    {
      title: "???",
      description: "Coming soon...",
    },
  ];

  return (
    <div className="classic-section projects">
      <div className="projects-content">
        <div className="projects-grid">
          {projects.map((p) => (
            <Card key={p.title} className="project-card">
              <CardBody>
                <CardTitle tag="h3">{p.title}</CardTitle>
                <CardText>{p.description}</CardText>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="projects-text">
          <h2>
            My <span className="highlight">Projects.</span>
          </h2>
          <p>
            Here’s a selection of things I’ve built or am currently working on.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
