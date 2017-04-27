import React from 'react';
import {observer,inject} from 'mobx-react';

import TitlePane from '../components/title-pane/title-pane';

@inject('store')
@observer
export default class AppDetailsPage extends React.Component {
  constructor(props){
    super(props);
    this.appStore = this.props.store.appStore;
  }

  componentDidMount(){
    console.log('app_psk: ' + this.props.match.params.appId);
    this.appStore.getAppDetails(this.props.match.params.appId);
  }

    render() {
        return (
          <main id="content-main">
            <article>
            <TitlePane pageTitle="App Details"/>
            <section className="app-summary">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="app-icon">
                      icon here
                    </div>
                    <h1>Mobile Iron</h1>
                    <div className="app-meta">
                      <div>dev name<br />rating</div>
                      <div>{this.props.match.params.appId}</div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="app-gallery">App Screenshot Gallery</section>
            <section className="app-description">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12">
                    <h2>Description</h2>
                    <div className="content-description">
                    <p>MobileIron’s Mobile@Work securely connects your Android device to your company network so that you can easily access email and other work resources.</p>
                    <ul>
                      <li>Purpose-built for Mobile IT with millions of users globally</li>
                      <li>Complete separation of corporate and personal data</li>
                      <li>500+ of Global 2000 customers</li>
                      <li>More than 97% customer support satisfaction rate</li>
                    </ul>
                    </div>
                    <a href="#read-more">Read More <span className="sr-only">about this app</span></a>
                  </div>
                </div>
              </div>
            </section>
            <section className="app-ratings">App Ratings</section>
            <section className="app-developer">
              <div className="container">
                <div className="row">
                  <h2>About the Developer</h2>
                  <p>Etiam sollicitudin tortor risus, eget rutrum lacus fringilla vitae. Fusce ornare dictum maximus. Sed porta ligula convallis, tempor neque id, interdum purus. Praesent euismod magna ac commodo consequat. Nulla facilisi. Fusce in cursus neque. Sed rhoncus laoreet mi non accumsan. Morbi consequat lacinia interdum. Ut ex nibh, auctor sit amet lorem at, molestie vehicula odio. Pellentesque bibendum congue nulla, nec pellentesque tortor vulputate in. Phasellus facilisis arcu nulla, et finibus libero iaculis a. Cras commodo ligula eget laoreet aliquam. Phasellus viverra mollis turpis eget sodales. Donec pretium lacinia arcu, non posuere nibh ornare non. Aliquam tincidunt justo ante, a tempor nulla suscipit at.</p>
                  <div className="developer-website">
                  <a href="http://google.com/"  target="_blank" rel="noopener noreferrer">Visit Developer Website</a>
                  </div>
                </div>
              </div>
            </section>
          </article>
          </main>
        )
    }
}
