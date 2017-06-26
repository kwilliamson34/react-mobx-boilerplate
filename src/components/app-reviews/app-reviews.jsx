import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Rating } from '../rating/rating';
import Truncate from '../truncate/truncate';

@observer
export default class AppReviews extends React.Component {

  static propTypes = {
    reviews: PropTypes.object,
    numberOfReviewsToLoad: PropTypes.number
  }

  static defaultProps = {
    reviews: [],
    numberOfReviewsToLoad: 3
  }

  componentDidMount() {
    this.loadReviews();
  }

  constructor() {
    super();
    this.loadReviews = this.loadReviews.bind(this);
    this.loadMoreButton = this.loadMoreButton.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
  }

  paginationCount = 0;
  showLoadMoreButton = false;

  @observable loadedReviewsArray = [];

  loadReviews() {
    let endingIndex = (this.paginationCount * this.props.numberOfReviewsToLoad) + this.props.numberOfReviewsToLoad;
    this.loadedReviewsArray = this.props.reviews.slice(0, endingIndex);
    this.showLoadMoreButton = this.loadedReviewsArray < this.props.reviews;
    this.paginationCount++;
  }

  renderReviews(reviews) {
    let dateOptions = {year: 'numeric', month: 'long', day: 'numeric'};

    //TODO: .toLocaleString() may be not supported on mobile. Test if it will revert to parsedDate, or some other option is needed;
    return reviews.map((node, i) => {

      let authorName = `${node.userFirstName} ${node.userLastName}`;
      //parsedDate is working off of example data only; check that it will work with final version.
      let parsedDate = new Date(node.reviewDate);
      let normalizedDate = parsedDate.toLocaleString('en-US', dateOptions);

      return (
        <div key={i} className='individual-review-container' aria-labelledby={'Review-' + node.reviewId}>
          <div className='review-subject' id={ 'Review-' + node.reviewId }>{node.commentTitle}</div>
          <div className='author-and-rating-container'>
            <div className='review-author'>{authorName}</div>
            <div className='sr-only'>{'App rated ' + node.rating + ' out of 5'}</div>
            <Rating rating={node.reviewStar} />
          </div>
          <div className='review-date'>{normalizedDate}</div>
          <Truncate returnToId={'Review-' + node.reviewId} charLimit={300} className='truncate-container'>
            {node.comment}
          </Truncate>
        </div>
      )
    })
  }

  loadMoreButton() {
    return (
      <button className='btn fn-primary' onClick={ this.loadReviews }>
        Load More
      </button>
    )
  }


  render() {

  return (
    <div className='reviews-container'>
      {this.renderReviews(this.loadedReviewsArray)}
      {this.showLoadMoreButton && this.loadMoreButton()}
    </div>
  )

 }
}
