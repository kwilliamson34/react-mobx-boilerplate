import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react';
import {Rating} from '../rating/rating.jsx';
import {utilsService} from '../../core/services/utils.service';

@observer
export class SummaryCard extends React.Component {

  static propTypes = {
    shouldFocus: PropTypes.bool,
    display: PropTypes.shape({
      name: PropTypes.string,
      publisher: PropTypes.string, //author
      type: PropTypes.string,
      imageUrl: PropTypes.string,
      rating: PropTypes.number,
      reviews_count: PropTypes.number,
      app_psk: PropTypes.string,
      platform: PropTypes.oneOf(['', 'NONE', 'IOS', 'ANDROID'])
    }).isRequired,
    error: PropTypes.bool,
    selected: PropTypes.bool
  }

  static defaultProps = {
    display: {
      name: 'NAME ERROR',
      publisher: 'PUBLISHER ERROR',
      imageUrl: '../../images/app-icon.png',
      rating: 0,
      platform: ''
    }
  }

  componentDidMount() {
    if (this.props.shouldFocus) {
      this.div.children[0].focus();
    }
  }

  render() {
    const errorClass = this.props.error ? 'mdm_failed' : '';
    const selectedClass = this.props.selected ? 'mdm_selected' : '';
    const cardClass = `card-focus has-shadow card-container center-block ${errorClass} ${selectedClass}`;
    return (
      <div className="card-wrapper" ref={(i) => { this.div = i }}>
        <Link to={'/app/' + this.props.display.app_psk} id={'appCard' + this.props.display.app_psk} className={cardClass}>
        {this.props.display.type == 'CERTIFIED' &&
          <div className="certified-app-label">
            <i className="icon icon-check-circle" aria-hidden="true"></i>
            <span className="sr-only">This app is </span><span>FirstNet Certified</span>
          </div>
        }
            <div className="card-logo">
              <img src={this.props.display.imageUrl} alt="" aria-hidden="true" />
            </div>
            <section className="card-info">
              <div className="card-name">
                {this.props.display.name}
              </div>
              <div className="card-publisher">
                <span className="sr-only">Published By </span>{this.props.display.publisher}
              </div>
            </section>
            <div className="card-lower-meta">
              <div className="card-rating">
                <Rating rating={this.props.display.rating} reviewCount={this.props.display.reviews_count} showRatingNumber={true}></Rating>
              </div>
              {utilsService.properCaseOS(this.props.display.platform) && <div className="card-platform">
                <span className="sr-only">Hosted at the&nbsp;</span>
                {utilsService.properCaseOS(this.props.display.platform)}
                <span className="sr-only">&nbsp;app store</span>
              </div>}
            </div>
        </Link>
      </div>
    );
  }
}
