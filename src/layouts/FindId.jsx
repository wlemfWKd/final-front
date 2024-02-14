import React, { useState } from "react";
import "../css/FindId.css";

const FindId = () => {
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

export default FindId;
