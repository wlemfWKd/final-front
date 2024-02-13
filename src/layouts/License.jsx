// 전체 데이터 출력

//  import React, { useEffect, useState } from 'react';
//  import axios from 'axios'
//  const App = () => {
//    const [data, setData] = useState(null);
//    const serviceKey = '8RQmmNMbqQKZO06m6d44ZNTJv55aWC7ld4cj5de9n14a6o3tbFOrn/F3Aa5cVQzRVlpUr2nt2J9sjnqrnD2KLA=='
//    useEffect(() => {
//      const fetchData = async () => {
//        try {
//          const apiUrl = '/api/service/rest/InquiryListNationalQualifcationSVC/getList';
//          const response = await axios.get(apiUrl, {
//            params: {
//              serviceKey: serviceKey,
//              // 여기에 필요한 다른 파라미터 추가 가능
//            },
//          })
//          setData(response.data);
//        } catch (error) {
//          console.error('Error fetching data:', error);
//        }
//      }
//      fetchData();
//    }, [serviceKey])
//    return (
//      <div>
//        <h1>공공데이터 출력 예제</h1>
//        {data ? (
//          <pre>{JSON.stringify(data, null, 2)}</pre>
//        ) : (
//          <p>Loading...</p>
//        )}
//      </div>
//    );
//  }
//  export default App;


//----------------------------------------------------------------------------------------------------------------
//검색 기능 추가


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [data, setData] = useState(null);
//   const [filteredData, setFilteredData] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [appliedSearchTerm, setAppliedSearchTerm] = useState(''); // 추가된 부분
//   const serviceKey = '8RQmmNMbqQKZO06m6d44ZNTJv55aWC7ld4cj5de9n14a6o3tbFOrn/F3Aa5cVQzRVlpUr2nt2J9sjnqrnD2KLA==';

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiUrl = '/api/service/rest/InquiryListNationalQualifcationSVC/getList';
//         const response = await axios.get(apiUrl, {
//           params: {
//             serviceKey: serviceKey,
//           },
//         });

//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [serviceKey]);

//   useEffect(() => {
//     // data가 변경되거나 appliedSearchTerm이 변경될 때마다 filteredData 업데이트
//     if (data && data.response && data.response.body && data.response.body.items) {
//       const filteredItems = data.response.body.items.item.filter(item => item.jmfldnm.includes(appliedSearchTerm));
//       setFilteredData(filteredItems);
//     }
//   }, [data, appliedSearchTerm]);

//   const handleSearchTermChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleApplySearch = () => {
//     // 검색어 적용 버튼 클릭 시 appliedSearchTerm 업데이트
//     setAppliedSearchTerm(searchTerm);
//   };

//   return (
//     <div>
//       <h1>공공데이터 출력 예제</h1>
//       <input
//         type="text"
//         placeholder="검색어 입력"
//         value={searchTerm}
//         onChange={handleSearchTermChange}
//       />
//       <button onClick={handleApplySearch}>검색 적용</button>
//       {filteredData ? (
//         <pre>{JSON.stringify(filteredData, null, 2)}</pre>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default App;


//--------------------------------------------------------------------------------------
// 페이지 이동시키기 ( 전체 목록 출력 )


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom'
// const License = () => {
//   const [data, setData] = useState(null);
//   const [filteredData, setFilteredData] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
//   const serviceKey = '8RQmmNMbqQKZO06m6d44ZNTJv55aWC7ld4cj5de9n14a6o3tbFOrn/F3Aa5cVQzRVlpUr2nt2J9sjnqrnD2KLA=='
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiUrl = '/api/service/rest/InquiryListNationalQualifcationSVC/getList';
//         const response = await axios.get(apiUrl, {
//           params: {
//             serviceKey: serviceKey,
//           },
//         })
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     fetchData();
//   }, [serviceKey])
//   useEffect(() => {
//     if (data && data.response && data.response.body && data.response.body.items) {
//       const filteredItems = data.response.body.items.item.filter(item => item.jmfldnm.includes(appliedSearchTerm));
//       setFilteredData(filteredItems);
//     }
//   }, [data, appliedSearchTerm])
//   const handleSearchTermChange = (event) => {
//     setSearchTerm(event.target.value);
//   }
//   const handleApplySearch = () => {
//     setAppliedSearchTerm(searchTerm);
//   }
//   const handleKeyPress = (event) => {
//     // Enter 키를 누르면 검색 적용
//     if (event.key === 'Enter') {
//       handleApplySearch();
//     }
//   }
//   return (
//     <div>
//       <h1>자격증 정보 검색</h1>
//       <input
//         type="text"
//         placeholder="검색어 입력"
//         value={searchTerm}
//         onChange={handleSearchTermChange}
//         onKeyPress={handleKeyPress}
//       />
//       <button onClick={handleApplySearch}>검색 적용</button>
//       {filteredData ? (
//         <ul>
//           {filteredData.map(item => (
//             <li key={item.jmcd}>
//               <Link to={`/detail/${encodeURIComponent(item.jmfldnm)}`}>{item.jmfldnm}</Link>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }
// export default License;

//-------------------------------------------------------------------------------------------------
// 페이징 처리해서 하는 법

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/License.css';

const License = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const pagingBlock = 10;
  const serviceKey = '8RQmmNMbqQKZO06m6d44ZNTJv55aWC7ld4cj5de9n14a6o3tbFOrn/F3Aa5cVQzRVlpUr2nt2J9sjnqrnD2KLA==';

 
  const [categories, setCategories] = useState({
    largeCategory: '',
    mediumCategory: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = '/api/service/rest/InquiryListNationalQualifcationSVC/getList';
        const response = await axios.get(apiUrl, {
          params: {
            serviceKey: serviceKey,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [serviceKey]);

  useEffect(() => {
    if (data && data.response && data.response.body && data.response.body.items) {
      const largeCategories = Array.from(new Set(data.response.body.items.item.map(item => item.obligfldnm)));
      setCategories(prevCategories => ({ ...prevCategories, largeCategories }));
    }
  }, [data]);

  useEffect(() => {
    if (data && data.response && data.response.body && data.response.body.items) {
      const filteredItems = data.response.body.items.item.filter(item =>
        item.jmfldnm.includes(appliedSearchTerm) &&
        (!categories.largeCategory || item.obligfldnm === categories.largeCategory) &&
        (!categories.mediumCategory || item.mdobligfldnm === categories.mediumCategory)
      );
      setFilteredData(filteredItems);
    }
  }, [data, appliedSearchTerm, categories]);

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleApplySearch = () => {
    setAppliedSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleApplySearch();
    }
  };

  const getCurrentPageData = () => {
    if (!filteredData) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

  const visiblePages = Array.from(
    { length: Math.min(pagingBlock, totalPages) },
    (_, index) => index + (Math.floor((currentPage - 1) / pagingBlock) * pagingBlock) + 1
  ).filter(page => page <= totalPages);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    setCurrentPage(prevPage => Math.max(prevPage - pagingBlock, 1));
  };

  const handleNext = () => {
    setCurrentPage(prevPage => Math.min(prevPage + pagingBlock, totalPages));
  };

  return (
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
          onChange={e => setCategories({ ...categories, largeCategory: e.target.value, mediumCategory: '' })}
        >
          <option value="">대분류 선택</option>
          {categories.largeCategories &&
            Array.from(new Set(categories.largeCategories)).map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
  
        <select
          value={categories.mediumCategory}
          onChange={e => setCategories({ ...categories, mediumCategory: e.target.value })}
          disabled={!categories.largeCategory || categories.largeCategory === ''} // 대분류 선택 전이거나 빈 값인 경우 비활성화
        >
          <option value="">중분류 선택</option>
          {data?.response?.body?.items?.item
            .filter(item => item.obligfldnm === categories.largeCategory)
            .map(item => item.mdobligfldnm)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>

        <select>
          <option>날짜</option>
        </select>
      </div>
      </div>
      <div className="LicenseList">
      {filteredData ? (
        <>
          {filteredData.length > 0 ? (
            <ul>
              {getCurrentPageData().map(item => (
                <li key={item.jmcd}>
                  <Link to={{
                      pathname: `/detail/${encodeURIComponent(item.jmfldnm)}`,
                      state: {
                        jmcd: item.jmcd,
                        seriescd: item.seriescd
                      }
                    }}>
                    <span className="link-text">
                    {item.jmfldnm} &nbsp;{item.jmcd && <span className="company">한국산업인력공단</span>}
                    </span>
                  <br/>
                  {item.jmcd && <p>{item.qualgbnm}</p>}
                  {item.jmcd && <p>{item.obligfldnm}, {item.mdobligfldnm}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
          <div class="page-container">
            {currentPage > pagingBlock && (
              <button onClick={handlePrev}>이전</button>
            )}
            {visiblePages.map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            ))}
            {totalPages > pagingBlock && (
              <button onClick={handleNext}>다음</button>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>

   </div>
    
  );
  };
  
  export default License;