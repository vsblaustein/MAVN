import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// get actors from database, careful for ,'s
const existingActors = [];
const ea = JSON.parse(localStorage.getItem('actors'));
for (const c in ea) {
    existingActors.push(ea[c]);
}


export default function MultipleSelectChip(props) {
    // current value and function that lets us update this value
    return (
        <>
            <FormControl sx={{ m: 1, width: 300 }}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={existingActors}
                    multiple
                    sx={{ width: 300 }}
                    onChange={(event, value) => props.action(value)}
                    renderInput={(params) => <TextField {...params} label="Actors" />}
                />
            </FormControl>

        </>
    );
}