import React from "react";
import TextField from "@mui/material/TextField";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Checkbox, FormControlLabel, Box } from "@mui/material";
import dayjs from "dayjs";

interface EventMsgProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  eventText: string;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  events: { [key: string]: string[] };
  selectedEvent: string | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<string | null>>;
  selectedDate: dayjs.Dayjs | null;
  setEvents: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>;
}

const EventMsg: React.FC<EventMsgProps> = ({
  open,
  onClose,
  onSave,
  eventText,
  setMsg,
  events,
  selectedEvent,
  setSelectedEvent,
  selectedDate,
  setEvents,
}) => {
  const dateString = selectedDate ? selectedDate.format('YYYY-MM-DD') : '';
  const dayEvents = events[dateString] || []; // Ensure this defaults to an empty array

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (selectedEvent === value) {
      setSelectedEvent(null); 
    } else {
      setSelectedEvent(value);
    }
  };

  const handleDeleteSelectedEvent = () => {
    if (selectedEvent) {
      const newEvents = {
        ...events,
        [dateString]: dayEvents.filter(event => event !== selectedEvent),
      };
      setEvents(newEvents);
      setSelectedEvent(null); 
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Event</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          label="Event"
          variant="outlined"
          value={eventText}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Box>
          {Array.isArray(dayEvents) && dayEvents.length > 0 ? (
            dayEvents.map((event, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedEvent === event}
                    onChange={handleCheckboxChange}
                    value={event}
                  />
                }
                label={event}
              />
            ))
          ) : (
            <p>No events for this date.</p> // Fallback message if no events
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button color="primary" onClick={onSave}>
          Save
        </Button>
        <Button
          color="secondary"
          onClick={handleDeleteSelectedEvent}
          disabled={!selectedEvent}
        >
          Delete Selected
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventMsg;
