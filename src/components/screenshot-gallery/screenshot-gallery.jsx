import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const imgBaseURL = 'https://ease.apperian.com/uploads/';

@observer
export default class ScreenshotGallery extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        mobileScreenshots: [],
        tabletScreenshots: []
    }
  }

  static propTypes = {
    detailObj: PropTypes.object.isRequired
  }

  componentWillReceiveProps(){
    this.createScreenshotArray();
  }
  
  componentDidMount() {
    this.createScreenshotArray();
  }

  createScreenshotArray () {
    if (this.props.detailObj.mobileScreenshots) {
      var mobileSS = [];
			mobileSS =  this.props.detailObj.mobileScreenshots.map((ss) => {
				return {
					description: ss.description,
					path: imgBaseURL + ss.path
				}
			});
      this.setState({
        mobileScreenshots: mobileSS
      });
		}

		if (this.props.detailObj.tabletScreenshots) {
      var tabletSS = [];
			tabletSS =  this.props.detailObj.tabletScreenshots.map((ss) => {
				return {
					description: ss.description,
					path: imgBaseURL + ss.path
				}
			});
      this.setState({
        tabletScreenshots: tabletSS
      });
		}

  }


  renderSlides = () => {
    let screenshotArray = [...this.state.mobileScreenshots, ...this.state.tabletScreenshots];
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
