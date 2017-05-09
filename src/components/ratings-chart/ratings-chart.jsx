import React from 'react';
import PropTypes from 'prop-types';

import DoughnutChart from './doughnut';
import HorizontalBar from './horizontal-bar';
import { Rating } from '../rating/rating.jsx';

export default class RatingsChart extends React.Component {

    render() {
        let graphSize = 215;
        const screenWidth = window.innerWidth;

        if(screenWidth <= 992){
            graphSize = 165
        }

        return (
            <div className="ratings-chart" aria-describedby="chart-info">
                <div id="chart-info" className="sr-only">This app has {this.props.reviewsTotal} reviews with an average rating of {this.props.value}.</div>
                <div className="average-ratings-col">
                    <DoughnutChart rating = {this.props.value} size={graphSize}/>
                    <div className="total-reviews">
                        <Rating rating = {this.props.value} />
                        <span>{this.props.reviewsTotal}</span>
                    </div>
                </div>
                <div className="overall-ratings-col">
                    <HorizontalBar data={ this.props.data }/>
                </div>
            </div>
        );
    }
}

RatingsChart.propTypes = {
    value: PropTypes.number,
    reviewsTotal: PropTypes.number,
    data: PropTypes.array
};

RatingsChart.defaultProps = {
      value: 0,
      reviewsTotal: 0,
      data: [0]
}