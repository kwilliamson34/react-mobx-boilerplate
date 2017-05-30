jest.unmock('../card-list');

// unmocking because we want to test all the way down the chain. If you ONLY want to test card-list, leave these mocked, but that defeats the purpose of testing
jest.unmock('../../summary-card/summary-card');
jest.unmock('../../rating/rating');

import { CardList } from '../card-list';
import { MemoryRouter } from 'react-router-dom';

describe('<CardList />', () => {
    let props = {
        cards: [{
            display: {
                name: 'NAME ERROR',
                publisher: 'PUBLISHER ERROR',
                imageUrl: '../../images/app-icon.png',
                rating: 0,
                badge: '',
                operatingSystem: '',
            },
            events: {
                link: '#'
            }
        }]
    };

    describe('renders', () => {
        test('matches previous snapshot', () =>{
            const component = renderer.create(
                // If you have a Link in the component, wrap the render in a MemoryRouter component
                // https://reacttraining.com/react-router/web/guides/testing
                <MemoryRouter>
                    <CardList {...props} />
                </MemoryRouter>
            );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
