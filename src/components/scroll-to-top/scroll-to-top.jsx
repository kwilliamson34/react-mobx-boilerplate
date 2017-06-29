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
		this.state = {
			body: document.body,
			html: document.documentElement,
			documentHeight: null,
			footerHeight: null,
			viewportHeight: null,
			viewportWidth: null,
			showBackToTopBtn: false
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
		window.addEventListener('resize', this.updateWindowDimensions);
		window.addEventListener('scroll', this.manageBackToTopVisibility);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.manageBackToTopVisibility);
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions = _.debounce(() => {
		this.setState({
			documentHeight: this.getDocumentHeight(),
			footerHeight: document.getElementById('pse-footer').offsetHeight,
			viewportHeight: window.innerHeight,
			viewportWidth: window.innerWidth
		});
		}, 200, { leading: true, trailing: false });

	getDocumentHeight() {
		return Math.max(
			this.state.body.scrollHeight || 0,
			this.state.body.offsetHeight || 0,
			this.state.html.clientHeight || 0,
			this.state.html.scrollHeight || 0,
			this.state.html.offsetHeight || 0
		);
	}

	manageBackToTopVisibility = _.debounce(() => {

		let topPos = this.state.html.scrollTop || this.state.body.scrollTop;
		if (
			topPos > this.state.viewportHeight * 2 &&
			topPos < this.state.documentHeight - this.state.footerHeight - this.state.viewportHeight
		) {
			this.setState({ showBackToTopBtn: true});
		} else {
			this.setState({ showBackToTopBtn: false});
		}
	}, 50, { leading: true, trailing: false });

	scrollTopFocus() {
		window.scrollTo(0, 0);
		this.rootAnchor.focus();
		this.setState({ showBackToTopBtn: false});
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
						this.state.showBackToTopBtn
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
