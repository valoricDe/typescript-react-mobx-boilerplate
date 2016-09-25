import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Button from '../button';

describe('Button component', () => {
	const component: ShallowWrapper<any, {}> = shallow((
		<Button caption='Hello' type='test' onClick={() => console.log('click')} />
	));

	it('render', () => {
		const button: ShallowWrapper<any, {}> = component.find('button');

		expect(button.hasClass('content__button content__button--test')).toBeTruthy();
		expect(button.text()).toBe('Hello');
	});
});
