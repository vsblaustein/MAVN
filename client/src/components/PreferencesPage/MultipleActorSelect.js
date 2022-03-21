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

// ACTORS NEED TO COME FROM DB
const names = [
    'Ryan Gosling', 'Channing Tatum',
    'Amanda Seyfried', 'Adam Sandler',
    'Rachel McAdams', 'Lily James',
    'Tom Holland', 'Emma Watson',
    'Emma Stone'
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelectChip(props) {
    const theme = useTheme();
    // current value and function that lets us update this value
    const [actors, setActors] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setActors(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        // looks at the state variable actors
        props.action(value);
    };

    // clears the actors list
    const handleClearActors = (event) => {
        console.log("clear actor selections");
        setActors(
            []
        );
        props.action([]);
      }


    return (
        <>
            <FormControl sx={{ m: 1, width: 300}}>
                <InputLabel id="actor-select-label">Actors</InputLabel>
                <Select
                    labelId="actor-select-label"
                    id="actor-select"
                    multiple
                    value={actors}
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
                            style={getStyles(name, actors, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
                <Button onClick={handleClearActors}>Clear Actors</Button>
            </FormControl>

        </>
    );
}