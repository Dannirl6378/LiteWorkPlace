import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  parse,
} from "date-fns";

interface CalendarCellsProps {
  currentMonth: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const CalendarCells = ({
  currentMonth,
  selectedDate,
  setSelectedDate,
}: CalendarCellsProps) => {
  return <div></div>;
};
