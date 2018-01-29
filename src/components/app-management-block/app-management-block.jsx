import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import Checkbox from '../forms/checkbox.jsx';
import {PushToMDM} from '../push-to-mdm/push-to-mdm';

import $ from 'jquery';
import {utilsService} from '../../core/services/utils.service';

@observer
export default class AppManagementBlock extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    psk: PropTypes.string.isRequired,
    getMatchingApp: PropTypes.func.isRequired,
    changeAppAvailability: PropTypes.func.isRequired,
    changeAppRecommended: PropTypes.func.isRequired,
    configuredMDMType: PropTypes.string,
    pushToMDM: PropTypes.func.isRequired,
    appCatalogMDMStatuses: PropTypes.object
  }

  componentDidMount() {
    $(`#Available-${this.props.psk}`).focus((e) => {
      const $target = $(e.target);
      $(window).one('keyup', (e) => {
        const code = e.keyCode
          ? e.keyCode
          : e.which;
        if (code === 9) {
          utilsService.scrollIntoViewIfNecessary($target);
        }
      })
    })
  }

  handleAvailableClick = (input) => {
    if (input.type === 'checkbox') {
      //get the latest matching app object
      this.matchingApp = this.props.getMatchingApp(this.props.psk);

      const isAvailable = input.checked;
      if (isAvailable !== this.matchingApp.isAvailable) {
        this.props.changeAppAvailability(this.props.psk, isAvailable);
      }
    }
  }

  handleRecommendedClick = (input) => {
    if (input.type === 'checkbox') {
      //get the latest matching app object
      this.matchingApp = this.props.getMatchingApp(this.props.psk);

      const isRecommended = input.checked;
      if (isRecommended !== this.matchingApp.isRecommended) {
        this.props.changeAppRecommended(this.props.psk, isRecommended);
      }
    }
  }

  render() {
    //get the latest matching app object
    this.matchingApp = this.props.getMatchingApp(this.props.psk);

    return (
      <fieldset>
        <legend className="sr-only">Catalog status:</legend>
        {this.matchingApp && <div className="app-management walkthrough-manage-help">
          <Checkbox
            label="Available"
            id={'Available-' + this.props.psk}
            checked={this.matchingApp.isAvailable}
            handleOnChange={this.handleAvailableClick}/>
          <Checkbox
            label="Recommended"
            id={'Recommended-' + this.props.psk}
            checked={this.matchingApp.isRecommended}
            disabled={!this.matchingApp.isAvailable}
            handleOnChange={this.handleRecommendedClick}/>
          <PushToMDM
            name={this.props.name}
            psk={this.props.psk}
            configuredMDMType={this.props.configuredMDMType}
            pushToMDM={this.props.pushToMDM}
            appCatalogMDMStatuses={this.props.appCatalogMDMStatuses}/>
        </div>}
      </fieldset>
    );
  }
}
