import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "../../styles/modern/ClassicNavbar.css";

const ClassicNavbar = () => {
  const isMobile = useSelector((state: RootState) => state.device.isMobile);
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => setOpen(false);

  return (
    <nav className="classic-navbar" key={isMobile ? "mobile" : "desktop"}>
      {isMobile ? (
        <>
          <div
            className={`hamburger${open ? " open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            tabIndex={0}
            role="button"
          >
            <span />
            <span />
            <span />
          </div>
          <div className={`navbar-links${open ? " show" : ""}`}>
            <a href="#hero" onClick={handleLinkClick}>Home</a>
            <a href="#about" onClick={handleLinkClick}>About</a>
            <a href="#projects" onClick={handleLinkClick}>Projects</a>
            <a href="#contacts" onClick={handleLinkClick}>Contacts</a>
          </div>
        </>
      ) : (
        <>
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contacts">Contacts</a>
        </>
      )}
    </nav>
  );
};


export default ClassicNavbar;