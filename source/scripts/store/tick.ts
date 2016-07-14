import { observable, action } from 'mobx';

export default class TickStore implements Tick.ITick {
	@observable
	private tick: number;

	constructor(tick: number) {
		this.tick = tick;
	}

	@action
	public increment(): void {
		this.tick = this.tick + 1;
	}

	public get value(): number {
		return this.tick;
	}
}
