import React from 'react';
<<<<<<< HEAD
import { inject, observer } from 'mobx-react';
=======
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
>>>>>>> 3425319f2507010ae0dae2c3c135e7b3a75ea0d7

import TitlePane from '../components/title-pane/title-pane';
import { CardList } from '../components/card-list/card-list';
import { SearchForm } from '../components/search/search-form';
import { Filters } from '../components/filters/filters';

@inject('store')
@observer
export default class ManageAppsPage extends React.Component {

	constructor(props) {
		super(props);
		// this.homeStore = this.props.store.homeStore;
		// this.searchStore = this.props.store.searchStore;
		this.cardListStore = this.props.store.cardListStore;
	}

	componentDidMount() {
		this.cardListStore.getHomeCards();
	}

	render() {
		return (
			<article id="manage-apps-page">
				<TitlePane pageTitle="Manage Apps" />
				<section className="">
					<div className="container manage-apps">
						<div className="row">
							<div className="col-md-3">
								<h2>Manage Apps</h2>
							</div>
							<div className="col-md-9 row">
								<div className="col-md-6">
									<Filters store={this.cardListStore} />
								</div>
								<div className="col-md-6">
									<SearchForm store={this.cardListStore} />
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<CardList cards={this.cardListStore.filteredSearchResults} />
					</div>
				</section>
			</article>
		)
	}
}

ManageAppsPage.propTypes = {
	store: PropTypes.object
};
