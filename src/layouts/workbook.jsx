import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../css/lecture.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Quick from "../components/Quick/Quick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const Workbook = () => {
  const [workbooks, setWorkbooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태 추가
  const [visibleCount, setVisibleCount] = useState(20); // 현재 표시된 데이터의 개수 상태 추가

  useEffect(() => {
    fetch("/workbook")
      .then((response) => response.json())
      .then((data) => {
        setWorkbooks(data);
        setSearchResults(data); // 페이지가 로드될 때 전체 데이터를 검색 결과로 설정
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // 검색 기능을 위한 함수
  const handleSearch = () => {
    if (searchTerm === "") {
      // 검색어가 없는 경우 전체 데이터 표시
      setSearchResults(workbooks);
    } else {
      const results = workbooks.filter((workbook) =>
        workbook.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  // 엑스 아이콘 클릭 시 검색어를 지우고 전체 데이터 표시
  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults(workbooks);
  };

  // 더보기 버튼 클릭 시 추가 데이터 표시
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  return (
    <>
      <Header />
      <div className="wb_container">
        <div className="contents">
          <div className="title">
            <h2>기출 문제 모음집</h2>
          </div>
        </div>
        <div className="search">
          <div className="searchbox">
            <input
              type="search"
              placeholder="자격증명을 입력해주세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={handleClearSearch}
            />
            <button type="button" onClick={handleSearch} className="search_btn">
              <FontAwesomeIcon id="icon" icon={faMagnifyingGlass} />
            </button>
          </div>
          <div className="result">
            <div className="re_title">
              <h3>검색결과</h3>
              <hr />
            </div>
            <div className="re_contents">
              <ul className="wb_list">
                {/* 검색 결과를 보여줍니다. */}
                {searchResults.slice(0, visibleCount).map((workbook) => (
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
              {visibleCount < searchResults.length && (
                <button onClick={handleShowMore} className="plus">
                  더보기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Quick />
      <Footer />
    </>
  );
};

export default Workbook;
