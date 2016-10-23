import React from 'react';
import { shallow } from 'enzyme';
import Center from '../center';
describe('Center component', () => {
    const component = shallow((React.createElement(Center, null, "Hello")));
    it('render component', () => {
        expect(component.text()).toBe('Hello');
    });
});
//# sourceMappingURL=center.test.js.map