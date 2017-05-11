jest.unmock('../truncate-comment');

import TruncateComment from '../truncate-comment';

describe('<TruncateComment />', () => {
  let props = {
    keyVal: 4,
    charCount: 300,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  };

  describe('It should render', () => {
    test('matches previous snapshot', () => {
      const component = renderer.create(
        <TruncateComment {...props} />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('It should fail', () => {
    test('no keyVal as required', () => {
      const component = renderer.create(
        <TruncateComment text={props.text} />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
