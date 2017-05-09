import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Rating } from '../rating/rating.jsx';

@observer
export default class AppReviews extends React.Component {

  static propTypes = {
    reviews: PropTypes.array
  }

  static defaultProps = {
    reviews: []
  }

  //if there are no reviews, component will not mount at all; conditional on appDetail page.
  componentDidMount() {
    this.loadReviews();
  }

  paginationCount = 0;
  numberOfReviewsToLoad = this.props.numberOfReviewsToLoad || 3;
  showLoadMoreButton = false;

  @observable loadedReviewsArray = [];

  loadReviews = () => {
    let startingIndex = this.paginationCount * this.numberOfReviewsToLoad;
    let endingIndex = startingIndex + this.numberOfReviewsToLoad;
    console.log('allReviews    ', this.props.reviews);
    this.loadedReviewsArray = this.props.reviews.slice(startingIndex, endingIndex);
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
      return (
        <div key={i} className='individual-review-container'>
          <div className='review-subject'>
            {node.subject}
          </div>
          <div className='review-author'>
            {node.author}
          </div>
          <div className='review-ratings'>
            <Rating rating={node.rating}></Rating>
          </div>
          <div className='review-comment'>
            <TruncateComment text={node.comment} chars={300} />
          </div>
        </div>
      )
    })
  }

  render() {
  return (
    <div className='reviews-container'>
      {this.renderReviews(this.loadedReviewsArray)}
    </div>
  )
 }

}

@observer
class TruncateComment extends React.Component {

  @observable isTruncated = true;

  charCount = this.props.chars || 300;

  toggleTruncate = () => {
    this.isTruncated = this.isTruncated ? false : true;
  }

  truncateText = (comment, chars) => {

    //might want regex on split to catch punctuation as well, since having a comma or period then an ellipsis looks weird. Prob also need to handle HTML tags so we don't accidentally split a paragraph; that may need to be a separate line checking if the last index is a tag.
    let truncatedComment = comment.substr(0, chars+1).split(' ');
    let insertionPoint = truncatedComment.slice(0, truncatedComment.length-1).join(' ').length;
    let truncatedText = comment.substr(0, insertionPoint);
    let hiddenText = comment.substr(insertionPoint);

    //got to be a better way to do this but brain betrays me;
    let hideWhenTruncated = this.isTruncated ? {display: 'none'} : {display: 'initial'};
    let showWhenTruncated = this.isTruncated ? {display: 'initial'} : {display: 'none'};

    return (
      <div>
        {truncatedText}
        <span className='truncation-end-elements' style={showWhenTruncated}>
          {String.fromCharCode(32, 8230)}
        </span>
        <span className='hidden-comment-text' style={hideWhenTruncated}>
          {hiddenText}
        </span>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.truncateText(this.props.text, this.charCount)}
        <button className='btn-link' onClick={this.toggleTruncate}>{this.isTruncated ? 'SHOW MORE' : 'SHOW LESS'}</button>
      </div>
    )

  }
}
