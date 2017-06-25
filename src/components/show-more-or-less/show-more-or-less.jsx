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
    addClasses: PropTypes.string,
    charLimit: PropTypes.number,
    returnToId: PropTypes.string,
    cutoffSymbol: PropTypes.string,
    children: PropTypes.string
  }

  static defaultProps = {
    wrappingElement: 'div',
    addClasses: '',
    charLimit: 300,
    cutoffSymbol: '8230', //ellipsis
    returnToId: null,
    children: {}
  }

  constructor(props) {
    super(props);
    console.log('CHULDRUN    ', this.props.children);
    this.stringToTruncate = this.props.children;
    this.shouldTruncate = false;
    this.truncationElements = null;
  }

  componentWillMount() {
    this.shouldTruncate = this.checkIfShouldTruncate(this.stringToTruncate, this.props.charLimit);
    this.truncationElements = this.generateTruncationElements(this.stringToTruncate);
  }

  @observable isTruncated = true;

  toggleTruncate = () => {
    this.isTruncated = !this.isTruncated;
    if (this.props.returnToId !== null) document.getElementById(this.props.returnToId).scrollIntoView();
  }

  checkIfShouldTruncate = (stringToTruncate, charLimit) => {
    let rawTextLength = this.getRawText(stringToTruncate).length;
    return charLimit < rawTextLength;
  }

  truncateButton = () => {
    return (
      <button className='btn-link truncate-button' aria-haspopup='true' aria-expanded={!this.isTruncated} onClick={this.toggleTruncate} >
        {this.isTruncated ? 'SHOW MORE' : 'SHOW LESS'}<i className={this.isTruncated ? 'icon-arrowDown' : 'icon-arrowUp'} aria-hidden='true' />
      </button>
    )
  }

  getRawText = (string) => {
    return string.replace(globalHtmlRegex, '');
  }

  generateEndElements = (number) => {
    return String.fromCharCode(number);
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
      };
    }
    return truncateBlock;
  }

  generateTruncateBlock = (array, charLimit) => {
    let truncateBlock = '';

    //Edge case: The user has entered one big string with no spaces.
      //Test: The number of elements in the array that are not HTML is 1. We've already determined that the text length of this array is in excess of the charLimit, so this one text element must exceed the charLimit;
      //Resolution: truncateBlock must be generated straight from the raw text. wholeBlock will generate normally.
    if (array.reduce((x, y) => {
        return x + (singleHtmlRegex.test(y) ? 0 : 1)
      }, 0) === 1) {
        truncateBlock = this.getRawText(this.stringToTruncate).substr(0, charLimit);
    }
    //If no edge cases have triggered:
    else {
      truncateBlock = this.generateRegularTruncateBlock(array, charLimit);
    }

    return truncateBlock;
  }

  generateTruncationElements = (stringToTruncate) => {
    let returnBlocks = {
      truncateBlock: '',
      wholeBlock: ''
    };

    let splitArray = stringToTruncate.match(splitAllElementsRegex);
    console.log('splitArray   ', splitArray);
    returnBlocks.wholeBlock = splitArray.join('');

    if (this.shouldTruncate) {
      returnBlocks.truncateBlock = this.generateTruncateBlock(splitArray, this.props.charLimit) + this.generateEndElements(this.props.cutoffSymbol);
    }
    else {
      returnBlocks.truncateBlock = console.error('Truncation component has failed to generate truncated text.');
    }

    return returnBlocks;
  }

  renderNodes = (wholeBlock, truncateBlock) => {
    return (
      <span>
        {this.shouldTruncate && this.isTruncated
          ? <span dangerouslySetInnerHTML={{__html: `${truncateBlock}`}} />
          : <span dangerouslySetInnerHTML={{__html: `${wholeBlock}`}} />
        }
        {this.shouldTruncate && this.truncateButton()}
      </span>
    )
  }

  render() {
    return React.createElement(
      this.props.wrappingElement,
      {
        className: this.props.addClasses
      },
      this.renderNodes(this.truncationElements.wholeBlock, this.truncationElements.truncateBlock)
    );
  }
}
