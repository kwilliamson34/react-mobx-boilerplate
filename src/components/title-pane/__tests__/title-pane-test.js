
jest.unmock('../index.jsx');

import TitlePane from '../index.jsx';

describe('<TitlePane />', () => {

	it('uses props passed from its parent', () => {
	  const wrapper = mount(<TitlePane pageTitle="Test"/>);

	  expect(typeof wrapper.props().pageTitle).toEqual('Test');
	});

});
