declare namespace Props {
	interface IApp {
		tickStore?: Store.ITick;
	}

	namespace Common {
		interface IButton {
			onClick(): void;
		}

		interface ICenter extends __React.HTMLProps<HTMLDivElement> {}

		interface ILabel {
			tickStore: Store.ITick;
		}
	}
}
