import React, { useEffect, useState } from "react";

interface TypingTextProps {
  lines?: string[];
  firstlines?: string[];
  secondLines?: string[];
  thirdLines?: string[];
  delay?: number;
  onComplete?: () => void;
}

const TypingText = ({ lines, firstlines, secondLines, thirdLines, delay = 50, onComplete }: TypingTextProps) => {
  const [phase, setPhase] = useState<"first" | "second" | "third" | "done">("first");
  const [text, setText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  const getCurrentLines = () => {
    if (lines) {
      return lines;
    }
    else {
      switch (phase) {
        case "first": return firstlines;
        case "second": return secondLines;
        case "third": return thirdLines;
        default: return [];
      }
    }
  };

  const fullText = getCurrentLines()?.join("\n") || "";

  useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (charIndex < fullText.length) {
        setCharIndex(fullText.length);
        setText(fullText);
      } else {
        if (!lines && phase === "first") {
          setPhase("second");
          setCharIndex(0);
          setText("");
        } else if (!lines && phase === "second") {
          setPhase("third");
          setCharIndex(0);
          setText("");
        } else if (!lines && phase === "third") {
          setPhase("done");
        }
      }
    }
  };

  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, [charIndex, fullText, phase]);

console.log("fullText", fullText);


useEffect(() => {
  if (charIndex < fullText.length) {
    const timeout = setTimeout(() => {
      const char = fullText[charIndex];
      if (delay > 0 && char !== " " && char !== "\n" && charIndex % 2 === 0) {
        const audio = new Audio("/sounds/type.mp3");
        audio.volume = 0.1;
        audio.playbackRate = 0.8 + Math.random() * 0.3;
        audio.play().catch(() => {});
      }
      setText(prev => prev + char);
      setCharIndex(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  } else if (onComplete) {
    onComplete();
  }
}, [charIndex, fullText, delay, onComplete]);

  return <pre className="animated-text">{text}</pre>;
};

export default TypingText;
