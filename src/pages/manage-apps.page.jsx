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
    this.itemsPerPage = 20;
    this.viewedAlert = false;
  }

  componentWillMount() {
    if (this.userStore.user.pse === '') {
      utilsService.handlePendingAuthorizationsMapping();
    } else {
      this.mdmStore.getMDMConfiguration();
      this.appCatalogStore.fetchAppCatalog();
      this.cardListStore.fetchCategoriesAndSegments();

      if (!this.props.store.pages[this.pageId]) {
        this.props.store.registerPage(this.pageId);
      }
    }
  }

  componentWillUnmount() {
    this.cardListStore.resetIdToFocus();
  }

  handleLoadMoreClick = () => {
    this.props.store.changePage(this.pageId);
    $('#card-list-load-more-btn').blur();
    this.cardListStore.setIdToFocus((this.props.store.pages[this.pageId] - 1) * this.itemsPerPage);
  }

  handleViewAllAppsClick = () => {
    this.cardListStore.restoreOriginalList();
    this.resetPagination();
  }

  resetPagination = () => {
    this.props.store.resetPage(this.pageId);
    this.cardListStore.resetIdToFocus();
  }

  get paginatedCards() {
    let totalCards = this.props.store.pages[this.pageId] * this.itemsPerPage;
    return this.cardListStore.filteredSearchResults.slice(0, totalCards);
  }

  render() {
    const crumbs = [
      {
        pageHref: '/admin',
        pageTitle: 'Administration Dashboard'
      }, {
        pageHref: '/admin/manage-apps',
        pageTitle: 'Manage Apps'
      }
    ];

    if (this.mdmStore.app_alerts.length && $('#mdm-alerts:visible').length && !this.viewedAlert) {
      setTimeout(() => {
        $('#mdm-alerts').focus();
        this.viewedAlert = true;
      }, 100);
    }

    return (
      <article id="manage-apps-page">
        <BreadcrumbNav links={crumbs}/>
        <div className="container header">
          <div className="row">
            <div className="configure-mdm-container col-xs-12 col-lg-offset-1 col-lg-10">
              <div className="configure-mdm-wrapper">
                <Link to="/admin/configure-mdm" className=" configure-mdm-btn fn-primary">Configure MDM</Link>
              </div>
              <h1>Manage Apps</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-lg-offset-1 col-lg-10">
              {this.mdmStore.app_alerts && <MDMAlerts store={this.mdmStore} page="manage_apps" clearSelectedCards={this.mdmStore.clearAppsReferencedByAlert}/>}
            </div>
          </div>
        </div>
        <div className="manage-apps-form">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-lg-offset-1 col-lg-10">
                <SearchForm resetPagination={this.resetPagination} store={this.cardListStore}/>
                <hr/>
                <Filters ref={ref => this.filterForm = ref} resetPagination={this.resetPagination} store={this.cardListStore}/>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-lg-offset-1 col-lg-10">
              <p className="as-h2 results-count" aria-live="polite">{this.cardListStore.resultsCountLabel}</p>
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
                appsReferencedByAlert={this.mdmStore.appsReferencedByAlert}
                getMatchingApp={this.appCatalogStore.getMatchingApp.bind(this.appCatalogStore)}
                configuredMDMType={this.mdmStore.pseMDMObject.toJS().mdm_type}
                pushToMDM={this.mdmStore.pushToMDM.bind(this.mdmStore)}
                appCatalogMDMStatuses={this.mdmStore.appCatalogMDMStatuses.toJS()}/>
            </div>
          </div>
        </div>
      </article>
    )
  }
}
