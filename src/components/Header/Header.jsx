import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import

const Header = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkTokenExpiry = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // 토큰이 만료되었으므로 로그아웃 처리
        handleLogout();
      }
    }
  };

  useEffect(() => {
    // localStorage에서 토큰을 가져와 isLoggedIn 상태를 업데이트합니다.
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // 페이지 경로가 변경될 때마다 토큰 만료 여부 확인
    checkTokenExpiry();
  }, [location.pathname]); // 페이지 경로가 변경될 때마다 실행

  const handleLogout = () => {
    // 로그아웃 버튼을 클릭할 때 실행되는 함수
    // 로컬 스토리지에서 토큰을 삭제하고, isLoggedIn 상태를 업데이트합니다.
    localStorage.removeItem("token"); // 엑세스 토큰
    localStorage.removeItem("refreshToken"); // 리프레시 토큰
    setIsLoggedIn(false);
    navigate("/");
  };

  // 멤버 정보 불러오기
  const [member, setMember] = useState({
    memberNum: "",
    memberName: "",
    username: "",
    password: "",
    email: "",
    domain: "",
    phoneNum: "",
    socialNum1: "",
    socialNum2: "",
  });

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios.post("/getMemberInfo", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.result === "Success") {
          setMember({
            memberNum: response.data.currentMember.memberNum,
            memberName: response.data.currentMember.memberName,
            password: "",
            email: response.data.currentMember.email,
            domain: "",
            phoneNum: response.data.currentMember.phoneNum,
            username: response.data.currentMember.username,
          });
        }
      } catch (error) {
        console.error("Error fetching member info:", error);
      }
    };
    fetchMemberInfo();
  }, []);

  return (
    <header className="header">
      <div className="header_container">
        <nav className="header__nav" role="navigation" aria-label="메인 메뉴">
          <ul>
            <li>
              <Link to="/license">자격증정보</Link>
            </li>
            <li>
              <Link to="/support">지원제도</Link>
            </li>
            <li>
              <Link to="/data">RANKING</Link>
            </li>
            <li>
              <Link to="/test">TEST</Link>
            </li>
            <li>
              <Link to="/board">커뮤니티</Link>
            </li>
          </ul>
        </nav>
        <div className="header__logo">
          <Link to="/" className="logo">
            <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="로고" />
          </Link>
        </div>
        <div className="header_login">
          <ul>
            {isLoggedIn ? (
              <>
                {member.username === "admin123" ? (
                  <li>
                    <Link to="/admin">회원관리</Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/mypage">마이페이지</Link>
                  </li>
                )}
                <li>
                  <div className="logout" onClick={handleLogout}>
                    로그아웃
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/register">회원가입</Link>
                </li>
                <li>
                  <Link to="/login">로그인</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
