import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {observer} from 'mobx-react';
import {Rating} from '../rating/rating.jsx';

@observer
export class SummaryCard extends React.Component {

  static propTypes = {
    shouldFocus: PropTypes.bool,
    display: PropTypes.shape({
      name: PropTypes.string,
      publisher: PropTypes.string, //author
      imageUrl: PropTypes.string,
      rating: PropTypes.number,
      badge: PropTypes.bool,
      app_psk: PropTypes.string,
      operatingSystem: PropTypes.oneOf(['', 'NONE', 'IOS', 'ANDROID'])
    }).isRequired
  }

  static defaultProps = {
    display: {
      name: 'NAME ERROR',
      publisher: 'PUBLISHER ERROR',
      imageUrl: '../../images/app-icon.png',
      rating: 0,
      badge: '',
      operatingSystem: ''
    }
  }

  componentDidMount() {
    if (this.props.shouldFocus) this.refs.div.children[0].focus();
  }


  render() {
    return (
      <div className="card-wrapper" ref="div">
        <Link to={'/app/' + this.props.display.app_psk} className="card-focus has-shadow">
          <div className="card-container">
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
              <div className="card-publisher hidden-xs">
                {this.props.display.publisher}
              </div>
            </section>
            <div className="card-rating">
              <Rating rating={this.props.display.rating}></Rating>
            </div>
            {this.props.display.operatingSystem && <div className="card-platform">
              <span className="sr-only">Hosted at the&nbsp;</span>
              {this.props.display.operatingSystem}
              <span className="sr-only">&nbsp;app store</span>
            </div>}
          </div>
        </Link>
      </div>
    );
  }
}
