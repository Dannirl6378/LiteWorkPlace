import * as React from "react";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";

interface TimeObject {
  [x: string]: string | number | Date;
  hours: number;
  minutes: number;
}

const AlarmClock: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [currentTime, setCurrentTime] = useState<Dayjs>(dayjs());
  const [alarmTime, setAlarmTime] = useState<Dayjs | null>(null);

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
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        sx={{
          maxWidth: "10vw",
        }}
        label="hh:mm"
        ampm={false}
        value={selectedTime}
        onChange={(newTime) => handleSetAlarm(newTime)}
      />
    </LocalizationProvider>
  );
};

export default AlarmClock;
