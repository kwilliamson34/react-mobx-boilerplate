import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {a11yAnnounce} from '../../core/services/a11y-announce.service';
import {computed} from 'mobx';
import $ from 'jquery';

export default class PageTitle extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		className: PropTypes.string,
		plainTextTitle: PropTypes.string
	};

	static defaultProps = {
		className: ''
	}

	@computed get plainTitle() {
		if(this.props.plainTextTitle) {
			return this.props.plainTextTitle;
		}
		const decodedText = $('<textarea />').html(this.props.children).text();
		return decodedText;
	}

	componentDidMount() {
		this.announceTitle();
	}

	componentDidUpdate() {
		this.announceTitle();
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.children !== this.props.children || nextProps.className !== this.props.className;
	}

	announceTitle = () => {
		a11yAnnounce({
			message: this.plainTitle,
			messageType: 'status'
		});
	};

	render() {
		const documentTitlePrefix = 'FirstNet Local Control';
		return (
			<DocumentTitle title={`${documentTitlePrefix}: ${this.plainTitle}`}>
				<h1 ref={ref => this.header = ref} className={this.props.className}>
					{this.plainTitle}
				</h1>
			</DocumentTitle>
		);
	}
}
