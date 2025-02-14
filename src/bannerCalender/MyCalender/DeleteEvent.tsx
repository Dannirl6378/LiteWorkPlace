import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DeleteEventProps {
  date: string;
  eventText: string;
  events: { [key: string]: string[] };
  setEvents: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>;
  onContentChange: (content: string) => void;
}

const DeleteEvent: React.FC<DeleteEventProps> = ({
  date,
  eventText,
  events,
  setEvents,
  onContentChange,
}) => {
  const handleDeleteEvent = () => {
    if (events[date]) {
      const updateEvent = events[date].filter((event) => event !== eventText);
      const updatedEvents =
      updateEvent.length > 0
        ? { ...events, [date]: updateEvent }
        : Object.fromEntries(Object.entries(events).filter(([key]) => key !== date));

    setEvents(updatedEvents);
    onContentChange(JSON.stringify(updatedEvents)); // Uložení změny
  }
  };

  return (
    <IconButton size="small" onClick={handleDeleteEvent}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};

export default DeleteEvent;
