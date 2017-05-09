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
    console.log('loadReviews triggered');
    let endingIndex = (this.paginationCount * this.numberOfReviewsToLoad) + this.numberOfReviewsToLoad;
    console.log('endingIndex      ', endingIndex);
    this.loadedReviewsArray = this.props.reviews.slice(0, endingIndex);
    console.log('this.loadedReviewsArray       ', this.loadedReviewsArray);
    this.checkIfAllReviewsLoaded(this.loadedReviewsArray, this.props.reviews);
    this.paginationCount++;
    console.log('paginationCount     ', this.paginationCount);
  }

  checkIfAllReviewsLoaded = (visibleReviewsArray, allReviewsArray) => {
    visibleReviewsArray.length < allReviewsArray.length
      ? this.showLoadMoreButton = true
      : this.showLoadMoreButton = false;
    console.log('showLoadMoreButton     ', this.showLoadMoreButton);
  }

  renderReviews = (reviews) => {
    return reviews.map((node, i) => {
      let capitalizedReviewSubject = node.subject.toUpperCase();
      return (
        <div key={i} className='individual-review-container'>
          <div className='review-subject'><strong>{capitalizedReviewSubject}</strong></div>
          <div className='review-author-and-rating'>
            <div className='review-author'>
              {node.author}
            </div>
            <Rating rating={node.rating} />
          </div>
          <div className='review-date'>
            {node.date}
          </div>
          <div className='review-comment'>
            <TruncateComment text={node.comment} />
          </div>
        </div>
      )
    })
  }

  loadMoreButton = <Button className='load-more-button btn fn-primary' onClick={this.loadReviews}>Load More</Button>

  render() {
  return (
    <div className='reviews-container'>
      {this.renderReviews(this.loadedReviewsArray)}
      {this.showLoadMoreButton && this.loadMoreButton}
    </div>
  )
 }

}
