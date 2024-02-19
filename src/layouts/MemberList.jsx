import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { removeAccessCookie, removeRefreshCookie } from "../Cookie/cookie";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../css/MemberList.css";

const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMemberList();
  }, []);

  const fetchMemberList = async () => {
    try {
      const response = await axios.get("/admin/memberlist");
      setMembers(response.data.content);
    } catch (error) {
      console.error("Error fetching member list:", error);
    }
  };

  const deleteMember = async (memberNum) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`/deleteMember/${memberNum}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (response.data === "Success") {
        removeAccessCookie();
        removeRefreshCookie();
        alert("회원탈퇴 성공");
        fetchMemberList(); // 회원 목록을 다시 불러와 UI를 업데이트
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="memberlist_controller">
        <h1>회원관리</h1>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>ID</th>
              <th>Email</th>
              <th>전화번호</th>
              <th>회원유형</th>
              <th>경고</th>
              <th>관리</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            {members.map(
              (member) =>
                // username이 null이 아닌 경우에만 해당 행을 렌더링
                member.username !== null &&
                member.membership !== "관리자" && (
                  <tr key={member.memberNum}>
                    <td>{member.memberName}</td>
                    <td>{member.username}</td>
                    <td>{member.email}</td>
                    <td>{member.phoneNum}</td>
                    <td>{member.membership}</td>
                    <td>{member.warning}</td>
                    <td>
                      <a onClick={() => deleteMember(member.memberNum)}>탈퇴</a>
                    </td>
                    <td>
                      <Link to={`/editMember/${member.username}`}>수정</Link>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MemberList;
