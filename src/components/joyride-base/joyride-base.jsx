import React from 'react';
import PropTypes from 'prop-types';
import Joyride from 'react-joyride';
import { observer, inject } from 'mobx-react';
import $ from 'jquery';

@inject('store')
@observer
export default class JoyrideBase extends React.Component {
  static propTypes = {
		store: PropTypes.object
	};

  constructor(props){
    super(props)
    this.joyrideStore = this.props.store.joyrideStore;
  }

  componentDidMount() {
    this.joyrideStore.initJoyride(this.joyride);
    // init joyride
    $(() => {
      //this.joyrideStore.addJoyrideSteps();
      console.log('steps', this.joyrideStore.steps);
    });
  }

  render(){
    return(
      <Joyride
        ref={c => (this.joyride = c)}
        steps={this.joyrideStore.steps}
        run={this.joyrideStore.isReady}
        showOverlay={this.joyrideStore.joyrideOverlay}
      />
    )
  }
}
