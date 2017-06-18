import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { Rating } from '../components/rating/rating';
import RatingsChart from '../components/ratings-chart/ratings-chart';
import AppReviews from '../components/app-reviews/app-reviews';
import ScreenshotGallery from '../components/screenshot-gallery/screenshot-gallery';
import AppManagementBlock from '../components/app-management-block/app-management-block';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

import ShowMoreOrLess from '../components/show-more-or-less/show-more-or-less';

//import mock response from services
const appDetail = require('../fixtures/mock-app-detail.json');

const exOne = '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>';

const exTwo = '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p><ul><li>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</li><li>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</li><li>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.</li><li>Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.</li></ul>';

const exThree = '<h1>HTML Ipsum Presents</h1><p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum<br /> tortor<br /> quam,<br /> feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. <strong>Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi,</strong> condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p><h2>Header Level 2</h2><ol><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li></ol><blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote><h3>Header Level 3</h3><ul><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li></ul>';


@inject('store')
@observer
export default class AppDetailsPage extends React.Component {

	constructor(props) {
		super(props);
		this.appStore = this.props.store.appCatalogStore;
	}

	componentWillMount() {
		if(this.appStore.allApps.length) {
			this.updateCurrentApp();
		} else {
			this.appStore.fetchAppCatalog().then(() => {
				this.updateCurrentApp();
			});
		}
	}

	updateCurrentApp() {
		const psk = this.props.match.params.appPsk;
		this.appStore.fetchAppDetailByPsk(psk);
	}

	formatDate(dateStr){
		let dateOptions = {year: 'numeric', month: 'long', day: 'numeric'};
		let parsedDate = new Date(dateStr);
		let formattedDate = parsedDate.toLocaleString('en-US', dateOptions);
		return formattedDate;
	}

	render() {

		const crumbs = [
			{	pageHref: '/admin',
				pageTitle: 'Administration Dashboard'
			},
			{	pageHref: '/admin/manage-apps',
				pageTitle: 'Manage Apps'
			},
			{	pageHref: '/app/' + (this.appStore.currentAppObject ? this.appStore.currentAppObject.app_psk : ''),
				pageTitle: this.appStore.currentAppObject ? this.appStore.currentAppObject.app_name : ''
			}
		];
		return (
			<article id="app-details-page">
				<BreadcrumbNav links={crumbs}/>
				{ this.appStore.currentAppObject && this.appStore.currentAppObject.detailsFetched &&
				<div>
        <section className="app-summary">
          <div className="container">
            <div className="row">
              <div className="col-xs-4 col-sm-3 col-md-3 appicon-wrapper">
                <div className="app-icon">
                  <img src={appDetail.imgBaseURL + this.appStore.currentAppObject.icon_path} alt={this.appStore.currentAppObject.app_name} />
                </div>
              </div>
              <div className="col-xs-8 col-sm-9 app-title">
                <h1>{this.appStore.currentAppObject.app_name || this.appStore.currentAppObject.version.author /*TODO remove when name is not null*/}</h1>
              </div>
              <div className="col-xs-8 col-sm-5 col-lg-6 app-meta">
                <div className="visible-xs">
									<div>{this.appStore.currentAppObject.version.author}</div>
                  {this.appStore.currentAppObject.endorsement &&
                    <div className="endorsed">FirstNet Endorsed</div>
                  }
                  <span className="sr-only">Average Rating</span>
                  <img className="ratings-star"
                    src="/images/star.png"
                    alt="Rating Star"
                    aria-hidden="true" />
                    {this.appStore.currentAppObject.rating}
                    ({this.appStore.currentAppObject.reviews_count}<span className="sr-only">&nbsp;Reviews Completed</span>)
                  &nbsp;<span aria-hidden="true">V</span><span className="sr-only">Version </span> {this.appStore.currentAppObject.version.version_num}
                </div>
                <div className="hidden-xs">
                  <ul>
                    <li>{this.appStore.currentAppObject.version.author}</li>
                    <li><strong>Version:&nbsp;</strong>{this.appStore.currentAppObject.version.version_num}</li>
                    <li>{this.appStore.currentAppObject.endorsement && <div className="endorsed">FirstNet Endorsed</div>}</li>
										<li><strong>Released:&nbsp;</strong>{this.formatDate(this.appStore.currentAppObject.version.release_date)}</li>
										<li>
											<span className="card-rating">
												<Rating rating={this.appStore.currentAppObject.rating} />
											</span> ({this.appStore.currentAppObject.reviews_count}<span className="sr-only">Reviews Completed</span>)
                    </li>
										<li><strong>Platform:&nbsp;</strong>{this.appStore.currentAppObject.platform}</li>
                  </ul>
                </div>
              </div>
							{this.appStore.currentAppObject && this.appStore.currentAppObject.app_psk &&
								<AppManagementBlock
									psk={this.appStore.currentAppObject.app_psk}
									getMatchingApp={this.appStore.getMatchingApp.bind(this.appStore)}
									changeAppAvailability={this.appStore.changeAppAvailability.bind(this.appStore)}
									changeAppRecommended={this.appStore.changeAppRecommended.bind(this.appStore)} />
							}
            </div>
          </div>
        </section>
					{(this.appStore.currentAppObject.tabletScreenshots.length > 0 || this.appStore.currentAppObject.mobileScreenshots.length > 0) &&
						<section className='app-gallery'>
							<ScreenshotGallery detailObj={this.appStore.currentAppObject} />
						</section>
					}
        <section className="app-description">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
                <h2 id="app-details-description">Description</h2>
                <ShowMoreOrLess returnToId="app-details-description" charLimit={500}>
									<div className="content-description">
										{exThree}
									</div>
								</ShowMoreOrLess>
              </div>
            </div>
          </div>
        </section>
        <section className="app-ratings">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
                <h2>Reviews</h2>
								<RatingsChart value={this.appStore.currentAppObject.rating} reviewsTotal={this.appStore.currentAppObject.reviews_count} reviews={this.appStore.currentAppObject.reviews}/>
								{this.appStore.currentAppObject.reviews.length > 0 &&
									<AppReviews reviews={appDetails.reviews} />
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
                dangerouslySetInnerHTML={{ __html: this.appStore.currentAppObject.custom_metadata.developer_description}}>
              </p>
              <div className="developer-website">
              <a href={'http://' + this.appStore.currentAppObject.custom_metadata.developer_website} className="fn-primary" target="_blank" rel="noopener noreferrer">Visit Developer Website <i className="icon-external-site" aria-hidden="true"></i></a>
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
	currentAppObject: PropTypes.object
};
