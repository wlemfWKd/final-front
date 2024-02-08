import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../css/lecture.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Lecture = () => {
  const [workbooks, setWorkbooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("/lecture")
      .then((response) => response.json())
      .then((data) => {
        setWorkbooks(data);
        setSearchResults(data); // 페이지가 로드될 때 searchResults를 전체 데이터로 초기화
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // 검색 기능을 위한 함수
  const handleSearch = () => {
    const results = workbooks.filter((workbook) =>
      workbook.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  // 검색어가 비어있을 때 전체 데이터로 설정하는 함수
  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults(workbooks);
  };

  return (
    <>
      <Header />
      <div className="wb_container">
        <div className="contents">
          <div className="title">
            <h2>인터넷 강의 추천</h2>
          </div>
          <div className="rank">
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
        <div className="search">
          <div className="searchbox">
            {/* 검색어 입력란 및 아이콘 */}
            <input
              type="search"
              placeholder="자격증명을 입력해주세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="button" onClick={handleSearch}>
              <FontAwesomeIcon id="icon" icon={faMagnifyingGlass} />
            </button>
            {/* 검색어를 지우고 전체 데이터를 다시 보여주는 버튼 */}
            <button type="button" onClick={handleClearSearch}>
              전체 보기
            </button>
          </div>
          <div className="result">
            <div className="re_title">
              <h3>검색결과</h3>
              <hr />
            </div>
            <div className="re_contents">
              <input type="hidden" value={0} />
              <ul className="wb_list">
                {/* 검색 결과를 보여줍니다. */}
                {searchResults.map((workbook) => (
                  <React.Fragment key={workbook.id}>
                    <li>
                      <div className="text-container">
                        <h3>{workbook.text}</h3>
                      </div>
                      <a
                        href={workbook.href}
                        className="detail-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        자세히 보기
                      </a>
                    </li>
                    <hr />
                  </React.Fragment>
                ))}
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
