import TickStore from '../store/tick';

export default function createStores(num: number): IStores {
	return {
		tickStore: new TickStore(num),
	};
}
