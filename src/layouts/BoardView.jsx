import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../css/BoardView.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const BoardView = () => {
  const { boardSeq } = useParams();
  const [board, setBoard] = useState(null);
  const [boardWriter, setBoardWriter] = useState(""); // 작성자 정보 상태 추가

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  console.log(boardSeq);

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

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await axios.get(`/board/boardView/${boardSeq}`);
        setBoard(response.data);
        // 게시글 작성자 정보 설정
        setBoardWriter(response.data.boardUsername);
      } catch (error) {
        console.error("Error fetching board details", error);
      }
    };

    fetchBoardDetails();
  }, [boardSeq]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/board/getComments/${boardSeq}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    fetchComments();
  }, [boardSeq]);

  const handleCommentSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("boardSeq", boardSeq);
      formData.append("replyContent", newComment);
      formData.append("replyWriter", member.id);

      await axios.post(`/board/replyForm`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 새로 작성한 댓글 객체 생성
      const newCommentObj = {
        replyContent: newComment,
        replyWriter: member.id,
      };

      // 기존 댓글 목록에 새로운 댓글을 추가하여 새로운 배열을 생성
      const updatedComments = [newCommentObj, ...comments];

      // 새로운 댓글 목록으로 상태 업데이트
      setComments(updatedComments);

      // 새로 작성한 댓글 입력창 비우기
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  if (!board) {
    return <div>Loading...</div>;
  }
  const handleDelete = async () => {
    try {
      await axios.get(`/board/board_delete/${boardSeq}`);
      window.location.href = "/community";
    } catch (error) {
      console.error("Error deleting board", error);
    }
  };

  const isSameUser = member.id === board.boardUsername;

  return (
    <>
      <Header />
      <div className="board-view-container">
        <h2>게시글 보기</h2>
        <form>
          <div className="form-group">
            <label htmlFor="boardSeq">게시글 번호</label>
            <input
              type="text"
              id="boardSeq"
              name="boardSeq"
              value={board.boardSeq}
              readOnly
              className="styled-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="writer">작성자</label>
            <input
              type="text"
              id="writer"
              name="writer"
              value={board.boardWriter}
              readOnly
              className="styled-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={board.boardTitle}
              readOnly
              className="styled-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              name="content"
              value={board.boardContents}
              readOnly
              className="styled-textarea"
            ></textarea>
          </div>
        </form>
        <div className="button-group">
          <Link to="/community">
            <button type="button" className="button-cancel">
              이전으로
            </button>
          </Link>

          {(isSameUser || member.username === "admin123") && (
            <Link to={`/BoardModify/${board.boardSeq}`}>
              <button type="button" className="button-modify">
                수정
              </button>
            </Link>
          )}

          {(isSameUser || member.username === "admin123") && (
            <button
              type="button"
              className="button-delete"
              onClick={handleDelete}
            >
              삭제
            </button>
          )}
        </div>

        <div className="comment-container">
          {member.id && (
            <div className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 작성해주세요..."
              ></textarea>
              <button onClick={handleCommentSubmit}>댓글 작성</button>
            </div>
          )}

          <h3>댓글목록</h3>
          <div className="comments-section">
            {member.id ? (
              comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p>작성자: {comment.replyWriter}</p>
                  <p>{comment.replyContent}</p>
                </div>
              ))
            ) : (
              <p>회원만 읽기가 가능합니다.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BoardView;
