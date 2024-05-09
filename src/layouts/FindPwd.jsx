import React, { useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../css/FindPwd.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const FindPwd = () => {
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

  const navigate = useNavigate();

  const [editNewPassword, setEditNewPassword] = useState(false); // editNewPassword 모달 열기/닫기 상태

  // 모달이 열릴 때마다 입력값을 초기화하는 함수
  const resetModalInputs = () => {
    setNewPassword({ password: "", username: "" });
    setCheckNewPassword("");
    setIsPasswordValid(true);
    setPasswordErrorMessage("");
    setPasswordMatchError("");
  };

  const toggleShowEditNewPassword = () => {
    resetModalInputs(); // 모달이 열릴 때마다 입력값 초기화
    setEditNewPassword(!editNewPassword);
  };

  const [findPwdInfo, setFindPwdInfo] = useState({
    memberName: "",
    birthday: "",
    phoneNum: "",
    email: "",
    username: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFindPwdInfo({
      ...findPwdInfo,
      [name]: value,
    });
  };

  const handleDropdownToggle1 = () => {
    setFindPwdInfo({
      memberName: "",
      birthday: "",
      phoneNum: "",
      email: "",
      username: "",
    });
  };
  const handleDropdownToggle2 = () => {
    setFindPwdInfo({
      memberName: "",
      birthday: "",
      phoneNum: "",
      email: "",
      username: "",
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
    setFindPwdInfo({
      ...findPwdInfo,
      phoneNum: formatPhoneNumber(truncatedValue),
    });
  };
  // 비밀번호 찾기
  const handlePwdSubmit = async () => {
    // 전화번호 유효성 검사
    if (isChecked1) {
      const phoneRegex = /^(010|011)\d{8}$/;
      if (!phoneRegex.test(findPwdInfo.phoneNum.replace(/-/g, ""))) {
        alert("올바른 전화번호 형식이 아닙니다.");
        return;
      }
    }
    try {
      const response = await axios.post("/findPwd", findPwdInfo);
      if (response.data.result === "Success") {
        toggleShowEditNewPassword();
        setNewPassword({ ...newPassword, username: findPwdInfo.username });
      } else {
        alert("해당 정보로 가입된 회원이 존재하지 않습니다.");
        return;
      }
    } catch (error) {}
  };
  // 비밀번호 재설정
  const [newPassword, setNewPassword] = useState({
    password: "",
    username: "",
  });
  console.log(newPassword);
  const [newCheckPassword, setCheckNewPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleChange = (field, value) => {
    if (field === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/;
      setIsPasswordValid(passwordRegex.test(value));

      if (!passwordRegex.test(value)) {
        setPasswordErrorMessage(
          "비밀번호는 최소 8자리, 대문자1, 소문자1, 숫자1로 이루어져야 합니다. (!@#$%^&* 만 가능)"
        );
      } else {
        setPasswordErrorMessage("");
      }
      setNewPassword({ ...newPassword, password: value });
    } else if (field === "checkPassword") {
      setCheckNewPassword(value);
      if (value !== newPassword.password) {
        setPasswordMatchError("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordMatchError("");
      }
    } else {
      setNewPassword({ ...newPassword, [field]: value });
    }
  };
  const handleEditPwdSubmit = async (event) => {
    event.preventDefault();
    if (newPassword.password !== newCheckPassword) {
      alert("비밀번호를 확인해주세요.");
      return;
    }
    if (!isPasswordValid) {
      alert(
        "비밀번호는 최소 8자리, 대문자1, 소문자1, 숫자1로 이루어져야 합니다. (!@#$%^&* 만 가능)"
      );
      return;
    }
    try {
      const response = await axios.post("/editPassword", newPassword);
      console.log(response.data);
      if (response.data === "Success") {
        toggleShowEditNewPassword();
        alert("비밀번호가 재설정되었습니다.\n로그인 페이지로 이동합니다.");
        navigate("/login");
      } else {
        alert("전과 동일한 비밀번호 입니다.");
        return;
      }
    } catch (error) {}
  };

  return (
    <>
      <Header />
      <div className="findpwd-container">
        <h2>비밀번호찾기</h2>
        <div className="findpwdbox">
          <div onClick={handleDropdownToggle1}>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isChecked1}
                onChange={toggleTable1}
              />
              <span className="checkmark"></span>
              휴대전화 번호로 비밀번호 찾기
            </label>
          </div>
          {isChecked1 && (
            <div className="findpwd-wrap">
              <label>아이디</label>
              <input
                type="text"
                name="username"
                value={findPwdInfo.username}
                onChange={handleInputChange}
              />
              <label>이름</label>
              <input
                type="text"
                name="memberName"
                value={findPwdInfo.memberName}
                onChange={handleInputChange}
              />
              <label>휴대폰번호</label>
              <input
                type="tel"
                name="phoneNum"
                value={findPwdInfo.phoneNum}
                onChange={handlePhoneNumChange}
              />
              <button onClick={handlePwdSubmit}>확인</button>
            </div>
          )}
          <div onClick={handleDropdownToggle2}>
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
            <div className="findpwd-wrap">
              <label>아이디</label>
              <input
                type="text"
                name="username"
                value={findPwdInfo.username}
                onChange={handleInputChange}
              />
              <label>이름</label>
              <input
                type="text"
                name="memberName"
                value={findPwdInfo.memberName}
                onChange={handleInputChange}
              />
              <lable>이메일</lable>
              <input
                type="text"
                name="email"
                value={findPwdInfo.email}
                onChange={handleInputChange}
              />
              <button onClick={handlePwdSubmit}>확인</button>
            </div>
          )}
        </div>
        {editNewPassword && (
          <>
            <div className="modal_background"></div>
            <div className="modal_container">
              <h2>비밀번호 재설정</h2>
              <form onSubmit={handleEditPwdSubmit}>
                <label>새 비밀번호</label>
                <span
                  className="close_button"
                  onClick={toggleShowEditNewPassword}
                >
                  X
                </span>
                <input
                  type="password"
                  onChange={(event) =>
                    handleChange("password", event.target.value)
                  }
                  value={newPassword.password}
                  placeholder="8자리 이상, 대문자, 숫자. (!@#$%^&* 가능)"
                  maxLength={12}
                />
                {passwordErrorMessage && (
                  <span className="error-message">{passwordErrorMessage}</span>
                )}
                <br />
                <br />
                <label>비밀번호 확인</label>
                <input
                  type="password"
                  onChange={(event) =>
                    handleChange("checkPassword", event.target.value)
                  }
                  value={newCheckPassword}
                  placeholder="비밀번호를 재입력해주세요"
                  maxLength={12}
                />
                {passwordMatchError && (
                  <span className="checkerror-message">
                    {passwordMatchError}
                  </span>
                )}
                <br />
                <br />
                <button type="submit">재설정</button>
              </form>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FindPwd;
