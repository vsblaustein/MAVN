import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// get genres from DB
const genres = localStorage.getItem('genres');

export default function MultipleSelectChip(props) {
    const names = [];
    if (genres !== null) {
        names = genres.split(',');
    }
    return (
        <>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={names}
                multiple
                sx={{ width: '80%' }}
                onChange={(event, value) => props.action(value)}
                renderInput={(params) => <TextField {...params} label="Genres" />}
            />

        </>
    );
}