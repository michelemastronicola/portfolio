import React, { useEffect, useState } from "react";
import "../../styles/RetroTrivia.css";
import { useNavigate } from "react-router-dom";
import { Button, Row } from "reactstrap";
import AnimatedButton from "../common/AnimatedButton";
import { useSelector } from "react-redux";

const TRIVIA_API =
    "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=boolean&encode=url3986";

const decode = (str: string) => decodeURIComponent(str.replace(/\+/g, " "));

const RetroTrivia = () => {
    const isMobile = useSelector((state: any) => state.device.isMobile);

    interface TriviaQuestion {
        question: string;
        correct_answer: string;
    }
    const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [finished, setFinished] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(TRIVIA_API)
            .then((res) => res.json())
            .then((data) => {
                setQuestions(data.results);
                setLoading(false);
            });
    }, []);

    const handleAnswer = (answer: string) => {
        const correct = questions[currentIndex].correct_answer;
        if (answer === correct) setScore((s) => s + 1);

        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentIndex(nextIndex);
        } else {
            setFinished(true);
        }
    };

    const restart = () => {
        setQuestions([]);
        setCurrentIndex(0);
        setScore(0);
        setFinished(false);
        setLoading(true);

        fetch(TRIVIA_API)
            .then((res) => res.json())
            .then((data) => {
                setQuestions(data.results);
                setLoading(false);
            });
    };

    if (loading) return <div className="trivia-container">Loading trivia...</div>;

    if (finished) {
        return (
            <div className="trivia-container">
                <h1 className="retro-trivia-title">Game Over</h1>
                <p className="score-text">Your score: {score} / {questions.length}</p>
                <div className="trivia-buttons">
                    <Button onClick={restart}>Play Again</Button>
                    <Button onClick={() => navigate("/home")}>Go Home</Button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    return (
        <div className="trivia-container">
            <h1 className="retro-trivia-title">Retro Trivia</h1>
            <p className="question-text">
                Q{currentIndex + 1}: {decode(currentQuestion.question)}
            </p>
            <div className="trivia-buttons" key={currentIndex}>
                <Button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        const btn = e.currentTarget;
                        btn.blur();
                        btn.classList.add("clicked");
                        setTimeout(() => btn.classList.remove("clicked"), 150);
                        handleAnswer("True");
                    }}
                >
                    TRUE
                </Button>

                <Button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        const btn = e.currentTarget;
                        btn.blur();
                        btn.classList.add("clicked");
                        setTimeout(() => btn.classList.remove("clicked"), 150);
                        handleAnswer("False");
                    }}
                >
                    FALSE
                </Button>
            </div>

            <Row className="text-center w-100 m-0 justify-content-center">
              <AnimatedButton
                key={"back"}
                index={0}
                label={"go back"}
                size={isMobile ? 80 : 120}
                gifSrc={`/images/leftarrow.gif`}
                onClick={() => {
                  const audio = new Audio("/sounds/forward.wav");
                  audio.volume = 0.3;
                  /*if (!muted)*/ audio.play().catch(() => { });
                  setTimeout(() => navigate("/home"), 600);

                }}
              />
            </Row>
        </div>
    );
};

export default RetroTrivia;
