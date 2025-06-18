import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "../../styles/modern/ClassicNavbar.css";

const ClassicNavbar = () => {
  const isMobile = useSelector((state: RootState) => state.device.isMobile);
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.pageYOffset === 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.body.classList.toggle("no-scroll", open);
    }
  }, [open, isMobile]);

  const handleLinkClick = () => setOpen(false);

  return (
    <>
      <nav
        className={`classic-navbar${atTop ? "" : " scrolled"}`}
        key={isMobile ? "mobile" : "desktop"}
      >
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
      {isMobile && open && <div className="navbar-overlay" onClick={() => setOpen(false)} />}
    </>
  );
};


export default ClassicNavbar;