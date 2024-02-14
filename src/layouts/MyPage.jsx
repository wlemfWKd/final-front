import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../css/MyPage.css";
import { useNavigate } from "react-router-dom";

const MyPage = () => {

    
    const navigate = useNavigate();
    const [member, setMember] = useState({
        memberNum: "",
        memberName: "",
        username: "",
        password: "",
        email: "",
        domain: "",
        phoneNum: "",
        socialNum1:"",
        socialNum2:""
    });
    const [memberInfo, setMemberInfo] = useState({});
    const [userPasswordCheck, setUserPasswordCheck] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isPasswordDisabled, setIsPasswordDisabled] = useState(false);
    const [randomInitial, setRandomInitial]= useState("");
    const [userId, setUserId] = useState("");
    useEffect(() => {
       
        const fetchMemberInfo = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.post("/getMemberInfo", null, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.result === "Success") {
                    setMemberInfo({
                        memberNum: response.data.currentMember.memberNum,
                        memberName: response.data.currentMember.memberName,
                        password: "",
                        email: response.data.currentMember.email,
                        domain:"",
                        phoneNum: response.data.currentMember.phoneNum,
                    });
                    setMember({
                        memberNum: response.data.currentMember.memberNum,
                        memberName: response.data.currentMember.memberName,
                        password: "",
                        email: response.data.currentMember.email,
                        domain:"",
                        phoneNum: response.data.currentMember.phoneNum,
                    })
                    if(response.data.currentMember.socialType === "GOOGLE" || 
                       response.data.currentMember.socialType === "KAKAO" || 
                       response.data.currentMember.socialType === "NAVER"){
                        setUserId(response.data.currentMember.socialType + " 로그인 회원입니다.");
                        setIsPasswordDisabled(true)
                    } else {
                        setUserId(response.data.currentMember.username);
                    }
                }
            } catch (error) {
                console.error("Error fetching member info:", error);
            }
        };
        fetchMemberInfo();
        setUserPasswordCheck("");
    }, []);

 // 이메일 중복확인
 const [isEmailCheckButtonDisabled, setIsEmailCheckButtonDisabled] = useState(true);
 const checkEmail = async (event) => {
     event.preventDefault();
     // 추가적인 유효성 검사가 필요하다면 여기에 추가
     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
     if (!emailRegex.test(member.email + member.domain)) {
         alert("올바른 이메일 형식이 아닙니다.");
         return;
     }
     try {
         // 적절한 엔드포인트와 데이터를 사용
         const response = await axios.post("/checkEmail", {
             email: member.email,
             domain: member.domain,
         });
         // 응답에 따라 처리
         if (response.data === "Exist") {
             alert("해당 이메일은 이미 사용중입니다.");
         } else if (response.data === "Empty") {
             alert("이메일을 입력하세요.");
         } else {
             alert(response.data);
             setIsEmailCheckButtonDisabled(true);
         }
     } catch (error) {
         console.log("데이터 전송 중 오류 발생: ", error);
     }
 };
 const [isEmailCheckButton2Disabled, setIsEmailCheckButton2Disabled] = useState(true);
 const checkMemberEmail = async (event) => {
     event.preventDefault();
     if (!isEmailCheckButtonDisabled) {
         alert("이메일 중복확인 해주세요.");
         return;
     }
     // 추가적인 유효성 검사가 필요하다면 여기에 추가
     try {
         alert("해당 이메일로 인증코드를 전송합니다.\n 최대 1분이 소요될 수 있습니다.\n 전송 완료시 전송 완료 창이 나옵니다.")
         // 적절한 엔드포인트와 데이터를 사용
         const response = await axios.post("/checkMemberEmail", {
             email: member.email,
             domain: member.domain,
         });
         console.log(response.data);
         if(response.data==="Success"){
             alert("해당 이메일로 인증 코드를 전송했습니다.\n"+
             "아래 입력칸에 입력해주세요.");
         }else{
         }
     } catch (error) {
         console.log("데이터 전송 중 오류 발생: ", error);
     }
 };
 const [isEmailCheckButton3Disabled, setIsEmailCheckButton3Disabled] = useState(true);
 const checkCodeSand = async (event) => {
     event.preventDefault();
     if (!randomInitial) {
         alert("코드를 입력해주세요.");
         return;
     }
     // 추가적인 유효성 검사가 필요하다면 여기에 추가
     try {
         // 적절한 엔드포인트와 데이터를 사용
         const response = await axios.post("/checkCode", {
             email: member.email,
             domain: member.domain,
             randomInitial: randomInitial,
         });
         if(response.data==="Success"){
             setIsEmailCheckButton2Disabled(true);
             setIsEmailCheckButton3Disabled(true);
             alert("이메일 인증이 완료되었습니다. \n모든 필드를 채우고 회원가입 버튼을 눌러주세요.")
         }else {
             alert("코드를 확인해주세요.")
         }
     } catch (error) {
         console.log("데이터 전송 중 오류 발생: ", error);
     }
 };
 // 다시작성
 const handleReset2 = () => {
     setMember((prevMember) => ({
         ...prevMember,
         email: "",
         domain: "", // 기본값으로 설정하거나 필요에 따라 변경
     }));
     setIsEmailCheckButtonDisabled(false); // 다시작성 버튼 클릭 시 이메일 중복확인 버튼 활성화
     setIsEmailCheckButton2Disabled(false);
     setIsEmailCheckButton3Disabled(false);
 };
 const handleChange = (field, value) => {       
     if (field === 'password') {
         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
         setIsPasswordValid(passwordRegex.test(value));
     }
     if (field === 'memberName') {
         if (!value.trim()) {
             // 이름이 공백인 경우
             setIsNameValid(false);
         } else {
             // 이름이 공백이 아닌 경우에는 한글로만 이루어지고, 2~5글자인지 검사
             const nameRegex = /^[가-힣]{2,5}$/;
             setIsNameValid(nameRegex.test(value));
         }
     }
     setMember({ ...member, [field]: value });
 };

 const handleDomainChange = (event) => {
     const selectedDomain = event.target.value;
     setMember({ ...member, domain: selectedDomain });
 };

 const formatPhoneNumber = (phoneNumber) => {
     // 전화번호 형식 변환 (000-0000-0000)
     return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
 };
 
 const handlePhoneNumChange = (event) => {
     // 입력된 값에서 숫자만 추출
     const newValue = event.target.value.replace(/[^0-9]/g, '');
     // 최대 11자리까지만 받음
     const truncatedValue = newValue.slice(0, 11);
     // 형식 적용하여 state 업데이트
     setMember({ ...member, phoneNum: formatPhoneNumber(truncatedValue) });
 };
 const handleSubmit = async (event) => {
     event.preventDefault();
     // 이름 유효성 검사
     
     if(member.password !== "" || userPasswordCheck !== ""){
         if(!isPasswordDisabled){
             if (!isPasswordValid) {
                 alert("비밀번호는 최소 8자리, 대문자1, 소문자1, 숫자1로 이루어져야 합니다. (!@#$%^&* 만 가능)");
                 return;
             }
             // 비밀번호 일치 여부 확인
             if (member.password !== userPasswordCheck) {
                 alert("비밀번호가 일치하지 않습니다.");
                 return; 
             }
         }
     }
     if (!isEmailCheckButtonDisabled) {
         alert("이메일 중복확인 해주세요.");
         return;
     }
     if (!isEmailCheckButton3Disabled) {
         alert("이메일 인증을 완료해주세요.");
         return;
     }
     if(memberInfo.memberName !== member.memberName){
         console.log(memberInfo.memberName)
         console.log(member.memberName)
         if (!isNameValid) {
             alert("이름은 한글로 2~5글자 사이여야 합니다.");
             return;
         }
         alert("회원 이름이 변경되었습니다.\n회원정보를 수정하시겠습니까?")
     }
     else if(memberInfo.password !== member.password){
         alert("비밀번호가 변경되었습니다.\n회원정보를 수정하시겠습니까?")
     }
     else if(memberInfo.email !== member.email){
         alert("이메일이 변경되었습니다.\n회원정보를 수정하시겠습니까?")
     } 
     else if(memberInfo.phoneNum !== member.phoneNum){
         const phoneRegex = /^(010|011)\d{8}$/;
         if (!phoneRegex.test(member.phoneNum === null || member.phoneNum.replace(/-/g, '')) ) {
             alert("올바른 전화번호 형식이 아닙니다.");
             return;
         }
         alert("전화번호가 변경되었습니다.\n회원정보를 수정하시겠습니까?")
     } else {
         alert("수정된 정보가 없습니다.");
         return;
     }
     try {
         console.log("수정 정보 보내기")
         // axios를 사용하여 서버로 데이터 전송
         const response = await axios.post("/editMemberInfo", member);
         console.log(response.data);
         // 추가적으로 서버로부터의 응답을 처리하거나 상태를 업데이트할 수 있음
         if (response.data === "Success") {
             console.log(response.data);
             alert("회원정보 수정 완료!");
             navigate("/")
         }else if (response.data === "Equal Password"){
             alert("전과 동일한 비밀번호 입니다.");
             return;
         } else {
             alert("실패");
             console.log(response.data);
         }
     } catch (error) {
         console.log("Error sending data: ", error);
     }
     console.log("폼 제출됨:", member);
 };

 const resetEdit = () => {
     setMember({
         memberName: memberInfo.memberName,
         email: memberInfo.email,
         phoneNum: memberInfo.phoneNum,
         password: memberInfo.password,
     })
     setUserPasswordCheck("");
     setIsEmailCheckButtonDisabled(true);
     setIsEmailCheckButton2Disabled(true);
     setIsEmailCheckButton3Disabled(true);
 };



  return (
    <>
      <Header />

        <div>
        <p>{member.memberName}</p>
        </div>



      <Footer />
    </>
  );
};

export default MyPage;