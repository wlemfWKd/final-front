import React from "react";
import Mbti from "./Mbti";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Quick from "../components/Quick/Quick";

const MbtiPage = () => {
  return (
    <>
      <Header />
      <Mbti />
      <Quick />
      <Footer />
    </>
  );
};

export default MbtiPage;