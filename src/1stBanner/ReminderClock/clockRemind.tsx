import * as React from "react";
import { useState, useEffect } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

interface TimeObject {
  hours: number;
  minutes: number;
}

export default function AlarmClock() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [alarmTime, setAlarmTime] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeObject | null>();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer); // clearInterval je globalnifci javascriptu proto není a nemusi být žádný import
  }, []);

  useEffect(() => {
    if (alarmTime && currentTime >= alarmTime) {
      // bude možné že se podminka bude muset změnit na currentTime === alarmTime
      alert("Čas vypršel!");
    }
  }, [alarmTime, currentTime]);

  const SelectAlarm = () => {
    const handleSetAlarm = (newTime: TimeObject | null, userInput?: string) => {
      setSelectedTime(newTime);

      if (newTime) {
        const alarmDate = new Date();
        alarmDate.setHours(newTime.hours);
        alarmDate.setMinutes(newTime.minutes);
        setAlarmTime(alarmDate);
      } else if (userInput) {
        const [hours, minutes] = userInput.split(":");
        const alarmDate = new Date();
        alarmDate.setHours(parseInt(hours, 10));
        alarmDate.setMinutes(parseInt(minutes, 10));
        setAlarmTime(alarmDate);
      }
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            "MobileTimePicker",
            "MobileTimePicker",
            "MobileTimePicker",
          ]}
        >
          <DemoItem label={'"hours", "minutes"'}>
            <TimePicker
              views={["hours", "minutes"]}
              ampm={false}
              value={selectedTime}
              onChange={(newTime) => handleSetAlarm(newTime)}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    );
  };
  return <SelectAlarm />;
}
