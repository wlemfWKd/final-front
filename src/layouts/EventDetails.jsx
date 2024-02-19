// EventDetails.js
import React, { Component } from "react";
import "../css/EventDetails.css";

class EventDetails extends Component {
  handleCloseClick = () => {
    const { onClose } = this.props;
    onClose && onClose();
  };

  render() {
    const { selectedEventDetails } = this.props;

    if (!selectedEventDetails) {
      return null;
    }

    return (
      <div className="event-details">
        <h3>일정 세부 정보</h3>
        <p>날짜: {selectedEventDetails.date}</p>
        <p>내용: {selectedEventDetails.content}</p>
      </div>
    );
  }
}

export default EventDetails;
