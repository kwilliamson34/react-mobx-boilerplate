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
      imageUrl: PropTypes.string,
      rating: PropTypes.number,
      reviews_count: PropTypes.number,
      badge: PropTypes.bool,
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
      badge: '',
      platform: ''
    }
  }

  componentDidMount() {
    if (this.props.shouldFocus) {
      this.refs.div.children[0].focus();
    }
  }

  render() {
    const errorClass = this.props.error ? 'mdm_failed' : '';
    const selectedClass = this.props.selected ? 'mdm_selected' : '';
    const cardClass = `card-focus has-shadow card-container center-block ${errorClass} ${selectedClass}`;
    return (
      <div className="card-wrapper" ref="div">
        <Link to={'/app/' + this.props.display.app_psk} id={'appCard' + this.props.display.app_psk} className={cardClass}>
          <div className="">
            {this.props.display.badge && (
              <div className="card-badge">
                <img src='../../images/fn_badge.svg' alt="Endorsed app"/>
              </div>
            )}
            <div className="card-logo">
              <img src={this.props.display.imageUrl} alt={this.props.display.name + ' Logo'}/>
            </div>
            <section className="card-info">
              <div className="card-name">
                {this.props.display.name}
              </div>
              <div className="card-publisher">
                {this.props.display.publisher}
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
          </div>
        </Link>
      </div>
    );
  }
}
