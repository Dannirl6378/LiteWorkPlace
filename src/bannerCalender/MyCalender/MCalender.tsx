import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { Box, Tooltip } from "@mui/material";
import EventMsg from "./EventMsg";
import DeleteEvent from "./DeleteEvent";
import CBox from "./StyledCalenderBoxCss";
import { useEffect } from "react";

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

  
  useEffect(() => {
    try {
      if (callenAction && Array.isArray(callenAction) && callenAction.length > 0) {
        const parsedData = callenAction.map((item) => {
          try {
            return JSON.parse(item);
          } catch (error) {
            console.error("Chyba při parsování JSON:", error);
            return null;
          }
        }).filter((item) => item !== null);
  
        if (parsedData.length > 0) {
          const formattedData = Object.entries(parsedData[0]).reduce(
            (acc, [key, value]) => {
              acc[key] = Array.isArray(value) ? value : [value];
              return acc;
            },
            {} as { [key: string]: string[] }
          );
          setEvents(formattedData);
        } else {
          console.error("Žádný platný JSON v callenAction.");
          setEvents({});
        }
      }
    } catch (error) {
      console.error("Chyba při zpracování callenAction:", error);
      setEvents({});
    }
  }, [callenAction]);
  
  const handleSaveEvent = () => {
    if (selectedDate) {
      const dateString = selectedDate.format("YYYY-MM-DD");
  
      // Aktualizace stavu s událostmi
      setEvents((prevEvents) => {
        const updatedEvents = {
          ...prevEvents,
          [dateString]: [...(prevEvents[dateString] || []), eventText],
        };
        console.log(updatedEvents);
        // Předání zpět rodičovské komponentě pro uložení
        onContentChange(JSON.stringify(updatedEvents));
        
        return updatedEvents;
      });
  
      setEventText(""); // Vymazání textu události
      handleDiaClose(); // Zavření popupu
    } else {
      console.warn("Nelze uložit prázdnou událost.");
    }
  };
  
  const handleDateClick = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
    setOpenPopUp(true);
    setSelectedEvent(null);
  };

  const handleDiaClose = () => {
    setOpenPopUp(false);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CBox>
        <DateCalendar
          sx={{
            height: "35vh",
            margin: "auto",
            marginTop: "5%",
            "& .MuiDayCalendar-weekDayLabel": {
              fontSize: "1.3rem",
              width: "100%", // Nastaví pevnou velikost
              "@media (max-width: 600px)": {
                fontSize: "1rem", // Pro menší obrazovky
              },
            },
          }}
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
                              onContentChange={onContentChange}
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
