var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import React from 'react';
import { shallow } from 'enzyme';
import Content from '../content';
import createStores from '../../main/create-stores';
describe('Content component', () => {
    const stores = createStores();
    const content = shallow((React.createElement(Content, __assign({}, stores))));
    const button = content.find('Button');
    const increment = button.at(0);
    const decrement = button.at(1);
    describe('render components', () => {
        it('content', () => {
            expect(content.find('div').at(0).hasClass('content')).toBeTruthy();
        });
        it('center', () => {
            expect(content.children().name()).toBe('Center');
        });
        it('label output', () => {
            expect(content.find('Label').props().value).toBe(0);
        });
        it('increment button', () => {
            expect(increment.props().caption).toBe('++');
        });
        it('decrement button', () => {
            expect(decrement.props().caption).toBe('--');
        });
    });
    describe('component events', () => {
        it('increment button', () => {
            increment.simulate('click');
            expect(content.find('Label').props().value).toBe(1);
        });
        it('decrement button', () => {
            decrement.simulate('click');
            decrement.simulate('click');
            expect(content.find('Label').props().value).toBe(-1);
        });
    });
});
//# sourceMappingURL=content.test.js.map