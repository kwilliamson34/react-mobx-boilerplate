import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
export default class AppReviews extends React.Component {

  static propTypes = {
    reviews: PropTypes.array
  }

  static defaultProps = {
    reviews: []

  }
  getInitalState() {
    return {
      truncate: true,
      buttonText: 'Show More',
      showButton: true
    }
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
          <div className='review-comment'>
            <TruncateComment text={node.comment} />
          </div>
        </div>
      )
    })
  }

  render() {
  //recall Katy, might need to put this on front end. Leave it here for now.
  return (
    <div className='reviews-container'>
      {this.props.reviews.length === 0 ? 'There are no reviews. Put one of those functional components in here.' : this.renderReviews(this.props.reviews)}
    </div>
  )

 }

}

@observer
class TruncateComment extends React.Component {

  isTruncated = true;

  toggleTruncate = () => {
    this.isTruncated = this.isTruncated ? false : true;
    console.log('this.isTruncated', this.isTruncated);
  }

  truncateText = (comment, chars) => {

    //get the max length comment text, split until the last space, remove the last item to ensure we end on full word, put it back together and add ellipsis;
    let endPoint = chars + 1;
    let truncatedComment = comment.substr(0, endPoint).split(' ');
    console.log('truncatedComment       ', truncatedComment);
    console.log('truncatedComment.length       ', truncatedComment.length);
    let finalTruncatedComment = truncatedComment.slice(0, truncatedComment.length).join(' ') + String.fromCharCode(8230);
    console.log('finalTruncatedComment        ', finalTruncatedComment);

    return finalTruncatedComment;
  }

  render() {
    return (
      <div>
        {this.isTruncated ? this.truncateText(this.props.text, 100) : this.props.text}
        <button onClick={this.toggleTruncate}>{this.isTruncated ? 'Show More' : 'Show Less'}</button>
      </div>
    )

  }
}

// comment.length =< chars ? this.setState({showButton: false}) : this.setState({showButton: true});
