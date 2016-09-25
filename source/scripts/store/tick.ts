import { observable, action } from 'mobx';

export default class Tick implements Store.Tick.ITick {
	@observable
	public value: number = 0;

	@action
	public increment(): void {
		this.value = this.value + 1;
	};

	@action
	public decrement(): void {
		this.value = this.value - 1;
	};
};
