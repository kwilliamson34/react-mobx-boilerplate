import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

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
    this.routerStore = this.props.store.routerStore;
  }

  render() {
    let title = '';
    let body_content = '';
    let showLinksforOtherPortals = true;
    let showLinkToGoBack = false;

    if (this.userStore.auth_error) {
      title = 'Service Issue.';
      body_content = 'This page is experiencing an issue. Try again later, or continue to one of the FirstNet Sites below:';
    } else if (!this.userStore.authentic_user || this.props.cause === 'unauthorized') {
      title = 'Content Unavailable.';
      body_content = 'We are unable to display the content for this page. It could be that your session has timed out or you do not have access to this page.<br/><br/>If you think this is in error, please contact your site administrator, or continue to one of the FirstNet Sites below:';
    } else if (this.props.cause === '404') {
      title = "We're Sorry.";
      body_content = 'The page you were looking for could not be found.';
      showLinksforOtherPortals = false;
      showLinkToGoBack = true;
    } else {
      title = "We're Sorry.";
      body_content = 'This page is experiencing an issue. Try again later, or continue to one of the FirstNet Sites below:';
    }

    return (
      <section className="error-page">
        <div className="error-container">
          <h1>{title}</h1>
          <p dangerouslySetInnerHTML={{
            __html: body_content
          }}></p>
        {showLinksforOtherPortals && <section>
          <a href="http://www.firstnet.com/appstore">App Store</a>
          <a href="http://www.firstnet.com/developerconsole">Deleveloper Console</a>
          <a href="http://www.firstnet.com/localcontrol">Local Control</a>
        </section>}
        {showLinkToGoBack && <section>
          <a href="#" onClick={() => {this.routerStore.history.go(-1)}}>Go Back</a>
        </section>}
        </div>
      </section>
    );
  }

}
