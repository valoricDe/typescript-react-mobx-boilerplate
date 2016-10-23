import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../footer';
describe('Footer component', () => {
    const component = shallow((React.createElement(Footer, null)));
    it('render', () => {
        expect(component.find('div').hasClass('content__footer')).toBeTruthy();
        expect(component.find('label').text()).toBe('The project is successfully built.');
    });
});
//# sourceMappingURL=footer.test.js.map