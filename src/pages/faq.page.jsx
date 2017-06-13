import React from 'react';
import { observer, inject } from 'mobx-react';
import { PropTypes } from 'prop-types';

import { FaqImageTop } from '../components/faq/faq-image-top.jsx';
import { FaqImageBottom } from '../components/faq/faq-image-bottom.jsx';
import { FaqMain } from '../components/faq/faq-main.jsx';

@inject('store')
@observer
export default class FaqPage extends React.Component {

	static propTypes = {
		store: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.store = this.props.store.contentStore;
		console.log(this.store);
	}

	render () {

		return(
			<article className="faq-article">
				<section className="faq-page">
					<FaqImageTop />
					<FaqMain store={this.store} />
					<FaqImageBottom />
				</section>
			</article>
		);
	}

}