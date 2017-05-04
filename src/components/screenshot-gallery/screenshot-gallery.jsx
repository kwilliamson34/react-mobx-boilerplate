import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
export class ScreenshotGallery extends React.Component {

  static propTypes = {
    screenshots: PropTypes.array
  }

  static defaultProps = {
    screenshots: []
  }

  constructor(props) {
    super(props);
        this.screenshots = this.props.screenshots;
  }

  slides = (screenshots) => {
    return screenshots.map((node, i) => {
      return (
        <div key={i} className='slide-container'>
          <figure className='slide-figure img-responsive'>
            <img src={'/images/' + node.path} className='slide-img' alt={'Image for ' + node.description} aria-labelledby='slide-caption' />
          </figure>
          <figcaption className='slide-caption' id='slide-caption'>{node.description}</figcaption>
        </div>
      )
    }
  )};

  render() {

    return (
      <div className='gallery-container' role='region' aria-label='App screenshot gallery'>
        {this.slides(this.screenshots)}
      </div>
    )
  }
}
