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

  showMoreText() {
    this.setState({
      truncate: false,
      buttonText: 'Show Less'
    })
  }

  showLessText() {
    this.setState({
      truncate: true,
      buttonText: 'Show More'
    })
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
            <TruncateComment text={node.comment} truncate={this.state.truncate} />
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

class TruncateComment extends React.Component {

  truncateText = (comment, chars) => {

    let endPoint = chars + 1;
    //get the max length comment text, split until the last space, remove the last item to ensure we end on full word, put it back together and add ellipsis;
    let truncatedComment = comment.substr(0, endPoint).split(' ');
    console.log('truncatedComment       ', truncatedComment);
    console.log('truncatedComment.length       ', truncatedComment.length);
    let finalTruncatedComment = truncatedComment.slice(0, truncatedComment.length).join(' ') + '&hellip;';
    // let finalTruncatedComment = truncatedComment.slice(0, truncatedComment.length-1);
    console.log('finalTruncatedComment        ', finalTruncatedComment);

    return finalTruncatedComment;
  }

  // {this.truncateText(this.props.text, 100)}
  render() {
    return (
      <div>
        {this.props.truncate === true ? this.truncateText(this.props.text, 100) : this.props.text}
      </div>
    )

  }
}

// comment.length =< chars ? this.setState({showButton: false}) : this.setState({showButton: true});
