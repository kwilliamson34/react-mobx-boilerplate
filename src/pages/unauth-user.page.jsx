import React from 'react';

export class UnauthenticUser extends React.Component {

	constructor(props) {
	super(props);
	}

	// Browser Events

	// JSX Rendering Functions

	render () {
		return(
			<section className="unauth-page">
				<div className="unauth-container">
					<h1>Access denied.</h1>
					<p>Unfortunately, you do not have permission to view this page. If you think this is in error, please contact your site administrator, or continue to one of the FirstNet Sites below:</p>
					<a href="http://www.firstnet.com/appstore">App Store</a>
					<a href="http://www.firstnet.com/developerconsole">Deleveloper Console</a>
					<a href="http://www.firstnet.com/localcontrol">Local Control</a>
				</div>
			</section>
		);
	}

}