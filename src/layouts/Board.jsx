import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faComments } from "@fortawesome/free-solid-svg-icons";
import "../css/Board.css";
import { Link } from "react-router-dom";
import Quick from "../components/Quick/Quick";
import axios from "axios";

const Board = () => {
  const [selectedButton, setSelectedButton] = useState("notice");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지당 보여줄 아이템 수
  const pagingBlock = 5;
  const [boardList, setBoardList] = useState([]);
  const [member, setMember] = useState({
    memberNum: "",
    memberName: "",
    username: "",
    password: "",
    email: "",
    domain: "",
    phoneNum: "",
    socialNum1: "",
    socialNum2: "",
  });

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("/getMemberInfo", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.result === "Success") {
          setMember({
            memberNum: response.data.currentMember.memberNum,
            memberName: response.data.currentMember.memberName,
            password: "",
            email: response.data.currentMember.email,
            domain: "",
            phoneNum: response.data.currentMember.phoneNum,
            id: response.data.currentMember.username,
          });
        }
      } catch (error) {
        console.error("Error fetching member info:", error);
      }
    };
    fetchMemberInfo();
  }, []);

  const filteredDatas = boardList.filter((board) => {
    switch (selectedButton) {
      case "notice":
        return board.defaultValue === "notice";
      case "freeboard":
        return board.defaultValue === "freeboard";
      default:
        return true;
    }
  });

  // 현재 페이지에 해당하는 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredDatas.slice(indexOfFirstItem, indexOfLastItem);

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setCurrentPage(1); // 버튼이 변경되면 페이지를 1로 초기화
  };

  //##############################################################
  //##############################################################

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        const response = await axios.get("/board/boardList");
        // 게시글을 내림차순으로 정렬하여 가져오기
        const sortedBoardList = response.data.sort(
          (a, b) => new Date(b.boardDate) - new Date(a.boardDate)
        );
        setBoardList(sortedBoardList);
      } catch (error) {
        console.error("Error fetching board list:", error);
      }
    };

    fetchBoardList();
  }, []);
  const totalPages = Math.ceil(filteredDatas.length / itemsPerPage);
  const shouldDisplayPaging = filteredDatas.length >= 11;

  const visiblePages = Array.from(
    { length: Math.min(pagingBlock, totalPages) },
    (_, index) =>
      index + Math.floor((currentPage - 1) / pagingBlock) * pagingBlock + 1
  ).filter((page) => page <= totalPages);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - pagingBlock, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + pagingBlock, totalPages));
  };

  return (
    <>
      <Header />
      <hr className="comu_hr" />
      <div className="Board">
        <div className="community_header">
          <h1>커뮤니티</h1>
        </div>
        <div className="custom_line">
          <hr className="custom-line" />
        </div>
        <div className="container">
          <div className="community-buttons mb-2">
            <Button
              variant="secondary"
              className={`custom-lg-button ${
                selectedButton === "notice" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("notice")}
            >
              <FontAwesomeIcon icon={faBullhorn} className="icon_btn" />
              공지사항
            </Button>
            <Button
              as={Link}
              to={{
                pathname: "/board/freeboard",
                state: { selectedButton: "freeboard" },
              }}
              variant="secondary"
              className={`custom-lg-button ${
                selectedButton === "freeboard" ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faComments} className="icon_btn" />
              자유게시판
            </Button>
          </div>
        </div>

        <div className="Board-bottom">
          <div id="re_contents">
            <input type="hidden" value={0} />
            {selectedButton === "notice" && member.id === "admin123" && (
              <div className="button-container">
                <Link to="/BoardWrite">
                  <button>글쓰기</button>
                </Link>
              </div>
            )}
            {selectedButton === "freeboard" &&
              member.id &&
              member.id !== "admin123" && (
                <div className="button-container">
                  <Link to="/BoardWrite">
                    <button>글쓰기</button>
                  </Link>
                </div>
              )}
            <ul className="your-component">
              <div>
                {currentData.map((board, index) => (
                  <React.Fragment key={board.boardSeq}>
                    <li className="list_container">
                      <div className="text-container">
                        <Link to={`/BoardView/${board.boardSeq}`}>
                          <span style={{ fontSize: "18px", color: "black" }}>
                            {/* 아래 코드로 수정 */}
                            {filteredDatas.length -
                              (currentPage - 1) * itemsPerPage -
                              index}
                          </span>
                          <span>&nbsp;</span>
                          <span className="board-title">
                            {board.boardTitle}
                          </span>
                        </Link>
                      </div>
                      <div className="boardDate">
                        <span>{formatDate(board.boardDate)}</span>
                      </div>
                    </li>
                    <hr />
                  </React.Fragment>
                ))}
              </div>
            </ul>
          </div>
        </div>
      </div>
      {shouldDisplayPaging && (
        <div className="pagination-container">
          <ul className="pagination">
            {currentPage > pagingBlock && (
              <li className="page-item">
                <button onClick={handlePrev} className="page-link">
                  이전
                </button>
              </li>
            )}
            {visiblePages.map((page) => (
              <li key={page} className="page-item">
                <button
                  onClick={() => handlePageChange(page)}
                  className={`page-link ${
                    currentPage === page ? "active" : ""
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}
            {totalPages > pagingBlock && (
              <li className="page-item">
                <button onClick={handleNext} className="page-link">
                  다음
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
      <Quick />
      <Footer />
    </>
  );
};

export default Board;
