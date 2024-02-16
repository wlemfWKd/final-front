// const express = require("express");
// const oracledb = require("oracledb");

// const app = express();
// const PORT = 8081;

// app.listen(PORT, function () {
//   console.log(`Server is running on port ${PORT}`);
// });

// app.get("/date", function (req, res) {
//   oracledb.getConnection(
//     {
//       user: "B1L3",
//       password: "Qordldldl123",
//       connectString:
//         "adb.ap-chuncheon-1.oraclecloud.com:1522/g3dda3408c1dce5_b1l3_high", // 여기에 연결 문자열을 넣어주세요
//     },
//     function (err, connection) {
//       if (err) {
//         console.error("Error connecting to Oracle database: ", err.message);
//         return;
//       }

//       connection.execute(
//         `SELECT DESCRIPTION as title, DOCEXAMDT, DOCPASSDT, DOCREGENDDT, DOCREGSTARTDT as date, DOCSUBMITENTDT, DOCSUBMITSTARTDT, PRACEXAMENDDT, PRACEXAMSTARTDT, PRACPASSDT, PRACREGENDDT, PRACREGSTARTDT
//                             FROM licensedate
//                             ORDER BY DOCREGSTARTDT, DESCRIPTION`,
//         [],
//         function (err, result) {
//           if (err) {
//             console.error("Error executing query: ", err.message);
//             connection.close(function (err) {
//               if (err) {
//                 console.error("Error closing connection: ", err.message);
//               }
//             });
//             return;
//           }

//           console.log("Query result: ", result.rows);
//           connection.close(function (err) {
//             if (err) {
//               console.error("Error closing connection: ", err.message);
//             }
//           });
//           res.json(result.rows);
//         }
//       );
//     }
//   );
// });

const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 8000;

app.get("/license/date", async (req, res) => {
  try {
    // Java 서버의 API 엔드포인트 URL
    const javaAPIUrl = "http://localhost:8080/license/date";

    // Java 서버의 API를 호출하여 데이터를 가져옴
    const response = await axios.get(javaAPIUrl);

    // const modifiedData = req.query.map((item) => ({
    //   // 데이터 필드를 새로운 이름으로 지정하여 JSON 형식으로 변환
    //   title: item.DESCRIPTION,
    //   start: item.DOCREGSTARTDT,
    //   end: item.DOCREGENDDT,
    // }));

    const { DESCRIPTION, DOCREGSTARTDT, DOCREGENDDT } = req.query;
    const modifiedData = {
      title: DESCRIPTION,
      start: DOCREGSTARTDT,
      end: DOCREGENDDT,
    };
    // Java 서버로부터 받은 데이터를 클라이언트에게 응답으로 전송
    console.log("dsjfhksdlhfjdskl");
    res.json(modifiedData);
  } catch (error) {
    console.error("Error fetching data from Java server:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
