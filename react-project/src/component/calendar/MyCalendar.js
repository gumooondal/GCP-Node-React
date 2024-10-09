import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/MyCalendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="calendar-container"> {/* 캘린더를 감싸는 div 추가 */}
      <h1>My Calendar</h1>
      <Calendar onChange={handleDateChange} value={date} />
      <p className="selected-date">선택한 날짜: {date.toDateString()}</p> {/* 스타일 적용 */}
    </div>
  );
};

export default MyCalendar;
