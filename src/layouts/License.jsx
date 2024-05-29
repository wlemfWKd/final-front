import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/License.css";

const License = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pagingBlock = 5;

  const [categories, setCategories] = useState({
    largeCategory: "",
    mediumCategory: "",
    grade: "",
  });

  useEffect(() => {
    const fetchlist = async () => {
      try {
        const responseList = await axios.get("/license/list");
        setData(responseList.data);
      } catch (error) {
        console.error("Error fetching info:", error);
      }
    };

    fetchlist();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const filteredItems = data.filter(
        (item) =>
          (appliedSearchTerm.trim() === "" ||
            appliedSearchTerm
              .split("")
              .every((char) => item.jmfldnm.includes(char))) &&
          (!categories.largeCategory ||
            item.obligfldnm === categories.largeCategory) &&
          (!categories.mediumCategory ||
            item.mdobligfldnm === categories.mediumCategory) &&
          (!categories.grade || item.seriesnm === categories.grade)
      );
      setFilteredData(filteredItems);
    }
  }, [data, appliedSearchTerm, categories]);

  const filterData = () => {
    const filteredItems = data.filter((item) => {
      const matchesSearchTerm =
        appliedSearchTerm.trim() === "" ||
        item.jmfldnm.includes(appliedSearchTerm);

      const matchesLargeCategory =
        !categories.largeCategory ||
        item.obligfldnm === categories.largeCategory;

      const matchesMediumCategory =
        !categories.mediumCategory ||
        item.mdobligfldnm === categories.mediumCategory;

      const matchesGrade =
        !categories.grade || item.seriesnm === categories.grade;

      return (
        matchesSearchTerm &&
        matchesLargeCategory &&
        matchesMediumCategory &&
        matchesGrade
      );
    });
    setFilteredData(filteredItems);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleApplySearch = () => {
    setAppliedSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleApplySearch();
    }
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const visiblePages = Array.from(
    { length: Math.min(pagingBlock, totalPages) },
    (_, index) =>
      index + Math.floor((currentPage - 1) / pagingBlock) * pagingBlock + 1
  ).filter((page) => page <= totalPages);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - pagingBlock, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + pagingBlock, totalPages));
  };

  return (
    <>
      <hr />
      <div className="centered-container">
        <h1>자격증 검색</h1>
        <div className="menu-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="검색어 입력"
              value={searchTerm}
              onChange={handleSearchTermChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleApplySearch}>검색</button>
          </div>

          <div className="dropdown-container">
            <select
              value={categories.largeCategory}
              onChange={(e) =>
                setCategories({
                  ...categories,
                  largeCategory: e.target.value,
                  mediumCategory: "",
                })
              }
            >
              <option value="">대분류 선택</option>
              {Array.from(new Set(data.map((item) => item.obligfldnm))).map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>

            <select
              value={categories.mediumCategory}
              onChange={(e) =>
                setCategories({ ...categories, mediumCategory: e.target.value })
              }
              disabled={!categories.largeCategory}
            >
              <option value="">중분류 선택</option>
              {data
                .filter((item) => item.obligfldnm === categories.largeCategory)
                .map((item) => item.mdobligfldnm)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>

            <select
              value={categories.grade}
              onChange={(e) =>
                setCategories({ ...categories, grade: e.target.value })
              }
              disabled={!categories.largeCategory || !categories.mediumCategory}
            >
              <option value="">등급</option>
              {data
                .filter(
                  (item) =>
                    item.obligfldnm === categories.largeCategory &&
                    item.mdobligfldnm === categories.mediumCategory
                )
                .map((item) => item.seriesnm)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map((seriesnm) => (
                  <option key={seriesnm} value={seriesnm}>
                    {seriesnm}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="LicenseList">
          {filteredData.length > 0 ? (
            <>
              <ul>
                {getCurrentPageData().map((item) => (
                  <li key={item.jmcd}>
                    <Link
                      to={{
                        pathname: `/detail/${encodeURIComponent(item.jmfldnm)}`,
                        state: {
                          jmcd: item.jmcd,
                          seriescd: item.seriescd,
                        },
                      }}
                    >
                      <span className="link-text">
                        {item.jmfldnm} &nbsp;
                        {item.jmcd && (
                          <span className="company">한국산업인력공단</span>
                        )}
                      </span>
                      <br />
                      {item.jmcd && <p>{item.qualgbnm}</p>}
                      {item.jmcd && (
                        <p>
                          {item.obligfldnm}, {item.mdobligfldnm}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="page-container">
                <ul className="pagination">
                  {currentPage > pagingBlock && (
                    <li className="page-item">
                      <button onClick={handlePrev} className="page-link">
                        이전
                      </button>
                    </li>
                  )}
                  {visiblePages.map((page) => (
                    <li key={page} className="page-item">
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`page-link ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  {totalPages > pagingBlock && (
                    <li className="page-item">
                      <button onClick={handleNext} className="page-link">
                        다음
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </>
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default License;
