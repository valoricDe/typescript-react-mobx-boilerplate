declare namespace Props {
	interface IApp {
		tickStore?: Store.ITick;
	}

	namespace Common {
		interface IButton {
			className: string;
			caption: string;
			onClick(): void;
		}

		interface ICenter extends __React.HTMLProps<HTMLDivElement> {}

		interface ILabel {
			value: string | number;
		}
	}
}
