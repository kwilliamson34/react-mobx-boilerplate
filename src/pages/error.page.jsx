import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';
import {history} from '../core/services/history.service';
import config from 'config';

@inject('store')
@observer
export default class ErrorPage extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    cause: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.userStore = this.props.store.userStore;
  }

  render() {
    let title = '';
    let body_content = '';
    let showLinksforOtherPortals = true;
    let showLinkToGoBack = false;
    let showLinkToGoHome = false;
    let showLogout = false;

    if (this.userStore.auth_error) {
      title = 'Service Issue.';
      body_content = 'This page is experiencing an issue. Try again later, or continue to one of the FirstNet Sites below:';
    } else if (!this.userStore.authentic_user || this.props.cause === 'unauthorized') {
      title = 'You\'ve encountered a permissions error.';
      body_content = 'Unfortunately, you do not have permission to view this page. If you think this is in error, please contact your site administrator, or continue to one of the FirstNet Sites below:';
      showLogout = true;
    } else if (this.props.cause === '404') {
      title = 'We\'re Sorry.';
      body_content = 'The page you were looking for could not be found.';
      showLinksforOtherPortals = false;
      showLinkToGoBack = true;
    } else if (this.props.cause === '410') {
      title = 'App Unavailable';
      body_content = 'The app you requested is no longer available.';
      showLinksforOtherPortals = false;
      showLinkToGoHome = true;
    } else if (this.props.cause === 'pending') {
      title = 'Account permissions pending.';
      body_content = 'Permissions for new accounts may take up to 24 hours to properly sync and some pages may not be immediately available.  Please try accessing this page again later.';
      showLinksforOtherPortals = false;
      showLinkToGoBack = true;
    } else {
      title = 'We\'re Sorry.';
      body_content = 'This page is experiencing an issue. Try again later, or continue to one of the FirstNet Sites below:';
    }

    return (
      <section className="error-page">
        <div className="container">
          <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
            <div className="logo-container">
              <img src="/images/logo-FirstNet-local-control.svg" alt="" aria-hidden="true" />
            </div>
            <h1 className="as-h3">{title}</h1>
            <p dangerouslySetInnerHTML={{__html: body_content}} />
            {showLinksforOtherPortals &&
              <nav className="sites-list" aria-label="FirstNet Sites">
                <ul>
                  <li><a href={config.appStore}>Apps</a></li>
                  <li><a href={config.appControl}>App Control</a></li>
                  <li><a href={config.localControl}>Local Control</a></li>
                </ul>
              </nav>
            }
            {showLogout &&
              <div className="logout-block">
                <hr className="or" />
                <a href={config.haloLogin}>Log Out</a>
              </div>
            }
            {showLinkToGoBack &&
              <section>
                <a href="#" onClick={() => {history.go(-1)}}>Go Back</a>
              </section>
            }
            {showLinkToGoHome &&
              <section>
                <Link to="/" className="fn-primary">Return to Home Page</Link>
              </section>
            }
          </div>
        </div>
      </section>
    );
  }
}
