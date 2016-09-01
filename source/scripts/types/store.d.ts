declare namespace Store {
	interface IStores {
		tick: Tick.ITick;
	}

	namespace Tick {
		interface ITick {
			value: number;
			increment(): void;
			decrement(): void;
		}
	}
}
