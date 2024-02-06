import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../css/lecture.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Lecture = () => {
  return (
    <>
      <Header />
      <div id="container">
        <div id="contents">
          <div id="title">
            <h2>인터넷 강의 추천</h2>
          </div>
          <div id="rank">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/266x180"
              />
              <Card.Body>
                <Card.Title>
                  강의명 : <span>강사명 : </span>
                </Card.Title>
                <Card.Text>자격증명</Card.Text>
                <Button id="btn">자세히보기</Button>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/266x180"
              />
              <Card.Body>
                <Card.Title>
                  강의명 : <span>강사명 : </span>
                </Card.Title>
                <Card.Text>자격증명</Card.Text>
                <Button id="btn">자세히보기</Button>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/266x180"
              />
              <Card.Body>
                <Card.Title>
                  강의명 : <span>강사명 : </span>
                </Card.Title>
                <Card.Text>자격증명</Card.Text>
                <Button id="btn">자세히보기</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div id="search">
          <div id="searchbox">
            <input type="search" placeholder="자격증명을 입력해주세요" />
            <button type="submit">
              <FontAwesomeIcon id="icon" icon={faMagnifyingGlass} />
            </button>
          </div>
          <div id="result">
            <div id="re_title">
              <h3>검색결과</h3>
              <hr />
            </div>
            <div id="re_contents">
              <input type="hidden" value={0} />
              <ul className="your-component">
                <li>
                  <img
                    src="경로/이미지.jpg"
                    alt="이미지 설명"
                    className="left-image"
                  />
                  <div className="text-container">
                    <h3>강의명</h3>
                    <p>
                      ㅇㅇㅇ선생님 <span>총 00강</span>
                    </p>
                  </div>
                  <a href="자세한 링크" className="detail-link">
                    자세히 보기
                  </a>
                </li>
                <hr />
                <li>
                  <img
                    src="경로/이미지.jpg"
                    alt="이미지 설명"
                    className="left-image"
                  />
                  <div className="text-container">
                    <h3>강의명</h3>
                    <p>
                      ㅇㅇㅇ선생님 <span>총 00강</span>
                    </p>
                  </div>
                  <a href="자세한 링크" className="detail-link">
                    자세히 보기
                  </a>
                </li>
                <hr />
                <li>
                  <img
                    src="경로/이미지.jpg"
                    alt="이미지 설명"
                    className="left-image"
                  />
                  <div className="text-container">
                    <h3>강의명</h3>
                    <p>
                      ㅇㅇㅇ선생님 <span>총 00강</span>
                    </p>
                  </div>
                  <a href="자세한 링크" className="detail-link">
                    자세히 보기
                  </a>
                </li>
                <hr />
                <li>
                  <img
                    src="경로/이미지.jpg"
                    alt="이미지 설명"
                    className="left-image"
                  />
                  <div className="text-container">
                    <h3>강의명</h3>
                    <p>
                      ㅇㅇㅇ선생님 <span>총 00강</span>
                    </p>
                  </div>
                  <a href="자세한 링크" className="detail-link">
                    자세히 보기
                  </a>
                </li>
                <hr />
                <li>
                  <img
                    src="경로/이미지.jpg"
                    alt="이미지 설명"
                    className="left-image"
                  />
                  <div className="text-container">
                    <h3>강의명</h3>
                    <p>
                      ㅇㅇㅇ선생님 <span>총 00강</span>
                    </p>
                  </div>
                  <a href="자세한 링크" className="detail-link">
                    자세히 보기
                  </a>
                </li>
              </ul>
              <a href="#" id="plus">
                더보기
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Lecture;
