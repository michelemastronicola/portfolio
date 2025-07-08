import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Alert,
} from "reactstrap";
import "../../../styles/modern/CaptchaModal.css";

interface CaptchaModalProps {
  isOpen: boolean;
  toggle: () => void;
  onSuccess: () => void;
}

const CaptchaModal = ({ isOpen, toggle, onSuccess }: CaptchaModalProps) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("+");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-", "*"];
    const op = operators[Math.floor(Math.random() * operators.length)];

    setNum1(n1);
    setNum2(n2);
    setOperator(op);
    setAnswer("");
    setError("");
  };

  const getCorrectAnswer = () => {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      default:
        return 0;
    }
  };

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
      setAttempts(0);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    const userAnswer = parseInt(answer);
    const correctAnswer = getCorrectAnswer();

    if (userAnswer === correctAnswer) {
      onSuccess();
      toggle();
      setAnswer("");
      setError("");
    } else {
      setAttempts(attempts + 1);

      if (attempts >= 2) {
        setError("Too many failed attempts. Generating new captcha...");
        setTimeout(() => {
          generateCaptcha();
          setAttempts(0);
        }, 1500);
      } else {
        setError(`Incorrect answer. ${2 - attempts} attempts remaining.`);
        setAnswer("");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && answer) {
      handleSubmit();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Verify You're Human</ModalHeader>
      <ModalBody>
        <div className="text-center mb-4">
          <p className="mb-3">
            Please solve this simple math problem to download the CV:
          </p>
          <div
            className="captcha-question"
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              padding: "1rem",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              marginBottom: "1rem",
              position: "relative",
            }}
          >
            {num1} {operator} {num2} = ?
            <Button
              size="sm"
              color="link"
              onClick={generateCaptcha}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "0.9rem",
                textDecoration: "none",
                opacity: 0.7,
              }}
              title="Generate new captcha"
              aria-label="Generate new captcha"
            >
              🔄
            </Button>
          </div>
          <div>
            <Input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your answer"
              className="text-center mb-3"
              style={{ fontSize: "1.2rem" }}
              autoFocus
            />
            {error && (
              <Alert color="danger" className="mb-3">
                {error}
              </Alert>
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit} disabled={!answer}>
          Verify & Download
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CaptchaModal;
