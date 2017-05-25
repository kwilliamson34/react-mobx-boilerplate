jest.unmock('../summary-card');
jest.unmock('../../rating/rating');

import {SummaryCard} from '../summary-card';

describe('<SummaryCard />', () => {
  let props = {
    display:{
      name: 'app name',
      publisher: 'publisher name',
      imageUrl: '../../images/app-icon.png',
      rating: 3.5,
      badge: true,
      operatingSystem: 'ANDROID',
    }
  };

  describe('render testing', () => {
    test('matches snapshot', () => {
      const component = renderer.create(<SummaryCard {...props} />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('componentWillReceiveProps testing', () => {
    let node, component;
    let newProps = {
      display:{
        name: 'new app name',
        publisher: 'new publisher name',
        imageUrl: '../../images/app-icon.png',
        rating: 1.5,
        badge: false,
        operatingSystem: 'ANDROID',
      }
    };

    // render the original component
    beforeEach(function(){
        node = document.createElement('div');
        component = ReactDOM.render(<SummaryCard {...props} />, node);
    });
    test('should update the state of the component when the value prop is changed', () => {
    // `component` will be updated instead of remounted
    ReactDOM.render(<SummaryCard {...newProps} />, node);
    // Assert that `component` has updated its state in response to a prop change
    expect(component.display.name).toBe('new app name');
});
  });
});
