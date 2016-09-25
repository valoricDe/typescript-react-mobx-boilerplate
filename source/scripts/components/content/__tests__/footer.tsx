import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Footer from '../footer';

describe('Footer component', () => {
	const component: ShallowWrapper<any, {}> = shallow((
		<Footer />
	));

	it('render', () => {
		expect(component.find('div').hasClass('content__footer')).toBeTruthy();
		expect(component.find('label').text()).toBe('The project is successfully built.');
	});
});
