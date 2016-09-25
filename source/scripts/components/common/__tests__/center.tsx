import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Center from '../center';

describe('Center component', () => {
	const component: ShallowWrapper<Props.Common.ICenter, {}> = shallow((
		<Center>Hello</Center>
	));

	it('render component', () => {
		expect(component.text()).toBe('Hello');
	});
});
