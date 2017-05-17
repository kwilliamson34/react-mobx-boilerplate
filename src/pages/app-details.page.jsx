import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import TitlePane from '../components/title-pane/title-pane';
import { Rating } from '../components/rating/rating';
import RatingsChart from '../components/ratings-chart/ratings-chart';
import Toggle from '../components/toggle/toggle';
import AppReviews from '../components/app-reviews/app-reviews';
import ScreenshotGallery from '../components/screenshot-gallery/screenshot-gallery';

//import mock response from services
const appDetail = require('../fixtures/mock-app-detail.json');

@inject('store')
@observer
export default class AppDetailsPage extends React.Component {

	constructor(props) {
		super(props);
		this.appStore = this.props.store.cardListStore;
	}

	componentDidMount() {
		this.appStore.setCurrentApp(this.props.match.params.appId);
	}

	render() {

		return (
			<article id="app-details-page">

				{ this.appStore.currentApp &&
				<div>
        <TitlePane pageTitle="App Details"/>
        <section className="app-summary">
          <div className="container">
            <div className="row">
              <div className="col-xs-4 col-sm-3 col-md-3 appicon-wrapper">
                <div className="app-icon">
                  <img src={this.appStore.currentApp.imageUrl} alt={this.appStore.currentApp.app_name} />
                </div>
              </div>
              <div className="col-xs-8 col-sm-9 app-title">
                <h1>{this.appStore.currentApp.app_name}</h1>
              </div>
              <div className="col-xs-8 col-sm-5 col-lg-6 app-meta">
                <div className="visible-xs">
                  {this.appStore.currentApp.endorsement &&
                    <div className="endorsed">FirstNet Endorsed</div>
                  }
                  <span className="sr-only">Average Rating</span>
                  <img className="ratings-star"
                    src="/images/star.png"
                    alt="Rating Star"
                    aria-hidden="true" />
                    {this.appStore.currentApp.rating}
                    ({this.appStore.currentApp.reviews_count} <span className="sr-only">Reviews Completed</span>)
                  &nbsp;<span aria-hidden="true">V</span><span className="sr-only">Version </span> {this.appStore.currentApp.version.version_num}
                  &nbsp;<span className="sr-only">Filesize</span> {appDetail.filesize}
                </div>
                <div className="hidden-xs">
                  <ul>
                    <li>{this.appStore.currentApp.author}</li>
                    <li>
                      Version: <strong>{this.appStore.currentApp.version.version_num}</strong><br />
                      Released: <strong>{this.appStore.currentApp.version.releaseDate}</strong>
                    </li>
                    <li>
                      {this.appStore.currentApp.endorsement &&
                        <div className="endorsed">FirstNet Endorsed</div>
                      }
											<span className="card-rating">
												<Rating rating={this.appStore.currentApp.rating} />
											</span> ({this.appStore.currentApp.reviews_count}<span className="sr-only">Reviews Completed</span>)
                    </li>
                    <li>Platform<br /><strong>{this.appStore.currentApp.platforms}</strong></li>
                  </ul>
                </div>
              </div>
                <div className="col-xs-12 col-sm-4 col-lg-3 app-actions">
                  <div>
                    <Toggle id="toggle-available" label="Available" defaultOn={this.appStore.currentApp.isAvailable} />
                  </div>
                  <div>
                    <Toggle id="toggle-recommended" label="Recommended" defaultOn={this.appStore.currentApp.isRecommended} />
                  </div>
                  <div>
                    <button type="button" className="fn-primary">Push to MDM</button>
                  </div>
                </div>
            </div>
          </div>
        </section>
					{(this.appStore.currentApp.screenshots.mobile.length > 0 || this.appStore.currentApp.screenshots.tablet.length > 0) &&
						<section className='app-gallery'>
							<ScreenshotGallery screenshots={this.appStore.currentApp.screenshots} />
						</section>
					}
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
								<RatingsChart value={this.appStore.currentApp.rating} reviewsTotal={this.appStore.currentApp.reviews_count} data={[14,22,8,5,2]}/>
								{appDetail.reviews.length > 0 &&
									<div className="app-reviews">
										<AppReviews reviews={appDetail.reviews} />
									</div>
								}
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
                dangerouslySetInnerHTML={{ __html: this.appStore.currentApp.custom_metadata.developer_description}}>
              </div>
              <div className="developer-website">
              <a href={this.appStore.currentApp.custom_metadata.developer_website} className="fn-primary" target="_blank" rel="noopener noreferrer">Visit Developer Website</a>
              </div>
            </div>
          </div>
          </div>
        </section>
			</div>
			}
		</article>
		)
	}
}


AppDetailsPage.propTypes = {
	store: PropTypes.object,
	match: PropTypes.object,
	currentApp: PropTypes.object
};
