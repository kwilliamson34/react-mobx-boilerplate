import React from 'react';
import PropTypes from 'prop-types';

import DoughnutChart from './doughnut';
import HorizontalBar from './horizontal-bar';
import { Rating } from '../rating/rating.jsx';

export default class RatingsChart extends React.Component {

    render() {

        return (
            <div className="ratings-chart">
                <div className="average-ratings-col">
                    <DoughnutChart rating = {4.1} />
                    <Rating rating = {5} />
                </div>
                <div className="overall-ratings-col">
                    <HorizontalBar data={ this.props.data }/>
                </div>
            </div>
        );
    }
}

RatingsChart.propTypes = {
    value: PropTypes.number,        // value the chart should show
    size: PropTypes.number,         // diameter of chart
    strokewidth: PropTypes.number   // width of chart line
};

RatingsChart.defaultProps = {
      value: 3.2,
      size: 170,
      strokewidth:15
}