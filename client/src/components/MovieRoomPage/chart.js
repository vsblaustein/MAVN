import * as React from "react";
import { Chart, PieSeries, Tooltip } from "@devexpress/dx-react-chart-material-ui";
import { Animation, EventTracker, HoverState } from "@devexpress/dx-react-chart";
import * as d3Format from 'd3-format';

// data should get loaded in for each query result
// value field and argument field here
var prefData = [
    { value: "Texas", ratio: 0.3 },
    { value: "Arkansas", ratio: 0.4 },
    { value: "Oklahoma", ratio: 0.1 },
    { value: "New Mexico", ratio: 0.06 },
    { value: "Colorado", ratio: 0.14 }
];


const tooltipContentTitleStyle = {
    fontWeight: "bold",
    paddingBottom: 0
};
const tooltipContentBodyStyle = {
    paddingTop: 0,
};

const formatTooltip = d3Format.format(".0%");
    const TooltipContent = (props) => {
        const { targetItem, text, ...restProps } = props;
        return (
            <div>
                <div>
                    <Tooltip.Content
                        {...restProps}
                        style={tooltipContentTitleStyle}
                        text={prefData[targetItem.point].value}
                    />
                </div>
                <div>
                    <Tooltip.Content
                        {...restProps}
                        style={tooltipContentBodyStyle}
                        text={formatTooltip(prefData[targetItem.point].ratio)}
                    />
                </div>
            </div>
        );
    };

export default function PieChart(props) {

    // may need to set lists as a state if they change frequently
    const [hover, setHover] = React.useState(null);
    
    // set actor_pref to query results

    // console.log("props.chartRes: " + JSON.stringify(props.chartRes));
    // sets Pref Data to the current chart
    prefData = props.chartRes;
    

    return (
        <>
            {/* get this data from storage, map function to map which storage variable */}
            <Chart data={prefData}>

                <PieSeries name="pie" valueField="ratio" argumentField="value" />
                <Animation />
                <EventTracker />
                {/* on hover change shades */}
                <HoverState onHoverChange={setHover} />
                <Tooltip
                    contentComponent={TooltipContent}
                />
            </Chart>
        </>
    );
}
