import Tick from '../store/tick';

export default function createStores(): Store.IStores {
	return {
		tick: new Tick(0),
	};
}
