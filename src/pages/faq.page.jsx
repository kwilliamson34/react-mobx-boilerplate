import React from 'react';
import { observer, inject } from 'mobx-react';
import { PropTypes } from 'prop-types';

import { FaqHeaderTop } from '../components/faq/faq-header-top.jsx';
import { FaqMain } from '../components/faq/faq-main.jsx';

@inject('store')
@observer
export default class FAQPage extends React.Component {

	static propTypes = {
		store: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.store = this.props.store.contentStore;
	}

	render () {

		return(
			<article className="faq-article">
				<section className="faq-page">
					<FaqHeaderTop />
					<FaqMain store={this.store} />
				</section>
			</article>
		);
	}
}
