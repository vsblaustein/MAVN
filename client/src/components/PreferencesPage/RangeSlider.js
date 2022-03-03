import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
    return `${value}°C`;
}

const marks = [{ value: 1940, label: '1940' }, { value: 1970, label: '1970' }, { value: 2000, label: '2000' },{ value: 2022, label: '2022' }];

export default function RangeSlider() {
    const [value, setValue] = React.useState([1960, 2000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                step={1}
                marks={marks}
                min={1940}
                max={2022}
            />
        </Box>
    );
}