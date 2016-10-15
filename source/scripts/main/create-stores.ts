import Tick from '../store/tick';

const Horizon = require('@horizon/client');
const horizon = Horizon({ secure: false });

type TCreateStores = () => Store.IStores;

const createStore: TCreateStores = (): Store.IStores => ({
	tick: new Tick(horizon),
});

export default createStore;
