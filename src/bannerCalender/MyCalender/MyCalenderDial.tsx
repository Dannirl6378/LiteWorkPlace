import React from "react";
import TextField from "@mui/material/TextField";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

interface EventMsgProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  eventText: string;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
}

const EventMsg: React.FC<EventMsgProps> = ({
  open,
  onClose,
  onSave,
  eventText,
  setMsg,
}) => {
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button color="primary" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EventMsg;
