import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faComments,
  faPersonMilitaryPointing,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Board.css";
import { Link } from "react-router-dom";
import Quick from "../components/Quick/Quick";

const Board = () => {
  const [selectedButton, setSelectedButton] = useState("notice"); // 기본 선택은 공지사항
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 3; // 페이지당 보여줄 아이템 수

  const initialData = [
    {
      id: 1,
      name: "게시글제목",
      instructor: "가격",
      totalLessons: "3000",
      category: "notice",
    },
    {
      id: 2,
      name: "freeboard",
      instructor: "가격",
      totalLessons: "5000",
      category: "freeboard",
    },
    {
      id: 3,
      name: "community-report",
      instructor: "가격",
      totalLessons: "15000",
      category: "community-report",
    },
    {
      id: 4,
      name: "copyright-report",
      instructor: "가격",
      totalLessons: "20000",
      category: "copyright-report",
    },
    {
      id: 5,
      name: "게시글제목3",
      instructor: "가격",
      totalLessons: "20000",
      category: "notice",
    },
    {
      id: 6,
      name: "게시글제목4",
      instructor: "가격",
      totalLessons: "20000",
      category: "notice",
    },
  ];

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    setCurrentPage(1); // 버튼이 변경되면 페이지를 1로 초기화
  };

  const filteredData = initialData.filter((item) => {
    switch (selectedButton) {
      case "notice":
        return item.category === "notice";
      case "freeboard":
        return item.category === "freeboard";
      case "community-report":
        return item.category === "community-report";
      case "copyright-report":
        return item.category === "copyright-report";
      default:
        return true;
    }
  });

  // 현재 페이지에 해당하는 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <Header />
    <hr />
    <div id="community-header">
          <h2>커뮤니티</h2>
    </div>
    <div id="Board">
      <div className="container"> 
        <div id="community-buttons" className="mb-2">
          <Button
            variant="secondary"
            className={`custom-lg-button ${selectedButton === "notice" ? "active" : ""
              }`}
            onClick={() => handleButtonClick("notice")}
          >
            <FontAwesomeIcon icon={faBullhorn} className="icon_btn" />
            공지사항
          </Button>{" "}
          <Button
            variant="secondary"
            className={`custom-lg-button ${selectedButton === "freeboard" ? "active" : ""
              }`}
            onClick={() => handleButtonClick("freeboard")}
          >
            <FontAwesomeIcon icon={faComments} className="icon_btn" />
            자유게시판
          </Button>{" "}
          <Button
            variant="secondary"
            className={`custom-lg-button ${selectedButton === "community-report" ? "active" : ""
              }`}
            onClick={() => handleButtonClick("community-report")}
          >
            <FontAwesomeIcon
              icon={faPersonMilitaryPointing}
              className="icon_btn"
            />
            커뮤니티 신고
          </Button>{" "}
          <Button
            variant="secondary"
            className={`custom-lg-button ${selectedButton === "copyright-report" ? "active" : ""
              }`}
            onClick={() => handleButtonClick("copyright-report")}
          >
            <FontAwesomeIcon
              icon={faPersonMilitaryPointing}
              className="icon_btn"
            />
            권리침해 신고
          </Button>
        </div>
        <hr className="custom-line" />
      </div>
    </div>
    <div className="container">
      <div id="re_contents">
        <input type="hidden" value={0} />
        <Link to="BoardWrite"> {/* Link 컴포넌트를 사용하여 페이지 전환 */}
          <button>글쓰기</button>
        </Link>
        <ul className="your-component">
          {filteredData.map((item) => (
            <React.Fragment key={item.id}>
              <li className="list_container">
                <div className="text-container">
                  <a href={`/detail/${item.id}`}>
                  <h3>{item.name}</h3>
                  </a>
                </div>
                <Link to={`/detail/${item.id}`} className="custom-detail-link">
                  자세히 보기
                </Link>
              </li>
              <hr />
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div id="pagination">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={number === currentPage ? "active" : ""}
            >
              <a href="#" onClick={() => handlePageChange(number)}>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Quick />
    <Footer />
  </>
  
  );
};

export default Board;
