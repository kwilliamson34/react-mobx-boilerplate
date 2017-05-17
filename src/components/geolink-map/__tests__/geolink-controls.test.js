jest.unmock('../geolink-controls');

import GeolinkControls from '../geolink-controls';
import { MemoryRouter } from 'react-router-dom';

describe('<GeolinkControls />', () => {
  let props = {
    geolinkStore: {}
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      const component = renderer.create(<GeolinkControls {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
