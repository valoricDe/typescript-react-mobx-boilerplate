import { observable, action } from 'mobx';

export default class Tick implements Store.ITick {
	@observable
	private tick: number;

	constructor(tick: number) {
		this.tick = tick;
	}

	@action
	private increment(): void {
		this.tick = this.tick + 1;
	}

	@action
	private decrement(): void {
		this.tick = this.tick - 1;
	}

	public get model(): Store.Tick.IModel {
		return {
			increment: this.increment.bind(this),
			decrement: this.decrement.bind(this),
			value: this.tick,
		};
	}
}
