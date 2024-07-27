import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface EventDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  eventText: string;
  setEventText: React.Dispatch<React.SetStateAction<string>>;
}
