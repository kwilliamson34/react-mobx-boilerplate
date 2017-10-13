import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {observable} from 'mobx';
import LeadCaptureForm from '../components/lead-capture/lead-capture-form';
import PageTitle from '../components/page-title/page-title';

@inject('store')
@observer
export default class LeadCapturePage extends React.Component {

  static propTypes = {
    store: PropTypes.object,
    match: PropTypes.shape({
      params: PropTypes.shape({
        productTitle: PropTypes.string
      })
    })
  }

  constructor(props) {
    super(props);
    this.leadCaptureStore = this.props.store.leadCaptureStore;
  }

  componentWillMount() {
    this.leadCaptureStore.solutionName = this.props.match.params.solutionName;
  }

  render = () => {
    return (
      <section id="lead-capture-page" className="standalone-form-page">
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
