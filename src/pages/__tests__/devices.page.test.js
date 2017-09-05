jest.unmock('axios');
jest.unmock('../../core/stores/master.store');
jest.unmock('../devices.page');

import {observer, inject} from 'mobx-react';
import {externalLinkStore} from '../../core/stores/external-link.store';
import DevicesPage from '../devices.page';
import {MemoryRouter} from 'react-router-dom';

describe('<DevicesPage />', () => {
  describe('render', () => {
    let props = {
      store: {
        externalLinkStore
      }
    }
    let card = {
      device_title: 'title',
      device_image_url: 'url',
      device_image_alt: 'alt'
    }
    props.store.externalLinkStore.categorizedDeviceData = {
      phones: [],
      tablets: [],
      invehicle: [],
      accessories: []
    }

    test('matches snapshot with zero, one and many cards in each row', () => {
      let component, tree;
      props.store.externalLinkStore.allSpecializedDevices = [{},{}];

      component = renderer.create(<DevicesPage {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.externalLinkStore.categorizedDeviceData.invehicle = [card];
      component = renderer.create(<MemoryRouter>
        <DevicesPage { ...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.externalLinkStore.categorizedDeviceData.phones = [card];
      props.store.externalLinkStore.categorizedDeviceData.tablets = [card, card, card, card, card, card, card, card, card, card];
      props.store.externalLinkStore.categorizedDeviceData.invehicle = [card, card, card];
      props.store.externalLinkStore.categorizedDeviceData.accessories = [card, card, card, card, card];
      component = renderer.create(<MemoryRouter>
        <DevicesPage { ...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('API', () => {
    let props = {
      store: {
        externalLinkStore
      }
    }
    let card = {
      device_title: 'title',
      device_image_url: 'url',
      device_image_alt: 'alt'
    }
    props.store.externalLinkStore.categorizedDeviceData = {
      phones: [],
      tablets: [],
      invehicle: [],
      accessories: []
    }

    test('displays if the device landing data has been retrieved', () => {
      let component, tree;
      props.store.externalLinkStore.fetchDeviceLandingData = jest.fn();

      props.store.externalLinkStore.allSpecializedDevices = [{},{}];
      component = renderer.create(<MemoryRouter>
        <DevicesPage { ...props}/>
      </MemoryRouter>);

      expect(props.store.externalLinkStore.fetchDeviceLandingData).toBeCalled();
    });

    test('fetches if the device landing data is missing', () => {
      let component, tree;
      props.store.externalLinkStore.getDevicesData = jest.fn();
      props.store.externalLinkStore.getDevicesData.mockReturnValue(new Promise(resolve => resolve()));

      props.store.externalLinkStore.allSpecializedDevices = [];
      component = renderer.create(<MemoryRouter>
        <DevicesPage { ...props}/>
      </MemoryRouter>);

      expect(props.store.externalLinkStore.getDevicesData).toBeCalled();
      expect(props.store.externalLinkStore.getDevicesData).resolves;
    });
  });
});
