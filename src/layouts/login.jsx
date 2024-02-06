import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // 간단한 로그인 처리를 가정합니다.
    if (username === "user" && password === "password") {
      console.log("로그인 성공!");
      // 로그인이 성공하면 홈 페이지로 이동합니다.
      navigate("/");
    } else {
      console.log("로그인 실패. 자격 증명을 확인하세요.");
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <h2 className="login-header">로그인</h2>
        <form>
          <label>
            사용자명:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              placeholder="사용자명을 입력하세요"
            />
          </label>
          <label>
            비밀번호:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="비밀번호를 입력하세요"
            />
          </label>
          <button type="button" onClick={handleLogin} className="login-button">
            로그인
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
