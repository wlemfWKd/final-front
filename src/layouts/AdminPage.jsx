import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const AdminPage = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    // 회원 목록을 가져오는 API 호출
    const fetchMembers = async () => {
      try {
        const response = await axios.get("/api/members");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleMemberClick = async (memberId) => {
    try {
      const response = await axios.get(`/api/members/${memberId}`);
      setSelectedMember(response.data);
    } catch (error) {
      console.error("Error fetching member details:", error);
    }
  };

  return (
    <div>
      <Header />
      <h1>Member Management</h1>
      <div>
        <h2>Member List</h2>
        <ul>
          {members.map((member) => (
            <li key={member.id} onClick={() => handleMemberClick(member.id)}>
              {member.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedMember && (
        <div>
          <h2>Member Details</h2>
          <p>ID: {selectedMember.id}</p>
          <p>Name: {selectedMember.name}</p>
          <p>Email: {selectedMember.email}</p>
          {/* Add more details as needed */}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AdminPage;
