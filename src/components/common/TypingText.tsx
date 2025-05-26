import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  const [completed, setCompleted] = useState(false);
  

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

  const isMobile = useSelector((state: any) => state.device.isMobile);

  useEffect(() => {
    console.log("isMobile:", isMobile);
  }, [isMobile]);

  const fullText = getCurrentLines()?.join("\n") || "";
  const firstText = firstlines?.join("\n") || "";
  const secondText = secondLines?.join("\n") || "";
  const thirdtext = thirdLines?.join("\n") || "";

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        advancePhase();
      }
    };

    const handleClick = () => {
      advancePhase();
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("click", handleClick);
    };
  }, [charIndex, fullText, phase]);

  const advancePhase = () => {
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
        setCompleted(true);
      }
    }
  };

  // useEffect(() => {
  //   const handleKey = (e: KeyboardEvent) => {
  //     if (e.key === "Enter") {
  //       if (charIndex < fullText.length) {
  //         setCharIndex(fullText.length);
  //         console.log("fullText", fullText);
  //         setText(fullText);
  //         console.log("Skipping to end of text");
  //       } else {
  //         if (!lines && phase === "first") {
  //           console.log("Moving to second phase");
  //           setPhase("second");
  //           setCharIndex(0);
  //           setText("");
  //         } else if (!lines && phase === "second") {
  //           console.log("Moving to third phase");
  //           setPhase("third");
  //           setCharIndex(0);
  //           setText("");
  //         } else if (!lines && phase === "third") {
  //           console.log("Moving to done phase");
  //           setPhase("done");
  //           setCompleted(true);
  //         }
  //       }
  //     }
  //   };

  //   window.addEventListener("keydown", handleKey);
  //   return () => window.removeEventListener("keydown", handleKey);
  // }, [charIndex, fullText, phase]);


  useEffect(() => {
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        const char = fullText[charIndex];
        if (lines && delay > 0 && char !== " " && char !== "\n" && charIndex % 2 === 0) {
          const audio = new Audio("/sounds/type.mp3");
          audio.volume = 0.15;
          audio.playbackRate = 0.8 + Math.random() * 0.3;
          audio.play().catch(() => { });
        } else if (!lines && delay > 0 && char !== " " && char !== "\n" && charIndex % 5 === 0) {
          const audio = new Audio("/sounds/type.mp3");
          audio.volume = 0.15;
          audio.playbackRate = 0.8 + Math.random() * 0.3;
          audio.play().catch(() => { });
        }
        setText(prev => prev + char);
        setCharIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      if (lines || phase === "done") {

        onComplete();
      }
    }
  }, [charIndex, fullText, delay, onComplete]);

  const getAlignmentClass = () => {
    if (!lines) {
      switch (phase) {
        case "first":
          return "align-left";
        case "second":
          return "align-center";
        case "third":
          return "align-right";
        default:
          return "align-left";
      }
    }
    return "align-left";
  };

  return (
    !completed && (
      <pre className={`animated-text ${getAlignmentClass()}`}>{text}</pre>
    )
    || (<>
      <div className="final-line-wrapper">
        <pre className="animated-text align-left">{firstText}</pre>
        <pre className={!isMobile ? "animated-text align-center" : "animated-text align-left"}>{secondText}</pre>
        <pre className={!isMobile ? "animated-text align-rigth" : "animated-text align-left"}>{thirdtext}</pre>
      </div>
    </>

    )
  )

};

export default TypingText;
