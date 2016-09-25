import createStores from '../create-stores';

import Tick from '../../store/tick';

describe('Create stores', () => {
	const all: Store.IStores = {
		tick: new Tick(),
	};

	it('should return all stores', () => {
		const stores: Store.IStores = createStores();

		expect(stores).toEqual(all);
	});
});
