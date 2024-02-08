//---------------------------------------------------------------------
// 일정 선택하기

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ChartComponent from "./ChartComponent";
import "../css/Detail.css";

const Detail = () => {
  const [item, setItem] = useState(null);
  const [testDates, setTestDates] = useState(null);
  const [testDates2, setTestDates2] = useState(null);
  const [eventYearPiList, setEventYearPiList] = useState(null);
  const [eventYearSiList, setEventYearSiList] = useState(null);
  const [selectedTestIndex, setSelectedTestIndex] = useState(null);
  const [isTestDatesOpen, setIsTestDatesOpen] = useState(false);
  const [isTestInfoOpen, setIsTestInfoOpen] = useState(false);
  const [isFutureOpen, setIsFutureOpen] = useState(false);
  const [isWrittenChart, setIsWrittenChart] = useState(true);
  const [infoItem, setInfoItem] = useState(null);
  const { jmfldnm } = useParams();
  const serviceKey =
    "8RQmmNMbqQKZO06m6d44ZNTJv55aWC7ld4cj5de9n14a6o3tbFOrn/F3Aa5cVQzRVlpUr2nt2J9sjnqrnD2KLA==";
  const boxStyle = {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    width: "500px",
  };

  const formatDate = (dateString) => {
    // 문자열이 아닌 경우 처리
    if (typeof dateString !== "string") {
      // dateString을 문자열로 변환 (데이터에 따라 적절한 방법 사용)
      dateString = dateString.toString();
    }

    // 날짜가 8자리인지 확인
    if (dateString.length === 8) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      return `${year}년 ${month}월 ${day}일`;
    } else {
      // 적절한 처리 (예: 에러 메시지 출력)
      console.error("Invalid date format:", dateString);
      return "날짜 형식 오류";
    }
  };
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 국가자격 정보 가져오기
        const qualificationApiUrl =
          "/api/service/rest/InquiryListNationalQualifcationSVC/getList";
        const qualificationResponse = await axios.get(qualificationApiUrl, {
          params: {
            serviceKey: serviceKey,
          },
        });

        const items = qualificationResponse.data.response.body.items.item;
        const selectedItem = items.find(
          (item) => item.jmfldnm === decodeURIComponent(jmfldnm)
        );
        setItem(selectedItem);

        // 시험 정보 가져오기
        const infoApiUrl = "/api/service/rest/InquiryQualInfo/getList";
        const infoResponse = await axios.get(infoApiUrl, {
          params: {
            seriesCd: selectedItem.seriescd,
            serviceKey: serviceKey,
          },
        });
        const infoItems = infoResponse.data.response.body.items.item;
        const infoItem = infoItems.find(
          (item) => item.jmNm === decodeURIComponent(jmfldnm)
        );
        setInfoItem(infoItem);

        // 시험일정 정보 가져오기
        const testDatesApiUrl =
          "/api/service/rest/InquiryTestInformationNTQSVC/getJMList";
        const testDatesResponse = await axios.get(testDatesApiUrl, {
          params: {
            jmCd: selectedItem.jmcd,
            serviceKey: serviceKey,
          },
        });
        const testDatesItems = testDatesResponse.data.response.body.items.item;
        setTestDates(testDatesItems);
        setSelectedTestIndex(testDatesItems.length > 0 ? 0 : null);

        // 시험일정2 정보 가져오기
        const testDates2Url =
          "/api/service/rest/InquiryTestDatesNationalProfessionalQualificationSVC/getList";
        const testDates2Response = await axios.get(testDates2Url, {
          params: {
            serviceKey: serviceKey,
            seriesCd: selectedItem.seriescd, // 계열코드를 이용해서 가져옴
          },
        });
        const testDates2Items =
          testDates2Response.data.response.body.items.item;
        setTestDates2(testDates2Items);

        // 종목코드에 맞는 이벤트 연도 통계 데이터 가져오기
        const jmcd = selectedItem.jmcd;
        const eventYearPiListApiUrl =
          "/api/service/rest/InquiryStatSVC/getEventYearPiList";
        const eventYearPiListResponse = await axios.get(eventYearPiListApiUrl, {
          params: {
            baseYY: 2022,
            jmCd: jmcd,
            ServiceKey: serviceKey,
          },
        });

        const eventYearPiListData =
          eventYearPiListResponse.data.response.body.items.item;

        // 만약 데이터가 배열이 아닌 경우, 단일 객체를 배열 요소로 만들어서 할당
        const formattedEventYearPiList = Array.isArray(eventYearPiListData)
          ? eventYearPiListData
          : [eventYearPiListData];

        setEventYearPiList(formattedEventYearPiList);

        // 종목코드에 맞는 실기 연도 통계 데이터 가져오기
        const eventYearSiListApiUrl =
          "/api/service/rest/InquiryStatSVC/getEventYearSiList";
        const eventYearSiListResponse = await axios.get(eventYearSiListApiUrl, {
          params: {
            serviceKey: serviceKey,
            baseYY: 2022,
            jmCd: jmcd,
          },
        });

        const eventYearSiListData =
          eventYearSiListResponse.data.response.body.items.item;

        // 만약 데이터가 배열이 아닌 경우, 단일 객체를 배열 요소로 만들어서 할당
        const formattedEventYearSiList = Array.isArray(eventYearSiListData)
          ? eventYearSiListData
          : [eventYearSiListData];

        setEventYearSiList(formattedEventYearSiList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [jmfldnm, serviceKey]);

  if (!item || !testDates || !eventYearPiList || !eventYearSiList) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="detail-centered-container">
        <div className="detail-title">
          <h2 className="detail-header">{item.jmfldnm}</h2>
        </div>

        <div className="detail-box">
          <p>{infoItem.summary}</p>
        </div>
        <div className="detail-content">
          <div className="detail-intro">
            <p>상세정보</p>
          </div>
          <br />
          <br />
          <div
            className={`test-dates-container ${isTestDatesOpen ? "open" : ""}`}
          >
            <h3 onClick={() => setIsTestDatesOpen(!isTestDatesOpen)}>
              {currentYear}년도 시험일정
            </h3>
            {isTestDatesOpen && (
              <>
                <br />
                {Array.isArray(testDates2) && testDates2.length > 0 ? (
                  <div>
                    <select
                      value={
                        selectedTestIndex !== null ? selectedTestIndex : ""
                      }
                      onChange={(e) =>
                        setSelectedTestIndex(Number(e.target.value))
                      }
                      className="test-dates-select"
                    >
                      <option value="" disabled hidden>
                        ----- 선택 -----
                      </option>
                      {testDates2.map((test, index) => (
                        <option key={index} value={index}>
                          {test.description || `Option ${index + 1}`}
                        </option>
                      ))}
                    </select>
                    <br />
                    <br />
                    {selectedTestIndex !== null ? (
                      <div key={selectedTestIndex} className="test-dates-box">
                        {testDates2[selectedTestIndex].description && (
                          <h4>{testDates2[selectedTestIndex].description}</h4>
                        )}
                        <table>
                          <tr>
                            <td>원서접수 시작일</td>
                            <td>
                              {formatDate(
                                testDates2[selectedTestIndex].examregstartdt
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>원서접수 종료일</td>
                            <td>
                              {formatDate(
                                testDates2[selectedTestIndex].examregenddt
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>원서접수 시작일</td>
                            <td>
                              {formatDate(
                                testDates2[selectedTestIndex].examregstartdt
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>시험 시작일</td>
                            <td>
                              {formatDate(
                                testDates2[selectedTestIndex].examstartdt
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>시험 종료일</td>
                            <td>
                              {formatDate(
                                testDates2[selectedTestIndex].examenddt
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>합격자 발표일</td>
                            <td>
                              {formatDate(
                                testDates2[selectedTestIndex].passstartdt
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>합격자 발표 종료일</td>
                            <td>
                              {formatDate(
                                testDates2[selectedTestIndex].passenddt
                              )}
                            </td>
                          </tr>
                        </table>
                      </div>
                    ) : (
                      <div className="test-dates-box">
                        <p>조회할 회차를 선택해주세요</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={boxStyle} className="test-dates-box">
                    <p>추후 공지</p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className={`test-info ${isTestInfoOpen ? "open" : ""}`}>
            <h3 onClick={() => setIsTestInfoOpen(!isTestInfoOpen)}>
              시험 출제 경향
            </h3>
            {isTestInfoOpen && (
              <>
                <div className="test-trend">
                  <p>시험 트렌드</p>
                </div>
              </>
            )}
          </div>

          <div className={`future ${isFutureOpen ? "open" : ""}`}>
            <h3 onClick={() => setIsFutureOpen(!isFutureOpen)}>미래 전망</h3>
            {isFutureOpen && (
              <div className="future-content">
                <p>내용</p>
              </div>
            )}
          </div>

          <div className="chart">
            {/* 이벤트 연도 통계 출력 */}
            <div className="chart-container">
              {isWrittenChart
                ? eventYearPiList &&
                  eventYearPiList.map((event, index) => (
                    <div key={index} className="chart-box">
                      {event && event.jmnm && (
                        <h4>
                          {event.jmnm} 필기시험 연도별 통계
                          <br />
                        </h4>
                      )}
                      {event && event.ilrcnt1 !== undefined && (
                        <>
                          <br />
                          <br />
                          <div className="chart-inner-box">
                            {event.ilrcnt1 !== undefined && (
                              <ChartComponent
                                data={[
                                  {
                                    name: "2022년",
                                    "접수자 수": event.ilrcnt1,
                                    "응시자 수": event.ilecnt1,
                                    "합격자 수": event.ilpcnt1,
                                  },
                                  {
                                    name: "2021년",
                                    "접수자 수": event.ilrcnt2,
                                    "응시자 수": event.ilecnt2,
                                    "합격자 수": event.ilpcnt2,
                                  },
                                  {
                                    name: "2020년",
                                    "접수자 수": event.ilrcnt3,
                                    "응시자 수": event.ilecnt3,
                                    "합격자 수": event.ilpcnt3,
                                  },
                                  {
                                    name: "2019년",
                                    "접수자 수": event.ilrcnt4,
                                    "응시자 수": event.ilecnt4,
                                    "합격자 수": event.ilpcnt4,
                                  },
                                  {
                                    name: "2018년",
                                    "접수자 수": event.ilrcnt5,
                                    "응시자 수": event.ilecnt5,
                                    "합격자 수": event.ilpcnt5,
                                  },
                                ]}
                              />
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))
                : eventYearSiList &&
                  eventYearSiList.map((event, index) => (
                    <div key={index} className="chart-box">
                      {event && event.jmnm && (
                        <h4>
                          {event.jmnm} 실기시험 연도별 통계
                          <br />
                        </h4>
                      )}
                      {event && event.ilrcnt1 !== undefined && (
                        <div>
                          <br />
                          <br />
                          <div className="chart-inner-box">
                            {event.ilrcnt1 !== undefined && (
                              <ChartComponent
                                data={[
                                  {
                                    name: "2022년",
                                    "접수자 수": event.ilrcnt1,
                                    "응시자 수": event.ilecnt1,
                                    "합격자 수": event.ilpcnt1,
                                  },
                                  {
                                    name: "2021년",
                                    "접수자 수": event.ilrcnt2,
                                    "응시자 수": event.ilecnt2,
                                    "합격자 수": event.ilpcnt2,
                                  },
                                  {
                                    name: "2020년",
                                    "접수자 수": event.ilrcnt3,
                                    "응시자 수": event.ilecnt3,
                                    "합격자 수": event.ilpcnt3,
                                  },
                                  {
                                    name: "2019년",
                                    "접수자 수": event.ilrcnt4,
                                    "응시자 수": event.ilecnt4,
                                    "합격자 수": event.ilpcnt4,
                                  },
                                  {
                                    name: "2018년",
                                    "접수자 수": event.ilrcnt5,
                                    "응시자 수": event.ilecnt5,
                                    "합격자 수": event.ilpcnt5,
                                  },
                                ]}
                              />
                            )}
                          </div>
                        </div>
                      )}
                      <br />
                    </div>
                  ))}
              <div className="chart-toggle-buttons">
                <button onClick={() => setIsWrittenChart(true)}>필기</button>
                <button onClick={() => setIsWrittenChart(false)}>실기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
