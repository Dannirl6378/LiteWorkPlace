import React from "react";
import Calender from "./Calender";
import { startOfWeek, format, addDays } from "date-fns";

interface CalendarDaysProps {
  currentMonth: Date;
}

const CalendarDays = ({ currentMonth }: CalendarDaysProps) => {
  const startDate = startOfWeek(currentMonth);

  const days = Array.from({ length: 7 }).map((_, i) => (
    <div className="col col-center" key={i}>
      {format(addDays(startDate, i), "EEEE")}
    </div>
  ));

  return <div></div>;
};
export default CalendarDays;
