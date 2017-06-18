import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

const htmlRegex = /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/;
const htmlRegexGlobal = /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/g;
const splitEverythingRegex = /<[^>]+>|[^<>\s]+/g;

@observer
export default class ShowMoreOrLess extends React.Component {

  static propTypes = {
    charLimit: PropTypes.number,
    cutoffSymbol: PropTypes.string,
    returnToId: PropTypes.string,
    children: PropTypes.object
  }

  static defaultProps = {
    charLimit: 300,
    cutoffSymbol: '8230', //ellipsis
    returnToId: null
  }

  constructor(props) {
    super(props);
    this.nodeString = this.props.children.props.children;
  }

  componentWillMount() {
    this.shouldTruncate = this.checkIfShouldTruncate(this.nodeString, this.props.charLimit);
    this.renderNodeBlocks = this.generateNodeBlocks(this.nodeString);
  }

  shouldTruncate = false;
  renderNodeBlocks = null;
  @observable isTruncated = true;

  toggleTruncate = () => {
    this.isTruncated = !this.isTruncated;
    if (this.props.returnToId !== null) document.getElementById(this.props.returnToId).scrollIntoView();
  }

  checkIfShouldTruncate = (nodeString, charLimit) => {
    let rawTextLength = this.getRawText(nodeString).length;
    return charLimit <= rawTextLength;
  }

  truncateButton = () => {
    return (
      <button className='btn-link truncate-button' aria-haspopup='true' aria-expanded={!this.isTruncated} onClick={this.toggleTruncate} >
        {this.isTruncated ? 'SHOW MORE' : 'SHOW LESS'}<i className={this.isTruncated ? 'icon-arrowDown' : 'icon-arrowUp'} aria-hidden='true' />
      </button>
    )
  }

  splitNodeString = (string) => {
    let splitStringArray = string.match(splitEverythingRegex);
    let modifiedArray = [];
    splitStringArray.forEach((element) => {
      htmlRegex.test(element)
        ? modifiedArray.push(element)
        : modifiedArray.push(element + ' ')
    });
    return modifiedArray;
  }

  getRawText = (string) => {
    return string.replace(htmlRegexGlobal, '');
  }

  generateEndElements = (number) => {
    return String.fromCharCode(number);
  }

  generateTruncateBlockValid = (array, charLimit) => {
    let charCount = 0;
    let cutoffReached = false;

    let truncateBlock = '';

    for (var i = 0; i < array.length && !cutoffReached; i++) {
      let element = array[i];
      if (htmlRegex.test(element)) {
        truncateBlock += element;
      }
      else {
        if (charCount + element.length < charLimit) {
          charCount += element.length
          truncateBlock += element;
        }
        else if (charCount + element.length === charLimit) {
          truncateBlock += element;
          cutoffReached = true;
        }
        else if (charCount + element.length > charLimit) {
          cutoffReached = true;
        }
      }
    }

    return truncateBlock;
  }

  generateTruncateBlock = (array, charLimit) => {
    let truncateBlock = '';

    //Edge case 1: The user has entered one big string with no spaces.
      //Test: The number of elements in the array that are not HTML is 1. We've already determined that the text length of this array is in excess of the charLimit, so this one text element must exceed the charLimit;
      //Resolution: truncateBlock must be generated straight from the raw text. wholeBlock will be fine.
    if (array.reduce((x, y) => {
      return x + (htmlRegex.test(y) ? 0 : 1)
    }, 0) === 1) {
      truncateBlock = this.getRawText(this.nodeString).substr(0, charLimit);
    }
    //If no edge cases have triggered.
    else {
      truncateBlock = this.generateTruncateBlockValid(array, charLimit);
    }

    return truncateBlock;
  }

  generateNodeBlocks = (nodeString) => {
    let returnBlocks = {
      truncateBlock: '',
      wholeBlock: ''
    };

    let nodeArray = this.splitNodeString(nodeString);
    returnBlocks.wholeBlock = nodeArray.join('');

    if (this.shouldTruncate) {
      returnBlocks.truncateBlock = this.generateTruncateBlock(nodeArray, this.props.charLimit) + this.generateEndElements(this.props.cutoffSymbol);
    }
    else {
      returnBlocks.truncateBlock = 'If this text is visible, an error has occurred.'
    }

    return returnBlocks;
  }

  renderNodes = (wholeBlock, truncateBlock) => {
    return (
      <span>
        {this.shouldTruncate
          ? this.isTruncated
            ? <span dangerouslySetInnerHTML={{__html: `${truncateBlock}`}} />
            : <span dangerouslySetInnerHTML={{__html: `${wholeBlock}`}} />
          : <span dangerouslySetInnerHTML={{__html: `${wholeBlock}`}} />
        }
        {this.shouldTruncate && this.truncateButton()}
      </span>
    )
  }

  render() {
    return React.createElement(
      this.props.children.type,
      {
        className: this.props.children.props.className,
        id: this.props.children.props.id
      },
      this.renderNodes(this.renderNodeBlocks.wholeBlock, this.renderNodeBlocks.truncateBlock)
    );
  }
}
