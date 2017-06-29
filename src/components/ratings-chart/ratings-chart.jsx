import React from 'react';
import PropTypes from 'prop-types';

import DoughnutChart from './doughnut';
import HorizontalBar from './horizontal-bar';
import { Rating } from '../rating/rating.jsx';

export default class RatingsChart extends React.Component {
	constructor() {
		super();
		this.state = {
			graphSize: 215,
			value: 0,
			reviewsTotal: 0,
			sortedReviews: [0,0,0,0,0]
		}
	}

	componentDidMount() {
		this.updateGraphSize();
		window.addEventListener('resize', this.updateGraphSize.bind(this));
		this.sortRatingData();
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

	sortRatingData(){
		let rev = this.props.reviews;
		let value = this.props.value ? this.props.value : 0;
		let reviewsTotal = rev.length
		let sortedReviews = this.state.sortedReviews;

		for (let i = 0; i < reviewsTotal; i++) {
			let starRating = 5 - rev[i].reviewStar;
			sortedReviews[starRating]++;
		}
		this.setState({
			value: value,
			reviewsTotal: reviewsTotal,
			sortedReviews: sortedReviews
		})
	}

	render() {
		return (
			<div className="ratings-chart" aria-describedby="chart-info">
				<div id="chart-info" className="sr-only">This app has {this.state.reviewsTotal} reviews with an average rating of {this.state.value}.</div>
				<div className="row is-flex">
					<div className="col-xs-12 col-sm-4 col-md-4 col-lg-3 col-lg-offset-1 average-ratings-col">
						<DoughnutChart rating={this.state.value} size={this.state.graphSize}/>
						<div className="total-reviews">
							<Rating rating={this.state.value} reviewCount={this.state.reviewsTotal} showReviewCount={true}/>
						</div>
					</div>
					<div className="col-xs-12 col-sm-8 col-md-8 col-lg-7 overall-ratings-col">
						<HorizontalBar data={this.state.sortedReviews} />
						{this.state.sortedReviews.reduce((x, y) => x + y) === 0 &&
							<div className="zero-reviews">No Reviews Yet!</div>
						}
					</div>
				</div>
			</div>
		);
	}
}

RatingsChart.propTypes = {
	value: PropTypes.number,
	reviewsTotal: PropTypes.number,
	data: PropTypes.array,
	reviews: PropTypes.object
};

RatingsChart.defaultProps = {
	value: 0,
	reviewsTotal: 0,
	reviews: {}
}
