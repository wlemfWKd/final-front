import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    // 간단한 회원가입 처리를 가정합니다.
    if (password === confirmPassword) {
      console.log("회원가입 성공!");
      // 회원가입이 성공하면 홈 페이지로 이동합니다.
      navigate("/");
    } else {
      console.log("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <>
      <Header />
      <div className="signup-container">
        <h2>회원가입</h2>
        <form>
          <label>
            사용자명:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="사용자명을 입력하세요"
            />
          </label>
          <label>
            이메일:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </label>
          <label>
            비밀번호:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </label>
          <label>
            비밀번호 확인:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 확인하세요"
            />
          </label>
          <button type="button" onClick={handleSignup}>
            회원가입
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
