import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import DoughnutChart from './doughnut';
import HorizontalBar from './horizontal-bar';
import {Rating} from '../rating/rating.jsx';

@observer
export default class RatingsChart extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    reviewsTotal: PropTypes.number,
    reviews: PropTypes.object
  }

  static defaultProps = {
    value: 0,
    reviewsTotal: 0,
    reviews: {}
  }

  @observable graphSize = 215;
  @observable sortedReviews = [0, 0, 0, 0, 0];

  componentWillMount() {
    this.sortRatingData();
  }

  componentDidMount() {
    this.updateGraphSize();
    window.addEventListener('resize', this.updateGraphSize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateGraphSize.bind(this));
  }

  updateGraphSize() {
    this.graphSize = (window.innerWidth <= 992) ? 165 : 215;
  }

  sortRatingData() {
    this.props.reviews.forEach(review => {
      let starRating = 5 - review.reviewStar;
      this.sortedReviews[starRating]++;
    });
  }

  render() {
    const reviewsTotal = this.props.reviewsTotal || this.props.reviews.length;
    return (
      <div className="ratings-chart" aria-describedby="chart-info">
        <div id="chart-info" className="sr-only">This app has {reviewsTotal} reviews with an average rating of {this.props.value}.</div>
        <div className="row">
          <div className="col-xs-12 col-sm-4 average-ratings-col">
            <DoughnutChart rating={this.props.value} size={this.graphSize}/>
            <div className="total-reviews">
              <Rating rating={this.props.value} reviewCount={reviewsTotal} showReviewCount={true}/>
            </div>
          </div>
          <div className="col-xs-12 col-sm-8 overall-ratings-col">
            <HorizontalBar data={this.sortedReviews}/>
			      {this.sortedReviews.reduce((x, y) => x + y) === 0 && <div className="zero-reviews">No Reviews Yet!</div>}
          </div>
        </div>
      </div>
    );
  }
}
