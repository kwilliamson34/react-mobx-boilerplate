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
    let screenshotArray = [...screenshots.mobile, ...screenshots.tablet];
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
        {this.renderSlides(this.props.screenshots)}
      </div>
    )
  }
}
