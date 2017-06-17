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
    isInitiallyTruncated: PropTypes.bool,
    text: PropTypes.string,
    wrappingElement: PropTypes.string,
    wrappingClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
    cutoffSymbol: PropTypes.string,
    returnToId: PropTypes.string
  }

  static defaultProps = {
    charLimit: 300,
    isInitiallyTruncated: true,
    text: '',
    wrappingElement: 'div',
    wrappingClassName: 'show-more-or-less-container',
    buttonClassName: 'truncate-button',
    cutoffSymbol: '8230', //ellipsis
    returnToId: null
  }

  constructor(props) {
    super(props);
    this.nodes = this.props.children.props.children;
  }

  componentWillMount() {
    this.checkIfShouldTruncate(this.nodes, this.props.charLimit);
  }

  shouldTruncate = false;
  @observable isTruncated = true;

  toggleTruncate = () => {
    this.isTruncated = !this.isTruncated;
    if (this.props.returnToId !== null) document.getElementById(this.props.returnToId).scrollIntoView();
  }

  checkIfShouldTruncate = (nodes, charLimit) => {
    //check to see if this should truncate at all;
    let rawTextLength = this.getRawText(nodes).length;
    this.shouldTruncate = charLimit <= rawTextLength;
  }

  truncateButton = () => {
    return (
      <button className='btn-link truncate-button' aria-haspopup='true' aria-expanded={ !this.isTruncated } onClick={ this.toggleTruncate } >
        { this.isTruncated ? 'SHOW MORE' : 'SHOW LESS' }<i className={this.isTruncated ? 'icon-arrowDown' : 'icon-arrowUp'} aria-hidden='true' />
      </button>
    )
  }

  splitText = (text) => {
    let splitArray = text.match(splitEverythingRegex);
    let modifiedArray = [];
    splitArray.forEach((element) => {
      htmlRegex.test(element)
        ? modifiedArray.push(element)
        : modifiedArray.push(element + ' ')
    });
    console.log('modifiedArray   ', modifiedArray);
    return modifiedArray;
  }

  getRawText = (text) => {
    return text.replace(htmlRegexGlobal, (element) => {
      //why have we done this? can't recall. pretty sure there's a reason, but might be solved better by CSS?
      if (element === '<li>') {
        return ' ';
      }
      else {
        return '';
      }
    });
  }

  generateEndElements = (cutoffSymbol) => {
    return String.fromCharCode(cutoffSymbol);
  }

  generateTruncateBlock = (array, charLimit) => {
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
        if (charCount + element.length === charLimit) {
          truncateBlock += element;
          cutoffReached = true;
        }
        if (charCount + element.length > charLimit) {
          cutoffReached = true;
        }
      }
    }

    return truncateBlock + this.generateEndElements(this.props.cutoffSymbol);
  }

  truncate = (nodes) => {

    console.log('nodes   ', nodes);
    console.log('this.shouldTruncate   ', this.shouldTruncate);

    //split text into array of tags and words; the words will have spaces after them.
    let splitText = this.splitText(nodes);
    console.log('splitText   ', splitText);

    let truncateBlock = this.shouldTruncate ? this.generateTruncateBlock(splitText, this.props.charLimit) : 'If you are seeing this, an error has occurred.';
    let wholeBlock = splitText.join('');
    console.log('truncateBlock   ', truncateBlock);
    console.log('wholeBlock   ', wholeBlock);

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
      {className: this.props.children.props.className},
      this.truncate(this.nodes)
    );
  }
}
