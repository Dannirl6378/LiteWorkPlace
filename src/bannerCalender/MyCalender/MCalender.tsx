import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import CustomDay from "./CustomDay";
import EventMsg from "./MyCalenderDial";
import DeleteEvent from "./DeleteEvent";

export default function MyCalendar() {
  const [value, setValue] = useState<Dayjs | null>(null);
  const [selectedDate, setSelectDate] = useState<Dayjs | null>(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [events, setEvents] = useState<{ [key: string]: string[] }>({});
  const [eventText, setEventText] = useState("");

  const handleDateClick = (date: Dayjs | null) => {
    setSelectDate(date);
    setOpenPopUp(true);
  };

  const handleDiaClose = () => {
    setOpenPopUp(false);
  };

  const handleSaveEvent = async () => {
    if (selectedDate) {
      const dateString = selectedDate.format('YYYY-MM-DD');
      const newEvents = {
        ...events,
        [dateString]: [...(events[dateString] || []), eventText],
      };
      setEvents(newEvents);

      // await saveEvent(dateString, eventText);

      setEventText('');
      handleDiaClose();
    }
  };

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
        <StaticDatePicker
          orientation="portrait"
          openTo="day"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slots={{ day: (props) => <CustomDay {...props} events={events} /> }}
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
        setMsg={setEventText}
        onSave={handleSaveEvent}
      />
    </LocalizationProvider>
  );
}
  