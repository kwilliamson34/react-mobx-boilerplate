import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
export default class ShowMoreOrLess extends React.Component {

  //take in element, charLimit, textBlock, styles on everything that can be styled, esp the button.
  //make the ellipsis a configurable symbol.
  //what to do with sourceId?
  //we need them to be able to add as many classes and additional attributes as they want.

  static propTypes = {
    charLimit: PropTypes.number,
    isInitiallyTruncated: PropTypes.bool,
    text: PropTypes.string,
    wrappingElement: PropTypes.string,
    cutoffSymbol: PropTypes.string,
    returnToId: PropTypes.string
  }

  static defaultProps = {
    charLimit: 300,
    isInitiallyTruncated: true,
    text: '',
    wrappingElement: 'div',
    cutoffSymbol: '8230',
    returnToId: null
  }

  constructor(props) {
    super(props);
    // this.toggleTruncate = this.toggleTruncate.bind(this);
    // this.truncateText = this.truncateText.bind(this);
    // this.truncateButton = this.truncateButton.bind(this);
  }

  @observable isTruncated = true;

  toggleTruncate = () => {
    this.isTruncated = !this.isTruncated;
    if (this.props.returnToId !== null) document.getElementById(this.props.returnToId).scrollIntoView();
  }

  truncateButton = () => {
    return (
      <button className='btn-link truncate-button' aria-haspopup='true' aria-expanded={ !this.isTruncated } onClick={ this.toggleTruncate } >
        { this.isTruncated ? 'SHOW MORE' : 'SHOW LESS' }
      </button>
    )
  }

  generateCutoff = (symbol) => <span>{String.fromCharCode({symbol})}</span>;

  truncateText = (comment, chars) => {

    //TODO: Comment may need to be normalized to display correctly. Probably need some regex on the last index item in the array currently being used to generate cutoffPoint, to ensure no markup is being broken or other formatting errors introduced.
    let splitComment = [];
    let cutoffPoint = comment.length;
    let showEllipsis = false;
    let showTruncateButton = false;

    if (comment.length > chars) {
      splitComment = comment.substr(0, chars + 1).split(' ');
      cutoffPoint = splitComment.slice(0, splitComment.length - 1).join(' ').length;
      isCutoff = true;
      showTruncateButton = true;
    }

    let truncatedText = comment.substr(0, cutoffPoint);
    let initiallyHiddenTextThatWillExpand = comment.substr(cutoffPoint);

    let cutoffSpan = this.generateCutoff();

    return (

      <div>
        <p>
          <span dangerouslySetInnerHTML={{__html: `${truncatedText}`}} />
            {this.isTruncated
              ? (isCutoff && cuttoffSpan)
              : <span dangerouslySetInnerHTML={{__html: `${initiallyHiddenTextThatWillExpand}`}} />
            }
        </p>
        <p>{showTruncateButton && this.truncateButton()}</p>
      </div>
    )
  }

  render() {
    return (
      <div className='show-more-or-less-container'>
        { this.truncateText(this.props.text, this.props.charLimit) }
      </div>
    )
  }
}
