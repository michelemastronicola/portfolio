import React from "react";
import "../../../styles/modern/ClassicSection.css";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import LazySection from "../common/LazySection";

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
      title: "GAME SEARCH ENGINE",
      description: "A React Native app that allows you to search for games and view their details.",
    },
    {
      title: "???",
      description: "Coming soon...",
    },
  ];

  return (
    <div className="classic-section projects">
      <LazySection>
        <div className="projects-content">
          <div className="projects-grid">
            {projects.map((p) => (
              <Card key={p.title} className="project-card">
                <CardBody>
                  <CardTitle tag="h3">{p.title}</CardTitle>
                  <CardText>{p.description}</CardText>
                </CardBody>
                {(p.title === "PORTFOLIO" || p.title === "GAME SEARCH ENGINE") && (
                  <Button
                    className="github-btn"
                    onClick={() => {
                      if (p.title === "PORTFOLIO") {
                        window.open(
                          "https://github.com/michelemastronicola/portfolio",
                          "_blank"
                        )
                      } else if (p.title === "GAME SEARCH ENGINE") {
                        window.open(
                          "https://github.com/michelemastronicola/game-explorer-native",
                          "_blank"
                        )
                      }
                    }
                    }
                  >
                    <img src="/images/github.png" alt="React logo" />
                  </Button>
                )}
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
      </LazySection>
    </div>
  );
};

export default Projects;
