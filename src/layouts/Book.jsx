import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import "../css/Book.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from 'axios';

const Book = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [kyoboData, setKyoboData] = useState([]);
  const [yes24Data, setYes24Data] = useState([]);
  const [aladinData, setAladinData] = useState([]);
  const [originalAladinData, setOriginalAladinData] = useState([]);
  const [originalKyoboData, setOriginalKyoboData] = useState([]);
  const [originalYes24Data, setOriginalYes24Data] = useState([]);
  // 현재 선택된 카테고리 상태 및 업데이트 함수
  const [selectedCategory, setSelectedCategory] = useState('YES24')
  // 현재 페이지 상태 및 업데이트 함수
  const [currentPage, setCurrentPage] = useState(1);



  // 검색어 초기화 및 페이지 리셋 함수
  const resetSearch = async () => {
    setSearchTerm("");  // 검색어 초기화
    setCurrentPage(1);  // 페이지를 1로 리셋
  
    // 선택된 카테고리에 따라 데이터를 불러오거나 필터링하여 업데이트
    switch (selectedCategory) {
      case 'YES24':
        try {
          const responseYes24 = await axios.get('/detail/books');
          setYes24Data(responseYes24.data);
          setOriginalYes24Data(responseYes24.data);
        } catch (error) {
          console.error('Error fetching books from YES24:', error);
        }
        break;
      case 'KYOBO':
        try {
          const responseKyobo = await axios.get('/detail/kyoboBooks');
          setKyoboData(responseKyobo.data);
          setOriginalKyoboData(responseKyobo.data);
        } catch (error) {
          console.error('Error fetching books from Kyobo:', error);
        }
        break;
      case 'ALADIN':
        try {
          const responseAladin = await axios.get('/detail/aladinBooks');
          setAladinData(responseAladin.data);
          setOriginalAladinData(responseAladin.data);
        } catch (error) {
          console.error('Error fetching books from Aladin:', error);
        }
        break;
      default:
        break;
    }
  };




  // 검색어를 입력하고 엔터를 눌렀을 때 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  //검색 결과 필터링하는 함수
  const filterResults = (data, searchTerm) => {
    return data.filter((item) =>
      item.bookName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSearch = (term) => {
    if (selectedCategory === 'YES24') {
      const filteredData = filterResults(originalYes24Data, term);
      setYes24Data(filteredData);
    } else if (selectedCategory === 'KYOBO') { // 수정된 부분
      const filteredData = filterResults(originalKyoboData, term);
      setKyoboData(filteredData);
    } else if (selectedCategory === 'ALADIN') { // 수정된 부분
      const filteredData = filterResults(originalAladinData, term);
      setAladinData(filteredData);
    }
    setCurrentPage(1);
  };

  // 페이지 변경 시 검색어 유지하기 및 스크롤 위치 유지
  const handlePageChange = (pageNumber, event) => {
    event.preventDefault(); // 브라우저의 기본 동작 방지
    setCurrentPage(pageNumber);
  };

  // 이전 페이지로 이동하는 함수
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };




  // 카테고리 선택 시 호출되는 함수
const handleCategoryChange = async (categoryId) => {
  // 선택된 카테고리 업데이트
  setSelectedCategory(categoryId);

  // 검색어 초기화
  setSearchTerm("");

  // 카테고리에 따라 데이터를 불러오거나 필터링하여 업데이트
  switch (categoryId) {
    case 'YES24':
      console.log('예스24 접속됨')
      try {
        const responseYes24 = await axios.get('/detail/books');
        setYes24Data(responseYes24.data);
        setOriginalYes24Data(responseYes24.data);
        console.log(responseYes24.data);
      } catch (error) {
        console.error('Error fetching books from YES24:', error);
      } 
      break;
    case 'KYOBO':
      console.log('교보 접속됨')
      try {
        const responseKyobo = await axios.get('/detail/kyoboBooks');
        setKyoboData(responseKyobo.data);
        setOriginalKyoboData(responseKyobo.data);
        console.log(responseKyobo.data);
      } catch (error) {
        console.error('Error fetching books from Kyobo:', error);
      }
      break;
    case 'ALADIN':
      console.log('알라딘 접속됨')
      try {
        const responseAladin = await axios.get('/detail/aladinBooks');
        setAladinData(responseAladin.data);
        setOriginalAladinData(responseAladin.data);
        console.log(responseAladin.data);
      } catch (error) {
        console.error('Error fetching books from Aladin:', error);
      }
      break;
    default:
      break;
  }
  setCurrentPage(1); // 페이지 초기화
};



  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseYes24 = await axios.get('/detail/books');
        setYes24Data(responseYes24.data);
        setOriginalYes24Data(responseYes24.data);
      } catch (error) {
        console.error('Error fetching books from YES24:', error);
      }
    };

    const fetchDataFromKyobo = async () => {
      try {
        const responseKyobo = await axios.get('/detail/kyoboBooks');
        setKyoboData(responseKyobo.data);
        setOriginalKyoboData(responseKyobo.data);
      } catch (error) {
        console.error('Error fetching books from Kyobo:', error);
      }
    };

    const fetchDataFromAladin = async () => {
      try {
        const responseAladin = await axios.get('/detail/aladinBooks');
        setAladinData(responseAladin.data);
        setOriginalAladinData(responseAladin.data);
      } catch (error) {
        console.error('Error fetching books from Aladin:', error);
      }
    };

    fetchData();
    fetchDataFromKyobo();
    fetchDataFromAladin();
  }, []);

  useEffect(() => {
    // 페이지가 로드될 때 스크롤 위치를 복원합니다.
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
    }

    return () => {
      // 컴포넌트가 언마운트 되기 전에 스크롤 위치를 저장합니다.
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };
  }, [currentPage]); // 의존성 배열에 currentPage를 추가하여 페이지 번호가 변경될 때마다 이펙트를 실행합니다





  // 페이지당 보여줄 아이템 수
  const itemsPerPage = 10;

  // 현재 페이지에 해당하는 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //const currentData = selectedCategory === 'YES24' ? yes24Data.slice(indexOfFirstItem, indexOfLastItem) : kyoboData.slice(indexOfFirstItem, indexOfLastItem) : aladinData;
  const currentData =
  selectedCategory === 'YES24'
    ? yes24Data.slice(indexOfFirstItem, indexOfLastItem)
    : selectedCategory === 'KYOBO'
    ? kyoboData.slice(indexOfFirstItem, indexOfLastItem)
    : aladinData.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
const totalPages = Math.ceil((selectedCategory === 'YES24' ? yes24Data.length : (selectedCategory === 'KYOBO' ? kyoboData.length : aladinData.length)) / itemsPerPage);
  // 페이지 번호 배열 생성
  const pageRange = 5; // 좌우에 몇 페이지까지 보여줄 것인지 설정
  const middlePage = Math.ceil(pageRange / 2);

  let startPage, endPage;

  if (totalPages <= pageRange) {
    // 전체 페이지 수가 pageRange 이하인 경우 모든 페이지 보여주기
    startPage = 1;
    endPage = totalPages;
  } else {
    // 전체 페이지 수가 pageRange 이상인 경우 현재 페이지를 중심으로 좌우에 pageRange 페이지만 보여주기
    if (currentPage <= middlePage) {
      startPage = 1;
      endPage = pageRange;
    } else if (currentPage + middlePage - 1 >= totalPages) {
      startPage = totalPages - pageRange + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - middlePage + 1;
      endPage = currentPage + middlePage - 1;
    }
  }

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Header />
      <div id="board_container">
        <div id="contents">
          <div id="title">
            <h2>자격증 도서 추천</h2>
          </div>
          <div id="rank">
            {/* YES24 도서 목록의 첫 번째 도서 출력 */}
            {yes24Data.length > 0 && (
              <Card key={1} style={{ width: "18rem" }}>
                <Card.Img variant="top" src={yes24Data[0].imageName} style={{ width: '180px', height: '200px' }} />
                <Card.Body>
                  <Card.Title>
                    <span>{yes24Data[0].bookName}</span>
                  </Card.Title>
                  <Card.Text className="card-text-custom">{yes24Data[0].bookPrice} <span className="small">원</span></Card.Text>
                  <Button variant="primary">자세히보기</Button>
                </Card.Body>
              </Card>
            )}

            {/* Kyobo 도서 목록의 첫 번째 도서 출력 */}
            {kyoboData.length > 0 && (
              <Card key={2} style={{ width: "18rem" }}>
                <Card.Img variant="top" src={kyoboData[0].imageName} style={{ width: '180px', height: '200px' }} />
                <Card.Body>
                  <Card.Title>
                    <span>{kyoboData[0].bookName}</span>
                  </Card.Title>
                  <Card.Text className="card-text-custom">{kyoboData[0].bookPrice} <span className="small">원</span></Card.Text>
                  <Button variant="primary">자세히보기</Button>
                </Card.Body>
              </Card>
            )}

            {/* Aladin 도서 목록의 첫 번째 도서 출력 */}
            {aladinData.length > 0 && (
              <Card key={3} style={{ width: "18rem" }}>
                <Card.Img variant="top" src={aladinData[0].imageName} style={{ width: '180px', height: '200px' }} />
                <Card.Body>
                  <Card.Title>
                    <span>{aladinData[0].bookName}</span>
                  </Card.Title>
                  <Card.Text className="card-text-custom">{aladinData[0].bookPrice} <span className="small">원</span></Card.Text>
                  <Button variant="primary">자세히보기</Button>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
        <div id="search">
          <div id="searchbox">
            <input
              type="search"
              placeholder="자격증명을 입력해주세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="button" onClick={() => handleSearch(searchTerm)}>
              <FontAwesomeIcon id="icon" icon={faMagnifyingGlass} />
            </button>
          </div>
          <button type="button" onClick={resetSearch} className="returnBtn">
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
          <div id="result">
            <div id="re_title">
              <h3>검색결과</h3>
            </div>
            {/* 카테고리 바 */}
            <div id="category-bar">
              <Button
                variant={selectedCategory === 'YES24' ? "info" : "outline-info"}
                onClick={() => handleCategoryChange('YES24')}
              >
                YES24
              </Button>{' '}
              <Button
                variant={selectedCategory === 'KYOBO' ? "info" : "outline-info"}
                onClick={() => handleCategoryChange('KYOBO')}
              >
                교보문고
              </Button>{' '}
              <Button
                variant={selectedCategory === 'ALADIN' ? "info" : "outline-info"}
                onClick={() => handleCategoryChange('ALADIN')}
              >
                알라딘
              </Button>{' '}
            </div>
            <hr />
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
                  {/* 이전(prev) 버튼 */}
                  <li>
                    <a onClick={goToPrevPage} href="javascript:void(0);">
                      이전
                    </a>
                  </li>

                  {/* 페이지 숫자들 */}
                  {pageNumbers.map((number) => (
                    <li key={number} className={number === currentPage ? "active" : ""}>
                      <a onClick={(e) => handlePageChange(number, e)} href="javascript:void(0);">
                        {number}
                      </a>
                    </li>
                  ))}

                  {/* 다음(next) 버튼 */}
                  <li>
                    <a onClick={goToNextPage} href="javascript:void(0);">
                      다음
                    </a>
                  </li>
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

export default Book;
