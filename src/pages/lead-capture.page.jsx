import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';

import LeadCaptureForm from '../components/lead-capture/lead-capture-form';
import PageTitle from '../components/page-title/page-title';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

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

  constructor(props) {
    super(props);
    this.leadCaptureStore = this.props.store.leadCaptureStore;
  }

  componentWillMount() {
    this.leadCaptureStore.setCurrentSolution(this.props.match.params.solutionDetail);
  }

  render = () => {
    const solutionCategoryTitle = this.props.match.params.solutionCategory.replace(/-/g, ' ');
    const solutionDetailTitle = decodeURIComponent(this.props.match.params.solutionDetail);
    const crumbs = [
      {
        pageHref: '/admin',
        pageTitle: 'Administration Dashboard'
      }, {
        pageHref: '/admin/solutions',
        pageTitle: 'Public Safety Solutions'
      }, {
        pageHref: `/admin/solutions/${this.props.match.params.solutionCategory}`,
        pageTitle: solutionCategoryTitle
      }, {
        pageHref: `/admin/solutions/${this.props.match.params.solutionCategory}/${this.props.match.params.solutionDetail}`,
        pageTitle: solutionDetailTitle
      }, {
        pageHref: `/${this.props.match.url}`,
        pageTitle: 'Request Information'
      }
    ];

    const title = 'Request Information on ' + decodeURIComponent(this.leadCaptureStore.solutionName);
    return (
      <section id="lead-capture-page" className="standalone-form-page">
        <BreadcrumbNav links={crumbs}/>
        <div className="content-wrapper">
          <div className="container">
            <div className="row text-center">
              <div className="col-xs-12">
                <PageTitle>{title}</PageTitle>
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
