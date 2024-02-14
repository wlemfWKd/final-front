import React, { useState, useEffect } from "react";
import CareerTestResult from "./CareerTestResult";
import { Link } from "react-router-dom";

function CareerTest() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    fetchCareerTestQuestions();
  }, []);

  const fetchCareerTestQuestions = async () => {
    try {
      const response = await fetch("/career-test");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching career test questions:", error);
    }
  };

  const handleAnswerSelection = (questionIndex, answerScore) => {
    // 선택한 답변의 스코어 값을 selectedAnswers에 저장
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[questionIndex] = answerScore;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  return (
    <div className="career-test-container">
      <h1>Career Test</h1>
      {questions.map((question, index) => (
        <div key={index} className="question-container">
          <h2>{question.question}</h2>
          <ul>
            {question.answers.map((answer, answerIndex) => (
              <li key={answerIndex}>
                <button
                  onClick={() =>
                    handleAnswerSelection(index, answer.answerScore)
                  }
                >
                  {answer.answerText}
                  {answer.answerScore}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button>
        <Link to="/test-result">결과확인</Link>
      </button>
    </div>
  );
}

export default CareerTest;
