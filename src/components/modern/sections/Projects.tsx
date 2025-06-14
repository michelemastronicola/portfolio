import React from "react";

import "../../../styles/modern/ClassicSection.css";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const Projects = () => {

    const projects = [
        {
            title: "QUIZCADE",
            description: "A retro trivia game built with React and Node."
        },
        {
            title: "PORTFOLIO",
            description: "A website with two themes: one single page with anchor links and one SPA."
        }
    ];

    return (
        <div className="classic-section projects">
            <h2>My <span className="highlight">Projects.</span></h2>
            <div className="project-cards">
                {projects.map((p) => (
                    <Card key={p.title} className="project-card">
                        <CardBody>
                            <CardTitle tag="h3">{p.title}</CardTitle>
                            <CardText>{p.description}</CardText>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Projects;
