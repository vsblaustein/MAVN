import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import {
    Chart,
    PieSeries,
    Title,
    Legend
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";


export default class PrefChart extends React.Component {
    constructor() {
        super();
        // get the query from the previous page
        this.state = {

        };
    }

    render() {
        return (
            <>
                <Paper>
                    <Chart data={chartData}>
                        <PieSeries valueField="votes" argumentField="state" />
                        <Title text="Votes for Favorite State" />
                        <Animation />
                        {/* <Legend position="bottom" rootComponent={Root} /> */}
                        <Legend />
                    </Chart>
                </Paper>
              </>
        )
    }
}

const chartData = [
    { state: "Texas", votes: 12 },
    { state: "Arkansas", votes: 5 },
    { state: "Oklahoma", votes: 2 },
    { state: "New Mexico", votes: 3 },
    { state: "Colorado", votes: 10 }
];

const legendStyles = () => ({
    root: {
        display: "flex",
        margin: "auto",
        flexDirection: "row"
    }
});

const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);

