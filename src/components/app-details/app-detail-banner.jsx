import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import config from 'config';

import {observer} from 'mobx-react';
import {Rating} from '../rating/rating.jsx';
import {utilsService} from '../../core/services/utils.service';
import AppManagementBlock from '../../components/app-management-block/app-management-block';

@observer
export class AppDetailBanner extends React.Component {

  static propTypes = {
    appCatalogStore: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  }

  static defaultProps = {
    data: {}
  }

  componentWillMount() {
    this.data = this.props.data;
    this.appStore = this.props.appCatalogStore;
  }

  rating() {
    return (
      <div className="app-rating app-details">
        {/*Mobile*/}
        <div className="hidden-sm hidden-md hidden-lg">
          <Rating rating={this.data.rating} reviewCount={this.data.reviews_count} showRatingNumber={true} truncateStars={true}/>
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
    return (
      <div className="app-title">
        <h1>{this.data.app_name}</h1>
      </div>
    )
  }

  properCaseOS(operating_system) {
    return utilsService.properCaseOS(operating_system);
  }

  details() {
    return (
      <div className="app-details">
        <div className="version">
          <strong>Version:&nbsp;</strong>
          {this.data.version.version_num}
        </div>
        <div className="updated">
          <strong>Released:&nbsp;</strong>
          <span className="hidden-xs hidden-md hidden-lg"><br/></span>
          {moment(this.data.release_date).format('MMMM DD, YYYY')}
        </div>
        <div className="platform">
          <strong>Platform:&nbsp;</strong>
          {this.properCaseOS(this.data.operating_system)}
        </div>
      </div>
    )
  }

  endorsement() {
    if (this.data.custom_metadata.app_type === 'ENDORSED') {
      return (
        <div className="endorsed app-details">FirstNet Endorsed</div>
      )
    }
  }

  author() {
    return <div className="publisher app-details">{this.data.author}</div>
  }

  metadata() {
    return (
      <div className="app-meta row">
        {/*Mobile*/}
        <div className="col-xs-12 hidden-sm hidden-md hidden-lg">
          {this.author()}
          {this.endorsement()}
          {this.details()}
          {this.appManagement()}
        </div>

        {/*Tablet*/}
        <div className="hidden-xs hidden-md hidden-lg">
          <div className="col-sm-4">
            {this.author()}
            {this.endorsement()}
            {this.rating()}
          </div>
          <div className="col-sm-3">
            {this.details()}
          </div>
          <div className="col-sm-5">
            {this.appManagement()}
          </div>
        </div>

        {/*Desktop*/}
        <div className="hidden-xs hidden-sm">
          <div className="col-md-12">
            {this.title()}
          </div>
          <div className="col-md-3">
            {this.author()}
            {this.endorsement()}
            {this.rating()}
          </div>
          <div className="col-md-5">
            {this.details()}
          </div>
          <div className="col-md-4">
            {this.appManagement()}
          </div>
        </div>
      </div>
    )
  }

  appManagement() {
    return <AppManagementBlock psk={this.data.app_psk} getMatchingApp={this.appStore.getMatchingApp.bind(this.appStore)} changeAppAvailability={this.appStore.changeAppAvailability.bind(this.appStore)} changeAppRecommended={this.appStore.changeAppRecommended.bind(this.appStore)}/>
  }

  render() {
    return (
      <section className="app-summary">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 hidden-md hidden-lg">
              {this.title()}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4 col-sm-3 col-md-3 appicon-wrapper">
              <div className="app-icon">
                <img src={config.apperianUploads + this.data.icon_path} alt={this.data.app_name}/>
              </div>
              <div className="hidden-sm hidden-md hidden-lg">
                {this.rating()}
              </div>
            </div>
            <div className="col-xs-8 col-sm-9 col-md-9 appmeta-wrapper">
              {this.metadata()}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
