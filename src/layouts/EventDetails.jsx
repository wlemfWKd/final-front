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
        {/* 다른 세부 정보 표시 */}

        <button className="close-button" onClick={this.handleCloseClick}>
          닫기
        </button>
      </div>
    );
  }
}

export default EventDetails;
