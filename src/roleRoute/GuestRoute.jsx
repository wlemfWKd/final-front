import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios.post("/getMemberInfo", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.result === "Success") {
          setRole(response.data.currentMember.role);
        }
      } catch (error) {
        console.error("Error fetching member info:", error);
      } finally {
        setLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로 변경
      }
    };
    fetchMemberInfo();
  }, []);
  if (loading) {
    // 데이터 로딩 중이라면 로딩 스피너 등을 보여줄 수 있습니다.
    return <>로딩중</>;
  }
  if (role !== "ADMIN" && role !== "USER" && role != "GUEST") {
    return <Navigate to="/login" />;
  }
};

export default GuestRoute;
