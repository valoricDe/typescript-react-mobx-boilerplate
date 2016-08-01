declare namespace Props {
	interface IApp {
		tickStore?: Store.ITick;
	}

	interface IContent {
		model: Store.Tick.IModel;
	}

	namespace Content {
		interface IButton {
			className: string;
			caption: string;
			onClick(): void;
		}

		interface ILabel {
			value: string | number;
		}
	}

	namespace Common {
		interface ICenter extends __React.HTMLProps<HTMLDivElement> {}
	}
}
