import * as React from "react";
import { Chart, PieSeries, Tooltip } from "@devexpress/dx-react-chart-material-ui";
import { Animation, EventTracker, HoverState } from "@devexpress/dx-react-chart";
import * as d3Format from 'd3-format';

// data should get loaded in for each query result
// value field and argument field here
const prefData = [
    { tag: "Texas", ratio: 0.3 },
    { tag: "Arkansas", ratio: 0.4 },
    { tag: "Oklahoma", ratio: 0.1 },
    { tag: "New Mexico", ratio: 0.06 },
    { tag: "Colorado", ratio: 0.14 }
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
                    text={prefData[targetItem.point].tag}
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

export default class PieChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            prefData,
            hover: null,
            tooltipTarget: null,
            tooltipEnabled: true
        };

        this.changeHover = hover => this.setState({ hover });
        this.changeTooltip = targetItem => this.setState({ tooltipTarget: targetItem });
        this.toggleTooltip = () => this.setState(({ tooltipEnabled }) => ({
            tooltipEnabled: !tooltipEnabled,
            tooltipTarget: null,
        }));
    }

    render() {
        const {
            hover, tooltipTarget, tooltipEnabled,
        } = this.state;
        return (
            <>
                <Chart data={prefData}>

                    <PieSeries name="pie" valueField="ratio" argumentField="tag" />
                    {/* keep title here and fill in with list?? */}
                    {/* <Title text="Votes for Favorite State" /> */}
                    <Animation />
                    <EventTracker onClick={this.click} />
                    <HoverState hover={hover} onHoverChange={this.changeHover} />
                    <Tooltip
                        targetItem={tooltipEnabled && tooltipTarget}
                        onTargetItemChange={this.changeTooltip}
                        contentComponent={TooltipContent}
                    />
                </Chart>
            </>
        );
    }
}
