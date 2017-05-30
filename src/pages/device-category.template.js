import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
export default class DeviceCategoryTemplate extends React.Component {
	constructor(props) {
		super(props);
		this.mpStore = this.props.store.externalContentStore;
	}

	componentWillMount() {
		//this.mpStore.getMPDevices();
	}

	render() {
		return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 add-padding-bottom-dbl text-center">
              <h1 className="as-h2">Category</h1>
              <p>Intro copy</p>
            </div>
          </div>
        </div>
		)
	}
}


DeviceCategoryTemplate.propTypes = {
	store: PropTypes.object
};
