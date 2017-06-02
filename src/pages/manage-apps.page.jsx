import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';

import { CardList } from '../components/card-list/card-list';
import { SearchForm } from '../components/search/search-form';
import { Filters } from '../components/filters/filters';
import { MDMAlerts } from '../components/configure-mdm/mdm-alerts';


@inject('store')
@observer
export default class ManageAppsPage extends React.Component {

	constructor(props) {
		super(props);
		this.cardListStore = this.props.store.cardListStore;
		this.appCatalogStore = this.props.store.appCatalogStore;
		this.mdmStore = this.props.store.mdmStore;
		this.pageId = 'manageAppsPage';
		this.itemsPerPage = 20;
	}

	componentDidMount() {
		this.cardListStore.fetchCardList();
		this.appCatalogStore.fetchAppCatalog();
		if(!this.props.store.pages[this.pageId]){
			this.props.store.registerPage(this.pageId);
		}
	}

	handleLoadMoreClick = () => {
		this.props.store.changePage(this.pageId);
	}

	handleViewAllAppsClick = () => {
		this.cardListStore.restoreOriginalList();
	}

	get paginatedCards() {
		let totalCards = this.props.store.pages[this.pageId] * this.itemsPerPage;
		return this.cardListStore.filteredSearchResults.slice(0, totalCards);
	}

	render() {
		return (
			<article id="manage-apps-page">
				<div className="container header">
					<div className="row">
						<div className="col-xs-12">
							<h1 className="as-h2">Manage Apps</h1>
							<Link to="/admin/configure-mdm" className="fn-primary">Configure MDM</Link>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							{this.mdmStore.alert_msgs && <MDMAlerts store = {this.mdmStore}/>}
						</div>
					</div>
				</div>
				<div className="manage-apps-form">
					<div className="container">
						<div className="row">
							<div className="col-xs-12">
								<SearchForm store={this.cardListStore} />
								<hr/>
								<Filters ref={ref => this.filterForm = ref} store={this.cardListStore} />
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<CardList
						cards={this.paginatedCards}
						numPagesShown={this.props.store.pages[this.pageId]}
						itemsPerPage={this.itemsPerPage}
						isLoading={this.cardListStore.isLoading || this.appCatalogStore.isLoading}
						handleLoadMoreClick={this.handleLoadMoreClick}
						handleViewAllAppsClick={this.handleViewAllAppsClick}
						changeAppAvailability={this.appCatalogStore.changeAppAvailability.bind(this.appCatalogStore)}
						changeAppRecommended={this.appCatalogStore.changeAppRecommended.bind(this.appCatalogStore)}
						getMatchingApp={this.appCatalogStore.getMatchingApp.bind(this.appCatalogStore)}/>
				</div>
			</article>
		)
	}
}

ManageAppsPage.propTypes = {
	store: PropTypes.object
};
