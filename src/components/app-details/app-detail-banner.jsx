import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns/format';
import isValid from 'date-fns/is_valid'
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
    includeLinkToDetails: PropTypes.bool,
    containsPrimaryHeader: PropTypes.bool
  }

  componentWillMount() {
    this.appStore = this.props.appCatalogStore;
    this.data = this.props.appCatalogStore.currentAppObject;
    this.showMdmBlock = this.props.configuredMDMType && this.props.pushToMDM && this.props.appCatalogMDMStatuses;
  }

  rating() {
    return (
      <div className="app-rating app-details">
        {/*Mobile*/}
        <div className="hidden-sm hidden-md hidden-lg">
          <span className="rating-as-text">
            <p>{this.data.rating} Stars</p>
            <p>{this.data.reviews_count ? this.data.reviews_count : 'No'} Review{this.data.reviews_count === 1 ? '' : 's'}</p>
          </span>
        </div>
        {/*Tablet*/}
        <div className="hidden-xs hidden-md hidden-lg">
          <Rating rating={this.data.rating} reviewCount={this.data.reviews_count} showReviewCount={true}/>
        </div>
        {/*Desktop*/}
        <div className="hidden-xs hidden-sm">
          <Rating rating={this.data.rating} reviewCount={this.data.reviews_count} showReviewCount={true}/>
        </div>
      </div>
    )
  }

  title() {
    const AppNameTag = this.props.containsPrimaryHeader ? 'h1' : 'h3';
    return (
      <div className="app-title">
        <AppNameTag>{this.data.app_name}</AppNameTag>
      </div>
    )
  }

  properCaseOS(platform) {
    return utilsService.properCaseOS(platform);
  }

  details() {
    //normalize the date string, variant formats of which have caused unpredictable behavior.
    const newDate = this.data.custom_metadata ? this.data.custom_metadata.release_date.split('T')[0] : '';
    const dateToRender = isValid(new Date(newDate)) ? dateFns(newDate, 'MMMM DD, YYYY') : 'Invalid Date';

    return (
      <div className="app-details">
        <p className="version">
          <strong>Version:&nbsp;</strong>
          {this.data.version ? this.data.version.version_num : ''}
        </p>
        <p className="updated">
          <strong>Released:&nbsp;</strong>
          <br className="hidden-xs hidden-md hidden-lg"/>
          {dateToRender}
        </p>
        <p className="platform">
          <strong>Platform:&nbsp;</strong>
          {this.properCaseOS(this.data.platform)}
        </p>
      </div>
    )
  }

  author() {
    if (this.data.custom_metadata && this.data.custom_metadata.author) {
      return <p className="publisher app-details">{this.data.custom_metadata.author}</p>
    }
    return '';
  }

  metadata() {
    return (
      <div className="app-meta row">
        {/*Mobile*/}
        <div className="col-xs-12 hidden-sm hidden-md hidden-lg">
          {this.author()}
          {this.details()}
        </div>

        {/*Tablet*/}
        <div className="hidden-xs hidden-md hidden-lg">
          <div className="col-sm-4">
            {this.author()}
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
    if(this.showMdmBlock) {
      return this.appManagement();
    } else if(this.props.includeLinkToDetails) {
      return <Link to={'/app/' + this.data.app_psk} className="fn-primary">View App Details</Link>
    }
    return '';
  }

  appManagement() {
    return <AppManagementBlock
            name={this.data.app_name}
            psk={this.data.app_psk}
            getMatchingApp={this.appStore.getMatchingApp.bind(this.appStore)}
            changeAppAvailability={this.appStore.changeAppAvailability.bind(this.appStore)}
            changeAppRecommended={this.appStore.changeAppRecommended.bind(this.appStore)}
            configuredMDMType={this.props.configuredMDMType}
            pushToMDM={this.props.pushToMDM}
            appCatalogMDMStatuses={this.props.appCatalogMDMStatuses}/>
  }

  render() {
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
                  <img src={this.data.icon_path} alt={this.data.app_name}/>
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
