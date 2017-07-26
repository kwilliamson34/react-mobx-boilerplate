jest.unmock('axios');
jest.unmock('../../../core/stores/header.store');
jest.unmock('../../../core/stores/user.store');
jest.unmock('../../../core/stores/external-link.store');
jest.unmock('../header');
jest.unmock('jquery');

import {observer, inject} from 'mobx-react';
import PSEHeader from '../header';
import {MemoryRouter} from 'react-router-dom';
import {headerStore} from '../../../core/stores/header.store';
import {userStore} from '../../../core/stores/user.store';
import {externalLinkStore} from '../../../core/stores/external-link.store';

describe('<PSEHeader />', () => {
  let props = {
    store: {
      headerStore,
      userStore,
      externalLinkStore
    }
  };

  describe('render', () => {
    test('matches snapshot when menu is closed', () => {
      props.store.headerStore.mainMenuIsOpen = false;
      const component = renderer.create(<MemoryRouter>
        <PSEHeader {...props}/>
      </MemoryRouter>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('matches snapshot when menu is open', () => {
      props.store.headerStore.mainMenuIsOpen = true;
      const component = renderer.create(<MemoryRouter>
        <PSEHeader {...props}/>
      </MemoryRouter>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('matches snapshot when header store is not initialized', () => {
      props.store.headerStore = {};
      const component = renderer.create(<MemoryRouter>
        <PSEHeader {...props}/>
      </MemoryRouter>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('user interaction', () => {
    props.store.headerStore = headerStore;

    test('calls handler when toggle button is clicked', () => {
      props.store.headerStore.toggleMainMenu = jest.fn();

      //render the component into DOM to allow UI simulation
      let memoryRouterComponent = TestUtils.renderIntoDocument(<MemoryRouter>
        <PSEHeader {...props}/>
      </MemoryRouter>);
      expect(props.store.headerStore.toggleMainMenu).not.toHaveBeenCalled();

      //trigger the action
      const toggleButton = TestUtils.findRenderedDOMComponentWithClass(
        memoryRouterComponent, 'navbar-toggle'
      );
      TestUtils.Simulate.click(toggleButton);

      //assert an outcome
      expect(props.store.headerStore.toggleMainMenu).toHaveBeenCalled();

    });
  });
});
