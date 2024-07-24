import React from "react";
import { format, addMonths, subMonths } from "date-fns";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface CalenderHeaderProps {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
}
const CalenderHeader = ({
  currentMonth,
  setCurrentMonth,
}: CalenderHeaderProps) => {
  return (
    <div className="headerCall">
      <div className="col-startCall">
        <div
          className="icon"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          <ChevronLeftIcon />
        </div>
      </div>
      <div className="monthCall">
        <span>{format(currentMonth, "MMMM yyyy")}</span>
      </div>
      <div
        className="col-endCall"
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
      >
        <ChevronRightIcon />
      </div>
    </div>
  );
};
export default CalenderHeader;