import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // passes in value of clear or not clear
  const handleClose = () => {
    setOpen(false);
  };

  // query to clear the database, need the user id
  const handleConfirm = () => {
    console.log("clear the database here");
    handleClose();
  }


  return (
    <Box sx={{ right: '43%', mt: "10px", position: 'absolute' }}>
      <Button onClick={handleClickOpen}>
        Clear Preferences
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="clear-title"
        aria-describedby="clear-description"
      >
        <DialogTitle id="clear-title">
          {"Clear Saved Preferences?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="clear-description">
            Are you sure you want to clear ALL your preferences? This action
            cannot be undone later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Do Not Clear</Button>
          <Button onClick={handleConfirm} autoFocus>Confirm Clear</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
