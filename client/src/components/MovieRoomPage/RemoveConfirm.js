import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // passes in value of clear or not clear
  const handleClose = () => {
    setOpen(false);
  };

  // query to clear the database, need the user id
  const handleConfirm = async(event) => {
    event.preventDefault();
    props.action();
    document.location.reload();
    handleClose();
  }


  return (
    <Box sx={{ right: '43%', mt: "10px", position: 'absolute' }}>
      <Button onClick={handleClickOpen}>
        Remove Members
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
            Are you sure you want to remove these members from the room? These members
            must be invited back to rejoin later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>Remove Members</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
