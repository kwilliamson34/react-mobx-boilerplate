import React from 'react';
import PropTypes from 'prop-types';

export default class DoughnutChart extends React.Component {

    render() {

        const graphSize = this.props.size;
        const strokewidth = 15;
        const halfsize = (graphSize * 0.5);
        const fontsize = (graphSize * .55);
        const textAlign = (graphSize * 0.65);
        const radius = halfsize - (strokewidth * 0.5);
        const circumference = 2 * Math.PI * radius;
        const perc = (this.props.rating / 5);
        const strokeval = ((this.props.rating * circumference) / 5);
        const dashval = (strokeval + ' ' + circumference);
        const endpointval = (strokewidth / 2);

        const fontStyle = {fontSize: fontsize};
        const trackstyle = {strokeWidth: strokewidth / 5};
        const indicatorstyle = {strokeWidth: strokewidth, strokeDasharray: dashval}
        const rotateval = 'rotate(-90 '+halfsize+','+halfsize+')';
        const lastPoint = 'rotate('+perc*360+','+halfsize+','+halfsize+')'

        return (
            <svg width={graphSize} height={graphSize} className="doughnut">
                <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className="doughnut-track"/>
                <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="doughnut-indicator"/>
                <circle r={endpointval} cx={halfsize} cy={endpointval} className="doughnut-endpoint"/>
                <circle r={endpointval} cx={halfsize} cy={endpointval} transform={lastPoint} className="doughnut-endpoint"/>
                <text x={halfsize} y={textAlign} style={fontStyle} className="doughnut-text">{this.props.rating}</text>
            </svg>
        );
    }
}

DoughnutChart.propTypes = {
    rating: PropTypes.number,       // rating the chart should show
    size: PropTypes.number         // diameter of chart
};

DoughnutChart.defaultProps = {
      rating: 0,
      size: 215
}