import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { autocompleteClasses, Box, Tooltip } from "@mui/material";
import EventMsg from "./EventMsg";
import DeleteEvent from "./DeleteEvent";
import CBox from "./StyledCalenderBoxCss";


interface McalenderProps {
  onContentChange: (content: string) => void;
}

const MyCalendar: React.FC<McalenderProps> =({ onContentChange }) =>{
  const [selectedDate, setSelectDate] = React.useState<dayjs.Dayjs | null>(
    null,
  );
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const [events, setEvents] = React.useState<{ [key: string]: string[] }>({});
  const [eventText, setEventText] = React.useState("");
  const [selectedEvent, setSelectedEvent] = React.useState<string | null>(null);

  const handleDateClick = (date: dayjs.Dayjs) => {
    setSelectDate(date);
    setOpenPopUp(true);
    setSelectedEvent(null);
  };

  const handleDiaClose = () => {
    setOpenPopUp(false);
  };

  const handleSaveEvent = () => {
    if (selectedDate) {
      const dateString = selectedDate.format("YYYY-MM-DD");
      setEvents((prevEvents) => ({
        ...prevEvents,
        [dateString]: [...(prevEvents[dateString] || []), eventText],
      }));
      const formattedEvents = JSON.stringify({ [dateString]: eventText });
      setEventText("");
      handleDiaClose();
      onContentChange(formattedEvents);
    }
  };
 console.log("dayevents",events);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CBox>
        <DateCalendar
          value={selectedDate || dayjs()}
          onChange={handleDateClick}
          slots={{
            day: (props) => {
              const dateString = props.day.format("YYYY-MM-DD");
              const dayEvents = events[dateString];

              return (
                <Tooltip
                  key={dateString}
                  title={
                    dayEvents ? (
                      <Box>
                        {dayEvents.map((event, index) => (
                          <Box
                            key={index}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <span>{event}</span>
                            <DeleteEvent
                              date={dateString}
                              eventText={event}
                              events={events}
                              setEvents={setEvents}
                            />
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )
                  }
                  arrow
                  placement="top"
                >
                  <PickersDay
                    {...props}
                    sx={{
                      backgroundColor: dayEvents ? "red" : "transparent",
                      borderRadius: "50%",
                      height: "80%",
                      "&:hover": {
                        backgroundColor: dayEvents ? "darkblue" : undefined,
                      },
                    }}
                  />
                </Tooltip>
              );
            },
          }}
        />
      </CBox>
      <EventMsg
        open={openPopUp}
        onClose={handleDiaClose}
        onSave={handleSaveEvent}
        eventText={eventText}
        setMsg={setEventText}
        events={events}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        selectedDate={selectedDate}
        setEvents={setEvents}
      />
    </LocalizationProvider>
  );
}
export default MyCalendar;