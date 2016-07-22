import Tick from '../store/tick';

export default function createStores(num: number): Store.IStores {
	return {
		tickStore: new Tick(num),
	};
}
