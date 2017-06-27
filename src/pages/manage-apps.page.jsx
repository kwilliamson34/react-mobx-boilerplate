import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';

import {CardList} from '../components/card-list/card-list';
import {SearchForm} from '../components/search/search-form';
import {Filters} from '../components/filters/filters';
import {MDMAlerts} from '../components/configure-mdm/mdm-alerts';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

@inject('store')
@observer
export default class ManageAppsPage extends React.Component {

	static propTypes = {
		store: PropTypes.object
	}

	constructor(props) {
		super(props);
		this.cardListStore = this.props.store.cardListStore;
		this.appCatalogStore = this.props.store.appCatalogStore;
		this.mdmStore = this.props.store.mdmStore;
		this.pageId = 'manageAppsPage';
		this.itemsPerPage = 20;
		this.mdmIsConfigured = this.mdmStore.pseMDMObject.get('mdm_type') ? true : false
	}

	componentWillMount() {
		this.mdmStore.getMDMConfiguration();
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
		document.getElementById('card-list-load-more-btn').blur();
		this.cardListStore.setIdToFocus((this.props.store.pages[this.pageId] - 1) * this.itemsPerPage);
	}

	handleViewAllAppsClick = () => {
		this.cardListStore.restoreOriginalList();
	}

	get paginatedCards() {
		let totalCards = this.props.store.pages[this.pageId] * this.itemsPerPage;
		return this.cardListStore.filteredSearchResults.slice(0, totalCards);
	}


	render() {
		const crumbs = [
			{	pageHref: '/admin',
				pageTitle: 'Administration Dashboard'
			},
			{	pageHref: '/admin/manage-apps',
				pageTitle: 'Manage Apps'
			}
		];
		return (
			<article id="manage-apps-page">
				<BreadcrumbNav links={crumbs}/>
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
				<div className="container">
					<div className="row">
						<CardList
							filteredAppsCount={this.cardListStore.filteredSearchResults.length}
							cards={this.paginatedCards}
							numPagesShown={this.props.store.pages[this.pageId]}
							itemsPerPage={this.itemsPerPage}
							isLoading={this.cardListStore.isLoading || this.appCatalogStore.isLoading}
							idToFocus={this.cardListStore.idToFocus}
							handleLoadMoreClick={this.handleLoadMoreClick}
							handleViewAllAppsClick={this.handleViewAllAppsClick}
							changeAppAvailability={this.appCatalogStore.changeAppAvailability.bind(this.appCatalogStore)}
							changeAppRecommended={this.appCatalogStore.changeAppRecommended.bind(this.appCatalogStore)}
							getMatchingApp={this.appCatalogStore.getMatchingApp.bind(this.appCatalogStore)}
							mdmIsConfigured={this.mdmIsConfigured}/>
					</div>
				</div>
			</article>
		)
	}
}
