import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass,faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import "../css/BookCss.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from 'axios';

const Lecture = () => {

  const [bookData, setBookData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalData, setOriginalData] = useState([]);

  const bestData = [
    { id: 1, bookName: "책이름", bookPrice: "12900", imageName: "images/cat.jpeg" },
    { id: 2, bookName: "책이름", bookPrice: "13000", imageName: "images/cat.jpeg" },
    { id: 3, bookName: "책이름", bookPrice: "15000", imageName: "images/cat.jpeg" }
  ];

  // 검색어 초기화 및 페이지 리셋 함수
  const resetSearch = () => {
    setSearchTerm("");  // 검색어 초기화
    setBookData(originalData);  // 원래 데이터로 복원
    setCurrentPage(1);  // 페이지를 1로 리셋
  };

  // 현재 페이지 상태 및 업데이트 함수
  const [currentPage, setCurrentPage] = useState(1);
  // 페이지당 보여줄 아이템 수
  const itemsPerPage = 10;

  // 현재 페이지에 해당하는 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = bookData.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(bookData.length / itemsPerPage);

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }



  //검색 결과 필터링하는 함수
  const filterResults = (data, searchTerm) => {
    return data.filter((item) =>
      item.bookName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  //검색 버튼 클릭 시 결과 업데이트
  const handleSearch = (term) => {
    const filteredData = filterResults(bookData, term);
    setBookData(filteredData);
    setCurrentPage(1); // 검색 결과를 보여주기 위해 페이지를 1로 리셋
  };

  //페이지 변경 시 검색어 유지하기
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // 기존 검색어가 있다면 검색 결과를 필터링하여 업데이트
    if (searchTerm) {
      const filteredData = filterResults(bookData, searchTerm);
      setBookData(filteredData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/books');
        setBookData(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div id="container">
        <div id="contents">
          <div id="title">
            <h2>자격증 도서 추천</h2>
          </div>
          <div id="rank">
            {bestData.map((item) => (
              <Card key={item.id} style={{ width: "18rem" }}>
                <Card.Img variant="top" src={item.imageName} style={{ width: '180px', height: '200px' }} />
                <Card.Body>
                  <Card.Title>
                    <span>{item.bookName}</span>
                  </Card.Title>
                  <Card.Text className="card-text-custom">{item.bookPrice} <span className="small">원</span></Card.Text>
                  <Button variant="primary">자세히보기</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
        <div id="search">
          <div id="searchbox">
            <input
              type="search"
              placeholder="자격증명을 입력해주세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" onClick={() => handleSearch(searchTerm)}>
              <FontAwesomeIcon id="icon" icon={faMagnifyingGlass} />
            </button>  
          </div>
          <button type="button" onClick={resetSearch} className="returnBtn">
            <FontAwesomeIcon icon={faRotateLeft} />
            </button>
          <div id="result">
            <div id="re_title">
              <h3>검색결과</h3>
              <hr />
            </div>
            <div id="re_contents">
              <input type="hidden" value={0} />
              <ul className="your-component">
                {currentData.map((item) => (
                  <React.Fragment key={item.id}>
                    <li>
                      <a href={item.viewDetail} target="_blank" rel="noopener noreferrer">
                        <img
                          src={item.imageName}
                          alt="이미지 설명"
                          className="left-image"
                        />
                      </a>
                      <div className="text-container">
                        <h3>{item.bookName}</h3>
                        <p>
                          Price : <span>{item.bookPrice} 원 </span>
                        </p>
                      </div>
                      <a href={item.viewDetail} className="detail-link" target="_blank" rel="noopener noreferrer">
                        자세히 보기
                      </a>
                    </li>
                    <hr />
                  </React.Fragment>
                ))}
              </ul>
              <div id="pagination">
                <ul className="pagination">
                  {pageNumbers.map((number) => (
                    <li key={number} className={number === currentPage ? "active" : ""}>
                      <a href="#" onClick={() => handlePageChange(number)}>
                        {number}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Lecture;
