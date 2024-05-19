import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../css/BoardView.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const BoardView = () => {
  const { boardSeq } = useParams();
  const [board, setBoard] = useState(null);
  const [boardWriter, setBoardWriter] = useState("");

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [editedComment, setEditedComment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const pagingBlock = 5;
  const shouldDisplayPaging = comments.length >= 6;

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

      window.location.reload();
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
      if (member.memberName === "관리자") {
        window.location.href = "/board";
      } else {
        window.location.href = "/board/freeboard";
      }
    } catch (error) {
      console.error("Error deleting board", error);
    }
  };

  const handleCommentDelete = async (replySeq) => {
    try {
      await axios.get(`/board/replyDelete`, { params: { replySeq } });
      const updatedComments = comments.filter(
        (comment) => comment.replySeq !== replySeq
      );
      setComments(updatedComments);

      // 현재 페이지가 마지막 페이지이고 삭제된 댓글이 마지막 페이지에 있는 경우 이전 페이지로 이동
      if (
        currentPage > 1 &&
        (currentPage - 1) * commentsPerPage >= updatedComments.length
      ) {
        setCurrentPage(currentPage - 1);
      }

      alert("댓글이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  const handleEdit = (replySeq) => {
    const selectedComment = comments.find(
      (comment) => comment.replySeq === replySeq
    );
    setEditedComment(selectedComment);
    setIsEditing(true);
  };

  const handleSubmitEdit = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("replySeq", editedComment.replySeq);
      formData.append("replyContent", editedComment.replyContent);

      await axios.post(`/board/replyModifyForm`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsEditing(false);
      const updatedComments = comments.map((comment) =>
        comment.replySeq === editedComment.replySeq ? editedComment : comment
      );
      setComments(updatedComments);
    } catch (error) {
      console.error("Error updating comment", error);
    }
  };

  const handleChange = (e) => {
    setEditedComment({
      ...editedComment,
      replyContent: e.target.value,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedComment("");
  };

  const isSameUser = member.id === board.boardUsername;

  //##############################################################
  //##############################################################
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const totalPages = Math.ceil(comments.length / commentsPerPage);

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
          <Link
            to={
              member.memberName === "관리자" || !member.id
                ? "/board"
                : "/board/freeboard"
            }
          >
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
            {!member.id && <p>회원만 읽기가 가능합니다.</p>}
            {member.id && (
              <>
                {currentComments.map((comment, index) => (
                  <div key={index} className="comment">
                    <div className="comment-header">
                      <p>
                        작성자:{" "}
                        {comment.replyWriter === "admin123"
                          ? "관리자"
                          : comment.replyWriter}
                      </p>
                      <div className="comment-button">
                        {isEditing &&
                        comment.replySeq === editedComment.replySeq ? (
                          <>
                            <button onClick={() => handleSubmitEdit(comment)}>
                              저장
                            </button>
                            <button onClick={handleCancel}>취소</button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(comment.replySeq)}
                            >
                              수정
                            </button>
                            <button
                              onClick={() =>
                                handleCommentDelete(comment.replySeq)
                              }
                            >
                              삭제
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    {isEditing &&
                    comment.replySeq === editedComment.replySeq ? (
                      <textarea
                        value={editedComment.replyContent}
                        onChange={handleChange}
                      ></textarea>
                    ) : (
                      <p>{comment.replyContent}</p>
                    )}
                  </div>
                ))}
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
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BoardView;
