import React from 'react';
import PropTypes from 'prop-types';

import DoughnutChart from './doughnut';
import HorizontalBar from './horizontal-bar';
import { Rating } from '../rating/rating.jsx';

export default class RatingsChart extends React.Component {
	constructor() {
		super();
		this.state = {
			graphSize: 215
		}
	}

	componentDidMount() {
		this.updateGraphSize();
		window.addEventListener('resize', this.updateGraphSize.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateGraphSize.bind(this));
	}

	updateGraphSize() {
		let newGraphSize = (window.innerWidth <= 992) ? 165 : 215;
		this.setState({
			graphSize: newGraphSize
		})
	}

	render() {
		return (
			<div className="ratings-chart" aria-describedby="chart-info">
        <div id="chart-info" className="sr-only">This app has {this.props.reviewsTotal} reviews with an average rating of {this.props.value}.</div>
        <div className="row is-flex">
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3 col-lg-offset-1 average-ratings-col">
            <DoughnutChart rating={this.props.value} size={this.state.graphSize}/>
            <div className="total-reviews">
              <Rating rating={this.props.value} />
              <span>{this.props.reviewsTotal}</span>
            </div>
          </div>
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-7 overall-ratings-col">
            <HorizontalBar data={this.props.data} />
          </div>
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
