import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import imageData from "./data";
import "./Main.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClipboard,
  faBookOpen,
  faBriefcase,
  faComments,
  faChevronRight,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import Quick from "../Quick/Quick";

const renderSlides = imageData.map((image, index) => (
  <div
    key={index}
    onClick={() => {
      window.location.href = image.href;
    }}
    style={{ cursor: "pointer" }}
  >
    <img src={image.src} alt={image.alt} />
  </div>
));

const Main = () => {
  const [currentIndex, setCurrentIndex] = useState();
  function handleChange(index) {
    setCurrentIndex(index);
  }

  return (
    <>
      <div id="main1">
        <div id="container">
          <div className="flex justify-center items-center carousel">
            <Carousel
              showStatus={false}
              showIndicators={false}
              showArrows={true}
              autoPlay={true}
              infiniteLoop={true}
              showThumbs={false}
              selectedItem={imageData[currentIndex]}
              onChange={handleChange}
            >
              {renderSlides}
            </Carousel>
          </div>

          <div id="serve_menu">
            <ul>
              <li>
                <Link to="/calendar">
                  <FontAwesomeIcon id="icon" icon={faCalendarDays} />
                  자격증일정
                </Link>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon id="icon" icon={faClipboard} />
                  적성검사
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon id="icon" icon={faBriefcase} />
                  자격정보
                </a>
              </li>
              <li>
                <Link to="/support">
                  <FontAwesomeIcon id="icon" icon={faBookOpen} />
                  지원제도
                </Link>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon id="icon" icon={faComments} />
                  자유게시판
                </a>
              </li>
            </ul>
            <div id="notice">
              <div>
                <h3>공지사항</h3>
                <a href="#">
                  더보기
                  <FontAwesomeIcon icon={faChevronRight} />
                </a>
              </div>
              <a href="#">공지사항에서 가져오는 데이터</a>
            </div>
          </div>
        </div>
      </div>
      <div id="banner1">
        <div id="container">
          <Link to="/test">
            <p>
              나에게 맞는 자격증은 뭐가 있을까? <span>CLICK</span>
            </p>
          </Link>
        </div>
      </div>
      <div id="main2">
        <div id="container">
          <div id="section1">
            <h1>자격증 맛보기</h1>
            <div id="morelicen">
              <Link to="/license">
                자격증 더보기
                <FontAwesomeIcon id="icon" icon={faAngleRight} />
              </Link>
            </div>
          </div>
          <div id="section2">
            <Card>
              <Card.Body>
                <Card.Title>자격증명</Card.Title>
                <Card.Text>시험명 | 시험이름</Card.Text>
                <Card.Text>접수일 | 00.00.00</Card.Text>
                <Card.Text>시험일 | 00.00.00</Card.Text>
                <Card.Link href="#" id="border">
                  <span>상세보기</span>
                </Card.Link>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>자격증명</Card.Title>
                <Card.Text>시험명 | 시험이름</Card.Text>
                <Card.Text>접수일 | 00.00.00</Card.Text>
                <Card.Text>시험일 | 00.00.00</Card.Text>
                <Card.Link href="#" id="border">
                  <span>상세보기</span>
                </Card.Link>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>자격증명</Card.Title>
                <Card.Text>시험명 | 시험이름</Card.Text>
                <Card.Text>접수일 | 00.00.00</Card.Text>
                <Card.Text>시험일 | 00.00.00</Card.Text>
                <Card.Link href="#" id="border">
                  <span>상세보기</span>
                </Card.Link>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>자격증명</Card.Title>
                <Card.Text>시험명 | 시험이름</Card.Text>
                <Card.Text>접수일 | 00.00.00</Card.Text>
                <Card.Text>시험일 | 00.00.00</Card.Text>
                <Card.Link href="#" id="border">
                  <span>상세보기</span>
                </Card.Link>
              </Card.Body>
            </Card>
          </div>
          <div id="section3">
            <Card>
              <Card.Body>
                <Card.Title>자격증명</Card.Title>
                <Card.Text>시험명 | 시험이름</Card.Text>
                <Card.Text>접수일 | 00.00.00</Card.Text>
                <Card.Text>시험일 | 00.00.00</Card.Text>
                <Card.Link href="#" id="border">
                  <span>상세보기</span>
                </Card.Link>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>자격증명</Card.Title>
                <Card.Text>시험명 | 시험이름</Card.Text>
                <Card.Text>접수일 | 00.00.00</Card.Text>
                <Card.Text>시험일 | 00.00.00</Card.Text>
                <Card.Link href="#" id="border">
                  <span>상세보기</span>
                </Card.Link>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>자격증명</Card.Title>
                <Card.Text>시험명 | 시험이름</Card.Text>
                <Card.Text>접수일 | 00.00.00</Card.Text>
                <Card.Text>시험일 | 00.00.00</Card.Text>
                <Card.Link href="#" id="border">
                  <span>상세보기</span>
                </Card.Link>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>자격증명</Card.Title>
                <Card.Text>시험명 | 시험이름</Card.Text>
                <Card.Text>접수일 | 00.00.00</Card.Text>
                <Card.Text>시험일 | 00.00.00</Card.Text>
                <Card.Link href="#" id="border">
                  <span>상세보기</span>
                </Card.Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <div id="banner1">
        <div id="container">
          <Link to="/book">
            <p>
              문제집 찾기 <span>CLICK</span>
            </p>
          </Link>
        </div>
      </div>
      <Quick />
    </>
  );
};

export default Main;
