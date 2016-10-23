import React from 'react';
import { shallow } from 'enzyme';
import Label from '../label';
describe('Label component', () => {
    const component = shallow((React.createElement(Label, {value: 'Test'})));
    it('render', () => {
        const label = component.find('label');
        expect(label.hasClass('content__output')).toBeTruthy();
        expect(label.text()).toBe('Test');
    });
});
//# sourceMappingURL=label.test.js.map