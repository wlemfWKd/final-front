import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div id="container">
        <div className="f-menu">
          <div className="tail_con">
            <ul>
              <li>
                <a href="#">회사소개</a>
              </li>
              <li>
                <a href="#">이용약관</a>
              </li>
              <li>
                <a href="#">개인정보처리방침</a>
              </li>
              <li>
                <a href="#">고객센터</a>
              </li>
            </ul>

            <div className="sns">
              <div className="bsns_wrap">
                <a href="#">
                  <img
                    src="https://themedicube.co.kr/web/upload/images/bsns_11.png"
                    alt=""
                  />
                </a>
                <a href="#">
                  <img
                    src="https://themedicube.co.kr/web/upload/images/bsns_12.png"
                    alt=""
                  />
                </a>
                <a href="#">
                  <img
                    src="https://themedicube.co.kr/web/upload/images/bsns_13.png"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id="ft_info">
          <p>
            <span>Email : </span>
            geumjjog@test.com
          </p>
          <p>
            <span>주소 : </span>
            서울특별시 강남구 현익빌딩 3층, 4층
          </p>
          <p>
            <span>대표 : </span>
            금쪽이들
          </p>
          <p>
            <span>번호 : </span>
            1599-5890
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
