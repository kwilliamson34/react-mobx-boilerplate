import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react';
import { Rating } from '../rating/rating.jsx';


@observer 
export class SummaryCard extends React.Component {

    static propTypes = {
        events: PropTypes.shape({
            handleClick: PropTypes.func,
        }),
        display: PropTypes.shape({
            name: PropTypes.string, //name
            publisher: PropTypes.string, //author
            imageUrl: PropTypes.string,
            rating: PropTypes.number,
            badge: PropTypes.bool,
            platforms: PropTypes.oneOf(['', 'Apple', 'Android']),
        }).isRequired
    }

    static defaultProps = {
        display: {
            name: 'NAME ERROR',
            publisher: 'PUBLISHER ERROR',
            imageUrl: '../../images/app-icon.png',
            rating: 0,
            badge: '',
            platforms: '',
        },
        events: {
            link: '#'
        }
    }

	constructor(props) {
		super(props);
        this.display = this.props.display;
        this.events = this.props.events;
	}

    componentWillReceiveProps(nextProps) {
        this.display = nextProps.display;
    }

	render() {
		return (
            <div className="card-wrapper">
                    <div className="card-container center-block has-shadow" onClick={this.events.handleClick}>
                        {this.display.badge &&
                            (<div className="card-badge">
                                <img src='../../images/fn_badge.svg' alt="Endorsed app"/>
                            </div>)
                        }
                        <div className="card-logo">
                            <img src={'https://ease.apperian.com/uploads/'+this.display.imageUrl} alt={this.display.name + ' Logo'}/>
                        </div>
                        <div className="card-info">
                            <div className="card-name">
                                {this.display.name}
                            </div>
                            <div className="card-publisher hidden-sm hidden-xs">
                                {this.display.publisher}
                            </div>
                        </div>
                        <div className="card-rating">
                            <Rating rating={this.display.rating}></Rating>
                        </div>
                        {this.display.platforms &&  
                            <div className="card-platform">
                                <img src={'../../images/'+ this.display.platforms +'.svg'} alt={'Hosted at ' + this.display.platform}/>
                            </div>  
                        }
                    </div>
            </div>
		);
	}
}