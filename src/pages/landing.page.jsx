import React from 'react';
import { userStore } from '../core/stores/user.store';


import {observer} from 'mobx-react';


@observer
export class LandingPage extends React.Component {

	constructor(props) {
		super(props);
	}

	render () {
		let title = '';
		let body_content = '';

		if(userStore.service_error){
			title = 'Service Issue.';
			body_content = 'Unfortunately, this page is experiencing an issue. Try again later, or continue to one of the FirstNet Sites below:';
		} else {
			title = 'Access denied.';
			body_content = 'Unfortunately, you do not have permission to view this page. If you think this is in error, please contact your site administrator, or continue to one of the FirstNet Sites below:';
		}
		
		return userStore.invalid_user || userStore.service_error ? (
			<section className="unauth-page"><div className="unauth-container">
					<h1>{title}</h1>
					<p>{body_content}</p>
					<a href="http://www.firstnet.com/appstore">App Store</a>
					<a href="http://www.firstnet.com/developerconsole">Deleveloper Console</a>
					<a href="http://www.firstnet.com/localcontrol">Local Control</a>
				</div>
			</section>
		) : (
			<div>Authenticating User...</div>
		);
	}

}