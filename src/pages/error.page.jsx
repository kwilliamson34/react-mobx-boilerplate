import React from 'react';
import {userStore} from '../core/stores/user.store';
import {observer} from 'mobx-react';

@observer
export class ErrorPage extends React.Component {
  render() {
    let title = '';
    let body_content = '';

    if (userStore.service_error) {
      title = 'Service Issue.';
      body_content = 'This page is experiencing an issue. Try again later, or continue to one of the FirstNet Sites below:';
    } else if (!userStore.authentic_user) {
      title = 'Content Unavailable.';
      body_content = 'We are unable to display the content for this page. It could be that your session has timed out or you do not have access to this page.<br/>If you think this is in error, please contact your site administrator, or continue to one of the FirstNet Sites below:';
    } else {
      title = 'We\'re Sorry.';
      body_content = 'This page is experiencing an issue. Try again later, or continue to one of the FirstNet Sites below:';
    }

    return (
      <section className="error-page">
        <div className="error-container">
          <h1>{title}</h1>
          <p dangerouslySetInnerHTML={{
            __html: body_content
          }}></p>
          <a href="http://www.firstnet.com/appstore">App Store</a>
          <a href="http://www.firstnet.com/developerconsole">Deleveloper Console</a>
          <a href="http://www.firstnet.com/localcontrol">Local Control</a>
        </div>
      </section>
    );
  }

}
