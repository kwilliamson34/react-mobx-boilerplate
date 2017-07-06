import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import {utilsService} from '../core/services/utils.service';

import {CardList} from '../components/card-list/card-list';
import {SearchForm} from '../components/search/search-form';
import {Filters} from '../components/filters/filters';
import {MDMAlerts} from '../components/configure-mdm/mdm-alerts';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import $ from 'jquery';

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
		this.userStore = this.props.store.userStore;
		this.pageId = 'manageAppsPage';
		this.itemsPerPage = 4;
		this.viewedAlert = false;
	}

	componentWillMount() {
		if(this.userStore.user.pse === ''){
			utilsService.handlePendingAuthorizationsMapping();
		}else{
			this.mdmStore.getMDMConfiguration();
			this.cardListStore.fetchCardList();
			this.appCatalogStore.fetchAppCatalog();
			if(!this.props.store.pages[this.pageId]){
				this.props.store.registerPage(this.pageId);
			}
		}
	}

	handleLoadMoreClick = () => {
		this.props.store.changePage(this.pageId);
		// $('#card-list-load-more-btn').blur();
		$('#card-list-load-more-btn').trigger('touchend');
		this.cardListStore.setIdToFocus((this.props.store.pages[this.pageId] - 1) * this.itemsPerPage);
	}

	handleViewAllAppsClick = () => {
		this.cardListStore.restoreOriginalList();
	}

	get paginatedCards() {
		let totalCards = this.props.store.pages[this.pageId] * this.itemsPerPage;
		return this.cardListStore.filteredSearchResults.slice(0, totalCards);
	}

	updateCardStyles = (apps) => {
		for(let i=0;i<apps.length;i++){
			const id = apps[i][0];
			const status = apps[i][1];
			const $card = $('#appCard'+id);
			const $button = $('#pushBtn'+id);
			switch(status) {
				case 'failed':
					$card.addClass('failed-to-push');
					break;
				case 'pushed':
					$button.addClass('fn-secondary').removeClass('fn-primary');
					break;
				case 'repushed':
					$card.addClass('already-pushed');
					$button.addClass('fn-secondary').removeClass('fn-primary');
					break;
				default:
					$card.removeClass('failed-to-push, already-pushed');
					$button.addClass('fn-primary').removeClass('fn-secondary');
			}
		}
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

		if(this.mdmStore.app_alerts.length && $('#mdm-alerts:visible').length && !this.viewedAlert){
			setTimeout(() => {
				$('#mdm-alerts').focus();
				this.viewedAlert = true;
			}, 100);
		}

		this.updateCardStyles(this.mdmStore.appMDMStatus.entries());

		return (
			<article id="manage-apps-page">
				<BreadcrumbNav links={crumbs}/>
				<div className="container header">
					<div className="row">
						<div className="col-xs-12 col-lg-offset-1 col-lg-10">
							<h1 className="as-h2">Manage Apps</h1>
							<Link to="/admin/configure-mdm" className="fn-primary">Configure MDM</Link>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-lg-offset-1 col-lg-10">
							{this.mdmStore.app_alerts &&
								<MDMAlerts store={this.mdmStore} page="manage_apps"/>
							}
						</div>
					</div>
				</div>
				<div className="manage-apps-form">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-lg-offset-1 col-lg-10">
								<SearchForm store={this.cardListStore} />
								<hr/>
								<Filters ref={ref => this.filterForm = ref} store={this.cardListStore} />
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-lg-offset-1 col-lg-10">
							<p className="as-h3 results-count" aria-live="polite">{this.cardListStore.resultsCountLabel}</p>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-xs-offset-1 col-xs-10 col-sm-offset-0 col-sm-12 col-lg-offset-1 col-lg-10">
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
								mdmIsConfigured={this.mdmStore.pseMDMObject.toJS().mdm_type}
								pushToMDM={this.mdmStore.pushToMDM.bind(this.mdmStore)}
								appMDMStatus={this.mdmStore.appMDMStatus.toJS()}/>
						</div>
					</div>
				</div>
			</article>
		)
	}
}
