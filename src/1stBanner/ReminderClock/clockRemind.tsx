import * as React from "react";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AlarmIcon from "@mui/icons-material/Alarm";
import dayjs, { Dayjs } from "dayjs";
import { IconButton } from "@mui/material";

const AlarmClock: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [currentTime, setCurrentTime] = useState<Dayjs>(dayjs());
  const [alarmTime, setAlarmTime] = useState<Dayjs | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [open, setOpen] = useState(false); // Stát pro otevření TimePickeru

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (alarmTime) {
      const currentHour = currentTime.hour();
      const currentMinute = currentTime.minute();
      const alarmHour = alarmTime.hour();
      const alarmMinute = alarmTime.minute();
      if (currentHour === alarmHour && currentMinute === alarmMinute) {
        alert("Čas vypršel!");
        setAlarmTime(null);
        setSelectedTime(null);
      }
    }
  }, [alarmTime, currentTime]);

  const handleSetAlarm = (newTime: Dayjs | null) => {
    setSelectedTime(newTime);
    if (newTime) {
      setAlarmTime(newTime);
    }
    setOpen(false); // Zavře TimePicker po výběru času
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {isMobile ? (
        <IconButton onClick={() => setOpen(true)}>
          <AlarmIcon />
        </IconButton>
      ) : (
        <TimePicker
          sx={{
            maxWidth: "10vw",
            minWidth: "8vw",
          }}
          label="hh:mm"
          ampm={false}
          value={selectedTime}
          onChange={(newTime) => handleSetAlarm(newTime)}
        />
      )}

      {/* TimePicker pro mobil */}
      {isMobile && (
        <TimePicker
          sx={{ display: "none" }} // Skrytý, ale stále interaktivní
          open={open}
          onClose={() => setOpen(false)}
          label="hh:mm"
          ampm={false}
          value={selectedTime}
          onChange={(newTime) => handleSetAlarm(newTime)}
        />
      )}
    </LocalizationProvider>
  );
};

export default AlarmClock;
