import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns/format';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Rating } from '../rating/rating';
import Truncate from '../truncate/truncate';

@observer
export default class AppReviews extends React.Component {

  static propTypes = {
    reviews: PropTypes.object.isRequired,
    numberOfReviewsToLoad: PropTypes.number
  }

  static defaultProps = {
    reviews: [],
    numberOfReviewsToLoad: 3
  }

  componentDidMount() {
    this.loadReviews();
  }

  paginationCount = 0;
  showLoadMoreButton = false;
  @observable loadedReviewsArray = [];

  loadReviews = () => {
    let endingIndex = (this.paginationCount * this.props.numberOfReviewsToLoad) + this.props.numberOfReviewsToLoad;
    this.loadedReviewsArray = this.props.reviews.slice(0, endingIndex);
    this.showLoadMoreButton = this.loadedReviewsArray < this.props.reviews;
    this.paginationCount++;
  }

  renderReviews = (reviews) => {
    return reviews.map((node, i) => {
      let authorName = `${node.userFirstName} ${node.userLastName}`;
      return (
        <div key={i} className='individual-review-container' aria-labelledby={'Review-' + node.reviewId}>
          <div className='review-metadata'>
            <div className='subject-and-rating-container'>
              <div className='review-subject' id={'Review-' + node.reviewId}>{node.commentTitle}</div>
              <div className='sr-only'>{'App rated ' + node.rating + ' out of 5'}</div>
              <Rating rating={node.reviewStar} reviewCount={1}/>
            </div>
            <div className='review-author'>{authorName}</div>
            <div className='review-date'>{dateFns(node.reviewDate, 'MMMM DD, YYYY')}</div>
          </div>
          <Truncate returnToId={'Review-' + node.reviewId} charLimit={300} className='truncate-container'>
            {node.comment}
          </Truncate>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='reviews-container'>
        {this.renderReviews(this.loadedReviewsArray)}
        {this.showLoadMoreButton && <button className='btn fn-secondary load-more-button' onClick={this.loadReviews}>
          Load More
        </button>}
      </div>
    )
  }
}
