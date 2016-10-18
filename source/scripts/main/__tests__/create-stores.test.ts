import createStores from '../create-stores';

import TickStore from "../../stores/tick";

describe('Create stores', () => {
	const all: Stores.IStores = {
		tickStore: new TickStore(null),
	};

	it('should return all stores', () => {
		const stores: Stores.IStores = createStores();

		expect(stores).toEqual(all);
	});
});
