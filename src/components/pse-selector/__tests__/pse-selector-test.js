jest.unmock('../pse-selector');

import PSESelector from '../pse-selector';
import { MemoryRouter } from 'react-router-dom';

idescribe('<PSESelector />', () => {
    describe('render', () => {
        test('matches snapshot when menu is closed', () => {
          let props = {
              store: {
                  headerStore: {
                      currentPSE :'Fire & Rescue Station 32'
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
