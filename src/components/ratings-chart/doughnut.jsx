import React from 'react';
import PropTypes from 'prop-types';

export default class DoughnutChart extends React.Component {

    render() {

        const halfsize = (this.props.size * 0.5);
        const textAlign = (this.props.size * 0.6);
        const radius = halfsize - (this.props.strokewidth * 0.5);
        const circumference = 2 * Math.PI * radius;
        const perc = (this.props.rating / 5);
        const strokeval = ((this.props.rating * circumference) / 5);
        const dashval = (strokeval + ' ' + circumference);
        const endpointval = (this.props.strokewidth / 2);

        const trackstyle = {strokeWidth: this.props.strokewidth / 5};
        const indicatorstyle = {strokeWidth: this.props.strokewidth, strokeDasharray: dashval}
        const rotateval = 'rotate(-90 '+halfsize+','+halfsize+')';
        const lastPoint = 'rotate('+perc*360+','+halfsize+','+halfsize+')'

        return (
            <svg width={this.props.size} height={this.props.size} className="doughnut">
                <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className="doughnut-track"/>
                <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="doughnut-indicator"/>
                <circle r={endpointval} cx={halfsize} cy={endpointval} className="doughnut-endpoint"/>
                <circle r={endpointval} cx={halfsize} cy={endpointval} transform={lastPoint} className="doughnut-endpoint"/>
                <text x={halfsize} y={textAlign} className="doughnut-text">{this.props.rating}</text>
            </svg>
        );
    }
}

DoughnutChart.propTypes = {
    rating: PropTypes.number,       // rating the chart should show
    size: PropTypes.number,         // diameter of chart
    strokewidth: PropTypes.number   // width of chart line
};

DoughnutChart.defaultProps = {
      rating: 3.2,
      size: 170,
      strokewidth:15
}