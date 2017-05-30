jest.unmock('../footer');

import Footer from '../footer';
import { MemoryRouter } from 'react-router-dom';

describe('<Footer />', () => {
    describe('renders', () => {
        test('matches previous footer snapshot', () =>{
            const component = renderer.create(
                <MemoryRouter>
                    <Footer />
                </MemoryRouter>
            );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
