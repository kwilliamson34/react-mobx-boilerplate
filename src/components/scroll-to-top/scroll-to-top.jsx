import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';

@inject('store')
@observer
class ScrollToTop extends React.Component {

	static propTypes = {
		store: PropTypes.object.isRequired,
		children: PropTypes.node,
		location: PropTypes.object,
		onWindowScroll: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.headerStore = this.props.store.headerStore;
		this.state = {
			body: document.body,
			html: document.documentElement,
			documentHeight: null,
			footerHeight: null,
			viewportHeight: null,
			viewportWidth: null
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.scrollTopFocus();
      this.updateWindowDimensions();
		}
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener(
			'resize',
			_.debounce(this.updateWindowDimensions, 200, { leading: true, trailing: false })
		);
		window.addEventListener(
			'scroll',
			_.debounce(this.manageBackToTopVisibility, 50, { leading: true, trailing: false })
		);
	}
	componentWillUnmount() {
		if (this.props.onWindowScroll) {
			window.removeEventListener('scroll');
			window.removeEventListener('resize');
		}
	}

	updateWindowDimensions = () => {
		this.setState({
			documentHeight: this.getDocumentHeight(),
			footerHeight: document.getElementById('pse-footer').offsetHeight,
			viewportHeight: window.innerHeight,
			viewportWidth: window.innerWidth
		});
	}

	getDocumentHeight() {
		return Math.max(
			this.state.body.scrollHeight,
			this.state.body.offsetHeight,
			this.state.html.clientHeight,
			this.state.html.scrollHeight,
			this.state.html.offsetHeight
		);
	}

	manageBackToTopVisibility = () => {
		let topPos = this.state.html.scrollTop || this.state.body.scrollTop;
		if (
			topPos > this.state.viewportHeight * 3 &&
			topPos < this.state.documentHeight - this.state.footerHeight - this.state.viewportHeight
		) {
			this.headerStore.showBackToTop();
		} else {
			this.headerStore.hideBackToTop();
		}
	}

	scrollTopFocus() {
		window.scrollTo(0, 0);
		this.rootAnchor.focus();
		this.headerStore.hideBackToTop();
	}

	handleBackToTopClick = (event) => {
		event.preventDefault();
		this.scrollTopFocus();
	};

	render() {
		return (
			<div id="PSE-wrapper">
				<span
					id="root-anchor"
					ref={ref => {
						this.rootAnchor = ref;
					}}
					tabIndex="-1"
					className="sr-only">
					Top of Page
				</span>
				{this.props.children}
				<a
					id="btn-back-top"
					href="#root"
					className={
						this.headerStore.showBackToTopBtn
							? 'back-to-top'
							: 'back-to-top faded'
					}
					onClick={this.handleBackToTopClick}>
					<i aria-hidden="true" className="icon-arrowUp" />
					<span className="sr-only">Back to top</span>
				</a>
			</div>
		);
	}
}

export default withRouter(ScrollToTop);
