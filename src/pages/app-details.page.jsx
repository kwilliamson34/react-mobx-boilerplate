import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { Rating } from '../components/rating/rating';
import RatingsChart from '../components/ratings-chart/ratings-chart';
import AppReviews from '../components/app-reviews/app-reviews';
import ScreenshotGallery from '../components/screenshot-gallery/screenshot-gallery';
import AppManagementBlock from '../components/app-management-block/app-management-block';

//import mock response from services
const appDetail = require('../fixtures/mock-app-detail.json');

@inject('store')
@observer
export default class AppDetailsPage extends React.Component {

	constructor(props) {
		super(props);
		this.appStore = this.props.store.cardListStore;
	}

	componentWillMount() {
		this.appStore.getAppDetailByPSK(this.props.match.params.appId);
	}

	componentWillUnmount(){
		this.appStore.detailsFetched = false;
		this.appStore.appDetailObj = {};
	}

	formatDate(dateStr){
		let dateOptions = {year: 'numeric', month: 'long', day: 'numeric'};
		let parsedDate = new Date(dateStr);
		let formattedDate = parsedDate.toLocaleString('en-US', dateOptions);
		return formattedDate;
	}

	render() {

		return (
			<article id="app-details-page">
				{ this.appStore.detailsFetched &&
				<div>
        <section className="app-summary">
          <div className="container">
            <div className="row">
              <div className="col-xs-4 col-sm-3 col-md-3 appicon-wrapper">
                <div className="app-icon">
                  <img src={appDetail.imgBaseURL + this.appStore.appDetailObj.icon_path} alt={this.appStore.appDetailObj.app_name} />
                </div>
              </div>
              <div className="col-xs-8 col-sm-9 app-title">
                <h1>{this.appStore.appDetailObj.app_name}</h1>
              </div>
              <div className="col-xs-8 col-sm-5 col-lg-6 app-meta">
                <div className="visible-xs">
									<div>{this.appStore.appDetailObj.version.author}</div>
                  {this.appStore.appDetailObj.endorsement &&
                    <div className="endorsed">FirstNet Endorsed</div>
                  }
                  <span className="sr-only">Average Rating</span>
                  <img className="ratings-star"
                    src="/images/star.png"
                    alt="Rating Star"
                    aria-hidden="true" />
                    {this.appStore.appDetailObj.rating}
                    ({this.appStore.appDetailObj.reviews_count} <span className="sr-only">Reviews Completed</span>)
                  &nbsp;<span aria-hidden="true">V</span><span className="sr-only">Version </span> {this.appStore.appDetailObj.version.version_num}
                </div>
                <div className="hidden-xs">
                  <ul>
                    <li>{this.appStore.appDetailObj.version.author}</li>
                    <li>
                      Version: <strong>{this.appStore.appDetailObj.version.version_num}</strong><br />
                      Released: <strong>{this.formatDate(this.appStore.appDetailObj.version.release_date)}</strong>
                    </li>
                    <li>
                      {this.appStore.appDetailObj.endorsement &&
                        <div className="endorsed">FirstNet Endorsed</div>
                      }
											<span className="card-rating">
												<Rating rating={this.appStore.appDetailObj.rating} />
											</span> ({this.appStore.appDetailObj.reviews_count}<span className="sr-only">Reviews Completed</span>)
                    </li>
										{this.appStore.appDetailObj.platform &&
											<li>Platform<br /><strong>{this.appStore.appDetailObj.platform}</strong></li>
										}
                  </ul>
                </div>
              </div>
							<AppManagementBlock app={this.appStore.appDetailObj} appManagementActions={{
								changeAppAvailability: this.appStore.changeAppAvailability.bind(this.appStore),
								changeAppRecommended: this.appStore.changeAppRecommended.bind(this.appStore)
							}}/>
            </div>
          </div>
        </section>
					{(this.appStore.appDetailObj.tabletScreenshots.length > 0 || this.appStore.appDetailObj.mobileScreenshots.length > 0) &&
						<section className='app-gallery'>
							<ScreenshotGallery detailObj={this.appStore.appDetailObj} />
						</section>
					}
        <section className="app-description">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
                <h2>Description</h2>
                <p
                  className="content-description"
                  dangerouslySetInnerHTML={{ __html: this.appStore.appDetailObj.short_description}}>
                </p>
                {/* <a href="#show-more">Show More <span className="sr-only">about this app</span></a> */}
              </div>
            </div>
          </div>
        </section>
        <section className="app-ratings">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
                <h2>Reviews</h2>
								<RatingsChart value={this.appStore.appDetailObj.rating} reviewsTotal={this.appStore.appDetailObj.reviews_count} data={[14,22,8,5,2]}/>
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
              <p
                className="dev-description"
                dangerouslySetInnerHTML={{ __html: this.appStore.appDetailObj.custom_metadata.developer_description}}>
              </p>
              <div className="developer-website">
              <a href={this.appStore.appDetailObj.custom_metadata.developer_website} className="fn-primary" target="_blank" rel="noopener noreferrer">Visit Developer Website</a>
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
