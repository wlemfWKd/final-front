import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../css/Books.css";
import axios from 'axios';

const Books = ({jmfldnm}) => {

  const [books, setBooks] = useState([]);
  const [yes24Data, setYes24Data] = useState([]);
  const [kyoboData, setKyoboData] = useState([]);
  const [aladinData, setAladinData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/detail/books/${jmfldnm}`);
        const data = response.data;

        // 도서 정보를 defaultColumn 값으로 분류하여 상태에 추가
        const yes24Books = data.filter((book) => book.defaultColumn === "YES24");
        setYes24Data(yes24Books);

        const kyoboBooks = data.filter((book) => book.defaultColumn === "KYOBO");
        setKyoboData(kyoboBooks);

        const aladinBooks = data.filter((book) => book.defaultColumn === "ALADIN");
        setAladinData(aladinBooks);

        // 전체 도서 정보 저장
        setBooks(data);
      } catch (error) {
        console.error("Error fetching book data 나나난나 :", error);
      }
    };

    fetchData();
  }, [jmfldnm]);

    
    
    
    
    

    return (
        <>
            <Header />
            <div className="Books_container">
                <div id="books_Title">
                    <h1>자격증 도서 추천</h1>
                </div>
                <div className="bookRank">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="bookSearch">
                    <div id="searchbox">
                        <input
                            type="search"
                            placeholder="자격증명을 입력해주세요"
                        //   value={searchTerm}
                        //   onChange={(e) => setSearchTerm(e.target.value)}
                        //   onKeyDown={handleKeyDown}
                        />
                        <button type="button" onClick={() => handleSearch(searchTerm)}>
                            <FontAwesomeIcon id="icon" icon={faMagnifyingGlass} />
                        </button>
                    </div>
                    <div className="returnBooks">
                        <button type="button" >
                            <FontAwesomeIcon icon={faRotateLeft} />
                        </button>
                    </div>
                    <div id="result">
                        <div id="re_titles">
                            <h3>검색결과</h3>
                        </div>
                        <div id="category-bar">

                        </div>
                        <hr />

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Books;
