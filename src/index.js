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
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
