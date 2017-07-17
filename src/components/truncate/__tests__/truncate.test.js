jest.unmock('../truncate');

import Truncate from '../truncate';

describe('<Truncate /> standard snapshot tests:', () => {
  const standardProps = {
    returnToId: 'review-1',
    charLimit: 400,
    className: 'should render all these as classes'
  };

  const stringToTruncate = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  const longString = 'Vm1cfC6mnH0k0yrMIsz6EDIwIO5CiDaYhtZ99gTbtwEJH6RsaxwYCEQhA3jM2W96lmw6q8xuXXk8VJHBUzrMOhm6ykN5uxg22683LvxxqwMPFhQuc0kLlMfpHXeGVHt8GfEwZuO4TqBPJ3BCDSCF4rN03i7EWWIG3fTcnp7ZVIJpyylBplkHkPF5vWLmU24GBOCvlXq6wKSaBif9V3y5kQo6NiCKFogqqxsWmuopO9FiYNsEgfzSvtNB2rEQApIkhXiepOcapn8LwNJj1VrKhVC2IRQyzwpvJHTAS7EAJ78JnjQenvT9roXRyH1Cm5Q0nA5H9EXv9rQYOnqNqAfxX2qIIJs7NR6OCbO2jC15rtvqyLKUC5tpAUK6VmwTDqYYW9KLWU7Z7hPjHDsTZTg9hnwQbsyi3qn7EUgqyTBFOJt66aN836p9YvYCxhQRmUc6AhrK5M1jjWOSoPp0ZcNspqaBsO2XU0S6OaFHBx2jm1nS8IrUmvCVAiQ5SbWq7QUpOYxiSlfQLK7O2kEow2qrnrBkVCvLflDBHHLFfKCMsHaDMrZFLrUXWQJkaCCMPf1sQDU2yjt1lAku13P3BBXRYjJ0aQXgI0f2wEOV09YmkFvy1Kno1pTCrLT7RhwpIoQmJZRJF4BanDtfzDbkE2ipK1qH7vcS9KNTUQHUMifEb3DEe32n3W20MUmSAcYhOp4aYiCCkgjj5omFyXzp2b16fgYO8ek4vORZBr0FuPaLD9Htp5ZNciaH2lVrC4mjqxvWIQxpjuxUJkpQxwcjMBR2QCYZLPu5TgAvAs7n62Ni9HRct0L6MSzcKWpCTLAgEyRhmIv027pETnOUQawR4BfEGHXM8HYB1H7v6EU3RRaSQbxu2J8ntcaFxVOEBPZg1yKZ3Wh9tlHkqAKwZEqchQkwDHCNJRUqrOOa2L4oIO6i2zBQHOzxD4gpsMpuLX45ojJlSYnhMxvmFn3ZQAIl5qw9nBRRWMTi118ICtWMNN4s'

  describe('render tests;', () => {
    test('should render with default props', () => {
        const component = renderer.create(
          <Truncate>
            {stringToTruncate}
          </Truncate>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render with props input', () => {
        const component = renderer.create(
          <Truncate {...standardProps}>
            {stringToTruncate}
          </Truncate>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render with props that override defaults', () => {
        const component = renderer.create(
          <Truncate {...{
            wrappingElement: 'span',
            charLimit: 100,
            cutoffSymbol: '8250' //right caret
          }}>
            {stringToTruncate}
          </Truncate>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render one long string with no spaces', () => {
        const component = renderer.create(
          <Truncate {...standardProps}>
            {longString}
          </Truncate>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
  });
});
