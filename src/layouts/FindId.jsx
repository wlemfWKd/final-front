import React, { useState } from "react";
import "../css/FindId.css";

const FindId = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchMethod, setSearchMethod] = useState("email");
  const [foundUsername, setFoundUsername] = useState("");
  const [searched, setSearched] = useState(false);

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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchMethodChange = (event) => {
    setSearchMethod(event.target.value);
  };

  const handleSearch = () => {
    fetch(`/getUserName?data=${inputValue}&searchMethod=${searchMethod}`)
      .then((response) => response.text())
      .then((username) => {
        setFoundUsername(username);
        setSearched(true);
      });
  };

  return (
    <div className="findid-container">
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

      <div>
        <label className="checkbox-label">
          <input type="checkbox" checked={isChecked1} onChange={toggleTable1} />
          <span className="checkmark"></span>
          이메일로 아이디 찾기
        </label>
        {isChecked1 && (
          <table>
            <thead>
              <tr>
                <input type="text" name="memberName" />
                {/* Add more headers if needed */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data 1</td>
                <td>Data 2</td>
                {/* Add more data cells if needed */}
              </tr>
              {/* Add more rows if needed */}
            </tbody>
          </table>
        )}
        <label className="checkbox-label">
          <input type="checkbox" checked={isChecked2} onChange={toggleTable2} />
          <span className="checkmark"></span>
          휴대전화 번호로 아이디 찾기
        </label>
        {isChecked2 && (
          <table>
            <thead>
              <tr>
                <th>Header A</th>
                <th>Header B</th>
                {/* Add more headers if needed */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data A</td>
                <td>Data B</td>
                {/* Add more data cells if needed */}
              </tr>
              {/* Add more rows if needed */}
            </tbody>
          </table>
        )}
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
