import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
export default class ScreenshotGallery extends React.Component {

  static propTypes = {
    screenshots: PropTypes.shape({
      mobile: PropTypes.observableArray,
      tablet: PropTypes.observableArray
    })
  }

  static defaultProps = {
    screenshots: {
      mobile: [],
      tablet: []
    }
  }


  renderSlides = (screenshots) => {
    console.log('screenshots    ', screenshots);
    let screenshotArray = [...screenshots.mobile, ...screenshots.tablet];
    return screenshotArray.map((node, i) => {
      return (
        <div key={i} className='slide-container'>
          <figure className='img-responsive'>
            <img src={node.path} className='slide-img' alt={'Image for ' + node.description} aria-labelledby='slide-caption' />
          </figure>
          <figcaption className='slide-caption' id='slide-caption'>{node.description}</figcaption>
        </div>
      )
    }
  )};

  render() {
    return (
      <div className='gallery-container' role='region' aria-label='App screenshot gallery'>
        {this.renderSlides(this.props.screenshots)}
      </div>
    )
  }
}
