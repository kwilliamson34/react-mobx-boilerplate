import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

const exOne = '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>'

const exTwo = '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p><ul><li>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</li><li>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</li><li>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.</li><li>Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.</li></ul>'

const exThree = '<h1>HTML Ipsum Presents</h1><p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum<br /> tortor<br /> quam,<br /> feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. <strong>Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi,</strong> condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p><h2>Header Level 2</h2><ol><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li></ol><blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote><h3>Header Level 3</h3><ul><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li></ul>';


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

  shouldTruncate = true;
  @observable isTruncated = true;

  toggleTruncate = () => {
    this.isTruncated = !this.isTruncated;
    if (this.props.returnToId !== null) document.getElementById(this.props.returnToId).scrollIntoView();
  }

  truncateButton = () => {
    return (
      <button className='btn-link truncate-button' aria-haspopup='true' aria-expanded={ !this.isTruncated } onClick={ this.toggleTruncate } >
        { this.isTruncated ? 'SHOW MORE' : 'SHOW LESS' }<i className={this.isTruncated ? 'icon-arrowDown' : 'icon-arrowUp'} aria-hidden='true' />
      </button>
    )
  }

  splitText = (text) => {
    return text.match(splitEverythingRegex);
  }

  getRawText = (text) => {
    return text.replace(htmlRegexGlobal, (element) => {
      //we'll eventually need to add all the elements that inherently add a space. Why? Because it MUST BE PERFECT.
      if (element === '<li>') {
        return ' ';
      }
      else {
        return '';
      }
    });
  }

  reformText = (text, charLimit) => {

    //split text into array of tags and words
    let splitText = this.splitText(text);
    console.log('splitText   ', splitText);

    let rawTextLength = this.getRawText(text).length;
    console.log('text.length   ', text.length);
    console.log('rawTextLength   ', rawTextLength);

    let truncateBlock = '';
    let wholeBlock = ''

    let charCount = 0;
    let cutoffReached = false;

    while (splitText.length > 0) {
      let element = splitText.shift();

      if (htmlRegex.test(element)) {
        wholeBlock += element;
        if (!cutoffReached) truncateBlock += element;
      }
      else if (!cutoffReached) {
        //we've not reached cutoff. Let's find it.
        if (charCount + element.length < charLimit) {
          //adding this text element won't exceed charLimit. Add it and continue.
          charCount += element.length;
          truncateBlock += element + ' ';
          wholeBlock += element + ' ';
        }
        else if (charCount + element.length === charLimit) {
          //this is the final element before cutoff. Add it to the string, then check if we need to truncate the comment;
          charCount += element.length;
          truncateBlock += element + ' ';
          wholeBlock += element + ' ';

          if (charCount < rawTextLength) {
            //there's text still to go. the comment will truncate.
            //edge case: what if there's only one (or a very few) words left in the block? would look silly. might need to track index and build in a buffer.
            this.shouldTruncate = true;
            cutoffReached = true;
          }
          else if (charCount === rawTextLength) {
            //text has ended, but we need to continue the loop to close out tags.
            this.shouldTruncate = false;
            cutoffReached = true;
          }
          else {
            console.log('reformText error at: else if (charCount + element.length === charLimit)');
          }
        }
        else if (charCount + element.length > charLimit) {
          //we've passed the cutoffPoint. this is where things get difficult.
          if (charCount + element.length < rawTextLength) {
            //there remains text after adding this element. add the elements before this word.
            wholeBlock += element;
            this.shouldTruncate = true;
            cutoffReached = true;
          }
          else if (charCount + element.length === rawTextLength) {
            //if we add the element, this equals rawTextLength. This means we're at the last text element, so rather than cutoff with one word remaining, we'll close out here.
            truncateBlock += element;
            wholeBlock += element;
            this.shouldTruncate = false;
            cutoffReached = true;
          }
          else {
            console.log('reformText error at: else if (charCount + element.length > charLimit)');
          }
        }
      }
      else if (cutoffReached) {
        //add all other text to the wholeBlock
        wholeBlock += element + ' ';
      }
      else {
        console.log('reformText while-loop error');
      }
    }
    //when while-loop ends, close out the span.
    return {
      truncateBlock: truncateBlock,
      wholeBlock: wholeBlock
    };
  }

  generateEndElements = () => {
    return String.fromCharCode(this.props.cutoffSymbol);
  }

  // generateEndElements = (truncateBlock, cutoffSymbol) => {
  //
  //   let htmlTags = truncateBlock.match(htmlRegexGlobal);
  //   console.log('htmlTags   ', htmlTags);
  //
  //   let elementStack = [];
  //   let endElements = '';
  //
  //   for (let tag in htmlTags) {
  //     if (htmlTags[tag].search('/') <= 0) {
  //       elementStack.push(htmlTags[tag]);
  //     }
  //     else if (htmlTags[tag].search('/') == 1) {
  //       elementStack.pop();
  //     }
  //     else {
  //       //needs test
  //       console.log('self closing tag  ', htmlTags[tag]);
  //     }
  //   }
  //
  //   while (elementStack.length > 0) {
  //     let endTag = elementStack.pop();
  //     endTag = endTag.substr(1, endTag.search(/[ >]/));
  //     endElements += `</${endTag}`;
  //   }
  //
  //   console.log('endElements   ', endElements);
  //
  //   let symbolAndEndElements = String.fromCharCode(cutoffSymbol) + endElements;
  //
  //   let finalTruncateBlock = truncateBlock + symbolAndEndElements;
  //   console.log('finalTruncateBlock   ', finalTruncateBlock);
  //
  //   return finalTruncateBlock;
  // };

  truncateText = (text) => {

    let reformedTextObject = this.reformText(text, this.props.charLimit);

    // let truncateBlockWithEndElements = this.generateEndElements(reformedTextObject.truncateBlock, this.props.cutoffSymbol);
    // console.log('truncateBlockWithEndElements   ', truncateBlockWithEndElements);
    let wholeBlock = reformedTextObject.wholeBlock;
    let finalTruncateBlock = reformedTextObject.truncateBlock + this.generateEndElements();

    return (
      <span>
        {this.shouldTruncate
          ? this.isTruncated
            ? <span dangerouslySetInnerHTML={{__html: `${finalTruncateBlock}`}} />
            : <span dangerouslySetInnerHTML={{__html: `${wholeBlock}`}} />
          : <span dangerouslySetInnerHTML={{__html: `${wholeBlock}`}} />
        }
        {this.shouldTruncate && this.truncateButton()}
      </span>
    )
  }

  render() {
    return React.createElement(
      this.props.wrappingElement,
      {className: this.props.wrappingClassName},
      this.truncateText(exThree)
    );
  }
}

//more than one wrappingClassName
//make it a wrapping component.
//change shouldTruncate to initial check
