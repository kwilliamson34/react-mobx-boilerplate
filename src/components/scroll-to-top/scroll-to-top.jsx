import React from 'react';
import PropTypes from 'prop-types';
import {history} from '../../core/services/history.service';
import _ from 'lodash';
import $ from 'jquery';
import config from 'config';
import JoyrideBase from '../joyride-base/joyride-base';

export default class ScrollToTop extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		store: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			prevLocation: history.location.pathname,
			body: document.body,
			html: document.documentElement,
			documentHeight: 0,
			viewportHeight: 0,
			viewportWidth: 0,
			showBackToTopBtn: false
		}
	}

	componentDidUpdate() {
		if (history.location.pathname !== this.state.prevLocation) {
			this.scrollImmediatelyToTopAndFocus();
			this.updateWindowDimensions();
			this.setState({prevLocation: history.location.pathname});
		}
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
		window.addEventListener('scroll', this.manageBackToTopVisibility);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.manageBackToTopVisibility);
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	/* _.debounce(func, [wait=0], [options={}])
	* func function to debounce
	* wait(number) The number of milliseconds to delay. Time was chosen to be
	* long enough to prevent constant recalculation, but short enough to
	* not impede the user.
	* options Trailing option is true. The function is invoked on
	* the trailing edge of the timeout to increase the chance that the
	* event has finished before recalculating.
	*/
	updateWindowDimensions = _.debounce(() => {
		this.setState({
			documentHeight: this.getDocumentHeight(),
			viewportHeight: window.innerHeight,
			viewportWidth: window.innerWidth
		});
	}, 200, { leading: false, trailing: true });

	getDocumentHeight() {
		return Math.max(
			this.state.body.scrollHeight || 0,
			this.state.body.offsetHeight || 0,
			this.state.html.clientHeight || 0,
			this.state.html.scrollHeight || 0,
			this.state.html.offsetHeight || 0
		);
	}

	/* _.debounce(func, [wait=0], [options={}])
	* func function to debounce
	* wait(number) The number of milliseconds to delay. Scroll is a common user
	* event, and recalculation should not wait for the event to finish
	* (should look continuous).
	* options Trailing option is true. Function is invoked on the trailing
	* edge of the timeout only.
	*/
	manageBackToTopVisibility = _.debounce(() => {
		let topPos = this.state.body.scrollTop || this.state.html.scrollTop;
		let scrollButtonPos = topPos + this.state.viewportHeight - 28;

		let topIsBelowFold = topPos > (this.state.viewportHeight * 2);
		let scrollButtonIsAboveFooter = scrollButtonPos < $('footer').offset().top;

		this.setState({
			showBackToTopBtn: topIsBelowFold && scrollButtonIsAboveFooter
		});
	}, 50, { leading: false, trailing: true });

	scrollImmediatelyToTopAndFocus() {
		window.scrollTo(0, 0);
		this.rootAnchor.focus();
		this.setState({ showBackToTopBtn: false});
	}

	scrollSmoothlyToTopAndFocus() {
		$('html, body').animate({
			scrollTop: 0,
			scrollLeft: 0
		}, 500);
		this.rootAnchor.focus();
		this.setState({ showBackToTopBtn: false});
	}

	handleBackToTopClick = (event) => {
		event.preventDefault();
		this.scrollSmoothlyToTopAndFocus();
	};

	render() {
		return (
			<div id="PSE-wrapper">
				<span id="root-anchor" ref={ref => this.rootAnchor = ref} className="sr-only" tabIndex="-1">
					Top of Page
				</span>
				{config.showOnboardingWalkthru &&
					<JoyrideBase />
				}
				{this.props.children}
				<a id="btn-back-top" href="#" className={`back-to-top btn ${!this.state.showBackToTopBtn && 'faded'}`} onClick={this.handleBackToTopClick}>
					<i aria-hidden="true" className="icon-arrowUp"/>
					<span className="sr-only">Back to top</span>
				</a>
			</div>
		);
	}
}
