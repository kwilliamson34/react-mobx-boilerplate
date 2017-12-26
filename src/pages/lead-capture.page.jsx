import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {computed, autorun} from 'mobx';

import LeadCaptureForm from '../components/lead-capture/lead-capture-form';
import PageTitle from '../components/page-title/page-title';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import $ from 'jquery';

@inject('store')
@observer
export default class LeadCapturePage extends React.Component {

  static propTypes = {
    store: PropTypes.object,
    match: PropTypes.shape({
      url: PropTypes.string,
      params: PropTypes.shape({
        solutionCategory: PropTypes.string,
        solutionDetail: PropTypes.string
      })
    })
  }

  @computed get solutionNamePlainText() {
    const urlParam = this.props.match.params.solutionDetail;
    return $('<textarea />').html(decodeURIComponent(urlParam)).text();
  }
  @computed get solutionCategoryPlainText() {
    return this.props.match.params.solutionCategory.replace(/-/g, ' ');
  }
  @computed get pageTitle() {
    return 'Request Information on ' + this.solutionNamePlainText;
  }

  constructor(props) {
    super(props);
    this.leadCaptureStore = this.props.store.leadCaptureStore;

    autorun(() => {
      // check that initial values are available before validating for the first time
      if(this.leadCaptureStore.solutionName !== this.solutionNamePlainText) {
        this.leadCaptureStore.setCurrentSolution(this.solutionNamePlainText);
      }
    })
  }

  render = () => {
    const crumbs = [
      {
        pageHref: '/admin',
        pageTitle: 'Administration Dashboard'
      }, {
        pageHref: '/admin/solutions',
        pageTitle: 'Public Safety Solutions'
      }, {
        pageHref: `/admin/solutions/${this.props.match.params.solutionCategory}`,
        pageTitle: this.solutionCategoryPlainText
      }, {
        pageHref: `/admin/solutions/${this.props.match.params.solutionCategory}/${this.props.match.params.solutionDetail}`,
        pageTitle: this.solutionNamePlainText
      }, {
        pageHref: `/${this.props.match.url}`,
        pageTitle: this.pageTitle
      }
    ];

    return (
      <section id="lead-capture-page" className="standalone-form-page">
        <BreadcrumbNav links={crumbs}/>
        <div className="content-wrapper">
          <div className="container">
            <div className="row text-center">
              <div className="col-xs-12">
                <PageTitle>{this.pageTitle}</PageTitle>
              </div>
            </div>
            <div className="row">
              <section className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                <LeadCaptureForm store={this.leadCaptureStore} persistAlertBars={true}/>
              </section>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
