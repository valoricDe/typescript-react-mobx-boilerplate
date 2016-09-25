import Tick from '../store/tick';

type TCreateStores = () => Store.IStores;

const createStore: TCreateStores = (): Store.IStores => ({
	tick: new Tick(),
});

export default createStore;
