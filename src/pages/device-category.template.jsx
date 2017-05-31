import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';
@inject('store')
@observer
export default class DeviceCategoryTemplate extends React.Component {

	static propTypes = {
    match: PropTypes.object
  }

	constructor(props) {
		super(props);
		this.externalLinkStore = this.props.store.externalLinkStore;
	}

	componentWillMount() {
		this.externalLinkStore.currentCategory = this.props.match.params.deviceCategory;
		this.externalLinkStore.getDeviceCategoryItems();
	}



	render() {
		return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 add-padding-bottom-dbl text-center">
              <h1 className="as-h2">{this.externalLinkStore.currentCategoryData.title}</h1>
							<div dangerouslySetInnerHTML={{ __html: this.externalLinkStore.currentCategoryData.intro}}>
            </div>
          </div>
					<div className="row">
						<div className="col-xs-offset-2 col-xs-8 col-sm-offset-2 col-sm-8 col-md-offset-1 col-md-10">
							<ul className="mp-content">
								{this.externalLinkStore.currentCategoryData.items.map((item, idx) => {
									return (
										<li key={idx}>
											<Link to={item.url}>
											{item.title}
											<div className="card-img-wrapper">
												<img src={item.image} alt={item.alt} />
											</div>
											</Link>
										</li>
									)
								})}
							</ul>
						</div>
					</div>
        </div>
		)
	}
}


DeviceCategoryTemplate.propTypes = {
	store: PropTypes.object
};
