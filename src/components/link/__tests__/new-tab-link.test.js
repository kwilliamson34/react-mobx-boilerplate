jest.unmock('../new-tab-link');

import NewTabLink from '../new-tab-link';

describe('<NewTabLink />', () => {
  describe('renders', () => {
    let props = {
      to: 'http://example.com'
    }

    test('matches previous snapshot', () => {
      const component = renderer.create( <NewTabLink {...props}/> );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders children inside link', () => {
      props.children = (<div></div>);
      const component = renderer.create( <NewTabLink {...props}/> );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
