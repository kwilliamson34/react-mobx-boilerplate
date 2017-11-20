import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {observer} from 'mobx-react';
import {Rating} from '../rating/rating.jsx';
import {utilsService} from '../../core/services/utils.service';
import AppManagementBlock from '../../components/app-management-block/app-management-block';

@observer
export class AppDetailBanner extends React.Component {

  static propTypes = {
    appCatalogStore: PropTypes.object.isRequired,
    configuredMDMType: PropTypes.string,
    pushToMDM: PropTypes.func,
    appCatalogMDMStatuses: PropTypes.object,
    isWithinCard: PropTypes.bool,
    containsPrimaryHeader: PropTypes.bool,
    actionBlock: PropTypes.string.isRequired,
    pskToRender: PropTypes.string.isRequired,
    suppressFetchFailure: PropTypes.bool
  }

  componentWillMount() {
    this.appStore = this.props.appCatalogStore;

    this.appStore.setCurrentApp(this.props.pskToRender);
    if(!this.appStore.currentAppObject || !this.appStore.currentAppObject.detailsFetched) {
      this.appStore.fetchAppDetailByPsk({
        psk: this.props.pskToRender,
        suppressFetchFailure: this.props.suppressFetchFailure
      });
    }
  }

  rating() {
    const reviewCount = this.appStore.currentAppObject.reviews_count;
    const rating = this.appStore.currentAppObject.rating;
    return (
      <div className="app-rating app-details">
        {/*Mobile*/}
        <div className="hidden-sm hidden-md hidden-lg">
          <span className="rating-as-text">
            <p>{rating} Stars</p>
            <p>{reviewCount ? reviewCount : 'No'} Review{reviewCount === 1 ? '' : 's'}</p>
          </span>
        </div>
        {/*Tablet and Desktop*/}
        <div className="hidden-xs">
          <Rating rating={rating} reviewCount={reviewCount} showReviewCount={true}/>
        </div>
      </div>
    )
  }

  title() {
    const AppNameTag = this.props.containsPrimaryHeader ? 'h1' : 'h3';
    return (
      <div className="app-title">
        <AppNameTag>{this.appStore.currentAppObject.app_name || 'Loading app details...'}</AppNameTag>
      </div>
    )
  }

  properCaseOS(platform) {
    return utilsService.properCaseOS(platform);
  }

  details() {
    const dateToRender = this.appStore.currentAppObject.custom_metadata ? utilsService.normalizedDate(this.appStore.currentAppObject.custom_metadata.release_date, 'MMM D, YYYY') : '';

    return (
      <div className="app-details">
        <p className="version">
          <strong>Version:&nbsp;</strong>
          {this.appStore.currentAppObject.version ? this.appStore.currentAppObject.version.version_num : ''}
        </p>
        <p className="updated">
          <strong>Released:&nbsp;</strong>
          <br className="hidden-xs hidden-md hidden-lg"/>
          {dateToRender}
        </p>
        <p className="platform">
          <strong>Platform:&nbsp;</strong>
          {this.properCaseOS(this.appStore.currentAppObject.platform)}
        </p>
      </div>
    )
  }

  author() {
    if (this.appStore.currentAppObject.custom_metadata && this.appStore.currentAppObject.custom_metadata.author) {
      return <p className="publisher app-details">{this.appStore.currentAppObject.custom_metadata.author}</p>
    }
    return '';
  }

  certified() {
    if (this.appStore.currentAppObject.custom_metadata && this.appStore.currentAppObject.custom_metadata.app_type === 'CERTIFIED') {
      return (<p className="certified-app-label app-details">
        <i className="icon icon-check-circle" aria-hidden="true"></i>
        <span>FirstNet Certified</span>
      </p>);
    }
    return '';
  }

  metadata() {
    return (
      <div className="app-meta row">
        {/*Mobile*/}
        <div className="col-xs-12 hidden-sm hidden-md hidden-lg">
          {this.author()}
          {this.certified()}
          {this.details()}
        </div>

        {/*Tablet*/}
        <div className="hidden-xs hidden-md hidden-lg">
          <div className="col-sm-4">
            {this.author()}
            {this.certified()}
            {this.rating()}
          </div>
          <div className="col-sm-4">
            {this.details()}
          </div>
          <div className="col-sm-4">
            {this.actionBlock()}
          </div>
        </div>

        {/*Desktop*/}
        <div className="hidden-xs hidden-sm">
          <div className="col-md-12">
            {this.title()}
          </div>
          <div className="col-md-4">
            {this.author()}
            {this.certified()}
            {this.rating()}
          </div>
          <div className="col-md-4">
            {this.details()}
          </div>
          <div className="col-md-4">
            {this.actionBlock()}
          </div>
        </div>
      </div>
    )
  }

  actionBlock() {
    if(this.props.actionBlock === 'app_managment_block') {
      return <AppManagementBlock
              name={this.appStore.currentAppObject.app_name}
              psk={this.appStore.currentAppObject.app_psk}
              getMatchingApp={this.appStore.getMatchingApp.bind(this.appStore)}
              changeAppAvailability={this.appStore.changeAppAvailability.bind(this.appStore)}
              changeAppRecommended={this.appStore.changeAppRecommended.bind(this.appStore)}
              configuredMDMType={this.props.configuredMDMType}
              pushToMDM={this.props.pushToMDM}
              appCatalogMDMStatuses={this.props.appCatalogMDMStatuses}/>
    } else if(this.props.actionBlock === 'link_to_details') {
      return (
        <div className="action-block">
          <Link to={'/app/' + this.appStore.currentAppObject.app_psk} className="fn-secondary">Go to App</Link>
        </div>
      )
    }
    return '';
  }

  render() {
    this.showMdmBlock = this.props.configuredMDMType && this.props.pushToMDM && this.props.appCatalogMDMStatuses;

    return (
      <section className="app-summary">
        <div className={this.props.isWithinCard ? 'container' : ''}>
          <div className={this.props.isWithinCard ? 'white-card' : ''}>
            <div className="row">
              <div className="col-xs-12 col-sm-12 hidden-md hidden-lg">
                {this.title()}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4 col-sm-3 col-md-3 col-lg-3 appicon-wrapper">
                <div className="app-icon">
                  <img src={this.appStore.currentAppObject.icon_path} alt={this.appStore.currentAppObject.app_name}/>
                </div>
                <div className="hidden-sm hidden-md hidden-lg">
                  {this.rating()}
                </div>
              </div>
              <div className="col-xs-8 col-sm-9 col-md-9 col-lg-9 appmeta-wrapper">
                {this.metadata()}
              </div>
            </div>
            <div className="row hidden-sm hidden-md hidden-lg">
              <div className="col-xs-offset-1 col-xs-10">
                {this.actionBlock()}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
