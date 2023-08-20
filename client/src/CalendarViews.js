// CalendarViews.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarViews() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      {/* Month View */}
      <Calendar value={date} onChange={setDate} />

      {/* Other calendar views will go here */}
    </div>
  );
}

export default CalendarViews;
