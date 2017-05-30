jest.unmock('../pse-selector');

import PSESelector from '../pse-selector';
import { MemoryRouter } from 'react-router-dom';

describe('<PSESelector />', () => {
    describe('render', () => {
        test('matches previous PSE Selector snapshot for multiple available PSEs', () => {
            let props = {
                store: {
                    headerStore: {
                        currentPSE: 'Fire & Rescue Station 32',
                        pse_list: ['Fire & Rescue Station 32', 'Fire Station 12', 'Fire & Rescue Station 24', 'Fire Station 6', 'Fire Station 10'],
                        getLastPSE: jest.fn()
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

        test('matches previous PSE Selector snapshot for one available PSE', () => {
            let props = {
                store: {
                    headerStore: {
                        currentPSE: 'Fire & Rescue Station 32',
                        pse_list: ['Fire & Rescue Station 32'],
                        getLastPSE: jest.fn()
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
    });
});
