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

  componentDidMount() {
    this.fetchList();
  }

  fetchList() {
    axios
      .get("/license/list")
      .then((response) => {
        this.setState({ listData: response.data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

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
            {this.state.listData.map((item) => (
              <div key={item.jmcd}>
                <p>자격명: {item.jmfldnm}</p>
                <p>시리즈 코드: {item.seriescd}</p>
              </div>
            ))}
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,dayGridWeek,dayGridDay",
              }}
              events={events}
              dateClick={this.handleDateClick}
              eventClick={this.handleEventClick}
              nextDayThreshold={"24:00:00"}
              selectable={true}
              select={this.handleSelect}
            />
          </div>
          <EventDetails selectedEventDetails={selectedEventDetails} />
        </div>
        {/* {showModal && (
          <CalendarModal
            date={modalDate}
            onClose={this.handleCloseModal}
            startDate={modalStartDate}
            endDate={modalEndDate}
            diff={diff}
            onAddEvent={this.handleAddEvent}
            onDeleteEvent={this.handleDeleteEvent}
            isEditMode={!!selectedEventId}
          />
        )} */}
        <Quick />
        <Footer />
      </>
    );
  }
}

export default MyCalendar;
