import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {a11yAnnounce} from '../../core/services/a11y-announce.service';

export default class PageTitle extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		className: PropTypes.string,
		plainTextTitle: PropTypes.string
	};

	static defaultProps = {
		className: ''
	}

	componentDidMount() {
		this.announceTitle();
	}

	componentDidUpdate() {
		this.announceTitle();
	}

	shouldComponentUpdate(nextProps) {
		if (
			nextProps.children !== this.props.children ||
			nextProps.className !== this.props.className
		) {
			return true;
		} else return false;
	}

	getPlainTitle = () => {
		return this.props.plainTextTitle
			? this.props.plainTextTitle
			: this.props.children;
	};

	announceTitle = () => {
		a11yAnnounce({
			message: this.getPlainTitle(),
			messageType: 'status'
		});
	};

	render() {
		const documentTitlePrefix = 'FirstNet Local Control';
		return (
			<DocumentTitle title={`${documentTitlePrefix}: ${this.getPlainTitle()}`}>
				<h1 className={this.props.className}>
					{this.props.children}
				</h1>
			</DocumentTitle>
		);
	}
}
