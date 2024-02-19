import React, { Component } from "react";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CalendarModal from "./CalendarModal";
import EventDetails from "./EventDetails";
import "../css/calendar.css";
import Quick from "../components/Quick/Quick";
import axios from "axios";

class MyCalendar extends Component {
  state = {
    showModal: false,
    modalDate: null,
    modalStartDate: null,
    modalEndDate: null,
    diff: null,
    selectedEventId: null,
    events: [],
    selectedEventDetails: null,
    listData: [],
  };

  // 아래의 모든 과정은 componentDidMount에 의해, 컴포넌트가 만들어지고 첫 렌더링을 모두 끝낸 후 실행됨
  componentDidMount() {
    this._getEvents();
    // EventDetails 컴포넌트를 초기에 렌더링하기 위해 초기값 설정
    this.setState({
      selectedEventDetails: {
        date: "",
        content: "",
      },
    });
  }

  // axios의 get 메소드를 통해 Back-End의 '/main' url에 정보를 요청하고, 그에 따른 res.data 응답 리턴
  _axiosEvents = async () => {
    try {
      const response = await axios.get("/license/date");
      const responseData = response.data;
      console.log(responseData);
      const modifiedData = responseData.flatMap((item) => [
        {
          title: item.description,
          start: item.docregstartdt,
          end: item.docregenddt,
          backgroundColor: "rgb(255, 204, 0)", // 상위 이벤트 색상
          borderColor: "rgb(255, 204, 0)", // 상위 이벤트 테두리 색상
        },
        {
          title: item.description,
          start: item.pracexamstartdt,
          end: item.pracexamenddt,
          backgroundColor: "rgb(100, 174, 224)", // 하위 이벤트 색상
          borderColor: "rgb(100, 174, 224)", // 하위 이벤트 테두리 색상
        },
      ]);
      return modifiedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  // _axiosEvents이 응답을 받을때까지 기다리고, 응답을 받는다면 setState 메소드를 호출하여 state 값에 events라는 데이터를 넣어줌
  _getEvents = async () => {
    const events = await this._axiosEvents();
    this.setState({
      events,
    });
  };

  getSavedEvents() {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  }

  saveEventsToLocalStorage(events) {
    localStorage.setItem("events", JSON.stringify(events));
  }

  handleDateClick = (arg) => {
    this.setState({
      showModal: true,
      modalDate: arg.dateStr,
      diff: "a",
      selectedEventId: null,
    });
  };

  handleEventClick = (arg) => {
    const selectedEventDetails = {
      date: arg.event.startStr,
      content: arg.event.title,
    };

    this.setState({
      showModal: true,
      modalDate: null,
      modalStartDate: arg.event.startStr,
      modalEndDate: arg.event.endStr,
      diff: "b",
      selectedEventId: arg.event.id,
      selectedEventDetails,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      modalDate: null,
      modalStartDate: null,
      modalEndDate: null,
      selectedEventId: null,
    });
  };

  handleSelect = (arg) => {
    const adjustedEndDate = new Date(arg.end.valueOf());
    adjustedEndDate.setDate(adjustedEndDate.getDate());
    const adjustedEndStr = adjustedEndDate.toISOString().split("T")[0];
    this.setState({
      showModal: true,
      modalStartDate: arg.startStr,
      modalEndDate: adjustedEndStr,
      diff: "b",
      selectedEventId: null,
    });
  };

  handleAddEvent = (eventName, startDate, endDate) => {
    const { selectedEventId, events } = this.state;

    if (selectedEventId) {
      const updatedEvents = events.map((event) =>
        event.id === selectedEventId
          ? { ...event, title: eventName, start: startDate, end: endDate }
          : event
      );
      this.setState({ events: updatedEvents });
    } else {
      const newEvent = {
        id: new Date().toISOString(),
        title: eventName,
        start: startDate,
        end: endDate,
      };
      this.setState((prevState) => ({
        events: [...prevState.events, newEvent],
      }));
    }

    this.saveEventsToLocalStorage(this.state.events);
    this.handleCloseModal();
  };

  handleDeleteEvent = () => {
    const { selectedEventId, events } = this.state;
    if (selectedEventId) {
      const updatedEvents = events.filter(
        (event) => event.id !== selectedEventId
      );
      this.setState({ events: updatedEvents });
      this.saveEventsToLocalStorage(updatedEvents);
      this.handleCloseModal();
    }
  };

  render() {
    const {
      events,
      showModal,
      modalDate,
      modalStartDate,
      modalEndDate,
      diff,
      selectedEventId,
      selectedEventDetails,
    } = this.state;

    return (
      <>
        <Header />
        <div className="container">
          <div className="calender">
            {events ? (
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,dayGridWeek,dayGridDay",
                }}
                events={this.state.events}
                //events={events}
                dateClick={this.handleDateClick}
                eventClick={this.handleEventClick}
                nextDayThreshold={"24:00:00"}
                selectable={true}
                select={this.handleSelect}
              />
            ) : (
              "loading..."
            )}
          </div>
          {selectedEventDetails && (
            <EventDetails selectedEventDetails={selectedEventDetails} />
          )}
        </div>
        <Quick />
        <Footer />
      </>
    );
  }
}

export default MyCalendar;
