import React, { useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";




const FindIdOrPwd = () => {
    const navigate = useNavigate();
    // 달력 캘린더 Datepicker
    const [startDate, setStartDate] = useState(new window.Date()); //default: 오늘 날짜
    const [showDatePicker, setShowDatePicker] = useState(false); // DatePicker 모달 열기/닫기 상태
    const toggleDatePicker = (event) => {
        setShowDatePicker(!showDatePicker);
    };
    const [showUserId, setShowUserId] = useState(false); // username 모달 열기/닫기 상태
    const toggleShowUserId = () => {
        setShowUserId(!showUserId);
    };
    const [editNewPassword, setEditNewPassword] = useState(false); // editNewPassword 모달 열기/닫기 상태
    const toggleShowEditNewPassword = () => {
        setEditNewPassword(!editNewPassword);
    };
    const onDatePickHandler = (date) => {
        setStartDate(date);
        //highlightDates에 선택한 날짜가 있는지 검색
        dateToStringForSearch(date)
    }
    //검색용: highlighted인 날짜를 찾기 위해 date 객체를 highlighted에 저장되는 날짜 형식인 
    //(월.일.연도)로 변환
    const dateToStringForSearch = (d) => {
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const date = d.getDate();
        setFindIdOrPwdInfo({...findIdOrPwdInfo, birthday:year+"-"+(month >= 10 ? month : "0" + month)+"-"+(date >= 10 ? date : "0"+date)})
        toggleDatePicker();
        return `${month >= 10 ? month : "0" + month}.${date >= 10 ? date : "0"+date}.${year}`;
    };
    const [activeTab, setActiveTab] = useState("findId"); // 기본값은 아이디 찾기 탭
    const [showDropdown1, setShowDropdown1] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);
    const [showDropdown3, setShowDropdown3] = useState(false);
    const [showDropdown4, setShowDropdown4] = useState(false);
    const [findIdOrPwdInfo, setFindIdOrPwdInfo] = useState({
        memberName: "",
        birthday: "",
        phoneNum: "",
        email: "",
        username: "",
    });
    const [findUsername, setFindUsername] = useState("");
    const [findCreateDate, setFindCreateDate] = useState("");
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFindIdOrPwdInfo({
            ...findIdOrPwdInfo,
            [name]: value,
        });
    };
    const handleActiveTab = (e) => {
        setActiveTab(e);
        setFindIdOrPwdInfo({
            memberName: "",
            birthday: "",
            phoneNum: "",
            email: "",
            username: "",
        });
        setShowUserId(false);
        if(e === "findId"){
            setShowDropdown3(false);
            setShowDropdown4(false);
            setShowDatePicker(false);
        } else {
            setShowDropdown1(false);
            setShowDropdown2(false);
            setShowDatePicker(false);
        }
    };

    const handleDropdownToggle1 = () => {
        setFindIdOrPwdInfo({
            memberName: "",
            birthday: "",
            phoneNum: "",
            email: "",
            username: "",
        });
        setShowDropdown1(!showDropdown1);
        if(showDropdown2){
            setShowDropdown2(false);
            setShowDatePicker(false);
        }
    };
    const handleDropdownToggle2 = () => {
        setFindIdOrPwdInfo({
            memberName: "",
            birthday: "",
            phoneNum: "",
            email: "",
            username: "",
        });
        setShowDropdown2(!showDropdown2);
        if(showDropdown1){
            setShowDropdown1(false);
            setShowDatePicker(false);
        }
    };
    const handleDropdownToggle3 = () => {
        setFindIdOrPwdInfo({
            memberName: "",
            birthday: "",
            phoneNum: "",
            email: "",
            username: "",
        });
        setShowDropdown3(!showDropdown3);
        if(showDropdown4){
            setShowDropdown4(false);
            setShowDatePicker(false);
        }
    };
    const handleDropdownToggle4 = () => {
        setFindIdOrPwdInfo({
            memberName: "",
            birthday: "",
            phoneNum: "",
            email: "",
            username: "",
        });
        setShowDropdown4(!showDropdown4);
        if(showDropdown3){
            setShowDropdown3(false);
            setShowDatePicker(false);
        }
    };
    // 생년월일
    const currentYear = new Date().getFullYear(); // 현재 년도 구하기
    const currentMonth = new Date().getMonth() + 1; // 현재 월 구하기 (0부터 시작하므로 1을 더함)
    const currentDay = new Date().getDate(); // 현재 일 구하기
    const handleBirthdayChange = (event) => {
        // 입력된 값에서 숫자만 추출
        const newValue = event.target.value.replace(/[^0-9]/g, '');
        // 최대 8자리까지만 받음
        const truncatedValue = newValue.slice(0, 8);
        const year = truncatedValue.substring(0, 4);
        const month = truncatedValue.substring(4, 6);
        const day = truncatedValue.substring(6, 8);
    
        // 형식 및 유효성 검사
        if (truncatedValue.length === 8) { 
            // 연도는 00~현재 년도 사이의 값이어야 함
            if (year < 1900 || year > currentYear) {
                alert("올바른 연도 형식이 아닙니다.");
                return;
            }
            if (year === currentYear) {
                // 현재 월 이후의 날짜인 경우
                if (month > currentMonth) {
                    alert("현재 날짜 이후의 날짜는 입력할 수 없습니다.");
                    return;
                }
                // 현재 월과 같은 경우에는 현재 일을 확인
                if (month === currentMonth && day > currentDay) {
                    alert("현재 날짜 이후의 날짜는 입력할 수 없습니다.");
                    return;
                }
            }
            // 월은 1~12 사이의 값이어야 함
            if (month < 1 || month > 12) {
                alert("올바른 월 형식이 아닙니다.");
                return;
            }
    
            // 일은 1~31 사이의 값이어야 함 (해당 월에 따라 조정 필요)
            if (day < 1 || day > 31) {
                alert("올바른 일 형식이 아닙니다.");
                return;
            }
            // 형식 적용하여 state 업데이트
        }
        setFindIdOrPwdInfo((prevFindIdOrPwdInfo) => ({ ...prevFindIdOrPwdInfo, birthday: formatBirthday(truncatedValue) }));
    };
    const formatBirthday = (birthday) => {
        // 생년월일 형식 변환 (0000-00-00)
        return birthday.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
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
        setFindIdOrPwdInfo({ ...findIdOrPwdInfo, phoneNum: formatPhoneNumber(truncatedValue) });
    };
    // 아이디찾기 
    const handleIdSubmit = async () => {
        // 전화번호 유효성 검사
        if(showDropdown1){
            const phoneRegex = /^(010|011)\d{8}$/;
            if (!phoneRegex.test(findIdOrPwdInfo.phoneNum.replace(/-/g, ''))) {
                alert("올바른 전화번호 형식이 아닙니다.");
                return;
            }
        }
        try {
            const response = await axios.post("/findId", findIdOrPwdInfo)
            if(response.data.result==="Success"){
                setFindUsername(response.data.username)
                setFindCreateDate(new Date(response.data.createDate).toISOString().split('T')[0])
                toggleShowUserId();
            } else {
                alert("해당 정보로 가입된 회원이 존재하지 않습니다.")
            }
        } catch (error) {
            
        }
    };
    console.log(findUsername);
    // 비밀번호 찾기 
    const handlePwdSubmit = async () => {
        // 전화번호 유효성 검사
        if(showDropdown3){
            const phoneRegex = /^(010|011)\d{8}$/;
            if (!phoneRegex.test(findIdOrPwdInfo.phoneNum.replace(/-/g, ''))) {
                alert("올바른 전화번호 형식이 아닙니다.");
                return;
            }
        }
        try {
            const response = await axios.post("/findPwd", findIdOrPwdInfo)
            if(response.data.result === "Success"){
                toggleShowEditNewPassword();
                setNewPassword({...newPassword, username:findIdOrPwdInfo.username})
            } else{
                alert("해당 정보로 가입된 회원이 존재하지 않습니다.")
                return;

            }
        } catch (error) {
            
        }
    };
    // 비밀번호 재설정 
    const [newPassword, setNewPassword] = useState({
        password:"",
        username:"",
    });
    console.log(newPassword)
    const [newCheckPassword, setCheckNewPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const handleChange = (field, value) => {
        if (field === 'password') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
            setIsPasswordValid(passwordRegex.test(value));
        }
        setNewPassword({...newPassword, password:value})
    };
    const handleEditPwdSubmit = async (event) => {
        event.preventDefault();
        if(newPassword.password !== newCheckPassword){
            alert("비밀번호를 확인해주세요.");
            return;
        }
        if (!isPasswordValid) {
            alert("비밀번호는 최소 8자리, 대문자1, 소문자1, 숫자1로 이루어져야 합니다. (!@#$%^&* 만 가능)");
            return;
        }
        try {
            const response = await axios.post("/editPassword", newPassword)
            console.log(response.data)
            if(response.data === "Success"){
                toggleShowEditNewPassword();
                alert("비밀번호가 재설정되었습니다.\n로그인 페이지로 이동합니다.")
                navigate("/login");
            } else{
                alert("전과 동일한 비밀번호 입니다.");
                return;
            }
        } catch (error) {
            
        }
    };

    return (
       <>
            
            <form onSubmit={handleEditPwdSubmit}>
    <table>
        <tbody>
            <tr>
                <td>
                    <div style={{ marginBottom: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <span style={{ marginRight: "auto" }}>비밀번호 재설정</span>
                        <span style={{ marginLeft: "auto" }} onClick={toggleShowEditNewPassword}>닫기</span>
                    </div>
                    <input
                        type="password"
                        onChange={(event) => handleChange("password", event.target.value)}
                        value={newPassword.password}
                        placeholder="8자리 이상, 대문자, 숫자. (!@#$%^&* 가능)"
                    />
                    <br />
                    <input
                        type="password"
                        onChange={(event) => setCheckNewPassword(event.target.value)}
                        value={newCheckPassword}
                        placeholder="비밀번호를 재입력해주세요"
                    />
                </td>
            </tr>
        </tbody>
    </table>
    <br />
    <input type="submit" value="재설정" />
</form>

<div>
    <div>
        <span onClick={() => handleActiveTab("findId")}>아이디 찾기</span>
    </div>
    <div>
        <span onClick={() => handleActiveTab("findPwd")}>비밀번호 찾기</span>
    </div>

    <div>
        <span onClick={handleDropdownToggle1}>휴대폰 번호로 찾기</span>
    </div>
    <div>
        <span onClick={handleDropdownToggle2}>이메일로 찾기</span>
    </div>

    <div>
        <span onClick={handleDropdownToggle3}>휴대폰 번호로 찾기</span>
    </div>
    <div>
        <span onClick={handleDropdownToggle4}>이메일로 찾기</span>
    </div>
</div>
            
        
        </>
    );
};

export default FindIdOrPwd;
