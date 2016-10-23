import React from 'react';
import { shallow } from 'enzyme';
import Button from '../button';
describe('Button component', () => {
    const component = shallow((React.createElement(Button, {caption: 'Hello', type: 'test', onClick: () => console.log('click')})));
    it('render', () => {
        const button = component.find('button');
        expect(button.hasClass('content__button content__button--test')).toBeTruthy();
        expect(button.text()).toBe('Hello');
    });
});
//# sourceMappingURL=button.test.js.map