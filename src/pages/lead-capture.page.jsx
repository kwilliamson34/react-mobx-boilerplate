import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {observable} from 'mobx';

import LeadCaptureForm from '../components/lead-capture/lead-capture-form';
import PageTitle from '../components/page-title/page-title';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

@inject('store')
@observer
export default class LeadCapturePage extends React.Component {

  static propTypes = {
    store: PropTypes.object,
    match: PropTypes.shape({
      params: PropTypes.shape({
        solutionDetail: PropTypes.string
      })
    })
  }

  constructor(props) {
    super(props);
    this.leadCaptureStore = this.props.store.leadCaptureStore;
  }

  componentWillMount() {
    this.leadCaptureStore.solutionName = this.props.match.params.solutionDetail;
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

    return (
      <section id="lead-capture-page" className="standalone-form-page">
        <BreadcrumbNav links={crumbs}/>
        <div className="content-wrapper">
          <div className="container">
            <div className="row text-center">
              <div className="col-xs-12">
                <PageTitle>Request Information on <span dangerouslySetInnerHTML={{
                  __html: decodeURIComponent(this.leadCaptureStore.solutionName)
                }}></span></PageTitle>
              </div>
            </div>
            <div className="row">
              <section className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                <LeadCaptureForm store={this.leadCaptureStore}/>
              </section>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
