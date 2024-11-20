import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { Box, Tooltip } from "@mui/material";
import EventMsg from "./EventMsg";
import DeleteEvent from "./DeleteEvent";
import CBox from "./StyledCalenderBoxCss";

interface McalenderProps {
  onContentChange: (content: string) => void;
  callenAction: string;
}

const MyCalendar: React.FC<McalenderProps> = ({
  onContentChange,
  callenAction,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs | null>(
    null,
  );
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const [events, setEvents] = React.useState<{ [key: string]: string[] }>({});
  const [eventText, setEventText] = React.useState("");
  const [selectedEvent, setSelectedEvent] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof callenAction !== "string" || !callenAction.trim()) {
      setEvents({});
      return;
    }
    try {
      const parsedData = JSON.parse(callenAction);
      if (typeof parsedData === "object" && !Array.isArray(parsedData)) {
        const formattedData = Object.entries(parsedData).reduce(
          (acc, [key, value]) => {
            acc[key] = Array.isArray(value) ? value : [value];
            return acc;
          },
          {} as { [key: string]: string[] },
        );
        setEvents(formattedData);
      } else {
        setEvents({});
      }
    } catch (error) {
      console.error("Failed to parse callenAction data:", error);
      setEvents({});
    }
  }, [callenAction]);

  const handleDateClick = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
    setOpenPopUp(true);
    setSelectedEvent(null);
  };

  const handleDiaClose = () => {
    setOpenPopUp(false);
  };
  const handleSaveEvent = () => {
    if (selectedDate) {
      const dateString = selectedDate.format("YYYY-MM-DD");

      // Update the events state using the updater function
      setEvents((prevEvents) => {
        const updatedEvents = {
          ...prevEvents,
          [dateString]: [...(prevEvents[dateString] || []), eventText], // Add the new event
        };

        // Update the content in the parent component
        onContentChange(JSON.stringify(updatedEvents));

        return updatedEvents; // Return the updated state
      });

      setEventText(""); // Clear the event text
      handleDiaClose(); // Close the popup/modal
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CBox>
        <DateCalendar
          value={selectedDate || dayjs()}
          onChange={handleDateClick}
          slots={{
            day: (props) => {
              const dateString = props.day.format("YYYY-MM-DD");
              const dayEvents = events[dateString] || [];

              return (
                <Tooltip
                  key={dateString}
                  title={
                    Array.isArray(dayEvents) && dayEvents.length > 0 ? (
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
                      backgroundColor:
                        dayEvents.length > 0 ? "red" : "transparent",
                      borderRadius: "50%",
                      height: "80%",
                      "&:hover": {
                        backgroundColor:
                          dayEvents.length > 0 ? "darkblue" : undefined,
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
};

export default MyCalendar;
