jest.unmock('../geolink-layer-toggle');

import GeolinkLayerToggle from '../geolink-layer-toggle';
import { MemoryRouter } from 'react-router-dom';

describe('<GeolinkLayerToggle />', () => {
  let props = {
    value: 'testVal',
    label: 'testLabel'
  }

  describe('renders', () => {
    test('matches previous snapshot', () => {
      props.defaultOn = undefined;
      let component = renderer.create(<GeolinkLayerToggle {...props}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.defaultOn = true;
      component = renderer.create(<GeolinkLayerToggle {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.defaultOn = false;
      component = renderer.create(<GeolinkLayerToggle {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      props.onClick = jest.fn();
      component = renderer.create(<GeolinkLayerToggle {...props}/>);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
