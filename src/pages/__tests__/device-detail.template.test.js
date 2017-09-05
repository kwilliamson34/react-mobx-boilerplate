jest.unmock('axios');
jest.unmock('../../core/stores/master.store');
jest.unmock('../device-detail.template');

import {observer, inject} from 'mobx-react';
import {externalLinkStore} from '../../core/stores/external-link.store';
import DeviceDetailTemplate from '../device-detail.template';
import {MemoryRouter} from 'react-router-dom';

describe('<DeviceDetailTemplate />', () => {
  describe('render', () => {
    let props = {
      store: {
        externalLinkStore
      },
      match: {
        params: {
          deviceCategory: 'category1'
        }
      }
    }
    let card = {
      device_title: 'title',
      device_image_url: 'url',
      device_image_alt: 'alt',
      device_category: 'category1'
    }
    props.store.externalLinkStore.currentCategory = 'category1';
    props.store.externalLinkStore.allSpecializedDevices = [{}, {}];

    test('matches snapshot', () => {
      let component, tree;

      component = renderer.create(<DeviceDetailTemplate {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('matches snapshot with and without terms', () => {
      let component, tree;

      component = renderer.create(<DeviceDetailTemplate {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.externalLinkStore.currentDeviceDetail.terms = 'terms';
      component = renderer.create(<DeviceDetailTemplate { ...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('API', () => {
    let props = {
      store: {
        externalLinkStore
      },
      match: {
        params: {
          deviceCategory: 'category1',
          deviceId: 'deviceID1'
        }
      }
    }
    let card = {
      device_title: 'title',
      device_image_url: 'url',
      device_image_alt: 'alt',
      device_category: 'category1'
    }
    props.store.externalLinkStore.currentDeviceDetail = {};

    test('does not fetch if the details have already been retrieved', () => {
      let component, tree;
      props.store.externalLinkStore.currentDeviceDetail.path = 'deviceID1';

      props.store.externalLinkStore.getDevicesData = jest.fn();
      props.store.externalLinkStore.getDevicesData.mockReturnValue(new Promise(resolve => resolve()));
      props.store.externalLinkStore.fetchAndShowDeviceDetails = jest.fn();

      component = renderer.create(<MemoryRouter>
        <DeviceDetailTemplate { ...props}/>
      </MemoryRouter>);

      expect(props.store.externalLinkStore.getDevicesData).not.toBeCalled();
      expect(props.store.externalLinkStore.fetchAndShowDeviceDetails).not.toBeCalled();
    });

    test('rerenders if user navigates to another detail page', () => {
      let component, tree;
      props.store.externalLinkStore.currentDeviceDetail.path = 'deviceID2';
      props.store.externalLinkStore.fetchAndShowDeviceDetails = jest.fn();

      props.store.externalLinkStore.allSpecializedDevices = [{},{}];
      component = renderer.create(<MemoryRouter>
        <DeviceDetailTemplate { ...props}/>
      </MemoryRouter>);

      expect(props.store.externalLinkStore.fetchAndShowDeviceDetails).toBeCalled();
    });

    test('fetches if the details are missing', () => {
      let component, tree;
      props.store.externalLinkStore.currentDeviceDetail.path = 'deviceID2';
      props.store.externalLinkStore.getDevicesData = jest.fn();
      props.store.externalLinkStore.getDevicesData.mockReturnValue(new Promise(resolve => resolve()));

      props.store.externalLinkStore.allSpecializedDevices = [];
      component = renderer.create(<MemoryRouter>
        <DeviceDetailTemplate { ...props}/>
      </MemoryRouter>);

      expect(props.store.externalLinkStore.getDevicesData).toBeCalled();
      expect(props.store.externalLinkStore.getDevicesData).resolves;
    });
  });
});
