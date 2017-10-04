import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
export default class ManageLocationFavorites extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  render() {
    return (
      
    )
  }
}
