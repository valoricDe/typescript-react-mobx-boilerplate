import TickStore from "../tick";
describe('Tick store', () => {
    const store = new TickStore(null);
    store.createTick(0);
    let tick = store.models.values()[0];
    it('value should be zero', () => {
        expect(tick.value).toBe(0);
    });
    it('increment', () => {
        tick.increment();
        expect(tick.value).toBe(1);
    });
    it('decrement', () => {
        tick.decrement();
        tick.decrement();
        expect(tick.value).toBe(-1);
    });
});
//# sourceMappingURL=tick.test.js.map