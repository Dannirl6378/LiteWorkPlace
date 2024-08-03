import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//import { deleteEvent } from './api';

interface DeleteEventProps {
  date: string;
  eventText: string;
  events: { [key: string]: string[] };
  setEvents: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>;
}

const DeleteEvent: React.FC<DeleteEventProps> = ({ date, eventText, events, setEvents }) => {
  const handleDeleteEvent = async () => {
    // Check if the event actually exists
    if (events[date]) {
      const newEvents = {
        ...events,
        [date]: events[date].filter(event => event !== eventText),
      };

      // Update state with the new events
      setEvents(newEvents);

      // Uncomment and implement this if you have an API call
      // await deleteEvent(date, eventText);
    }
  };

  return (
    <IconButton size="small" onClick={handleDeleteEvent}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};

export default DeleteEvent;
