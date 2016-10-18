import UserStore from "../stores/user";
const Horizon = require('@horizon/client');
const horizon = Horizon({ host: 'localhost:8181', secure: false, authType: 'token' });
const tickCollection = horizon('ticks');



type TCreateStores = () => Stores.IStores;

const createStore: TCreateStores = (): Stores.IStores => ({
	users: new UserStore(tickCollection),
});

export default createStore;
