import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Button } from 'react-bootstrap';

import { Rating } from '../rating/rating.jsx';
import TruncateComment from '../truncate-comment/truncate-comment';

@observer
export default class AppReviews extends React.Component {

  static propTypes = {
    reviews: PropTypes.array,
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

  //temporary workaround until fate of app detail store is determined;
  @observable loadedReviewsArray = [];

  loadReviews() {
    let endingIndex = (this.paginationCount * this.props.numberOfReviewsToLoad) + this.props.numberOfReviewsToLoad;
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

      let capitalizedReviewSubject = node.subject.toUpperCase();

      return (
        <div key={ i } className='individual-review-container' aria-labelledby={ 'Review-' + i }>
          <div className='review-subject' id={ 'Review-' + i }>{ capitalizedReviewSubject }</div>
          <div className='author-and-rating-container'>
            <div className='review-author'>{ node.author }</div>
            <div className='sr-only'>{ 'App rated ' + node.rating + ' out of 5' }</div>
            <Rating rating={ node.rating } />
          </div>
          <div className='review-date'>{ node.date }</div>
          <TruncateComment keyVal={ i } text={ node.comment } />
        </div>
      )
    })
  }

  loadMoreButton =
    <Button className='btn fn-primary' onClick={ this.loadReviews }>
      Load More
    </Button>

  render() {

  return (
    <div className='reviews-container'>
      { this.renderReviews(this.loadedReviewsArray) }
      { this.showLoadMoreButton && this.loadMoreButton }
    </div>
  )

 }
}
