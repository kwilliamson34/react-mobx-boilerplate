import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
export class TruncateComment extends React.Component {

  @observable isTruncated = true;

  charCount = this.props.charCount || 300;

  toggleTruncate = () => {
    this.isTruncated = this.isTruncated ? false : true;
  }

  truncateText = (comment, chars) => {

    //truncated text might end on punctuation, or even HTML tag, which might be a problem. Might need regex on splitComment?
    let splitComment = comment.substr(0, chars+1).split(' ');
    let insertionPoint = splitComment.slice(0, splitComment.length-1).join(' ').length;
    let truncatedText = comment.substr(0, insertionPoint);
    let hiddenText = comment.substr(insertionPoint);

    let truncateButton =
    <button className='btn-link truncate-button' aria-haspopup='true' aria-expanded={!this.isTruncated} onClick={this.toggleTruncate}>
      {this.isTruncated ? 'SHOW MORE ' : 'SHOW LESS '}
    </button>

    let truncationEndElements =
        <span className='truncation-end-elements'>
          {String.fromCharCode(8230, 32)}
        </span>

    let hiddenTextElements =
        <span className='hidden-comment-text'>
          <span dangerouslySetInnerHTML={{__html: `${hiddenText}`}} />
        </span>


    //wrapping in <p> to normalize fonts; can't find a better solution;
    return (
      <div className='comment-text-container'>
        <p>
          <span dangerouslySetInnerHTML={{__html: `${truncatedText}`}} />
            {this.isTruncated && truncationEndElements
              || hiddenTextElements
            }
        </p>
        <p>
          {truncateButton}
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className='truncate-comment-container' aria-label='Review content'>
        {this.truncateText(this.props.text, this.charCount)}
      </div>
    )

  }
}
