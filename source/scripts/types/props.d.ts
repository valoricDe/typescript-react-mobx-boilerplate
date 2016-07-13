declare namespace Props {
	interface IApp {
		tickStore?: Tick.ITick;
	}

	interface IButton {
		onClick(): void;
	}

	interface ICenter extends __React.HTMLProps<HTMLDivElement> {}

	interface ILabel {
		value: number;
	}
}
