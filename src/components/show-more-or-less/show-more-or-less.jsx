import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

const htmlRegex = /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/;
const htmlRegexGlobal = /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/g;
const splitEverythingRegex = /<[^>]+>|[^<>\s]+/g;

// const exampleOne = '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>'

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
    wrappingClassName: PropTypes.string,
    cutoffSymbol: PropTypes.string,
    returnToId: PropTypes.string
  }

  static defaultProps = {
    charLimit: 300,
    isInitiallyTruncated: true,
    text: '',
    wrappingElement: 'div',
    cutoffSymbol: '8230', //ellipsis
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

  //going to need some logic to stop it if there's no cutoff. Basically need to continue to full charLength and compare.
  //we're splitting a word, which is no good.
  //going to need to add the tags right on to the end of the truncated block and then remove them. they can't just sit empty inside a span. kind of a pain.


  findCutoffPoint = (array, charLimit) => {

    let charLength = 0;
    let totalLength = 0;
    let cutoffPoint = 0;

    for (var i = 0; i < array.length; ++i) {

      if (htmlRegex.test(array[i])) {
        totalLength += array[i].length;
      }
      else {
        if (charLength + array[i].length < charLimit) {
          charLength += array[i].length;
          totalLength = totalLength + array[i].length;
        }
        else if (charLength + array[i].length === charLimit) {
          totalLength += array[i].length;
          cutoffPoint = totalLength;
          return cutoffPoint;
        }
        else if (charLength + array[i].length > charLimit) {
          cutoffPoint = totalLength;
          return cutoffPoint;
        }
        else {
          console.log('findCutoffPoint error');
        }
      }
      // console.log('i  ', i);
      // console.log('array[i]  ', array[i]);
      // console.log('charLength  ', charLength);
      // console.log('totalLength  ', totalLength);
      // console.log('cutoffPoint  ', cutoffPoint);
    }
  }

  generateCutoff = (truncatedText, cutoffSymbol) => {
    console.log('generateCutoff triggered');

    let htmlTags = truncatedText.match(htmlRegexGlobal);
    console.log('htmlTags   ', htmlTags);

    //https://osric.com/chris/accidental-developer/2012/11/balancing-tags-in-html-and-xhtml-excerpts/

    let stack = [];
    let endElements = '';

    for (let tag in htmlTags) {
      if (htmlTags[tag].search('/') <= 0) {
        stack.push(htmlTags[tag]);
      }
      else if (htmlTags[tag].search('/') == 1) {
        stack.pop();
      }
      else {
        console.log('self closing tag  ', htmlTags[tag]);
      }
    }

    while (stack.length > 0) {
      let endTag = stack.pop();
      //might need massaging to grab all inline styles already in string, assuming we want them (might not);
      endTag = endTag.substr(1, endTag.search(/[ >]/));
      endElements += `</${endTag}`;
    }

    console.log('endElements   ', endElements);

    let finalEndElements = String.fromCharCode(cutoffSymbol) + endElements;

    return (
      <span dangerouslySetInnerHTML={{__html: `${finalEndElements}`}} />
    )
  };

  truncateText = (text, charLimit) => {

    //temp. needs to be conditional on charLength in this.findCutoffPoint
    let isCutoff = true;
    let showTruncateButton = true;

    console.log('text.length   ', text.length);

    let splitText = text.match(splitEverythingRegex);
    console.log('splitText    ', splitText);

    let cutoffPoint = this.findCutoffPoint(splitText, this.props.charLimit);

    let truncatedBlock = text.substr(0, cutoffPoint);
    console.log('truncatedBlock   ', truncatedBlock);
    let hiddenBlock = text.substr(cutoffPoint);
    console.log('hiddenBlock   ', hiddenBlock);

    let cutoffElements = this.generateCutoff(truncatedBlock, this.props.cutoffSymbol);

    return (
      <div>
        <p>
          <span dangerouslySetInnerHTML={{__html: `${truncatedBlock}`}} />
            {this.isTruncated
              ? (isCutoff && cutoffElements)
              : <span dangerouslySetInnerHTML={{__html: `${hiddenBlock}`}} />
            }
        </p>
        <p>{showTruncateButton && this.truncateButton()}</p>
      </div>
    )

  }

  // truncateText = (text, charLimit) => {
  //
  //   //TODO: Comment may need to be normalized to display correctly. Probably need some regex on the last index item in the array currently being used to generate cutoffPoint, to ensure no markup is being broken or other formatting errors introduced.
  //   //split the entire text by html tag. loop over the array. every time you detect it's an html tag, generate a new element using react and put it in the html string.
  //   //we're just going to ASSume that the html tags all close? yes.
  //   //each time it is NOT html and is simply text, start counting its length up to the charLimit. At the charLimit, add the cutoff element, then continue.
  //   //what we can also do is save each new html tag as it arrives, and detect if it's an open or closed, yeah? If your tag is open, we need to add the closed tag to the start of the cutoffSpan.
  //   //fuck no, we need to add ALL closing tags to the start of the span. we can't have any open.
  //   //so we need a fuckn stack or something. every time there's an open tag, we need to send to an array, or concat to a string.
  //
  //   let splitText = [];
  //   let cutoffPoint = text.length;
  //   let isCutoff = false;
  //   let showTruncateButton = false;
  //
  //   //what if we did it recursively?
  //   //no, all we need is two string. we don't need to do all that shit we said. we just need to track the html tags, that's literally all.
  //   //we need to split the string at the html tags. So we need regex for that.
  //   //then we need to loop over the array. anything that's an opening html, we add it to the stack.
  //   //if it's a closing html, we close it off the stack. fuck me, we can do that surely.
  //     //gah, i can't remember. okay,
  //     //ok got it. Let's start this clean.
  //
  //   function findHtml() {
  //
  //   }
  //
  //   // if (text.length > charLimit) {
  //   //   console.log('LENGTH TRIGGERED');
  //   //   splitText = text.substr(0, charLimit + 1).split(' ');
  //   //   cutoffPoint = splitText.slice(0, splitText.length - 1).join(' ').length;
  //   //   isCutoff = true;
  //   //   showTruncateButton = true;
  //   // }
  //
  //   let truncatedText = text.substr(0, cutoffPoint);
  //   let initiallyHiddenTextThatWillExpand = text.substr(cutoffPoint);
  //
  //   return (
  //
  //     <div>
  //       <p>
  //         <span dangerouslySetInnerHTML={{__html: `${truncatedText}`}} />
  //           {this.isTruncated
  //             ? (isCutoff && this.generateCutoff('', this.props.cutoffSymbol))
  //             : <span dangerouslySetInnerHTML={{__html: `${initiallyHiddenTextThatWillExpand}`}} />
  //           }
  //       </p>
  //       <p>{showTruncateButton && this.truncateButton()}</p>
  //     </div>
  //   )
  // }

  render() {
    return React.createElement(
      this.props.wrappingElement,
      {className: this.props.wrappingClassName},
      this.truncateText(this.props.text, this.props.charLimit)
    );
  }
}
