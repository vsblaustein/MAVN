import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

const ITEM_HEIGHT = 20;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

// get genres from DB
const names = [];
//const names = localStorage.getItem('genres').split(',');

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelectChip(props){
    const theme = useTheme();
    const [genres, setGenres] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setGenres(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        props.action(value);
    };

    // clears the actors list
    const handleClearGenre = (event) => {
        console.log("clear genre selections");
        setGenres(
            []
        );
        props.action([]);
      }

    return (
        <>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="genre-select-label">Genre</InputLabel>
                <Select
                    labelId="genre-select-label"
                    id="genre-select"
                    multiple
                    value={genres}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, genres, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
                <Button onClick={handleClearGenre}>Clear Genres</Button>

            </FormControl>
        </>
    );
}