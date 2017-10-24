import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { utilsService } from '../../core/services/utils.service';

@observer
export default class SolutionCard extends React.Component {

  static propTypes = {
    linkTo: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    hasValidRelatedApp: PropTypes.bool
  }

  static defaultProps = {
    hasValidRelatedApp: false
  }

  getGradientStyles() {
    const shadowLength = '39%';
    const shadowOpacity = '0.85';
    let backgroundImage = '';
    if(utilsService.getIsInternetExplorer()) {
      backgroundImage = `-ms-linear-gradient(bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) ${shadowLength}, rgba(0, 0, 0, ${shadowOpacity}) 100%), url('${this.props.imageUrl}')`
    } else {
      backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) ${shadowLength}, rgba(0, 0, 0, ${shadowOpacity}) 100%), url('${this.props.imageUrl}')`
    }
    return {backgroundImage}
  }

  getNormalStyles() {
    return {
      background: `url('${this.props.imageUrl}') no-repeat`,
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    }
  }

  render() {
    return (
      <div key={this.props.title} className="col-xs-12 col-sm-6 col-md-6 col-lg-4 solutions-card">
        <div className="card-wrapper has-shadow">
          <Link to={this.props.linkTo}>
            <div className="card-img-wrapper">
              {this.props.hasValidRelatedApp
                ? <p className="is-linked">App Available</p>
                : ''}
              {this.props.hasValidRelatedApp
                ? <div className="img" style={this.getGradientStyles()} alt={this.props.title}></div>
                : <div className="img" style={this.getNormalStyles()} alt={this.props.title}></div>}
            </div>
            <div className="card-contents-wrapper">
              <h2 className="card-title as-h3" dangerouslySetInnerHTML={{__html: this.props.title}}></h2>
              <div className="card-desc" dangerouslySetInnerHTML={{__html: this.props.description}}></div>
            </div>
            <div className="learn-more">Learn More<i className="icon-arrowRight" aria-hidden="true" /></div>
          </Link>
        </div>
      </div>
    )
  }
}
