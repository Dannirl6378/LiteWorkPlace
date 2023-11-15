import React, { Component, useState, useEffect } from 'react'
import "./PopUp.css"
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface PopUpProps {
  checkIsEmail: boolean;
}

export default function PopUp({ checkIsEmail }: PopUpProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    setOpen(true);
  },[checkIsEmail] ) 

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>You have already an account</DialogTitle>
        <DialogContent>
          {/* Můžete sem přidat další obsah modálního okna */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

