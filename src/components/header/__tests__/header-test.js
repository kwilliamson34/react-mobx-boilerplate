jest.unmock('../header');

import 'bootstrap';
import $ from 'jquery';
import _ from 'lodash';

import {observer, inject} from 'mobx-react';
import PSEHeader from '../header';
import {MemoryRouter} from 'react-router-dom';

describe('<PSEHeader />', () => {
    let props = {
        store: {
            headerStore: {
                mainMenuIsOpen: false,
                getLastPSE: jest.fn(),
                toggleMainMenu: jest.fn()
            }
        }
    };

    describe('render', () => {
        test('matches snapshot when menu is closed', () => {
          const component = renderer.create(
              <MemoryRouter>
                  <PSEHeader {...props} />
              </MemoryRouter>
          );
          let tree = component.toJSON();
          expect(tree).toMatchSnapshot();
        });

        test('matches snapshot when menu is open', () => {
          props.store.headerStore.mainMenuIsOpen = true;
          const component = renderer.create(
              <MemoryRouter>
                <PSEHeader {...props} />
              </MemoryRouter>
          );
          let tree = component.toJSON();
          expect(tree).toMatchSnapshot();
        });

        test('matches snapshot when header store is not initialized', () => {
          props.store.headerStore = {};
          const component = renderer.create(
              <MemoryRouter>
                  <PSEHeader {...props} />
              </MemoryRouter>
          );
          let tree = component.toJSON();
          expect(tree).toMatchSnapshot();
        });
    });

    describe('user interaction', () => {
      test('calls handler when toggle button is clicked', () => {
        //render the component into DOM to allow UI simulation
        let memoryRouterComponent = TestUtils.renderIntoDocument(
          <MemoryRouter>
            <PSEHeader {...props} />
          </MemoryRouter>
        );

        //determine the function to spy on
        const functionToWatch = memoryRouterComponent.props.children.props.store.headerStore.toggleMainMenu;
        expect(functionToWatch).not.toHaveBeenCalled();

        //trigger the action
        const toggleButton = TestUtils.findRenderedDOMComponentWithClass(
           memoryRouterComponent, 'navbar-toggle'
        );
        TestUtils.Simulate.click(toggleButton);

        //assert an outcome
        expect(functionToWatch).toHaveBeenCalled();

      });
    });
});
