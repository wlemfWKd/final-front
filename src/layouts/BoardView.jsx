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

  //#####################################################################
  //#####################################################################
  const [editedComment, setEditedComment] = useState(null); // 수정된 댓글 내용 상태 추가
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 추가
  //#####################################################################
  //#####################################################################

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

      // 댓글 작성 요청
      await axios.post(`/board/replyForm`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 댓글 작성 후 페이지 새로고침
      window.location.reload();

      // // 새로 작성한 댓글 객체 생성
      // const newCommentObj = {
      //   replyContent: newComment,
      //   replyWriter: member.id,
      // };

      // // 새로운 댓글을 목록에 추가하여 새로운 배열을 생성
      // const updatedComments = [newCommentObj, ...comments];

      // // 새로운 댓글 목록으로 상태 업데이트
      // setComments(updatedComments);

      // // 새로 작성한 댓글 입력창 비우기
      // setNewComment("");
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

  const handleCommentDelete = async (replySeq) => {
    try {
      await axios.get(`/board/replyDelete`, { params: { replySeq } });
      // 삭제 후 댓글 목록 갱신
      setComments(comments.filter((comment) => comment.replySeq !== replySeq));
      // 삭제 완료 메시지 표시
      alert("댓글이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  //#####################################################################
  //#####################################################################

  const handleEdit = (replySeq) => {
    const selectedComment = comments.find(
      (comment) => comment.replySeq === replySeq
    );
    setEditedComment(selectedComment); // 선택한 댓글 객체를 상태로 설정
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

      // 수정 완료 후 수정 모드 종료
      setIsEditing(false);
      // 수정된 내용을 화면에 반영하기 위해 댓글 목록 다시 불러오기
      const updatedComments = comments.map((comment) =>
        comment.replySeq === editedComment.replySeq ? editedComment : comment
      );
      setComments(updatedComments);
    } catch (error) {
      console.error("Error updating comment", error);
    }
  };

  // 댓글 수정 내용 변경
  const handleChange = (e) => {
    setEditedComment({
      ...editedComment,
      replyContent: e.target.value,
    });
  };
  // 수정 취소 시
  const handleCancel = () => {
    setIsEditing(false);
    setEditedComment(""); // 수정 취소 시 상태 초기화
  };

  //#####################################################################
  //#####################################################################

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
            {!member.id && <p>회원만 읽기가 가능합니다.</p>}
            {member.id && (
              <>
                {comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <div className="comment-header">
                      <p>작성자: {comment.replyWriter}</p>
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
