import React from 'react';
import {observer,inject} from 'mobx-react';

import TitlePane from '../components/title-pane/title-pane';
import {Rating} from '../components/rating/rating';

@inject('store')
@observer
export default class AppDetailsPage extends React.Component {
  constructor(props){
    super(props);
    this.appStore = this.props.store.appStore;
  }

  componentDidMount(){
    //console.log('app_psk: ' + this.props.match.params.appPSK);
    this.appStore.getAppDetails(68483);
  }

  function
    render() {
      const appDetail = {
        icon_path: '/images/appicon-placeholder.png',
        appName: 'Mobile Iron',
        appLongDescription: '<p>MobileIron’s Mobile@Work securely connects your Android device to your company network so that you can easily access email and other work resources.</p><ul><li>Purpose-built for Mobile IT with millions of users globally</li><li>Complete separation of corporate and personal data</li><li>500+ of Global 2000 customers</li><li>More than 97% customer support satisfaction rate</li></ul>',
        author: 'AT&T',
        endorsement: true,
        reviewCount: 44,
        avgRevRating: 4,
        versionNum: '2.5',
        releaseDate: '07/17/2017',
        filesize: '32Mb',
        platform: 'Android',
        isAvailable: true,
        isRecommended: false,
        devWebsite: 'http://google.com/',
        devDescription: '<p>Etiam sollicitudin tortor risus, eget rutrum lacus fringilla vitae. Fusce ornare dictum maximus. Sed porta ligula convallis, tempor neque id, interdum purus. Praesent euismod magna ac commodo consequat. Nulla facilisi. Fusce in cursus neque. Sed rhoncus laoreet mi non accumsan. Morbi consequat lacinia interdum. Ut ex nibh, auctor sit amet lorem at, molestie vehicula odio. Pellentesque bibendum congue nulla, nec pellentesque tortor vulputate in. Phasellus facilisis arcu nulla, et finibus libero iaculis a. Cras commodo ligula eget laoreet aliquam. Phasellus viverra mollis turpis eget sodales. Donec pretium lacinia arcu, non posuere nibh ornare non. Aliquam tincidunt justo ante, a tempor nulla suscipit at.</p>'

      }
      var isMobile = document.documentElement.clientWidth < 768;
      console.log(isMobile);

        return (
          <main id="content-main">
            <article className="app-details-page">
            <TitlePane pageTitle="App Details"/>
            <section className="app-summary">
              <div className="container">
                <div className="row">
                  <div className="col-xs-4 col-sm-3 col-md-3 appicon-wrapper">
                    <div className="app-icon">
                      <img src={appDetail.icon_path} alt={appDetail.appName} />
                    </div>
                  </div>

                  <div className="col-xs-8 col-sm-9 app-title">
                    <h1>{appDetail.appName}</h1>
                  </div>

                    <div className="col-xs-8 col-sm-5 app-meta">
                      <div className="visible-xs">
                        {appDetail.endorsement &&
                          <div className="endorsed">FirstNet Endorsed</div>
                        }
                        <span className="sr-only">Average Rating</span> <img className="ratings-star" src="/images/star.png" alt="Rating Star" aria-hidden="true" />{appDetail.avgRevRating} ({appDetail.reviewCount}<span className="sr-only">Reviews Completed</span>) <span aria-hidden="true">V</span><span className="sr-only">Version </span> {appDetail.versionNum} <span className="sr-only">Filesize</span> {appDetail.filesize}
                      </div>

                      <div className="hidden-xs">
                        <ul>
                          <li>{appDetail.author}</li>
                          <li>Version: <strong>{appDetail.versionNum}</strong>
                          <br />Released: <strong>{appDetail.releaseDate}</strong></li>

                          <li>
                            {appDetail.endorsement &&
                            <div className="endorsed">FirstNet Endorsed</div>
                            }
                            <Rating rating={appDetail.avgRevRating} />({appDetail.reviewCount}<span className="sr-only">Reviews Completed</span>)
                        </li>
                          <li>Platform<br /><strong>{appDetail.platform}</strong></li>
                        </ul>
                      </div>

                    </div>
                    <div className="col-xs-12 col-sm-4 app-actions">
                      <div><label>Available</label></div>
                      <div><label>Recommended</label></div>
                      <div><button type="button" className="fn-primary">Push to MDM</button></div>
                    </div>
                </div>
              </div>
            </section>
            <section className="app-gallery"></section>
            <section className="app-description">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
                    <h2>Description</h2>
                    <div
                      className="content-description"
                      dangerouslySetInnerHTML={{ __html: appDetail.appLongDescription}}>
                    </div>
                    <a href="#read-more">Read More <span className="sr-only">about this app</span></a>
                  </div>
                </div>
              </div>
            </section>
            <section className="app-ratings">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
                    <h2>Reviews</h2>
                  </div>
                </div>
              </div>
            </section>
            <section className="app-developer">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
                  <h2>About the Developer</h2>
                  <div
                    className="dev-description"
                    dangerouslySetInnerHTML={{ __html: appDetail.devDescription}}>
                  </div>
                  <div className="developer-website">
                  <a href={appDetail.devWebsite} className="fn-primary" target="_blank" rel="noopener noreferrer">Visit Developer Website</a>
                  </div>
                </div>
              </div>
              </div>
            </section>
          </article>
          </main>
        )
    }
}
