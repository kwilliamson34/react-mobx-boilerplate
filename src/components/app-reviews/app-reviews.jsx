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
      {this.props.reviews.length === 0 ? 'There are no reviews. Put one of those functional components in here.' : this.renderReviews(this.props.reviews)}
    </div>
  )

 }

}

@observer
class TruncateComment extends React.Component {

  @observable isTruncated = true;

  toggleTruncate = (e) => {
    // e.preventDefault();
    this.isTruncated = this.isTruncated ? false : true;
    console.log('this.isTruncated', this.isTruncated);
  }

  truncateText = (comment, chars) => {

    let truncatedComment = comment.substr(0, chars + 1).split(' ');
    console.log('truncatedComment       ', truncatedComment);
    let finalTruncatedComment = truncatedComment.slice(0, truncatedComment.length-1).join(' ') + String.fromCharCode(8230);
    console.log('finalTruncatedComment        ', finalTruncatedComment);

    return finalTruncatedComment;
  }

  render() {
    return (
      <div>
        {this.isTruncated ? this.truncateText(this.props.text, this.props.chars) : this.props.text}
        <button onClick={this.toggleTruncate}>{this.isTruncated ? 'Show More' : 'Show Less'}</button>
      </div>
    )

  }
}
