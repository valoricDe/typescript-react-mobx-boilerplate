declare namespace Store {
	interface IStore {
		tick: number;
		increment(): void;
	}
}
