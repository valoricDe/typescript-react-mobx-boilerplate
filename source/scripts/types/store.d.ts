declare namespace Store {
	interface IStores {
		tickStore: ITick;
	}

	interface ITick {
		increment(): void;
		value: number;
	}
}
