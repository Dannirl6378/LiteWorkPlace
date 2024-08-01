import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import EventMsg from "./MyCalenderDial";

export default function MyCalendar() {
  const [selectDate, setSelectDate] = useState<dayjs.Dayjs | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [events, setEvents] = useState<{ [key: string]: string[] }>({});
  const [eventText, setEventText] = useState("");

  const handleDateClick = (date: dayjs.Dayjs) => {
    setSelectDate(date);
    setOpenPopUp(true);
  };

  const handleDiaClose = () => {
    setOpenPopUp(false);
  };
 console.log("openPopUp",openPopUp);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: 150,
          height: 200,
          overflow: "hidden",
          "& .MuiPickersCalendarHeader-root": { height: 30 },
          "& .MuiDayCalendar-weekContainer": { height: "auto" }, 
          "& .MuiPickersDay-root": { width: 20, height: 20 }, 
          "& .MuiDayCalendar-weekDayLabel": {
            fontSize: 10,
            lineHeight: "20px",
            width: 20,
            textAlign: "center",
          },
        }}
      >
        <DateCalendar
          value={dayjs()}
          onChange={handleDateClick}
          sx={{
            width: "100%",
            height: "100%",
            "& .MuiPickersCalendarHeader-root": { height: "auto" },
            "& .MuiDayCalendar-weekContainer": { height: "auto" },
            "& .MuiPickersDay-root": { width: 20, height: 20, padding: 0 },
            "& .MuiDayCalendar-weekDayLabel": {
              fontSize: 10,
              lineHeight: "20px",
              width: 20,
              textAlign: "center",
            },
          }}
        />
      </Box>
      <EventMsg
        open={openPopUp}
        onClose={handleDiaClose}
        eventText={eventText}
        setMsg={setMsg}
      />
    </LocalizationProvider>
  );
}
