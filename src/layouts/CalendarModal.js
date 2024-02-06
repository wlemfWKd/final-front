// CalendarModal.js
import React, { Component } from "react";
import "../css/CalendarModal.css";

class CalendarModal extends Component {
  state = {
    eventName: "",
    startDate: "",
    endDate: "",
  };

  componentDidMount() {
    const { isEditMode, eventDetails } = this.props;

    if (isEditMode && eventDetails) {
      // 수정 모드에서는 기존 이벤트 정보를 모달에 표시
      this.setState({
        eventName: eventDetails.title || "",
        startDate: eventDetails.start || "",
        endDate: eventDetails.end || "",
      });
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleAddEvent = () => {
    const { onClose, onAddEvent } = this.props;
    const { eventName, startDate, endDate } = this.state;

    onAddEvent(eventName, startDate, endDate);

    onClose();
  };

  handleDeleteEvent = () => {
    const { onDeleteEvent, onClose } = this.props;
    onDeleteEvent();

    onClose(); // 삭제 후에 모달을 닫을 수 있도록 추가
  };

  render() {
    const { onClose, isEditMode } = this.props;
    const { eventName, startDate, endDate } = this.state;

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>{isEditMode ? "Edit Event" : "Add Event"}</h2>
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={this.handleInputChange}
          />

          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={this.handleInputChange}
          />

          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={this.handleInputChange}
          />

          <button onClick={this.handleAddEvent}>
            {isEditMode ? "Edit Event" : "Add Event"}
          </button>

          {isEditMode && (
            <button onClick={this.handleDeleteEvent}>Delete Event</button>
          )}
        </div>
      </div>
    );
  }
}

export default CalendarModal;
