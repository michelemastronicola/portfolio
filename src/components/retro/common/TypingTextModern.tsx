import React, { useState, useEffect } from "react";
import "../../../styles/modern/TypingTextModern.css";

interface TypingModernProps {
  staticText: string;
  dynamicPhrases: string[];
}

const TypingTextModern = ({ staticText, dynamicPhrases }: TypingModernProps) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const currentPhrase = dynamicPhrases[phraseIndex];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && index <= currentPhrase.length) {
      timeout = setTimeout(() => {
        setText(currentPhrase.substring(0, index));
        setIndex(index + 1);
      }, 100);
    } else if (deleting && index >= 0) {
      timeout = setTimeout(() => {
        setText(currentPhrase.substring(0, index));
        setIndex(index - 1);
      }, 60);
    } else {
      timeout = setTimeout(() => {
        setDeleting(!deleting);
        if (!deleting) {
          setIndex(currentPhrase.length);
        } else {
          setPhraseIndex((prev) => (prev + 1) % dynamicPhrases.length);
          setIndex(0);
        }
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [index, deleting, currentPhrase]);

  return (
    <p className="typing-effect">
      {staticText}
      <span className="dynamic">{text}</span>
    </p>
  );
};

export default TypingTextModern;
