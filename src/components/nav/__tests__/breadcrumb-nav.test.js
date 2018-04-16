jest.unmock('../breadcrumb-nav');

import BreadcrumbNav from '../breadcrumb-nav';
import { MemoryRouter } from 'react-router-dom';

describe('<BreadcrumbNav />', () => {
	let props = {
		links: [{
				pageHref: '/link1',
				pageTitle: 'Link Level 1'
			},
			{
				pageHref: '/link1/link2',
				pageTitle: 'Link Level 2'
			},
			{
				pageHref: '/link1/link2/link3',
				pageTitle: 'Link Level 3'
			},
			{
				pageHref: '/link1/link2/link3/link4',
				pageTitle: 'Link Level 4'
			}
		]
	};

	describe('renders a breadcrumb of links', () => {
		test('matches previous snapshot', () => {
			const component = renderer.create(
				<MemoryRouter>
          <BreadcrumbNav {...props} />
        </MemoryRouter>
			);
			let tree = component.toJSON();
			expect(tree).toMatchSnapshot();
		});
	});
});
