import React from 'react';
import {withRouter} from 'react-router-dom';
import {observer, inject, PropTypes} from 'mobx-react';

@inject('store')
@withRouter
@observer
export default class PSEHeader extends React.Component {
	static propTypes = {
		store: PropTypes.observableObject.isRequired,
		location: PropTypes.objectOrObservableObject
	};

	constructor(props) {
		super(props);
		this.headerStore = this.props.store.headerStore;
		this.userStore = this.props.store.userStore;
	}

	render() {
		return (
			<header role="banner">
				<nav id="main-menu" aria-label="Main Menu">
					Header
				</nav>
			</header>
		);
	}
}
