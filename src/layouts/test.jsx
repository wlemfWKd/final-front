import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

const Test = () => {

    const [listData, setListData] = useState([]);
    const [testDates, setTestDates] = useState(null);
    const serviceKey =
    "8RQmmNMbqQKZO06m6d44ZNTJv55aWC7ld4cj5de9n14a6o3tbFOrn/F3Aa5cVQzRVlpUr2nt2J9sjnqrnD2KLA==";

    useEffect(() => {
        const fetchList = async () => {
            try {
                const responseList = await axios.get('/license/list');
                const responseListData = responseList.data;
                setListData(responseListData);

            } catch (error) {
                console.error('Error fetching info:', error);
            }

        };    
      
        fetchList();
    }, []);


    


    return (
        <>
       <div id="section2">
          
          {listData && listData.map(item => {
                if (item.jmcd === "1320") {
                    return (
                        <Card key={item.jmcd}>
                            <Card.Body>
                                <Card.Title>{item.jmfldnm}</Card.Title>
                                <Card.Text>시험명 | 시험이름</Card.Text>
                                <Card.Text>접수일 | 00.00.00</Card.Text>
                                <Card.Text>시험일 | 00.00.00</Card.Text>
                                <Card.Link href={`/detail/${encodeURIComponent(item.jmfldnm)}`} id="border">
                                    <span>상세보기</span>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}
          
          {listData && listData.map(item => {
                if (item.jmcd === "0752") {
                    return (
                        <Card key={item.jmcd}>
                            <Card.Body>
                                <Card.Title>{item.jmfldnm}</Card.Title>
                                <Card.Text>시험명 | 시험이름</Card.Text>
                                <Card.Text>접수일 | 00.00.00</Card.Text>
                                <Card.Text>시험일 | 00.00.00</Card.Text>
                                <Card.Link href={`/detail/${encodeURIComponent(item.jmfldnm)}`} id="border">
                                    <span>상세보기</span>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}

            {listData && listData.map(item => {
                if (item.jmcd === "7780") {
                    return (
                        <Card key={item.jmcd}>
                            <Card.Body>
                                <Card.Title>{item.jmfldnm}</Card.Title>
                                <Card.Text>시험명 | 시험이름</Card.Text>
                                <Card.Text>접수일 | 00.00.00</Card.Text>
                                <Card.Text>시험일 | 00.00.00</Card.Text>
                                <Card.Link href={`/detail/${encodeURIComponent(item.jmfldnm)}`} id="border">
                                    <span>상세보기</span>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}

            {listData && listData.map(item => {
                if (item.jmcd === "7798") {
                    return (
                        <Card key={item.jmcd}>
                            <Card.Body>
                                <Card.Title>{item.jmfldnm}</Card.Title>
                                <Card.Text>시험명 | 시험이름</Card.Text>
                                <Card.Text>접수일 | 00.00.00</Card.Text>
                                <Card.Text>시험일 | 00.00.00</Card.Text>
                                <Card.Link href={`/detail/${encodeURIComponent(item.jmfldnm)}`} id="border">
                                    <span>상세보기</span>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}

          </div>

          <div id="section3">

            {listData && listData.map(item => {
                if (item.jmcd === "7795") {
                    return (
                        <Card key={item.jmcd}>
                            <Card.Body>
                                <Card.Title>{item.jmfldnm}</Card.Title>
                                <Card.Text>시험명 | 시험이름</Card.Text>
                                <Card.Text>접수일 | 00.00.00</Card.Text>
                                <Card.Text>시험일 | 00.00.00</Card.Text>
                                <Card.Link href={`/detail/${encodeURIComponent(item.jmfldnm)}`} id="border">
                                    <span>상세보기</span>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}

            {listData && listData.map(item => {
                if (item.jmcd === "2301") {
                    return (
                        <Card key={item.jmcd}>
                            <Card.Body>
                                <Card.Title>{item.jmfldnm}</Card.Title>
                                <Card.Text>시험명 | 시험이름</Card.Text>
                                <Card.Text>접수일 | 00.00.00</Card.Text>
                                <Card.Text>시험일 | 00.00.00</Card.Text>
                                <Card.Link href={`/detail/${encodeURIComponent(item.jmfldnm)}`} id="border">
                                    <span>상세보기</span>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}

            {listData && listData.map(item => {
                if (item.jmcd === "0622") {
                    return (
                        <Card key={item.jmcd}>
                            <Card.Body>
                                <Card.Title>{item.jmfldnm}</Card.Title>
                                <Card.Text>시험명 | 시험이름</Card.Text>
                                <Card.Text>접수일 | 00.00.00</Card.Text>
                                <Card.Text>시험일 | 00.00.00</Card.Text>
                                <Card.Link href={`/detail/${encodeURIComponent(item.jmfldnm)}`} id="border">
                                    <span>상세보기</span>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}

            {listData && listData.map(item => {
                if (item.jmcd === "1240") {
                    return (
                        <Card key={item.jmcd}>
                            <Card.Body>
                                <Card.Title>{item.jmfldnm}</Card.Title>
                                <Card.Text>시험명 | 시험이름</Card.Text>
                                <Card.Text>접수일 | 00.00.00</Card.Text>
                                <Card.Text>시험일 | 00.00.00</Card.Text>
                                <Card.Link href={`/detail/${encodeURIComponent(item.jmfldnm)}`} id="border">
                                    <span>상세보기</span>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}
          </div>
      </>
    );
};

export default Test;