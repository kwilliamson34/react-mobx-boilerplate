import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import config from 'config';
const imgBaseURL = config.apperianUpload;

@observer
export default class ScreenshotGallery extends React.Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    detailObj: PropTypes.object.isRequired
  }

  renderSlides = () => {
    let screenshotArray = [...this.props.detailObj.mobileScreenshots, ...this.props.detailObj.tabletScreenshots];

    return screenshotArray.map((node, i) => {
      let imgPath = imgBaseURL + node.path;

      return (
        <div key={i} className='slide-container'>
          <figure className='img-responsive'>
            <img src={imgPath} className='slide-img' alt={node.description} aria-labelledby={'slide-caption-' + i} />
          </figure>
          <figcaption className='slide-caption' id={'slide-caption-' + i}>{node.description}</figcaption>
        </div>
      )
    }
  )};

  render() {

    return (
      <div className='gallery-container' role='region' aria-label='App screenshot gallery'>
        {this.renderSlides()}
      </div>
    )
  }
}
