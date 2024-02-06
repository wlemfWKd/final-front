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
  faMagnifyingGlass,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Card } from "react-bootstrap";

const renderSlides = imageData.map((image) => (
  <div key={image.alt}>
    <img src={image.url} alt={image.alt} />
  </div>
));

const Main = () => {
  const [currentIndex, setCurrentIndex] = useState();
  function handleChange(index) {
    setCurrentIndex(index);
  }

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 1000);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          <a href="#">
            <p>
              나에게 맞는 자격증은 뭐가 있을까? <span>CLICK</span>
            </p>
          </a>
        </div>
      </div>
      <div id="main2">
        <div id="container">
          <div id="section1">
            <h1>자격증 검색</h1>
            <div id="listsearch">
              <div id="search">
                <div id="searchbox">
                  <input type="search" placeholder="자격증명을 입력해주세요" />
                  <button type="submit">
                    <FontAwesomeIcon id="icon" icon={faMagnifyingGlass} />
                  </button>
                </div>
              </div>
              <div id="downlist">
                <Dropdown id="down1">
                  <Dropdown.Toggle id="dropdown-basic">분야</Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">전체</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      국가기술자격
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      국가전문자격
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-4">능력검정</Dropdown.Item>
                    <Dropdown.Item href="#/action-5">
                      국가공인자격
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-6">
                      등록민간자격
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-7">국제자격</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown id="down2">
                  <Dropdown.Toggle id="dropdown-basic">
                    자격증 종류
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">전체</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      국가기술자격
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      국가전문자격
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-4">능력검정</Dropdown.Item>
                    <Dropdown.Item href="#/action-5">
                      국가공인자격
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-6">
                      등록민간자격
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-7">국제자격</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown id="down3">
                  <Dropdown.Toggle id="dropdown-basic">
                    일정 상태
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">전체</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">시험일</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">접수중</Dropdown.Item>
                    <Dropdown.Item href="#/action-4">접수예정</Dropdown.Item>
                    <Dropdown.Item href="#/action-5">
                      오늘접수마감
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <a href="#">
                자격증 더보기
                <FontAwesomeIcon id="icon" icon={faAngleRight} />
              </a>
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
        </div>
      </div>
      <div id="banner1">
        <div id="container">
          <a href="#">
            <p>
              문제집 찾기 <span>CLICK</span>
            </p>
          </a>
        </div>
      </div>
      <div className={`quick-menu ${isScrolled ? "scrolled" : ""}`}>
        <div className="quickmenu">
          <ul>
            <li>
              <a href="#">
                <FontAwesomeIcon id="icon" icon={faCalendarDays} />
                자격증정보
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon id="icon" icon={faClipboard} />
                적성검사
              </a>
            </li>
            <li>
              <Link to="/lecture">
                <FontAwesomeIcon id="icon" icon={faBriefcase} />
                강의추천
              </Link>
            </li>
            <li>
              <a href="#" id="bdn">
                <FontAwesomeIcon id="icon" icon={faBookOpen} />
                교재추천
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Main;
