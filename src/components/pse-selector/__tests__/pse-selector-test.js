jest.unmock('../pse-selector');

import PSESelector from '../pse-selector';
import { MemoryRouter } from 'react-router-dom';

describe('<PSESelector />', () => {
    describe('render', () => {
        test('matches snapshot when menu is closed', () => {
          let props = {
              store: {
                  headerStore: {
                      mainMenuIsOpen: false
                  }
              }
          };
          const component = renderer.create(
              <MemoryRouter>
                  <PSESelector {...props} />
              </MemoryRouter>
          );
          let tree = component.toJSON();
          expect(tree).toMatchSnapshot();
        });

        test('matches snapshot when menu is open', () => {
          let props = {
              store: {
                  headerStore: {
                      mainMenuIsOpen: true
                  }
              }
          };
          const component = renderer.create(
              <MemoryRouter>
                <PSESelector {...props} />
              </MemoryRouter>
          );
          let tree = component.toJSON();
          expect(tree).toMatchSnapshot();
        });

        test('matches snapshot when header store is not initialized', () => {
          let props = {
              store: {
                headerStore: {}
              }
          };
          const component = renderer.create(
              <MemoryRouter>
                  <PSESelector {...props} />
              </MemoryRouter>
          );
          let tree = component.toJSON();
          expect(tree).toMatchSnapshot();
        });
    });

    describe('user interaction', () => {
      test('calls handler when toggle button is clicked', () => {
        //render the component into DOM to allow UI simulation
        let props = {
            store: {
                headerStore: {
                    mainMenuIsOpen: true,
                    toggleMainMenu: jest.fn()
                }
            }
        };
        let memoryRouterComponent = TestUtils.renderIntoDocument(
          <MemoryRouter>
            <PSESelector {...props} />
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
