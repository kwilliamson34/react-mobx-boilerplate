jest.unmock('../geolink-map');

import GeolinkMap from '../geolink-map';
import { MemoryRouter } from 'react-router-dom';

describe('<GeolinkMap />', () => {
  const dumbPromise = new Promise(resolve => {resolve()});
  let props = {
    geolinkStore: {
      loadGeolinkHtml: () => {return dumbPromise}
    }
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      const component = renderer.create(<GeolinkMap {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
