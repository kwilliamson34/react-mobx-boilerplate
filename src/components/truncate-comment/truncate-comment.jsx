import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
export default class TruncateComment extends React.Component {

  static propTypes = {
    keyVal: PropTypes.number.isRequired,
    charCount: PropTypes.number,
    text: PropTypes.string
  }

  static defaultProps = {
    charCount: 300
  }

  //temporary workaround until fate of app detail store is determined;
  @observable isTruncated = true;

  toggleTruncate = () => {
    this.isTruncated = this.isTruncated ? false : true;
    document.getElementById('Review-' + this.props.keyVal).scrollIntoView();
  }

  truncateText = (comment, chars) => {

    //truncated text might end on punctuation which looks bad with ellipsis, or even HTML tag which would break formatting. Might need regex on splitComment?
    let splitComment = comment.substr(0, chars + 1).split(' ');
    let cutoffPoint = splitComment.slice(0, splitComment.length - 1).join(' ').length;
    let truncatedText = comment.substr(0, cutoffPoint);
    let initiallyHiddenTextThatWillExpand = comment.substr(cutoffPoint);

    let truncateButton =
      <button className='btn-link truncate-button' aria-haspopup='true' aria-expanded={ !this.isTruncated } onClick={ this.toggleTruncate }>
        { this.isTruncated ? 'SHOW MORE ' : 'SHOW LESS ' }
      </button>

    let truncatedTextEndsInEllipsis =
      <span>{ String.fromCharCode(8230, 32) }</span>

    return (

      <div>
        <p>
          <span dangerouslySetInnerHTML={ {__html: `${truncatedText}`} } />
            {this.isTruncated && truncatedTextEndsInEllipsis
              || <span dangerouslySetInnerHTML={ {__html: `${initiallyHiddenTextThatWillExpand}`} } />
            }
        </p>
        <p>{ truncateButton }</p>
      </div>

    )
  }

  render() {

    return (

      <div className='truncate-comment-container' aria-label='Review content'>
        { this.truncateText(this.props.text, this.props.charCount) }
      </div>
    )

  }
}
