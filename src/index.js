import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./layouts/login";
import Register from "./layouts/register";
import Lecture from "./layouts/lecture";
import Calendar from "./layouts/calendar";
import Support from "./layouts/support";
import Book from "./layouts/Book";
import Board from "./layouts/Board";
import LicensePage from "./layouts/LicensePage";
import DetailPage from "./layouts/DetailPage";
import DataPage from "./layouts/DataPage";
import LoginCallback from "./oauth/Logincallback";
import FindId from "./layouts/FindId";
import Test from "./layouts/test";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/lecture" element={<Lecture />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/support" element={<Support />} />
      <Route path="/book" element={<Book />} />
      <Route path="/community" element={<Board />} />
      <Route path="/license" element={<LicensePage />} />
      <Route path="/detail/:jmfldnm" element={<DetailPage />} />
      <Route path="/data" element={<DataPage />} />
      <Route path="/login/callback" element={<LoginCallback />} />
      <Route path="/findid" element={<FindId />} />
      <Route path="/testtaek" element={<Test />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
