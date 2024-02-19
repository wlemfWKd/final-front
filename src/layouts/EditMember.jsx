import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../css/EditMember.css";

const EditMember = () => {
  const [member, setMember] = useState({
    memberNum: "",
    memberName: "",
    username: "",
    email: "",
    domain: "",
    phoneNum: "",
    socialNum1: "",
    socialNum2: "",
  });

  useEffect(() => {
    fetchMemberInfo();
  }, []);

  const fetchMemberInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/getMemberInfo", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.result === "Success") {
        const currentMember = response.data.currentMember;
        setMember({
          memberNum: currentMember.memberNum,
          memberName: currentMember.memberName,
          username: currentMember.username,
          email: currentMember.email,
          domain: "",
          phoneNum: currentMember.phoneNum,
          socialNum1: "",
          socialNum2: "",
        });
      }
    } catch (error) {
      console.error("Error fetching member info:", error);
    }
  };

  const handleChange = (field, value) => {
    setMember({ ...member, [field]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/editMemberInfo", member);
      if (response.data === "Success") {
        alert("회원정보 수정 완료!");
        // 수정이 완료되면 어떤 동작을 수행할지 여기에 추가
      } else {
        alert("회원정보 수정 실패!");
      }
    } catch (error) {
      console.error("Error updating member info:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="edit_member_container">
        <h1>회원 정보 수정</h1>
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <label>이름:</label>
            <input
              type="text"
              value={member.memberName}
              onChange={(e) => handleChange("memberName", e.target.value)}
            />
          </div>
          <div className="form_group">
            <label>ID:</label>
            <input type="text" value={member.username} disabled />
          </div>
          <div className="form_group">
            <label>Email:</label>
            <input type="email" value={member.email} disabled />
          </div>
          <div className="form_group">
            <label>전화번호:</label>
            <input
              type="text"
              value={member.phoneNum}
              onChange={(e) => handleChange("phoneNum", e.target.value)}
            />
          </div>
          <button type="submit">수정 완료</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditMember;
