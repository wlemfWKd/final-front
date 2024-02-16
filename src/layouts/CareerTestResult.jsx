import React, { useState } from "react";

function CareerTestResult() {
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apikey: "92a66e624117c92a3fd4ee8379ee5a00",
        qestrnSeq: "6",
        trgetSe: "100209",
        gender: "100323",
        grade: "2",
        startDtm: Date.now(),
        answers:
          "B1=1 B2=2 B3=4 B4=5 B5=1 B6=2 B7=2 B8=2 B9=2 B10=2 B11=2 B12=2 B13=2 B14=1 B15=2 B16=2 B17=1 B18=2 B19=1 B20=1 B21=1 B22=2 B23=2 B24=2 B25=2 B26=2 B27=2 B28=1",
      }),
    };

    try {
      const response = await fetch("/submit-career-test", requestOptions);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("Error submitting career test result:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Submit Result</button>
      {response && (
        <div>
          <p>SUCCESS: {response.SUCC_YN}</p>
          <p>ERROR: {response.ERROR_REASON}</p>
          {response.RESULT && (
            <div>
              <p>Inspct Seq: {response.RESULT.inspctSeq}</p>
              <p>Report URL: {response.RESULT.url}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CareerTestResult;
