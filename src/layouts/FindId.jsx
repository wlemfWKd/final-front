import React, { useState } from "react";
import "../css/FindId.css";

const FindId = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchMethod, setSearchMethod] = useState("email");
  const [foundUsername, setFoundUsername] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchMethodChange = (event) => {
    setSearchMethod(event.target.value);
  };

  const handleSearch = () => {
    // 여기서는 실제로 서버로부터 아이디를 찾는 API 요청을 보내는 로직을 구현합니다.
    // 이 예시에서는 단순히 입력된 값을 출력합니다.
    setFoundUsername(inputValue);
  };

  return (
    <div className="find-username-container">
      <h2>아이디 찾기</h2>
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
      {foundUsername && (
        <div>
          <p>찾은 아이디: {foundUsername}</p>
        </div>
      )}
    </div>
  );
};

export default FindId;
