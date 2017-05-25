import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react';
import { Rating } from '../rating/rating.jsx';


@observer
export class SummaryCard extends React.Component {

    static propTypes = {
        // events: PropTypes.shape({
        //     handleClick: PropTypes.func
        // }),
        display: PropTypes.shape({
            name: PropTypes.string, //name
            publisher: PropTypes.string, //author
            imageUrl: PropTypes.string,
            rating: PropTypes.number,
            badge: PropTypes.bool,
            app_psk: PropTypes.number,
            operatingSystem: PropTypes.oneOf(['', 'IOS', 'ANDROID'])
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
        // events: {
        //     link: '#'
        // }
    }

	constructor(props) {
		super(props);
        this.display = this.props.display;
        // this.events = this.props.events;
	}

    componentWillReceiveProps(nextProps) {
        this.display = nextProps.display;
    }

	render() {
    return (
        <div className="card-wrapper">
            <Link to={'/app/' + this.props.display.app_psk} className="card-focus has-shadow">
                <div className="card-container">
                    {this.display.badge && (
                        <div className="card-badge">
                            <img src='../../images/fn_badge.svg' alt="Endorsed app"/>
                        </div>
                    )}
                    <div className="card-logo">
                        <img src={this.display.imageUrl} alt={this.display.name + ' Logo'}/>
                    </div>
                    <section className="card-info">
                        <div className="card-name">
                            {this.display.name}
                        </div>
                        <div className="card-publisher hidden-xs">
                            {this.display.publisher}
                        </div>
                    </section>
                    <div className="card-rating">
                        <Rating rating={this.display.rating}></Rating>
                    </div>
                    {this.display.operatingSystem && <div className="card-platform">
                        <span className="sr-only">&nbsp;Hosted at the</span>
                        <span style={{textTransform: 'uppercase'}}>{this.display.operatingSystem}</span>
                        <span className="sr-only">&nbsp;app store</span>
                    </div>}
                </div>
            </Link>
        </div>
    );
  }
}
