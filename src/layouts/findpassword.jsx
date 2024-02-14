import React, { useState } from "react";
import "../css/FindId.css";

const FindPwd = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchMethod, setSearchMethod] = useState("email");
  const [foundUsername, setFoundUsername] = useState("");
  const [searched, setSearched] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchMethodChange = (event) => {
    setSearchMethod(event.target.value);
  };

  const handleSearch = () => {
    fetch(`/getUserName?data=${inputValue}&searchMethod=${searchMethod}`)
      .then(response => response.text())
      .then(username => {
        setFoundUsername(username);
        setSearched(true);
      });
  };

  const checkMemberEmail = async (event) => {
    event.preventDefault();
    try {
      alert(
        "해당 이메일로 인증코드를 전송합니다.\n 최대 1분이 소요될 수 있습니다.\n 전송 완료시 전송 완료 창이 나옵니다."
      );
      // 적절한 엔드포인트와 데이터를 사용
      const response = await axios.post("/checkMemberEmail", {
        email: member.email,
        domain: member.domain,
      });
      console.log(response.data);
      if (response.data === "Success") {
        alert(
          "해당 이메일로 인증 코드를 전송했습니다.\n" +
            "아래 입력칸에 입력해주세요."
        );
      } else {
      }
    } catch (error) {
      console.log("데이터 전송 중 오류 발생: ", error);
    }
  };




  return (
    <div className="find-username-container">
      <h2>비밀번호 찾기</h2>
      <div>
        <label>
          <input
            type="radio"
            value="email"
            checked={searchMethod === "email"}
            onChange={handleSearchMethodChange}
          />
          이메일
        </label>
        <label>
          <input
            type="radio"
            value="phone"
            checked={searchMethod === "phone"}
            onChange={handleSearchMethodChange}
          />
          휴대전화
        </label>
      </div>
      <div>
        <input
          type={searchMethod === "email" ? "email" : "tel"}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={
            searchMethod === "email" ? "이메일 입력" : "휴대전화 입력"
          }
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      {searched && (
        <div>
          {foundUsername ? (
            <p>찾은 아이디: {foundUsername}</p>
          ) : (
            <p>올바른 정보를 입력해주세요</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FindPwd;
