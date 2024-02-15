import React from "react";
import axios from "axios";

// 서버로부터 데이터를 가져오는 함수
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:8080/", {
      withCredentials: true,
    });
    alert(JSON.stringify(response.data));
  } catch (error) {
    alert(error.message);
  }
}

// 네이버 로그인 버튼 클릭 시 호출되는 함수
const onNaverLogin = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/naver";
};

// 로그인 컴포넌트
function Login() {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={onNaverLogin}>Naver Login</button>
    </div>
  );
}

export default Login;
