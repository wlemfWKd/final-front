import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../css/FindId.css";

const FindId = () => {
  const [findIdInfo, setFindIdInfo] = useState({
    memberName: "",
    phoneNum: "",
    email: "",
    username: "",
  });

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const toggleTable1 = () => {
    setIsChecked1(!isChecked1);
    setIsChecked2(false); // 첫 번째 체크박스를 선택하면 두 번째 체크박스 선택 해제
  };

  const toggleTable2 = () => {
    setIsChecked2(!isChecked2);
    setIsChecked1(false); // 두 번째 체크박스를 선택하면 첫 번째 체크박스 선택 해제
  };

  const handleToggle1 = () => {
    setFindIdInfo({
      memberName: "",
      phoneNum: "",
      email: "",
      username: "",
    });
  };

  const handleToggle2 = () => {
    setFindIdInfo({
      memberName: "",
      phoneNum: "",
      email: "",
      username: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFindIdInfo({
      ...findIdInfo,
      [name]: value,
    });
  };

  const formatPhoneNumber = (phoneNumber) => {
    // 전화번호 형식 변환 (000-0000-0000)
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };
  const handlePhoneNumChange = (event) => {
    // 입력된 값에서 숫자만 추출
    const newValue = event.target.value.replace(/[^0-9]/g, "");
    // 최대 11자리까지만 받음
    const truncatedValue = newValue.slice(0, 11);
    // 형식 적용하여 state 업데이트
    setFindIdInfo({
      ...findIdInfo,
      phoneNum: formatPhoneNumber(truncatedValue),
    });
  };

  // 아이디찾기
  const handleIdSubmit = async () => {
    // 전화번호 유효성 검사
    if (isChecked1) {
      const phoneRegex = /^(010|011)\d{8}$/;
      if (!phoneRegex.test(findIdInfo.phoneNum.replace(/-/g, ""))) {
        alert("올바른 전화번호 형식이 아닙니다.");
        return;
      }
    }
    try {
      const response = await axios.post("/findId", findIdInfo);
      if (response.data.result === "Success") {
        alert(`회원님의 아이디는 ${response.data.username} 입니다.`);
      } else {
        alert("해당 정보로 가입된 회원이 존재하지 않습니다.");
      }
    } catch (error) {}
  };
  return (
    <>
      <Header />
      <div className="findid-container">
        <h2>아이디찾기</h2>
        <div className="findidbox">
          <div onClick={handleToggle1}>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isChecked1}
                onChange={toggleTable1}
              />
              <span className="checkmark"></span>
              휴대전화 번호로 아이디 찾기
            </label>
          </div>
          {isChecked1 && (
            <div className="findid-wrap">
              <label>이름</label>
              <input
                type="text"
                name="memberName"
                value={findIdInfo.memberName}
                onChange={handleInputChange}
              />
              <label>휴대폰번호</label>
              <input
                type="tel"
                name="phoneNum"
                value={findIdInfo.phoneNum}
                onChange={handlePhoneNumChange}
              />
              <button onClick={handleIdSubmit}>확인</button>
            </div>
          )}
          <div onClick={handleToggle2}>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isChecked2}
                onChange={toggleTable2}
              />
              <span className="checkmark"></span>
              이메일로 아이디 찾기
            </label>
          </div>
          {isChecked2 && (
            <div className="findid-wrap">
              <label>이름</label>
              <input
                type="text"
                name="memberName"
                value={findIdInfo.memberName}
                onChange={handleInputChange}
              />
              <label>이메일</label>
              <input
                type="text"
                name="email"
                value={findIdInfo.email}
                onChange={handleInputChange}
              />
              <button onClick={handleIdSubmit}>확인</button>
            </div>
          )}
        </div>
        <div className="btnpwd">
          <Link to="/login/findpassword">
            <button className="pwdbtn">비밀번호 찾기</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindId;
