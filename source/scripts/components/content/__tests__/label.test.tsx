import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Label from '../label';

describe('Label component', () => {
	const component: ShallowWrapper<any, {}> = shallow((
		<Label value='Test' />
	));

	it('render', () => {
		const label: ShallowWrapper<any, {}> = component.find('label');

		expect(label.hasClass('content__output')).toBeTruthy();
		expect(label.text()).toBe('Test');
	});
});
