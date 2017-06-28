import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

const singleHtmlRegex = /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/;
const globalHtmlRegex = /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/g;
const splitAllElementsRegex = /<[^>]*>|\s?[^<>\s]+\s?/g;

@observer
export default class ShowMoreOrLess extends React.Component {

  static propTypes = {
    wrappingElement: PropTypes.string,
    className: PropTypes.string,
    charLimit: PropTypes.number,
    returnToId: PropTypes.string,
    cutoffSymbol: PropTypes.string,
    children: PropTypes.string
  }

  static defaultProps = {
    wrappingElement: 'div',
    charLimit: 300,
    cutoffSymbol: '8230', //ellipsis
    returnToId: null,
    children: {}
  }

  constructor(props) {
    super(props);
    this.stringToTruncate = this.props.children;
    this.shouldTruncate = false;
    this.truncationElements = null;
  }

  componentWillMount() {
    this.shouldTruncate = this.checkIfShouldTruncate(this.stringToTruncate, this.props.charLimit);
    this.showEverythingBlock = this.generateEverythingBlock(this.stringToTruncate);
    this.showTruncatedBlock = this.generateTruncatedBlock(this.stringToTruncate, this.props.charLimit);
  }

  @observable isTruncated = true;

  checkIfShouldTruncate = (stringToTruncate, charLimit) => {
    let rawTextLength = this.getRawText(stringToTruncate).length;
    return charLimit < rawTextLength;
  }

  getRawText = (string) => {
    return string.replace(globalHtmlRegex, '');
  }

  generateEverythingBlock = (stringToTruncate) => {
    //This is a precaution to normalize the showEverythingBlock with the showTruncatedBlock. Might not ultimately be necessary.
    let splitArray = stringToTruncate.match(splitAllElementsRegex);
    return splitArray.join('');
  }

  generateTruncatedBlock = (stringToTruncate, charLimit) => {
    let splitArray = stringToTruncate.match(splitAllElementsRegex);
    return this.shouldTruncate
      ? this.findTruncateBlock(splitArray, charLimit) + this.generateEndElements(this.props.cutoffSymbol)
      : 'Error';
  }

  findTruncateBlock = (splitArray, charLimit) => {
    let truncateBlock = '';

    //Edge case: The user has entered one big string with no spaces.
      //Test: The number of elements in the array that are not HTML is 1. We've already determined that the text length of this array is in excess of the charLimit, so this one text element must exceed the charLimit;
      //Resolution: truncateBlock must be generated straight from the raw text. wholeBlock will generate normally.
    if (splitArray.reduce((x, y) => {
        return x + (singleHtmlRegex.test(y) ? 0 : 1)
      }, 0) === 1) {
        truncateBlock = this.getRawText(this.stringToTruncate).substr(0, charLimit);
    }
    //If no edge cases have triggered:
    else {
      truncateBlock = this.generateRegularTruncateBlock(splitArray, charLimit);
    }

    return truncateBlock;
  }

  generateRegularTruncateBlock = (array, charLimit) => {
    let charCount = 0;
    let truncateBlock = '';

    for (var i = 0; i < array.length; i++) {
      let element = array[i];
      if (charCount + element.length > charLimit) break;

      let isHtmlElement = singleHtmlRegex.test(element);
      truncateBlock += element;

      if (!isHtmlElement) {
        charCount += element.length
      }
    }
    return truncateBlock;
  }

  generateEndElements = (number) => {
    return String.fromCharCode(number);
  }

  truncateButton = () => {
    return (
      <button className='btn-link truncate-button' aria-haspopup='true' aria-expanded={!this.isTruncated} onClick={this.toggleTruncate} >
        {this.isTruncated ? 'SHOW MORE' : 'SHOW LESS'}<i className={this.isTruncated ? 'icon-arrowDown' : 'icon-arrowUp'} aria-hidden='true' />
      </button>
    )
  }

  toggleTruncate = () => {
    this.isTruncated = !this.isTruncated;
    if (this.props.returnToId !== null) document.getElementById(this.props.returnToId).scrollIntoView();
  }

  renderNodes = (everythingBlock, truncatedBlock) => {
    return (
      <span className="truncate-contents">
        {this.shouldTruncate && this.isTruncated
          ? <p dangerouslySetInnerHTML={{__html: `${truncatedBlock}`}} />
        : <p dangerouslySetInnerHTML={{__html: `${everythingBlock}`}} />
        }
        {this.shouldTruncate && this.truncateButton()}
      </span>
    )
  }

  render() {
    return React.createElement(
      this.props.wrappingElement,
      {
        className: this.props.className
      },
      this.renderNodes(this.showEverythingBlock, this.showTruncatedBlock)
    );
  }
}
