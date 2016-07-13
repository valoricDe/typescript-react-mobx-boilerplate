import { observable } from 'mobx';

export default class Store implements Store.IStore {
	@observable
	public tick: number;

	constructor(tick: number) {
		this.tick = tick;
	}

	public increment(): void {
		this.tick = this.tick + 1;
	}
}
