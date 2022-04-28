import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './MembersPopUp';

// pop up for individual length preferences

const lengthMarks = [
    { value: 0, label: '0%' },
    { value: 20, label: '20%' },
    { value: 40, label: '40%' },
    { value: 60, label: '60%' },
    { value: 80, label: '80%' },
    { value: 100, label: '100%' }];

export default function Length(props) {

    return (
        <>
            <Box width='80%' ml='30px'>
                <Slider
                    id='length'
                    aria-label="Length"
                    defaultValue={50}
                    valueLabelDisplay="auto"
                    step={1}
                    marks={lengthMarks}
                    min={0}
                    max={100}
                    onChange={(event, value) => props.action(value)}
                />
            </Box>
        </>
    );
}