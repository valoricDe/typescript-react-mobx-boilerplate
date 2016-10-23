import createStores from '../create-stores';
import TickStore from "../../stores/tick";
describe('Create stores', () => {
    const all = {
        tickStore: new TickStore(null),
    };
    it('should return all stores', () => {
        const stores = createStores();
        expect(stores).toEqual(all);
    });
});
//# sourceMappingURL=create-stores.test.js.map