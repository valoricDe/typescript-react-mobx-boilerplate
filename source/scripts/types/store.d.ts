declare namespace Store {
	interface IStores {
		tickStore: ITick;
	}

	interface ITick {
		model: Tick.IModel;
	}

	namespace Tick {
		interface IModel {
			increment(): void;
			decrement(): void;
			value: number;
		}
	}
}
