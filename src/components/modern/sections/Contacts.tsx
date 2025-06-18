import React from "react";

import "../../../styles/modern/ClassicSection.css";
import LazySection from "../common/LazySection";

const Contacts = () => {
  return (
    <div className="classic-section contacts">
      <LazySection>
        <div className="contacts-content">
          <div className="contacts-text">
            <h2>
              Contact <span className="highlight">Me.</span>
            </h2>
            <p>Feel free to reach me through any of the links below.</p>
          </div>
          <div className="contact-links">
            <a href="mailto:mastronicolamichele@gmail.com">
              mastronicolamichele@gmail.com
            </a>
            <a
              href="https://github.com/michelemastronicola"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/michelemastronicola
            </a>
            <a
              href="https://linkedin.com/in/michele-mastronicola-85883324b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/michele-mastronicola-85883324b
            </a>
          </div>
        </div>
      </LazySection>
    </div>
  );
};

export default Contacts;
