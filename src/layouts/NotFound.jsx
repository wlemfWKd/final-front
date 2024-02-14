import React from "react";
import "../css/NotFound.css"

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - 페이지를 찾을 수 없습니다.</h1>
      <p>죄송합니다, 요청하신 페이지를 찾을 수 없습니다.</p>
    </div>
  );
};

export default NotFound;