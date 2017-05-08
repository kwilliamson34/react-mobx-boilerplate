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

  renderReviews = (reviews) => {
    return reviews.map((node, i) => {
      return (
        <div key={i} className='review-individual-container'>
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

  //this conditional should be on app-details page but leave here for now to remind self.
  render() {
  return (
    <div className='reviews-container'>
      {this.renderReviews(this.props.reviews)}
    </div>
  )
 }

}

@observer
class TruncateComment extends React.Component {

  charCount = 300;

  @observable isTruncated = true;

  toggleTruncate = () => {
    this.isTruncated = this.isTruncated ? false : true;
  }

  truncateText = (comment, chars) => {

    //might want regex on split to catch punctuation as well
    let truncatedComment = comment.substr(0, chars+1).split(' ');
    let bufferLength = truncatedComment.pop().length;
    let insertionPoint = truncatedComment.slice(0, truncatedComment.length-1).join(' ').length;
    let truncatedText = comment.substr(0, insertionPoint);
    let hiddenText = comment.substr(insertionPoint);
    let buffer = ' '.repeat(bufferLength);

    let hideWhenTruncated = this.isTruncated ? {display: 'none'} : {display: 'initial'};
    let showWhenTruncated = this.isTruncated ? {display: 'initial'} : {display: 'none'};

    console.log('truncatedText    ', truncatedText);
    console.log('hiddenText     ', hiddenText);
    console.log('bufferLength     ', bufferLength);
    console.log('buffer    ', buffer.length);

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
