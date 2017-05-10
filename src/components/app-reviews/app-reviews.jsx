import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Button } from 'react-bootstrap';

import { Rating } from '../rating/rating.jsx';
import { TruncateComment } from '../truncate-comment/truncate-comment';

@observer
export default class AppReviews extends React.Component {

  static propTypes = {
    reviews: PropTypes.array
  }

  static defaultProps = {
    reviews: []
  }

  componentDidMount() {
    this.loadReviews();
  }

  paginationCount = 0;
  numberOfReviewsToLoad = 3;
  showLoadMoreButton = false;

  @observable loadedReviewsArray = [];

  loadReviews = () => {
    let endingIndex = (this.paginationCount * this.numberOfReviewsToLoad) + this.numberOfReviewsToLoad;
    this.loadedReviewsArray = this.props.reviews.slice(0, endingIndex);
    this.checkIfAllReviewsLoaded(this.loadedReviewsArray, this.props.reviews);
    this.paginationCount++;
  }

  checkIfAllReviewsLoaded = (visibleReviewsArray, allReviewsArray) => {
    visibleReviewsArray.length < allReviewsArray.length
      ? this.showLoadMoreButton = true
      : this.showLoadMoreButton = false;
  }

  renderReviews = (reviews) => {
    return reviews.map((node, i) => {

      //also need to normalize date when integrating with service?
      let capitalizedReviewSubject = node.subject.toUpperCase();

      return (
        <div key={i} className='individual-review-container'>
          <div className='review-subject' aria-label='Review title'>{capitalizedReviewSubject}</div>
          <div className='review-author-and-rating'>
            <div className='review-author' aria-label='Review author'>
              {node.author}
            </div>
            <div className='sr-only'>{'App rated ' + node.rating + ' out of 5'}</div>
            <Rating rating={node.rating} />
          </div>
          <div className='review-date' aria-label='Review Date'>
            {node.date}
          </div>
          <TruncateComment text={node.comment} />
        </div>
      )
    })
  }

  loadMoreButton =
    <Button className='load-more-button btn fn-primary' onClick={this.loadReviews}>
      Load More
    </Button>

  render() {
  return (
    <div className='reviews-container'>
      {this.renderReviews(this.loadedReviewsArray)}
      {this.showLoadMoreButton && this.loadMoreButton}
    </div>
  )
 }

}
