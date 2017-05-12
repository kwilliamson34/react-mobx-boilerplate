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

  constructor(props) {
    super(props);
    this.toggleTruncate = this.toggleTruncate.bind(this);
    this.truncateText = this.truncateText.bind(this);
    this.truncateButton = this.truncateButton.bind(this);
  }

  //temporary workaround until fate of app detail store is determined;
  @observable isTruncated = true;

  toggleTruncate() {
    this.isTruncated = this.isTruncated ? false : true;
    document.getElementById('Review-' + this.props.keyVal).scrollIntoView();
  }

  truncateButton() {
    return (
      <button className='btn-link truncate-button' aria-haspopup='true' aria-expanded={ !this.isTruncated } onClick={ this.toggleTruncate }>
        { this.isTruncated ? 'SHOW MORE' : 'SHOW LESS' }
      </button>
    )
  }

  truncateText(comment, chars) {

    //TODO: Comment may need to be normalized to display correctly. Probably need some regex on the last index item in the array currently being used to generate cutoffPoint to ensure no markup is being broken or other formatting errors introduced.
    let splitComment = comment.substr(0, chars + 1).split(' ');
    let cutoffPoint = splitComment.slice(0, splitComment.length - 1).join(' ').length;
    let truncatedText = comment.substr(0, cutoffPoint);
    let initiallyHiddenTextThatWillExpand = comment.substr(cutoffPoint);



    let ellipsisSpan =
      <span>{ String.fromCharCode(8230) }</span>

    return (

      <div>
        <p>
          <span dangerouslySetInnerHTML={ {__html: `${truncatedText}`} } />
            {this.isTruncated
              ? ellipsisSpan
              : <span dangerouslySetInnerHTML={ {__html: `${initiallyHiddenTextThatWillExpand}`} } />
            }
        </p>
        <p>{ this.truncateButton() }</p>
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
