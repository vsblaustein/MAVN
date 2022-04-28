import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// get genres from DB
const genres = localStorage.getItem('genres');

export default function MultipleSelectChip(props) {
    if (genres !== null) {
        const names = genres.split(',');
    } else {
        const names = [];
    }
    return (
        <>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={genres !== null && genres.split(',')}
                multiple
                sx={{ width: '80%' }}
                onChange={(event, value) => props.action(value)}
                renderInput={(params) => <TextField {...params} label="Genres" />}
            />

        </>
    );
}