import * as React from "react";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

interface TimeObject {
  [x: string]: string | number | Date;
  hours: number;
  minutes: number;
}

const AlarmClock: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<TimeObject | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [alarmTime, setAlarmTime] = useState<Date | null>(null);
  const [alarmHour, setAlarmHour] = useState<number | null>(null);
  const [alarmMinute, setAlarmMinute] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (alarmTime && alarmHour !== null && alarmMinute !== null) {
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      console.log(alarmHour, alarmMinute);
      console.log("curent",currentHour);
      console.log("alarm",alarmHour);
      if (
        currentHour === alarmHour && currentMinute === alarmMinute
      ) {
        alert("Čas vypršel!");
        setAlarmHour(null);
        setAlarmMinute(null);
        setSelectedTime(null);
      }
    }
  }, [alarmTime, currentTime, alarmHour, alarmMinute]);

  const handleSetAlarm = (newTime: TimeObject | null, userInput?: string) => {
    setSelectedTime(newTime);
    if (newTime) {
      const alarmDate = new Date(newTime.$d);
      console.log(alarmDate);
      const newAlarmHour = alarmDate.getHours();
      const newAlarmMinute = alarmDate.getMinutes();
      setAlarmTime(alarmDate);
      setAlarmHour(newAlarmHour);
      setAlarmMinute(newAlarmMinute);
    } else if (userInput) {
      const [hours, minutes] = userInput.split(":");
      const alarmDate = new Date();
      const newAlarmHour = parseInt(hours, 10);
      const newAlarmMinute = parseInt(minutes, 10);
      alarmDate.setHours(newAlarmHour);
      alarmDate.setMinutes(newAlarmMinute);
      setAlarmTime(alarmDate);
      setAlarmHour(newAlarmHour);
      setAlarmMinute(newAlarmMinute);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* Tady je váš TimePicker */}
      <TimePicker sx={{
        minWidth:"18vw",
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
