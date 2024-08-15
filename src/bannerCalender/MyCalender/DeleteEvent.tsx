import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DeleteEventProps {
  date: string;
  eventText: string;
  events: { [key: string]: string[] };
  setEvents: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>;
}

const DeleteEvent: React.FC<DeleteEventProps> = ({
  date,
  eventText,
  events,
  setEvents,
}) => {
  const handleDeleteEvent = () => {
    if (events[date]) {
      const updateEvent = events[date].filter((event) => event !== eventText);
      if (updateEvent.length > 0) {
        setEvents((prevEvents) => ({ ...prevEvents, [date]: updateEvent }));
      } else {
        setEvents((prevEvents) => {
          const { [date]: __, ...remanigEvents } = prevEvents;
          return remanigEvents;
        });
      }
    }
  };

  return (
    <IconButton size="small" onClick={handleDeleteEvent}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};

export default DeleteEvent;
