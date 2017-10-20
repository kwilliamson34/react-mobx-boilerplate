jest.unmock('../../core/stores/master.store');
jest.unmock('../../core/stores/external-link.store');
jest.unmock('../../core/services/api.service');
jest.unmock('../device-category.template');

import {observer, inject} from 'mobx-react';
import {externalLinkStore} from '../../core/stores/external-link.store';
import DeviceCategoryTemplate from '../device-category.template';
import {MemoryRouter} from 'react-router-dom';

describe('<DeviceCategoryTemplate />', () => {
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
    props.store.externalLinkStore.currentDeviceCategory = 'category1';
    props.store.externalLinkStore.allSpecializedDevices = [];

    test('matches snapshot with zero, one and many cards', () => {
      let component, tree;
      props.store.externalLinkStore.allSpecializedDevices = [];
      props.store.externalLinkStore.currentDeviceCategory = 'category1';

      component = renderer.create(<DeviceCategoryTemplate {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.externalLinkStore.allSpecializedDevices = [card];
      component = renderer.create(<MemoryRouter>
        <DeviceCategoryTemplate { ...props}/>
      </MemoryRouter>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.store.externalLinkStore.allSpecializedDevices = [card, card, card, card, card, card, card, card, card, card];
      component = renderer.create(<MemoryRouter>
        <DeviceCategoryTemplate { ...props}/>
      </MemoryRouter>);
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

    test('does not fetch if the category has already been retrieved', () => {
      let component, tree;
      props.store.externalLinkStore.currentDeviceCategory = 'category1';
      props.store.externalLinkStore.allSpecializedDevices = [card,card];

      props.store.externalLinkStore.getDevicesData = jest.fn().mockReturnValue(new Promise(resolve => resolve()));
      props.store.externalLinkStore.fetchAndShowDeviceCategory = jest.fn();

      component = renderer.create(<MemoryRouter>
        <DeviceCategoryTemplate { ...props}/>
      </MemoryRouter>);

      expect(props.store.externalLinkStore.getDevicesData).not.toBeCalled();
      expect(props.store.externalLinkStore.fetchAndShowDeviceCategory).not.toBeCalled();
    });

    // test('fetches if the category is missing', () => {
    //   let component, tree;
    //   props.store.externalLinkStore.allSpecializedDevices = [];
    //   props.store.externalLinkStore.currentDeviceCategory = '';
    //   props.store.externalLinkStore.getDevicesData = jest.fn().mockReturnValue(new Promise(resolve => resolve()));
    //
    //   props.store.externalLinkStore.allSpecializedDevices = [];
    //   component = renderer.create(<MemoryRouter>
    //     <DeviceCategoryTemplate { ...props}/>
    //   </MemoryRouter>);
    //
    //   expect(props.store.externalLinkStore.getDevicesData).toBeCalled();
    //   expect(props.store.externalLinkStore.getDevicesData).resolves;
    // });
  });
});
