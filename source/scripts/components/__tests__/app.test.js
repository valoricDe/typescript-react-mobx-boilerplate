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
import App from '../app';
import createStores from '../../main/create-stores';
describe('App component', () => {
    const stores = createStores();
    const app = shallow((React.createElement(App, __assign({}, stores))));
    it('render app wrapper', () => {
        expect(app.find('div').at(0).hasClass('wrapper')).toBeTruthy();
    });
});
//# sourceMappingURL=app.test.js.map