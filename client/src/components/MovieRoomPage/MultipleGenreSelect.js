import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// get genres from DB
const names = localStorage.getItem('genres').split(',');

export default function MultipleSelectChip(props){
 
    return (
        <>
            <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={names}
                    multiple
                    sx={{ width: 300 }}
                    onChange={(event, value) => props.action(value)}
                    renderInput={(params) => <TextField {...params} label="Genres" />}   
                />

        </>
    );
}