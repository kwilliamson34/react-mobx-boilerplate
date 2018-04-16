import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
export default class Footer extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.headerStore = this.props.store.headerStore;
    this.userStore = this.props.store.userStore;
  }

  render() {
    return (
      <footer>
        <nav aria-label="Supporting Navigation.">
          Footer
        </nav>
      </footer>
    );
  }
}
