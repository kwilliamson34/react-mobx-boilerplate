import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {a11yAnnounce} from '../../core/services/a11y-announce.service';

export default class PageTitle extends React.Component {

	static propTypes = {
		children: PropTypes.node.isRequired,
		/* Whether children contains any HTML that needs to be stripped out before passing to a11yAnnounce and DocumentTitle title attr */
		childrenContainHTML: PropTypes.bool,
		className: PropTypes.string
	}
  static defaultProps ={
    childrenContainHTML: false
  }

  constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.announceTitle(this.props.children);
	}

	componentDidUpdate() {
		this.announceTitle(this.props.children);
	}

	getH1Elem = () => {
		if (this.props.childrenContainHTML) {
			return (
				<h1 dangerouslySetInnerHTML={{__html: this.props.children}}></h1>
			);
		} else if (!this.props.childrenContainHTML) {
			return (
				<h1 className={this.props.className}>{this.props.children}</h1>
			);
		}
	}

	announceTitle = (title) => {
		if (title) {
			a11yAnnounce({
				message: title,
				messageType: 'status'
			});
		}
	}

	render() {
		const documentTitlePrefix = 'FirstNet Local Control';
		return (
			<DocumentTitle title={`${documentTitlePrefix}: ${this.props.children}`}>
        {this.getH1Elem()}
      </DocumentTitle>
		);
	}

}
