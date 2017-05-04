import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
export class ScreenshotGallery extends React.Component {

  //It's an array but should be an object
  static propTypes = {
    screenshots: PropTypes.shape({
      description: PropTypes.string,
      path: PropTypes.string
    })
  }

  static defaultProps = {
    screenshots: {
      description: '',
      path: '../../images/app-icon.png'
    }
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
            <img src={'/images/' + node.path} className='slide-img' alt={'Image for ' + node.description} />
          </figure>
          <figcaption className='slide-caption'>{node.description}</figcaption>
        </div>
      )
    }
  )};

  render() {

    return (
      <div className='gallery-container'>
        {this.slides(this.screenshots)}
      </div>
    )
  }
}

// class Slide extends React.Component {
//
//   static propTypes = {
//     description: PropTypes.string,
//     path: PropTypes.string
//   }
//
//   static defaultProps = {
//     description: '',
//     path: '../../images/app-icon.png'
//   }
//
//   render() {
//
//     return (
//       <div className="slide-container container-fluid">
//         <figure className='slide-figure img-responsive'>
//           <img src={'/images/' + this.props.path} className='slide-img' alt={'Image for ' + this.props.description} />
//         </figure>
//         <figcaption className='slide-caption'>{this.props.description}</figcaption>
//       </div>
//     )
//   }
// }


// this.screenshots.map((node, i) => {
//   slides.push(
//     <div key={i} className="slide-container container-fluid">
//       <figure className='slide-figure img-responsive'>
//         <img src={'/images/' + node.path} className='slide-img' alt={'Image for ' + node.description} />
//       </figure>
//     </div>
//   )
//   captions.push(
//     <figcaption key={i} className='slide-caption'>{node.description}</figcaption>
//   )
// });
//
// return (
//   <div className="gallery-container" style={hideGalleryIfNoShots}>
//     <div className="inner-flex-container">
//       <div className="slide-container">
//         {slides}
//       </div>
//       <div className="caption-container">
//         {captions}
//       </div>
//     </div>
//   </div>
// )
// }
