jest.unmock('../truncate');

import Truncate from '../truncate';

describe('<Truncate />', () => {
  let props = {
    returnToId: 'review-1',
    charLimit: 300,
    className: 'should render all classes'
  };

  let stringToTruncate = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

  describe('renders', () => {
    test('matches previous snapshot', () => {
        const component = renderer.create(
          <Truncate {...props}>
            {stringToTruncate}
          </Truncate>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
  });
});
