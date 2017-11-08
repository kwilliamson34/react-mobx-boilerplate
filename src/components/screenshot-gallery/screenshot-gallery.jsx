import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export default class ScreenshotGallery extends React.Component {

  static propTypes = {
    detailObj: PropTypes.object.isRequired
  }

  renderSlides = () => {
    let mobileArray = [];
    this.props.detailObj.mobileScreenshots.map(x => {
      x.screenType = 'mobile';
      mobileArray.push(x);
    });
    let tabletArray = [];
    this.props.detailObj.tabletScreenshots.map(x => {
      x.screenType = 'tablet';
      mobileArray.push(x);
    });
    let screenshotArray = [...mobileArray, ...tabletArray];
    return screenshotArray.map((node, i) => {
      let imgPath = node.path;
      return (
        <div key={i} className={`slide-container ${node.screenType}`}>
          <figure className='img-responsive'>
            <img src={imgPath} className='slide-img' alt={node.description} aria-labelledby={'slide-caption-' + i} />
            <figcaption className='slide-caption' id={'slide-caption-' + i}>{node.description}</figcaption>
          </figure>
        </div>
      )
    }
  )};

  render() {
    return (
      <div className="gallery-container" role="region" aria-label="App screenshot gallery">
        <div className="scrollable-region">
          {this.renderSlides()}
        </div>
      </div>
    )
  }
}
