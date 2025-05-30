import React, { useEffect, useState } from "react";
import "../../styles/RetroTrivia.css";
import { useNavigate } from "react-router-dom";
import { Button, Row } from "reactstrap";
import AnimatedButton from "../common/AnimatedButton";
import { useSelector } from "react-redux";
import { trivia } from "../common/constants";

const decode = (str: string) => decodeURIComponent(str.replace(/\+/g, " "));

const RetroTrivia = () => {
    const isMobile = useSelector((state: any) => state.device.isMobile);
    const muted = useSelector((state: any) => state.audio.muted);
    const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
    const [currentFact, setCurrentFact] = useState("");

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
        fetch(trivia.TRIVIA_API)
            .then((res) => res.json())
            .then((data) => {
                setQuestions(data.results);
                setLoading(false);
                setCurrentFact(getRandomFact());
            });
    }, []);

    const getRandomFact = () => {
        const randomIndex = Math.floor(Math.random() * trivia.FUN_FACTS.length);
        return trivia.FUN_FACTS[randomIndex];
    };

    const getFinalMessage = () => {
        if (score <= 3) return "🤕 Better luck next time, newbie!";
        if (score <= 6) return "🕹️ Not bad, but you can do better!";
        if (score <= 9) return "🎮 Great job! You're a true gamer!";
        return "👑 LEGENDARY! 10 out of 10!";
    };


    const handleAnswer = (answer: string) => {
        const correct = questions[currentIndex].correct_answer;
        const isCorrect = answer === correct;
        setLastAnswerCorrect(isCorrect);
        if (isCorrect) setScore((s) => s + 1);

        setTimeout(() => {
            setLastAnswerCorrect(null);
            const nextIndex = currentIndex + 1;
            if (nextIndex < questions.length) {
                setCurrentIndex(nextIndex);
                setCurrentFact(getRandomFact());
            } else {
                setFinished(true);
            }
        }, 1500);
    };

    const restart = () => {
        setQuestions([]);
        setCurrentIndex(0);
        setScore(0);
        setFinished(false);
        setLoading(true);

        fetch(trivia.TRIVIA_API)
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
                 <p className="final-message">{getFinalMessage()}</p>
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
            <h1 className="retro-trivia-title">Quizcade</h1>
            <p className="question-text">
                Q{currentIndex + 1}: {decode(currentQuestion.question)}
            </p>
            <div className="trivia-buttons" key={currentIndex}>
                <Button
                    disabled={lastAnswerCorrect !== null}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        const audio = new Audio("/sounds/triviaChoose.flac");
                        audio.volume = 0.6;
                        if (!muted) audio.play().catch(() => { });
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
                    disabled={lastAnswerCorrect !== null}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        const audio = new Audio("/sounds/triviaChoose.flac");
                        audio.volume = 0.6;
                        if (!muted) audio.play().catch(() => { });
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

            {lastAnswerCorrect !== null && (
                <div className={`result-text ${lastAnswerCorrect ? "correct" : "wrong"}`}>
                    {lastAnswerCorrect ? "Correct! :)" : "Wrong :("}{" "}The correct answer is:{" "}
                    {decode(questions[currentIndex].correct_answer)}
                </div>
            )}

            <div className="fun-facts">
                <p>💡 <i>{currentFact}</i></p>
            </div>


            <Row className="text-center w-100 m-0 justify-content-center">
                <AnimatedButton
                    key={"back"}
                    index={0}
                    atTheBottom={true}
                    label={"go back"}
                    size={isMobile ? 80 : 120}
                    gifSrc={`/images/leftarrow.gif`}
                    onClick={() => {
                        const audio = new Audio("/sounds/forward.wav");
                        audio.volume = 0.3;
                  if (!muted) audio.play().catch(() => { });
                        setTimeout(() => navigate("/home"), 600);

                    }}
                />
            </Row>
        </div>
    );
};

export default RetroTrivia;
