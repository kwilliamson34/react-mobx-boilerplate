import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
export default class AppReviews extends React.Component {

  static propTypes = {
    reviews: PropTypes.array
  }

  static defaultProps = {
    reviews: [],
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

  truncateText = (comment, chars) => {

    comment.length =< chars ? this.setState({showButton: false})
    return
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
            <TruncateComment text={node.comment} truncate={this.props.truncate} />
          </div>
        </div>
      )
    })
  }


  render() {


  //recall Katy, might need to put this on front end. Leave it here for now.
  return (
    <div className='reviews-container'>
      {this.props.reviews.length === 0 ? "There are no apps. Put one of those functional components in here." : this.renderReviews(this.reviews)}
    </div>
  )

 }

}

class TruncateComment extends React.Component {

  render() {
    return (
      <div>

      </div>
    )

  }
}
