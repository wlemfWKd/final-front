import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header_container">
        <nav className="header__nav" role="navigation" aria-label="메인 메뉴">
          <ul>
            <li>
              <Link to="/license">자격증정보</Link>
            </li>
            <li>
              <Link to="/data">DATA</Link>
            </li>
            <li>
              <Link to="/test">TEST</Link>
            </li>
            <li>
              <Link to="/community">커뮤니티</Link>
            </li>
            <li>
              <Link to="/support">지원제도</Link>
            </li>
          </ul>
        </nav>
        <div className="header__logo">
          <Link to="/" className="logo">
            <img src="images/logo.png" alt="로고" />
          </Link>
        </div>
        <div className="header_login">
          <ul>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/register">회원가입</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
