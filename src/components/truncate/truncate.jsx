import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, computed} from 'mobx';

const SINGLE_HTML_REGEX = /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/;
const GLOBAL_HTML_REGEX = /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/g;
const SPLIT_ALL_ELEMENTS_REGEX = /<[^>]*>|\s?[^<>\s]+\s?/g;

@observer
export default class Truncate extends React.Component {

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
    this.cutoffSymbolString = String.fromCharCode(this.props.cutoffSymbol);
  }

  @observable isTruncated = true;
  @computed get stringToTruncate() {
    //This must be a computed to update whenever the props change, e.g. when content fetch is aynchronous.
    return this.addLineBreaks(this.props.children);
  }
  @computed get shouldTruncate() {
    let rawTextLength = this.getRawText(this.stringToTruncate).length;
    return rawTextLength > this.props.charLimit;
  }
  @computed get splitArray() {
    //This is a precaution to normalize the showEverythingBlock with the showTruncatedBlock in terms of element structure.
    return this.stringToTruncate.match(SPLIT_ALL_ELEMENTS_REGEX);
  }
  @computed get everythingBlock() {
    return this.splitArray.join('');
  }
  @computed get truncatedBlock() {
    return this.findCutoffWithinStringAndTruncate(this.splitArray, this.props.charLimit) + this.cutoffSymbolString;
  }

  addLineBreaks = (value) => {
    if (typeof value === 'string') {
      value = value.replace(/\n/g, '<br/>');
    }
    return value;
  }

  getRawText = (string) => {
    return string.replace(GLOBAL_HTML_REGEX, '');
  }

  findCutoffWithinStringAndTruncate = (splitArray, charLimit) => {
    let truncateBlock = '';

    //Edge case: The user has entered one big string with no spaces.
    //Test: The number of elements in the array that are not HTML is 1. We've already determined that the text length of this array is in excess of the charLimit, so this one text element must exceed the charLimit;
    //Resolution: truncateBlock must be generated straight from the raw text. wholeBlock will generate normally.
    if (splitArray.reduce((x, y) => {
        return x + (SINGLE_HTML_REGEX.test(y) ? 0 : 1)
      }, 0) === 1) {
        truncateBlock = this.getRawText(this.stringToTruncate).substr(0, charLimit);
    } else {
      //No edge cases have triggered
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

      let isHtmlElement = SINGLE_HTML_REGEX.test(element);
      truncateBlock += element;

      if (!isHtmlElement) {
        charCount += element.length
      }
    }
    return truncateBlock;
  }

  truncateButton = () => {
    return (
      <button className='btn-link truncate-button' aria-haspopup='true' aria-expanded={!this.isTruncated} onClick={this.toggleTruncate} >
        <span>{'Show ' + (this.isTruncated ? 'more' : 'less')}</span>
        <i className={this.isTruncated ? 'icon-arrowDown' : 'icon-arrowUp'} aria-hidden='true' />
      </button>
    )
  }

  toggleTruncate = () => {
    this.isTruncated = !this.isTruncated;
    if (this.props.returnToId !== null) document.getElementById(this.props.returnToId).scrollIntoView();
  }

  renderBlock = (everythingBlock, truncatedBlock) => {
    return (
      <span className="truncate-contents">
        <p dangerouslySetInnerHTML={{__html: `${(this.shouldTruncate && this.isTruncated) ? truncatedBlock : everythingBlock}`}} />
      </span>
    )
  }

  render() {
    return (
      <this.props.wrappingElement className={this.props.className}>
        {this.renderBlock(this.everythingBlock, this.truncatedBlock)}
        {this.shouldTruncate && this.truncateButton()}
      </this.props.wrappingElement>
    );
  }
}
