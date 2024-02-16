import React, { useState, useEffect } from "react";
import "../css/test.css"; // 스타일 파일 import
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";

function Test() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(-1)
  ); // 선택된 답변을 저장하는 배열, 초기값은 -1
  const [selectedScores, setSelectedScores] = useState(
    Array(questions.length).fill(null)
  ); // 선택된 답변의 점수를 저장하는 배열, 초기값은 null

  useEffect(() => {
    fetchTestQuestions();
  }, []);

  const fetchTestQuestions = async () => {
    try {
      const response = await fetch("/career-test");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching career test questions:", error);
    }
  };

  const handleAnswerSelection = (questionIndex, answerIndex, answerScore) => {
    console.log(
      "Selected answer:",
      questions[questionIndex].answers[answerIndex]
    );
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);

    const newSelectedScores = [...selectedScores];
    newSelectedScores[questionIndex] = answerScore;
    setSelectedScores(newSelectedScores);
  };

  const submitTest = async () => {
    try {
      const response = await fetch("/submit-career-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedAnswers), // 선택된 답변을 서버로 전송
      });
      const data = await response.json();
      console.log("Test result:", data);
      // 여기서 결과를 처리하거나, 결과 페이지로 이동하는 등의 작업을 수행할 수 있습니다.
    } catch (error) {
      console.error("Error submitting career test:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="test-container">
        <h1>직업 적성검사</h1>
        <div className="test_title">
          <p>
            직업에 관련한 다양한 가치 중에서 어떤 가치를 주요하게 만족시키고
            싶은지 알아볼 수 있습니다.
            <br /> 각 번호에 있는 두 가지 가치 중에 자신에게 더 중요한 가치에
            표시하세요.
          </p>
        </div>
        {questions.map((question, index) => (
          <div key={index} className="question-container">
            <h6>
              <span>{index + 1}</span> {question.question}
            </h6>{" "}
            {/* 질문 앞에 질문 순서 번호 추가 */}
            <ul>
              {question.answers.slice(0, 2).map((answer, answerIndex) => (
                <li key={answerIndex}>
                  <button
                    className={
                      selectedAnswers[index] === answerIndex ? "selected" : ""
                    }
                    onClick={() =>
                      handleAnswerSelection(
                        index,
                        answerIndex,
                        answer.answerScore
                      )
                    } // 버튼 클릭 시 해당 답변의 점수 전달
                  >
                    {answer.answerText} {answer.answerScore}
                  </button>
                </li>
              ))}
            </ul>
            <div className="ps">
              <p>
                {question.answers[0].answerText} :{" "}
                {question.answers[2].answerText}
                <br />
                {question.answers[1].answerText} :{" "}
                {question.answers[3].answerText}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/test-result">우아아ㅣ러ㅏ이ㅓ린아ㅓ린아ㅓ리</Link>
      <button onClick={submitTest}>결과보기</button> {/* 결과 요청 버튼 추가 */}
      <Footer />
    </>
  );
}

export default Test;
