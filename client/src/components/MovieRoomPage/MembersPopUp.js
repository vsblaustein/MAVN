import * as React from 'react';
import './GroupPrefPopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import RemoveConfirm from './RemoveConfirm';
import Axios from 'axios';
import { useEffect } from 'react';

export default function MembersPopUp(props) {

  const [mList, setMList] = React.useState([]);
  const [remove, setRemove] = React.useState([]);

  useEffect(() => {
    var mems = [];
    for(const c in props.mem){
      if(props.mem[c] !== props.master){
        mems.push(props.mem[c]);
      }
    }
    setMList(mems);
  },[props.mem, props.master]);

  // makes the pop up disappear
  const handleExit = () => {
    props.toggle();
  };

  const handleChange = (event, value) => {
    setRemove(value);
  }

  // remove from the database
  const confirmRemove = () => {
    console.log("removing: " + remove);
    Axios.post('http://localhost:3001/removeMembers', {
      users: remove,
    }).then((response) => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  }

  // add a "are you sure you want to leave?"
  return (
    <>
      <Box className="modal">
        <Box className="mini_pref_modal">
          <span className="close" onClick={handleExit}>
            <Button>
              Exit
            </Button>
          </span>
          <Box component="form">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mt: "5px", display: { xs: 'none', md: 'flex' } }}
            >
              Room {props.code} Members
            </Typography>
            <label> Select Members You Want to Remove</label> <br/>
            <Autocomplete
              disablePortal
              options={mList}
              multiple
              sx={{ width: 300 }}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} label="Members" />}/>
            <RemoveConfirm action={() => confirmRemove()} class='center-screen' />
          </Box >
        </Box>
      </Box>
    </>
  );
}