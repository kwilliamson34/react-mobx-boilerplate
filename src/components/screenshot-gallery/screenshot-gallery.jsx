import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
export default class ScreenshotGallery extends React.Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    screenshots: PropTypes.object.isRequired
  }

  renderSlides = () => {
    let screenshotArray = [...this.props.screenshots.mobileScreenshots, ...this.props.screenshots.tabletScreenshots];
    return screenshotArray.map((node, i) => {
      return (
        <div key={i} className='slide-container'>
          <figure className='img-responsive'>
            <img src={node.path} className='slide-img' alt={node.description} aria-labelledby={'slide-caption-' + i} />
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
