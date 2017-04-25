jest.unmock('../plans-and-devices');

import PlansAndDevices from '../plans-and-devices';
import { MemoryRouter, Link } from 'react-router-dom';

describe('<PlansAndDevices />', () => {
    describe('renders', () => {
        test('matches previous Plans and devices snapshot', () =>{
            const component = renderer.create(
                <MemoryRouter>
                    <PlansAndDevices />
                </MemoryRouter>
            );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});