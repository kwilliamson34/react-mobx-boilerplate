import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
export class TruncateComment extends React.Component {

  @observable isTruncated = true;

  charCount = 300;

  toggleTruncate = () => {
    this.isTruncated = this.isTruncated ? false : true;
  }

  truncateText = (comment, chars) => {

    //truncated text might end on punctuation, or even HTML tag. Not sure how this will look or if problem. Need regex on final element?
    let splitComment = comment.substr(0, chars+1).split(' ');
    let insertionPoint = splitComment.slice(0, splitComment.length-1).join(' ').length;
    let truncatedText = comment.substr(0, insertionPoint);
    let hiddenText = comment.substr(insertionPoint);

    //This seems awkward but I might need it to do the animation.
    // let hideWhenTruncated = this.isTruncated ? {display: 'none'} : {display: 'initial'};
    // let showWhenTruncated = this.isTruncated ? {display: 'initial'} : {display: 'none'};

    return (
      <div className='comment-text-container'>
        <div dangerouslySetInnerHTML={{__html: `${truncatedText}`}} />
        <div>
          { this.isTruncated &&
            <span className='truncation-end-elements'>
              {String.fromCharCode(32, 8230)}
            </span>
          }
        </div>
        <div>          
          { this.isTruncated ||
            <span className='hidden-comment-text'>
              <div dangerouslySetInnerHTML={{__html: `${hiddenText}`}} />
            </span>
          }
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className='truncate-comment-container'>
        {this.truncateText(this.props.text, this.charCount)}
        <button className='btn-link' onClick={this.toggleTruncate}>{this.isTruncated ? 'SHOW MORE' : 'SHOW LESS'}</button>
      </div>
    )

  }
}
