import { observable, action } from 'mobx';

export default class Tick implements Store.Tick.ITick {
	public collection;
	@observable
	public value: number = 0;

	constructor(dbms) {
		this.collection = dbms('ticks');
		this.collection.fetch().subscribe(
			result => this.value = result.length ? result[0] : 0,
			err => console.error(err)
		);
	}

	@action
	public increment(): void {
		this.value = this.value + 1;
	};

	@action
	public decrement(): void {
		this.value = this.value - 1;
	};
};
