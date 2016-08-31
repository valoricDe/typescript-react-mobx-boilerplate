declare namespace Store {
	interface IStores {
		tick: ITick;
	}

	interface ITick {
		value: number;
		increment(): void;
		decrement(): void;
	}

	namespace Tick {
		interface IModel {
			increment(): void;
			decrement(): void;
			value: number;
		}
	}
}
