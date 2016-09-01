declare namespace Store {
	interface IStores {
		tick: ITick;
	}

	interface ITick {
		value: number;
		increment(): void;
		decrement(): void;
	}
}
